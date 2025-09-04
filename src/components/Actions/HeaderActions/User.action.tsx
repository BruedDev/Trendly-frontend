"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Tooltip from "@/components/Tooltip";
import { CiUser } from "react-icons/ci";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function UserComponent() {
  const router = useRouter();
  const protectRoute = useProtectRoute();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const tooltipTitle = isLoggedIn ? `Hi, ${user?.fullName}` : "Đăng nhập";

  const handleAccount = protectRoute(() => {
    router.push("/account");
  });

  return (
    <Tooltip title={tooltipTitle} arrow="top-center">
      <button onClick={handleAccount}>
        <CiUser />
      </button>
    </Tooltip>
  );
}
