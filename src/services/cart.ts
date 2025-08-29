import API_ROUTES from "@/router";
import getFetchApi from "@/utils/getFetchApi";
import { Product } from "@/types/Products_section";

const { ADD_TO_CART, GET_CART } = API_ROUTES.cart;

export async function addToCart(product: Product) {
  return getFetchApi(ADD_TO_CART, {
    method: "POST",
    data: { productId: product._id },
  });
}

export async function getCart() {
  return getFetchApi(GET_CART, {
    method: "GET"
  });
}
