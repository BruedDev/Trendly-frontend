import API_ROUTES from "@/router/Pay-routes";
import getFetchApi from "@/utils/getFetchApi";
import type {
  InitiateCheckoutResponse,
  ProductPayload,
  ProductInToken,
  ConfirmOrderResponse,
  PaypalSuccessResponse,
} from "@/types/Pay";

const { INITIATE_CHECKOUT, REMOVE_ITEM, CONFIRM, PAYPAL_SUCCESS } = API_ROUTES;

// ✅ Khởi tạo checkout
export async function initiateCheckout(
  products: ProductPayload[]
): Promise<InitiateCheckoutResponse> {
  return getFetchApi<{ products: ProductPayload[] }, InitiateCheckoutResponse>(
    INITIATE_CHECKOUT,
    {
      method: "POST",
      data: { products },
    }
  );
}

// ✅ Xóa sản phẩm trong checkout
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
  checkoutState: string;
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
      checkoutState: string;
    }
  >(REMOVE_ITEM, {
    method: "DELETE",
    data: { products, productId, color, size },
  });
}

// ✅ Xác nhận đơn → tạo order pending → gọi PayPal
export async function confirmOrder({
  products,
  totalAmount,
  paymentMethod,
}: {
  products: ProductPayload[];
  totalAmount: number;
  paymentMethod: "paypal" | "momo" | "zalopay";
}): Promise<ConfirmOrderResponse> {
  return getFetchApi<
    {
      products: ProductPayload[];
      totalAmount: number;
      paymentMethod: string;
    },
    ConfirmOrderResponse
  >(CONFIRM, {
    method: "POST",
    data: { products, totalAmount, paymentMethod },
  });
}

// ✅ Xác nhận đơn → tạo order pending → gọi PayPal
export async function handlePaypalSuccess(
  token: string
): Promise<PaypalSuccessResponse> {
  return getFetchApi<undefined, PaypalSuccessResponse>(
    `${PAYPAL_SUCCESS}?token=${token}`,
    {
      method: "GET",
    }
  );
}
