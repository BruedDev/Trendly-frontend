import { notFound } from "next/navigation";
import { getProductSlug } from "../../../../../sanity/query/sanity.query";
import { Product } from "@/types/Products_section";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  // Await params trước khi destructure
  const { slug } = await params;

  const product: Product | null = await getProductSlug(slug);

  if (!product) {
    notFound();
  }

  // console.log("Product Data:", product);

  return (
    <div>
      <h1>{product.title}</h1>
      <span>Giá: {product.price} VND</span>
    </div>
  );
}
