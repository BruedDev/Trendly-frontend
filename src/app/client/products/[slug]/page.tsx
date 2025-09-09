import { notFound } from "next/navigation";
import {
  getProductSlug,
  getRelatedProducts,
} from "../../../../../sanity/query/sanity.query";
import { Product } from "@/types/Products_section";
import ProductDetail from "@/components/ProductDetail";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product: Product | null = await getProductSlug(slug);

  if (!product) {
    notFound();
  }

  // Lấy sản phẩm liên quan
  let relatedProducts: import("@/types/Products_section").RelatedProduct[] = [];
  if (product && product.categories) {
    const categoryIds = product.categories.map((cat) => cat._id);
    relatedProducts =
      (await getRelatedProducts(product._id, categoryIds)) ?? [];
  }

  return (
    <>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}
