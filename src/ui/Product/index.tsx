import React from "react";
import { ProductCardProps } from "@/types/Products_section";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductColors from "./ProductColors";
import styles from "./Product.module.scss";

export default function Product({
  product,
  isHover,
  onImageMouseEnter,
  onImageMouseLeave,
  activeColor,
  setActiveColor,
  activeColorImage,
}: ProductCardProps) {
  return (
    <div className={styles.product_Item}>
      <div
        className={styles.productImageContainer}
        onMouseEnter={onImageMouseEnter}
        onMouseLeave={onImageMouseLeave}
      >
        <ProductImage
          product={product}
          isHover={isHover}
          activeColorImage={activeColorImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={`${styles.productTitle}`}>{product.title}</h3>
        <ProductPrice product={product} />
        <ProductColors
          product={product}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </div>
    </div>
  );
}
