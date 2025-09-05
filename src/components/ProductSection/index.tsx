"use client";

import React from "react";
import {
  ProductSectionProps,
  ProductImage as ProductImageType,
} from "@/types/Products_section";
import ProductUi from "@/ui/Product";
import dynamic from "next/dynamic";
const SwiperSlide = dynamic(() => import("@/components/SwiperSlide"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
import ProductHeader from "@/ui/Product/ProductHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const isMobile = useMediaQuery("(max-width: 768px)");

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

  const handleMouseEnter = (id: string) => !isMobile && setHoveredId(id);
  const handleMouseLeave = () => !isMobile && setHoveredId(null);

  const handleSetHoverShowActions = (id: string | null) => {
    if (!isMobile) {
      setHoverShowActions(id);
    }
  };

  const handleSetActiveColor = (
    id: string,
    colorIdx: number | null,
    image?: ProductImageType | null
  ) => {
    setActiveColors((prev) => ({ ...prev, [id]: colorIdx }));
    setActiveColorImages((prev) => ({ ...prev, [id]: image || null }));
  };

  return (
    <div className={`${styles.wrapper} ${styles.responsiveHover}`}>
      <ProductHeader title={title} description={description} />
      <div className={styles.wrapper_productList}>
        <SwiperSlide
          data={products as import("@/types/Products_section").Product[]}
          transitionSpeed={800}
          swiperProps={{
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20,
            pagination: {
              clickable: true,
            },
            breakpoints: {
              480: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 10,
              },
              1110: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1210: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              1280: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
            },
          }}
          renderItem={(product) => {
            const prod = product as import("@/types/Products_section").Product;
            return (
              <ProductUi
                key={prod._id}
                product={prod}
                isHover={hoveredId === prod._id}
                showActions={hoverShowActions === prod._id}
                onMouseEnter={() => handleSetHoverShowActions(prod._id)}
                onMouseLeave={() => handleSetHoverShowActions(null)}
                onImageMouseEnter={() => handleMouseEnter(prod._id)}
                onImageMouseLeave={handleMouseLeave}
                activeColor={activeColors[prod._id] ?? null}
                setActiveColor={(colorIdx, image) =>
                  handleSetActiveColor(prod._id, colorIdx, image)
                }
                activeColorImage={activeColorImages[prod._id] ?? null}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
