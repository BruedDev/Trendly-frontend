import { Product as ProductType } from "@/types/Products_section";
import styles from "./Product.module.scss";

interface ProductPriceProps {
  product: ProductType;
}

export default function ProductPrice({ product }: ProductPriceProps) {
  return (
    <div>
      <p className={styles.productPrice}>
        Giá: {product.price?.toLocaleString()} VNĐ
      </p>
      {product.originalPrice && (
        <p className={styles.productOriginalPrice}>
          {product.originalPrice.toLocaleString()} VNĐ
        </p>
      )}
    </div>
  );
}
