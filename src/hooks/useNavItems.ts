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
    const bestMatch = NAV_ITEMS.reduce(
      (currentBest, item) => {
        if (pathname.startsWith(item.path)) {
          if (!currentBest || item.path.length > currentBest.path.length) {
            return item;
          }
        }
        return currentBest;
      },
      null as (typeof NAV_ITEMS[0] | null)
    );

    return NAV_ITEMS.map((item) => ({
      ...item,
      isActive: item.path === bestMatch?.path,
    }));
  }, [pathname]);
};

export default useNavItems;