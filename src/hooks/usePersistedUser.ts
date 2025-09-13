import { useState, useEffect } from "react";
import { User } from "@/types/User";

// ✅ Interface cho data được cache
interface CachedUserData {
  fullName: string;
  phone: string;
  address: string;
}

// ✅ Helper function để extract data cần cache
const extractCacheableData = (user: User): CachedUserData => ({
  fullName: user.fullName || "",
  phone: user.phone || "",
  address: user.address || "",
});

// ✅ Helper function để merge cached data với user object
const mergeCachedData = (user: User, cachedData: CachedUserData): User => ({
  ...user,
  fullName: cachedData.fullName,
  phone: cachedData.phone,
  address: cachedData.address,
});

export function usePersistedUser() {
  const [cachedUserData, setCachedUserData] = useState<CachedUserData | null>(
    null
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // ✅ Load từ sessionStorage ngay lập tức (chỉ chạy client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("trendly-user-profile");
      if (cached) {
        try {
          const parsedData = JSON.parse(cached) as CachedUserData;
          // ✅ Validate structure trước khi set
          if (
            typeof parsedData === "object" &&
            parsedData !== null &&
            "fullName" in parsedData &&
            "phone" in parsedData &&
            "address" in parsedData
          ) {
            setCachedUserData(parsedData);
          } else {
            sessionStorage.removeItem("trendly-user-profile");
          }
        } catch (error) {
          console.error("Error parsing cached user profile:", error);
          sessionStorage.removeItem("trendly-user-profile");
        }
      }
      setIsHydrated(true);
    }
  }, []);

  // ✅ Update cache với chỉ 3 trường cần thiết - dùng sessionStorage
  const updateCachedUser = (user: User | null) => {
    if (typeof window !== "undefined") {
      if (user) {
        const cacheableData = extractCacheableData(user);
        setCachedUserData(cacheableData);
        sessionStorage.setItem(
          "trendly-user-profile",
          JSON.stringify(cacheableData)
        );
      } else {
        setCachedUserData(null);
        sessionStorage.removeItem("trendly-user-profile");
      }
    }
  };

  // ✅ Tạo user object từ cached data (cần full user object từ API trước)
  const getCachedUser = (fullUserFromApi: User): User | null => {
    if (!cachedUserData || !fullUserFromApi) return null;

    return mergeCachedData(fullUserFromApi, cachedUserData);
  };

  // ✅ Clear cache function - hữu ích khi logout
  const clearCache = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("trendly-user-profile");
      setCachedUserData(null);
    }
  };

  return {
    cachedUserData,
    updateCachedUser,
    getCachedUser,
    clearCache,
    isHydrated,
  };
}
