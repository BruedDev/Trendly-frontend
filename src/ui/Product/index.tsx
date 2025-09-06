import React from "react";
import { ProductCardProps } from "@/types/Products_section";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductColors from "./ProductColors";
import styles from "./Product.module.scss";

export default function Product({
  product,
  isHover,
  showActions,
  onMouseEnter,
  onMouseLeave,
  onImageMouseEnter,
  onImageMouseLeave,
  activeColor,
  setActiveColor,
  activeColorImage,
  sectionId,
}: ProductCardProps & {
  showActions?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  sectionId?: string;
}) {
  return (
    <div
      className={styles.product_Item}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={styles.productImageContainer}
        onMouseEnter={onImageMouseEnter}
        onMouseLeave={onImageMouseLeave}
      >
        <ProductImage
          product={product}
          isHover={isHover}
          activeColorImage={activeColorImage}
          showActions={showActions}
          activeColor={activeColor}
          sectionId={sectionId}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={`${styles.productTitle}`}>
          {product.title} <span className={`${styles.msp}`}>{product.msp}</span>
        </h3>
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
