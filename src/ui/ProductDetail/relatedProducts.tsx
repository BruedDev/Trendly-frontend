import ProductSection from "@/components/ProductSection";
import type { RelatedProductsProps } from "@/types/Products_section";

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const title = "Sản phẩm liên quan";
  return (
    <div>
      <ProductSection products={products} title={title} />
    </div>
  );
}
