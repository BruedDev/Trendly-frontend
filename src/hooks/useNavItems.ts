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

  // Đảm bảo hydration hoàn tất
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return useMemo(() => {
    // Trong quá trình SSR, không active item nào
    if (!isHydrated) {
      return NAV_ITEMS.map((item) => ({
        ...item,
        isActive: false,
      }));
    }

    // Logic tìm active item được cải thiện
    let bestMatch = null;

    // Kiểm tra exact match trước
    const exactMatch = NAV_ITEMS.find(item => item.path === pathname);
    if (exactMatch) {
      bestMatch = exactMatch;
    } else {
      // Nếu không có exact match, tìm longest prefix match
      // Nhưng loại trừ root path "/" để tránh conflict
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