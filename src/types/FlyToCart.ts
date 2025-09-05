// @/types/FlyToCart.ts
import { ProductImage as ProductImageType } from "./Products_section";

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface DistanceCalculation {
  from: Position;
  to: Position;
  deltaX: number;
  deltaY: number;
  distance: number;
  angle: number;
}

export interface FlyToCartData {
  isActive: boolean;
  productImage: ProductImageType | null;
  productId: string | null;
  sectionId: string | null; // Thêm sectionId
}