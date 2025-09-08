import {
  Product,
  ProductImage as ProductImageType,
  ProductColor,
} from "@/types/Products_section";

export function getCurrentImages(product: Product): string[] {
  const allImages: string[] = [];
  if (product.colors) {
    product.colors.forEach((color: ProductColor) => {
      if (color.detailImages) {
        color.detailImages.forEach((image: { asset?: { url?: string } }) => {
          if (image.asset && image.asset.url) {
            allImages.push(image.asset.url);
          }
        });
      }
    });
  }
  return allImages;
}

export function findValidColorIndex(product: Product): number | null {
  if (!product.colors || product.colors.length === 0) return null;
  const validColorIndex = product.colors.findIndex(
    (color: ProductColor) =>
      color.colorCode && (color.image || (color.detailImages?.length ?? 0) > 0)
  );
  return validColorIndex !== -1 ? validColorIndex : 0;
}

export function getColorStartIndex(
  product: Product,
  colorIndex: number
): number {
  if (!product.colors) return 0;
  let startIndex = 0;
  for (let i = 0; i < colorIndex; i++) {
    if (product.colors[i].detailImages) {
      startIndex += product.colors[i].detailImages!.length;
    }
  }
  return startIndex;
}

export function getAllSizes(
  product: Product,
  activeColor: number | null
): string[] {
  if (activeColor !== null && product.colors && product.colors[activeColor]) {
    const selectedColor = product.colors[activeColor];
    return (
      selectedColor.sizes?.map((sizeObj: { size: string }) => sizeObj.size) ||
      []
    );
  }
  return [];
}

export function getActiveColorImage(
  product: Product,
  validIndex: number | null
): ProductImageType | null {
  if (validIndex !== null && product.colors && product.colors[validIndex]) {
    return product.colors[validIndex].image || null;
  }
  return null;
}
