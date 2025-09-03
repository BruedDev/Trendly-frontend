import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import { Product } from "@/types/Products_section";
import type { AddToCartData, DeleteItemCartData,
  UpdateQuantityData
} from "@/types/cart";
const { ADD_TO_CART, GET_CART, DELETE_ITEM_CART, UPDATE_QUANTITY } = API_ROUTES.cart;

// Thêm sản phẩm vào giỏ hàng
export async function addToCart(product: Product, colorCode: string, size?: string) {
  const data: AddToCartData = {
    productId: product._id,
    colorCode
  };
  if (size) {
    data.size = size;
  }
  return getFetchApi(ADD_TO_CART, {
    method: "POST",
    data,
  });
}

// Lấy giỏ hàng
export async function getCart() {
  return getFetchApi(GET_CART, {
    method: "GET",
  });
}

// Xóa item khỏi giỏ hàng
export async function deleteItemCart(productId: string, colorCode: string, size?: string) {
  const data: DeleteItemCartData = {
    productId,
    colorCode
  };
  if (size) {
    data.size = size;
  }
  return getFetchApi(DELETE_ITEM_CART, {
    method: "DELETE",
    data,
  });
}

// Cập nhật số lượng
export async function updateQuantity(productId: string, colorCode: string, quantity: number, size?: string) {
  const data: UpdateQuantityData = {
    productId,
    colorCode,
    quantity
  };
  if (size) {
    data.size = size;
  }
  return getFetchApi(UPDATE_QUANTITY, {
    method: "PATCH",
    data,
  });
}

