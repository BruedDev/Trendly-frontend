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
		let foundActive = false;
		const items = NAV_ITEMS.map((item, idx) => {
			const isActive = pathname === item.path;
			if (isActive) foundActive = true;
			return { ...item, isActive };
		});
		// Nếu không có mục nào active, mặc định active mục đầu tiên
		if (!foundActive && items.length > 0) {
			items[0].isActive = true;
		}
		return items;
	}, [pathname]);
};

export default useNavItems;
