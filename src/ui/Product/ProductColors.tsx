import Image from "next/image";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { Product as ProductType } from "@/types/Products_section";
import styles from "./Product.module.scss";

interface ProductColorsProps {
  product: ProductType;
}

export default function ProductColors({ product }: ProductColorsProps) {
  if (!product.colors || product.colors.length === 0) return null;
  return (
    <div className={styles.productColors}>
      <b>Màu sắc:</b>
      {product.colors.map((color, idx) => (
        <span key={color.colorCode + idx} className={styles.productColorItem}>
          {getSanityImageUrl(color.image) && (
            <Image
              src={getSanityImageUrl(color.image)!}
              alt={color.image?.alt || color.colorCode}
              width={24}
              height={24}
              className={styles.productColorImage}
            />
          )}
          <span className={styles.productColorCode}>{color.colorCode}</span>
        </span>
      ))}
    </div>
  );
}
