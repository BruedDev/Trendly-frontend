import { ProductPriceProps } from "@/types/Products_section";
import styles from "./Product.module.scss";

export default function ProductPrice({ product }: ProductPriceProps) {
  return (
    <div className={styles.PriceContainer}>
      <p className={styles.productPrice}>
        {product.price?.toLocaleString()} VNĐ
      </p>
      {product.originalPrice && (
        <p className={styles.productOriginalPrice}>
          {product.originalPrice.toLocaleString()} VNĐ
        </p>
      )}
    </div>
  );
}
