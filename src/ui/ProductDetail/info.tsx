// Định nghĩa type cho activeColor
type ActiveColor = number | null;
import type { ProductProps } from "@/types/Products_section";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import React from "react";
import styles from "./Info.module.scss";
import { formatPrice } from "@/utils/formatNumber";
import ProductColors from "@/ui/Product/ProductColors";
import ActionsProduct from "@/components/Actions/ProductActions";

export default function Info({
  product,
  sizes = [],
  selectedSize,
  onSizeClick,
  activeColor,
  setActiveColor,
  activeColorImage,
}: ProductProps & {
  sizes?: string[];
  selectedSize?: string | null;
  onSizeClick?: (size: string) => void;
  activeColor?: ActiveColor;
  setActiveColor?: (
    colorIdx: number | null,
    image?: ProductImageType | null
  ) => void;
  activeColorImage?: ProductImageType | null;
}) {
  return (
    <article className={styles.info}>
      <h3 className={`${styles.title}`}>
        <strong>
          {product.title} <span className={`${styles.msp}`}>{product.msp}</span>
        </strong>
      </h3>
      <div className={styles.type}>
        <strong className="fontMobile">Thương hiệu:</strong>
        <span className="fontMobile">Trendly</span> |<strong>Loại: </strong>
        <span className="fontMobileDesc">{product.categories?.[0]?.type}</span>|
        <strong className="fontMobile">MSP: </strong>
        <span className="fontMobileDesc">{product.msp}</span>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        <strong className={styles.stock}>
          <span className="fontMobile">Tình trạng:</span>
          <span>
            {product.inStock ? (
              <span className={styles.inStock}>Còn hàng</span>
            ) : (
              <span className={styles.inStock}>Hết hàng</span>
            )}
          </span>
        </strong>
      </div>
      <div className={styles.material}>
        <strong className="fontMobile">Vật liệu:</strong>
        <span className="fontMobileDesc">
          {product.categories?.[0]?.material}
        </span>
      </div>

      {/* Phần màu sắc - sử dụng component ProductColors */}
      <div className={styles.colorContainer}>
        <div className={styles.colorLabel}>
          <strong className="fontMobile">Màu sắc:</strong>
          {typeof activeColor === "number" &&
          product.colors &&
          product.colors[activeColor] ? (
            <span className="fontMobileDesc">
              {product.colors[activeColor].colorCode}
            </span>
          ) : (
            <span> Chưa chọn</span>
          )}
        </div>
        <ProductColors
          product={product}
          activeColor={activeColor ?? null}
          setActiveColor={setActiveColor || (() => {})}
        />
      </div>

      <div className={styles.sizeContainer}>
        <div className={styles.size}>
          <strong className="fontMobile">Kích thước:</strong>
          {selectedSize && (
            <span className="fontMobileDesc">{selectedSize}</span>
          )}
        </div>

        {sizes && sizes.length > 0 && (
          <div className={styles.sizeList}>
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={
                  selectedSize === size ? styles.sizeActive : styles.sizeBtn
                }
                onClick={() => onSizeClick && onSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Thêm ActionsProduct */}
      <div className={styles.actionsContainer}>
        <ActionsProduct
          type="cart preview"
          product={product}
          activeColorIdx={activeColor}
          selectedSize={selectedSize || ""}
          activeColorImage={activeColorImage}
          sectionId="product-detail"
          noneReponsive={true}
          buttonClassName={styles.actionsProduct}
        />
      </div>
    </article>
  );
}
