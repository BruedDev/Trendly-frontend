"use client";

import { useMemo, useEffect, useState } from "react";
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return useMemo(() => {
    if (!isHydrated) {
      return NAV_ITEMS.map((item) => ({
        ...item,
        isActive: false,
      }));
    }

    let bestMatch = null;

    const exactMatch = NAV_ITEMS.find(item => item.path === pathname);
    if (exactMatch) {
      bestMatch = exactMatch;
    } else {
      bestMatch = NAV_ITEMS.filter(item => item.path !== "/")
        .reduce((currentBest, item) => {
          if (pathname.startsWith(item.path)) {
            if (!currentBest || item.path.length > currentBest.path.length) {
              return item;
            }
          }
          return currentBest;
        }, null as (typeof NAV_ITEMS[0] | null));
    }

    return NAV_ITEMS.map((item) => ({
      ...item,
      isActive: item.path === bestMatch?.path,
    }));
  }, [pathname, isHydrated]);
};

export default useNavItems;