"use client";

import React from "react";
import type { ProductProps } from "@/types/Products_section";
import ProductDetail_UI from "@/ui/ProductDetail";
import { ProductImage as ProductImageType } from "@/types/Products_section";

export default function ProductDetail({ product }: ProductProps) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const findValidColorIndex = () => {
    if (!product.colors || product.colors.length === 0) return null;

    const validColorIndex = product.colors.findIndex(
      (color) =>
        color.colorCode &&
        (color.image || (color.detailImages?.length ?? 0) > 0)
    );

    return validColorIndex !== -1 ? validColorIndex : 0;
  };

  const [activeColor, setActiveColor] = React.useState<number | null>(() => {
    return findValidColorIndex();
  });

  const [activeColorImage, setActiveColorImage] =
    React.useState<ProductImageType | null>(() => {
      const validIndex = findValidColorIndex();
      if (validIndex !== null && product.colors && product.colors[validIndex]) {
        return product.colors[validIndex].image || null;
      }
      return null;
    });

  const allSizes = React.useMemo(() => {
    if (activeColor !== null && product.colors && product.colors[activeColor]) {
      const selectedColor = product.colors[activeColor];
      return selectedColor.sizes?.map((sizeObj) => sizeObj.size) || [];
    }
    return [];
  }, [product.colors, activeColor]);

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSelectedSize(allSizes[0] || null);
  }, [allSizes]);

  const getCurrentImages = () => {
    const allImages: string[] = [];
    if (product.colors) {
      product.colors.forEach((color) => {
        if (color.detailImages) {
          color.detailImages.forEach((image) => {
            if (image.asset && image.asset.url) {
              allImages.push(image.asset.url);
            }
          });
        }
      });
    }
    return allImages;
  };

  const getColorStartIndex = (colorIndex: number) => {
    if (!product.colors) return 0;

    let startIndex = 0;
    for (let i = 0; i < colorIndex; i++) {
      if (product.colors[i].detailImages) {
        startIndex += product.colors[i].detailImages!.length;
      }
    }
    return startIndex;
  };

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
      const startIndex = getColorStartIndex(colorIdx);
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
        currentImages={getCurrentImages()}
        selectedImageIndex={selectedImageIndex}
        onThumbnailClick={handleThumbnailClick}
        sizes={allSizes}
        selectedSize={selectedSize}
        onSizeClick={handleSizeClick}
        activeColor={activeColor}
        setActiveColor={handleSetActiveColor}
        activeColorImage={activeColorImage}
      />
    </div>
  );
}
