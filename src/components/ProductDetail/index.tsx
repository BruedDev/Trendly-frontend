import type { ProductProps } from "@/types/Products_section";
import ProductDetail_UI from "@/ui/ProductDetail";

export default function ProductDetail({ product }: ProductProps) {
  return (
    <div>
      <ProductDetail_UI product={product} />
    </div>
  );
}
