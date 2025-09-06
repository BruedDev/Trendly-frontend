import { Product } from "@/types/Products_section";

export function getSlug(product: Product): string {
		if (product?.slug?.current) return product.slug.current;
		return "";
}
