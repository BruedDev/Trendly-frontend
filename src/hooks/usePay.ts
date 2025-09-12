import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { initiateCheckoutThunk } from "@/store/paymentSlice";
import { AppDispatch } from "@/store";
import { ProductPayload } from "@/types/Pay";

export function usePay() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const payNow = async (products: ProductPayload[]) => {
    try {
      const result = await dispatch(initiateCheckoutThunk(products)).unwrap();
      if (result.checkoutState) {
        router.push(`/checkout?state=${result.checkoutState}`);
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện thanh toán:", error);
    }
  };

  return { payNow };
}
