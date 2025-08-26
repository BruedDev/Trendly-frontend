import Image from "next/image";
import Tooltip from "@/ui/Tooltip";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { ProductColorsProps } from "@/types/Products_section";
import styles from "./Product.module.scss";

export default function ProductColors({
  product,
  activeColor,
  setActiveColor,
}: ProductColorsProps) {
  if (!product.colors || product.colors.length === 0) return null;
  return (
    <div className={styles.ProductColorsContainer}>
      {product.colors.map((color, idx) => (
        <Tooltip
          key={color.colorCode + idx}
          title={color.colorCode}
          arrow="top-center"
        >
          <span
            className={
              styles.productColorItem +
              (activeColor === idx ? " " + styles.active : "")
            }
            onClick={() => setActiveColor(idx, color.image)}
          >
            {getSanityImageUrl(color.image) && (
              <Image
                src={getSanityImageUrl(color.image)!}
                alt={color.image?.alt || color.colorCode}
                width={24}
                height={24}
                className={styles.productColorImage}
              />
            )}
          </span>
        </Tooltip>
      ))}
    </div>
  );
}
