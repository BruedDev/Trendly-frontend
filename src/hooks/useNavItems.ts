import { useMemo } from "react";
import {NavItem} from "@/types/NavItem";

const useNavItems = (): NavItem[] => {
	return useMemo(
		() => [
			{ label: "Trang chủ", path: "/", isActive: false },
			{ label: "Sản phẩm", path: "/san-pham", isActive: false },
			{ label: "Sale sập luôn", path: "/sale-sap-luon", isActive: false },
			{ label: "Hệ thống cửa hàng", path: "/he-thong-cua-hang", isActive: false },
		],
		[]
	);
};

export default useNavItems;
