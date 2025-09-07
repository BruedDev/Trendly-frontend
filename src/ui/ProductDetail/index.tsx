import type { ProductProps } from "@/types/Products_section";

export default function ProductDetail_UI({ product }: ProductProps) {
  return (
    <div>
      <h3>{product.title}</h3>
    </div>
  );
}
