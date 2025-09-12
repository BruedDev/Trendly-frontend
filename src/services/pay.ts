// services/pay.ts
import API_ROUTES from "@/router/Pay-routes";
import getFetchApi from "@/utils/getFetchApi";
import {
  InitiateCheckoutResponse,
  ProductPayload,
  ProductInToken,
} from "@/types/Pay";

const { INITIATE_CHECKOUT, REMOVE_ITEM } = API_ROUTES;

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

// ✅ Cập nhật type để nhận checkoutState mới từ backend
export async function removeItem({
  products,
  productId,
  color,
  size,
}: {
  products: ProductInToken[];
  productId: string;
  color: string;
  size: string;
}): Promise<{
  products: ProductInToken[];
  checkoutState: string; // ✅ Thêm checkoutState mới
}> {
  return getFetchApi<
    {
      products: ProductInToken[];
      productId: string;
      color: string;
      size: string;
    },
    {
      products: ProductInToken[];
      checkoutState: string; // ✅ Backend sẽ trả về JWT mới
    }
  >(REMOVE_ITEM, {
    method: "DELETE",
    data: { products, productId, color, size },
  });
}
