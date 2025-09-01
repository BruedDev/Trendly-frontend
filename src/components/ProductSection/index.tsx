"use client";

import React from "react";
import {
  ProductSectionProps,
  ProductImage as ProductImageType,
} from "@/types/Products_section";
import ProductUi from "@/ui/Product";
import SwiperSlide from "@/components/SwiperSlide";
import ProductHeader from "@/ui/Product/ProductHeader";
import styles from "./ProductSection.module.scss";

export default function ProductSection({
  title,
  products,
  description,
}: ProductSectionProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [hoverShowActions, setHoverShowActions] = React.useState<string | null>(
    null
  );
  // Khởi tạo activeColors mặc định là màu đầu tiên (index 0) cho mỗi sản phẩm có màu
  const [activeColors, setActiveColors] = React.useState<
    Record<string, number | null>
  >(() => {
    const initial: Record<string, number | null> = {};
    products.forEach((product) => {
      initial[product._id] =
        product.colors && product.colors.length > 0 ? 0 : null;
    });
    return initial;
  });

  // Lưu image của màu đang chọn cho từng product
  const [activeColorImages, setActiveColorImages] = React.useState<
    Record<string, ProductImageType | null>
  >(() => {
    const initial: Record<string, ProductImageType | null> = {};
    products.forEach((product) => {
      if (product.colors && product.colors.length > 0) {
        initial[product._id] = product.colors[0].image || null;
      } else {
        initial[product._id] = null;
      }
    });
    return initial;
  });

  const handleMouseEnter = (id: string) => setHoveredId(id);
  const handleMouseLeave = () => setHoveredId(null);
  const handleSetActiveColor = (
    id: string,
    colorIdx: number | null,
    image?: ProductImageType | null
  ) => {
    setActiveColors((prev) => ({ ...prev, [id]: colorIdx }));
    setActiveColorImages((prev) => ({ ...prev, [id]: image || null }));
  };

  return (
    <div className={styles.wrapper}>
      <ProductHeader title={title} description={description} />
      <div className={styles.wrapper_productList}>
        <SwiperSlide
          data={products}
          swiperProps={{
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
            pagination: {
              clickable: true,
            },
          }}
          renderItem={(product) => (
            <ProductUi
              key={product._id}
              product={product}
              isHover={hoveredId === product._id}
              showActions={hoverShowActions === product._id}
              onMouseEnter={() => setHoverShowActions(product._id)}
              onMouseLeave={() => setHoverShowActions(null)}
              onImageMouseEnter={() => handleMouseEnter(product._id)}
              onImageMouseLeave={handleMouseLeave}
              activeColor={activeColors[product._id] ?? null}
              setActiveColor={(colorIdx, image) =>
                handleSetActiveColor(product._id, colorIdx, image)
              }
              activeColorImage={activeColorImages[product._id] ?? null}
            />
          )}
        />
      </div>
    </div>
  );
}
