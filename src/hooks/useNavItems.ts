"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types/NavItem";

const NAV_ITEMS: Omit<NavItem, "isActive">[] = [
  { label: "Trang chủ", path: "/" },
  { label: "Sản phẩm", path: "/san-pham" },
  { label: "SALE UP TO 50%", path: "/sale-sap-luon" },
  { label: "Bộ sưu tập", path: "/bo-su-tap" },
  { label: "Hệ thống cửa hàng", path: "/he-thong-cua-hang" },
];

const useNavItems = (): NavItem[] => {
  const pathname = usePathname();

  return useMemo(() => {
    let activePath = "";
    if (pathname === "/") {
      activePath = "/";
    } else {
      for (const item of NAV_ITEMS) {
        if (item.path !== "/" && pathname.startsWith(item.path)) {
          if (item.path.length > activePath.length) {
            activePath = item.path;
          }
        }
      }
    }

    if (activePath === "") {
        const matchingRoot = NAV_ITEMS.find(item => item.path === '/');
        if (matchingRoot) activePath = '/';
    }

    return NAV_ITEMS.map((item) => ({
      ...item,
      isActive: item.path === activePath,
    }));
  }, [pathname]);
};

export default useNavItems;