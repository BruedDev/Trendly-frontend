import { ProductProps } from "@/types/Products_section";
import styles from "./Product.module.scss";
import { formatPrice } from "@/utils/formatNumber";

export default function ProductPrice({ product }: ProductProps) {
  return (
    <div className={styles.PriceContainer}>
      <p className={styles.productPrice}>{formatPrice(product.price)}</p>
      {product.originalPrice && (
        <p className={styles.productOriginalPrice}>
          {formatPrice(product.originalPrice)}
        </p>
      )}
    </div>
  );
}
