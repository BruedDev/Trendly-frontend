import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import { Product } from "@/types/Products_section";

const { ADD_TO_CART, GET_CART, DELETE_ITEM_CART, UPDATE_QUANTITY } = API_ROUTES.cart;

// Interface cho cart item với color
export interface CartItemParams {
  productId: string;
  colorCode: string;
}

// Thêm sản phẩm vào giỏ hàng - CẦN colorCode
export async function addToCart(product: Product, colorCode: string) {
  return getFetchApi(ADD_TO_CART, {
    method: "POST",
    data: {
      productId: product._id,
      colorCode
    },
  });
}

// Lấy giỏ hàng - không đổi
export async function getCart() {
  return getFetchApi(GET_CART, {
    method: "GET",
  });
}

// Xóa item khỏi giỏ hàng - CẦN colorCode
export async function deleteItemCart(productId: string, colorCode: string) {
  return getFetchApi(DELETE_ITEM_CART, {
    method: "DELETE",
    data: {
      productId,
      colorCode
    },
  });
}

// Cập nhật số lượng - CẦN colorCode
export async function updateQuantity(productId: string, colorCode: string, quantity: number) {
  return getFetchApi(UPDATE_QUANTITY, {
    method: "PATCH",
    data: {
      productId,
      colorCode,
      quantity
    },
  });
}

// === HELPER FUNCTIONS ===

// Tạo unique key cho cart item (dùng cho frontend state management)
export function getCartItemKey(productId: string, colorCode: string): string {
  return `${productId}_${colorCode}`;
}

// Kiểm tra 2 cart items có giống nhau không
export function isSameCartItem(item1: CartItemParams, item2: CartItemParams): boolean {
  return item1.productId === item2.productId && item1.colorCode === item2.colorCode;
}

// === DEPRECATED - Giữ lại để tương thích ngược ===
// Các functions cũ sẽ báo warning và yêu cầu colorCode

/**
 * @deprecated Sử dụng addToCart(product, colorCode) thay thế
 */
export async function addToCartLegacy(product: Product) {
  console.warn('addToCart() thiếu colorCode parameter. Vui lòng cập nhật: addToCart(product, colorCode)');
  throw new Error('colorCode is required. Please use: addToCart(product, colorCode)');
}

/**
 * @deprecated Sử dụng deleteItemCart(productId, colorCode) thay thế
 */
export async function deleteItemCartLegacy(productId: string) {
  console.warn('deleteItemCart() thiếu colorCode parameter. Vui lòng cập nhật: deleteItemCart(productId, colorCode)');
  throw new Error('colorCode is required. Please use: deleteItemCart(productId, colorCode)');
}

/**
 * @deprecated Sử dụng updateQuantity(productId, colorCode, quantity) thay thế
 */
export async function updateQuantityLegacy(productId: string, quantity: number) {
  console.warn('updateQuantity() thiếu colorCode parameter. Vui lòng cập nhật: updateQuantity(productId, colorCode, quantity)');
  throw new Error('colorCode is required. Please use: updateQuantity(productId, colorCode, quantity)');
}