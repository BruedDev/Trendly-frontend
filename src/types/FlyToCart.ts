import { ProductImage as ProductImageType } from '@/types/Products_section';

export interface FlyToCartData {
  isActive: boolean;
  productImage: ProductImageType | null;
  productId: string | null;
}

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