import React from "react";
import { Product as ProductType } from "@/types/Products_section";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductColors from "./ProductColors";
import styles from "./Product.module.scss";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <div
      className={styles.productContainer}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ProductImage product={product} isHover={isHover} />
      <h3 className={styles.productTitle}>{product.title}</h3>
      <ProductPrice product={product} />
      <ProductColors product={product} />
    </div>
  );
}
