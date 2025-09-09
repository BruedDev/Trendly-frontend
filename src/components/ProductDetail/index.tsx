"use client";

import React from "react";
import type {
  ProductProps,
  ProductImage as ProductImageType,
} from "@/types/Products_section";
import {
  getCurrentImages,
  findValidColorIndex,
  getColorStartIndex,
  getAllSizes,
  getActiveColorImage,
} from "@/helper/ProductDetail";
import ProductDetail_UI from "@/ui/ProductDetail";

interface ProductDetailProps extends ProductProps {
  isPreview?: boolean;
  relatedProducts?: import("@/types/Products_section").RelatedProduct[];
}

export default function ProductDetail({
  product,
  relatedProducts,
  isPreview = false,
}: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const [activeColor, setActiveColor] = React.useState<number | null>(() => {
    return findValidColorIndex(product);
  });

  const [activeColorImage, setActiveColorImage] =
    React.useState<ProductImageType | null>(() => {
      const validIndex = findValidColorIndex(product);
      return getActiveColorImage(product, validIndex);
    });

  const allSizes = React.useMemo(() => {
    return getAllSizes(product, activeColor);
  }, [product, activeColor]);

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedSize(allSizes[0] || null);
  }, [allSizes]);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleSetActiveColor = (
    colorIdx: number | null,
    image?: ProductImageType | null
  ) => {
    setActiveColor(colorIdx);
    setActiveColorImage(image || null);
    if (colorIdx !== null) {
      const startIndex = getColorStartIndex(product, colorIdx);
      setSelectedImageIndex(startIndex);
    }
    if (colorIdx !== null && product.colors && product.colors[colorIdx]) {
      const newColor = product.colors[colorIdx];
      const firstSize = newColor.sizes?.[0]?.size || null;
      setSelectedSize(firstSize);
    }
  };

  return (
    <div className="container_section">
      <ProductDetail_UI
        product={product}
        currentImages={getCurrentImages(product)}
        selectedImageIndex={selectedImageIndex}
        onThumbnailClick={handleThumbnailClick}
        sizes={allSizes}
        selectedSize={selectedSize}
        onSizeClick={handleSizeClick}
        activeColor={activeColor}
        setActiveColor={handleSetActiveColor}
        activeColorImage={activeColorImage}
        isPreview={isPreview}
        relatedProducts={relatedProducts ?? []}
      />
    </div>
  );
}
