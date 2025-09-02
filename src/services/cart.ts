import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import { Product } from "@/types/Products_section";

const { ADD_TO_CART, GET_CART, DELETE_ITEM_CART, UPDATE_QUANTITY } = API_ROUTES.cart;

// Interface cho cart item với color và size
export interface CartItemParams {
  productId: string;
  colorCode: string;
  size?: string; // Optional vì backend sẽ lấy size đầu tiên nếu không có
}

// Thêm sản phẩm vào giỏ hàng - colorCode bắt buộc, size optional
export async function addToCart(product: Product, colorCode: string, size?: string) {
  const data: { productId: string; colorCode: string; size?: string } = {
    productId: product._id,
    colorCode
  };

  // Chỉ thêm size nếu được truyền vào
  if (size) {
    data.size = size;
  }

  return getFetchApi(ADD_TO_CART, {
    method: "POST",
    data,
  });
}

// Lấy giỏ hàng - không đổi
export async function getCart() {
  return getFetchApi(GET_CART, {
    method: "GET",
  });
}

// Xóa item khỏi giỏ hàng - CẦN colorCode, size optional
export async function deleteItemCart(productId: string, colorCode: string, size?: string) {
  const data: { productId: string; colorCode: string; size?: string } = {
    productId,
    colorCode
  };

  // Chỉ thêm size nếu được truyền vào
  if (size) {
    data.size = size;
  }

  return getFetchApi(DELETE_ITEM_CART, {
    method: "DELETE",
    data,
  });
}

// Cập nhật số lượng - CẦN colorCode, size optional
export async function updateQuantity(productId: string, colorCode: string, quantity: number, size?: string) {
  const data: { productId: string; colorCode: string; quantity: number; size?: string } = {
    productId,
    colorCode,
    quantity
  };

  // Chỉ thêm size nếu được truyền vào
  if (size) {
    data.size = size;
  }

  return getFetchApi(UPDATE_QUANTITY, {
    method: "PATCH",
    data,
  });
}

// === HELPER FUNCTIONS ===

// Tạo unique key cho cart item (bao gồm size)
export function getCartItemKey(productId: string, colorCode: string, size?: string): string {
  return size ? `${productId}_${colorCode}_${size}` : `${productId}_${colorCode}`;
}

// Kiểm tra 2 cart items có giống nhau không (bao gồm size)
export function isSameCartItem(item1: CartItemParams & { size?: string }, item2: CartItemParams & { size?: string }): boolean {
  return item1.productId === item2.productId &&
         item1.colorCode === item2.colorCode &&
         item1.size === item2.size;
}

// === CONVENIENCE FUNCTIONS ===

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

// === DEPRECATED - Giữ lại để tương thích ngược ===

/**
 * @deprecated Sử dụng addToCart(product, colorCode, size?) thay thế
 */
export async function addToCartLegacy() {
  console.warn('addToCart() thiếu colorCode parameter. Vui lòng cập nhật: addToCart(product, colorCode, size?)');
  throw new Error('colorCode is required. Please use: addToCart(product, colorCode, size?)');
}

/**
 * @deprecated Sử dụng deleteItemCart(productId, colorCode, size?) thay thế
 */
export async function deleteItemCartLegacy() {
  console.warn('deleteItemCart() thiếu colorCode parameter. Vui lòng cập nhật: deleteItemCart(productId, colorCode, size?)');
  throw new Error('colorCode is required. Please use: deleteItemCart(productId, colorCode, size?)');
}

/**
 * @deprecated Sử dụng updateQuantity(productId, colorCode, quantity, size?) thay thế
 */
export async function updateQuantityLegacy() {
  console.warn('updateQuantity() thiếu colorCode parameter. Vui lòng cập nhật: updateQuantity(productId, colorCode, quantity, size?)');
  throw new Error('colorCode is required. Please use: updateQuantity(productId, colorCode, quantity, size?)');
}