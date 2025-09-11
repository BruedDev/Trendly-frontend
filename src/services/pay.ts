import API_ROUTES from "@/router/Pay-routes";
import getFetchApi from "@/utils/getFetchApi";
import { InitiateCheckoutResponse, ProductPayload } from "@/types/Pay";

const { INITIATE_CHECKOUT } = API_ROUTES;

export async function initiateCheckout(
  products: ProductPayload[]
): Promise<InitiateCheckoutResponse> {
  const response = await getFetchApi<
    { products: ProductPayload[] },
    InitiateCheckoutResponse
  >(INITIATE_CHECKOUT, {
    method: "POST",
    data: { products },
  });

  return response;
}
