import { createRoutes } from "@/utils/getRoutes";

export default createRoutes({
  // kiểm tra user và má hóa phiên giao dịch
  INITIATE_CHECKOUT: "/pay/initiate-checkout",
  // Xóa sản phẩm
  REMOVE_ITEM: "/pay/remove-item",
  // Xác nhận đơn → tạo order pending → gọi cổng thanh toán
  CONFIRM: "/pay/confirm",
  // Xử lý callback PayPal success
  PAYPAL_SUCCESS: "/pay/paypal/success",
});
