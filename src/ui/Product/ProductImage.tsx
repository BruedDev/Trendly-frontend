import Image from "next/image";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { Product as ProductType } from "@/types/Products_section";
import styles from "./Product.module.scss";

interface ProductImageProps {
  product: ProductType;
  isHover: boolean;
}

export default function ProductImage({ product, isHover }: ProductImageProps) {
  const defaultImg = product.thumbnail?.defaultImage;
  const hoverImg = product.thumbnail?.hoverImage;
  const showImg = isHover && hoverImg ? hoverImg : defaultImg;
  const url = getSanityImageUrl(showImg);
  if (!url) return null;
  return (
    <Image
      src={url}
      alt={showImg?.alt || product.title}
      className={styles.productImage}
      width={1000}
      height={1000}
    />
  );
}
