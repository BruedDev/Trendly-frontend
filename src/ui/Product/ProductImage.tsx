import Image from "next/image";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { ProductImageProps } from "@/types/Products_section";
import ActionsProduct from "@/components/Actions/ProductActions";
import styles from "./Product.module.scss";
import AddToHeartProduct from "@/components/Actions/ProductActions/AddToHeart";

export default function ProductImage({
  product,
  isHover,
  activeColorImage,
  showActions,
  activeColor,
}: ProductImageProps & { showActions?: boolean }) {
  const defaultImg = activeColorImage || product.thumbnail?.defaultImage;
  const hoverImg = product.thumbnail?.hoverImage;
  const defaultUrl = getSanityImageUrl(defaultImg);
  const hoverUrl = getSanityImageUrl(hoverImg);

  if (!defaultUrl) return null;

  // Nếu không có hoverImage thì hiển thị bình thường
  if (!hoverUrl) {
    return (
      <div className={styles.imageContainer}>
        <Image
          src={defaultUrl}
          alt={defaultImg?.alt || product.title}
          className={styles.productImage}
          width={1000}
          height={1000}
        />
      </div>
    );
  }

  // Crossfade effect khi có cả 2 ảnh
  return (
    <div className={styles.imageContainer}>
      <div className={styles.heartIcon}>
        <AddToHeartProduct />
      </div>
      {/* Default Image */}
      <Image
        src={defaultUrl}
        alt={defaultImg?.alt || product.title}
        className={`${styles.productImage} ${styles.defaultImage} ${
          isHover ? styles.hidden : ""
        }`}
        width={1000}
        height={1000}
      />

      {/* Hover Image */}
      <Image
        src={hoverUrl}
        alt={hoverImg?.alt || product.title}
        className={`${styles.productImage} ${styles.hoverImage} ${
          isHover ? styles.visible : ""
        }`}
        width={1000}
        height={1000}
      />
      <div
        className={`${styles.actionsOverlay} ${
          showActions ? styles.visible : ""
        }`}
      >
        <ActionsProduct
          type="cart preview"
          product={product}
          activeColorIdx={activeColor}
        />
      </div>
    </div>
  );
}
