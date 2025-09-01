import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import { Product } from "@/types/Products_section";

const { ADD_TO_CART, GET_CART, DELETE_ITEM_CART, UPDATE_QUANTITY } = API_ROUTES.cart;

export async function addToCart(product: Product) {
  return getFetchApi(ADD_TO_CART, {
    method: "POST",
    data: { productId: product._id },
  });
}

export async function getCart() {
  return getFetchApi(GET_CART, {
    method: "GET",
  });
}

export async function deleteItemCart(productId: string) {
  return getFetchApi(DELETE_ITEM_CART, {
    method: "DELETE",
    data: { productId },
  });
}

export async function updateQuantity(productId: string, quantity: number) {
  return getFetchApi(UPDATE_QUANTITY, {
    method: "PATCH",
    data: { productId, quantity },
  });
}