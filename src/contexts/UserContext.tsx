import React, { createContext, useState, useEffect, useCallback } from "react";
import { getAccountUser } from "@/services/user";
import { User, UserContextType } from "@/types/User";
import { usePersistedUser } from "@/hooks/usePersistedUser";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const { cachedUserData, updateCachedUser, getCachedUser, isHydrated } =
    usePersistedUser();

  // ✅ Main fetch function
  const fetchUser = useCallback(
    async (isBackground = false) => {
      try {
        if (!isBackground) {
          setLoading(true);
          setError(null);
        }

        const response = await getAccountUser();

        if (response.user) {
          // ✅ Nếu có cached data, merge với API data
          let finalUser = response.user;
          if (cachedUserData) {
            finalUser = getCachedUser(response.user) || response.user;
          }

          setUser(finalUser);
          updateCachedUser(finalUser);
        } else {
          setUser(null);
          updateCachedUser(null);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Có lỗi xảy ra";

        if (!isBackground) {
          setError(message);
          // ✅ Nếu có cached data, vẫn có thể tạo user object giả định
          if (cachedUserData) {
            // Tạo user object tối thiểu từ cache
            const fallbackUser: User = {
              _id: "cached",
              email: "",
              fullName: cachedUserData.fullName,
              phone: cachedUserData.phone,
              address: cachedUserData.address,
              avatar: "",
              role: "user",
              createdAt: "",
            };
            setUser(fallbackUser);
          } else {
            setUser(null);
            updateCachedUser(null);
          }
        } else {
          console.error("Background fetch failed:", err);
        }
      } finally {
        if (!isBackground) {
          setLoading(false);
        }
        setIsInitialized(true);
      }
    },
    [updateCachedUser, cachedUserData, getCachedUser]
  );

  // ✅ Initial load effect
  useEffect(() => {
    if (!isHydrated || isInitialized) return;

    if (cachedUserData) {
      // ✅ Có cache: tạo user object tạm từ cache
      const tempUser: User = {
        _id: "cached",
        email: "",
        fullName: cachedUserData.fullName,
        phone: cachedUserData.phone,
        address: cachedUserData.address,
        avatar: "",
        role: "user",
        createdAt: "",
      };

      setUser(tempUser);
      setLoading(false);
      setIsInitialized(true);

      // Background fetch sau 1s để lấy thông tin đầy đủ
      setTimeout(() => {
        fetchUser(true);
      }, 1000);
    } else {
      // Không có cache: fetch thường
      fetchUser(false);
    }
  }, [isHydrated, cachedUserData, isInitialized, fetchUser]);

  // ✅ Optimistic update cho user
  const setUserOptimistic = useCallback(
    (newUser: User | null) => {
      setUser(newUser);
      updateCachedUser(newUser);
    },
    [updateCachedUser]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        fetchUser: () => fetchUser(false),
        setUser: setUserOptimistic,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
