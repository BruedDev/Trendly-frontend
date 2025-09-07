import { notFound } from "next/navigation";
import { getProductSlug } from "../../../../../sanity/query/sanity.query";
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

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
