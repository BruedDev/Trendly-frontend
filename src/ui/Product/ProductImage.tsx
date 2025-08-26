import Image from "next/image";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { ProductImageProps } from "@/types/Products_section";
import styles from "./Product.module.scss";

export default function ProductImage({
  product,
  isHover,
  activeColorImage,
}: ProductImageProps) {
  // Nếu có activeColorImage thì ưu tiên làm defaultImg tạm thời
  const defaultImg = activeColorImage || product.thumbnail?.defaultImage;
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
