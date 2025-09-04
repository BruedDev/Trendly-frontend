import type { Product } from "@/types/Products_section";
import type { CartItemParams } from "@/types/cart";

// Tạo unique key cho cart item (bao gồm size)
export function getCartItemKey(params: CartItemParams): string {
  const { productId, colorCode, size } = params;
  return size ? `${productId}_${colorCode}_${size}` : `${productId}_${colorCode}`;
}

// Kiểm tra 2 cart items có giống nhau không (bao gồm size)
export function isSameCartItem(item1: CartItemParams, item2: CartItemParams): boolean {
  return item1.productId === item2.productId &&
         item1.colorCode === item2.colorCode &&
         item1.size === item2.size;
}

// Helper để lấy size đầu tiên từ product color (để dùng làm default)
export function getDefaultSize(product: Product, colorCode: string): string | undefined {
  const selectedColor = product.colors?.find(c => c.colorCode === colorCode);
  return selectedColor?.sizes?.[0]?.size;
}

// Helper để kiểm tra size có available không
export function isSizeAvailable(product: Product, colorCode: string, size: string): boolean {
  const selectedColor = product.colors?.find(c => c.colorCode === colorCode);
  const sizeData = selectedColor?.sizes?.find(s => s.size === size);
  return sizeData ? sizeData.quantity > 0 : false;
}

// Helper để lấy tất cả sizes available cho một màu
export function getAvailableSizes(product: Product, colorCode: string): Array<{size: string, quantity: number}> {
  const selectedColor = product.colors?.find(c => c.colorCode === colorCode);
  return selectedColor?.sizes?.filter(s => s.quantity > 0) || [];
}
