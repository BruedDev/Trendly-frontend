"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@/hooks/useUser";
import {
  initiateCheckoutThunk,
  selectPaymentLoading,
} from "@/store/paymentSlice";
import {
  Product,
  ProductImage as ProductImageType,
} from "@/types/Products_section";
import { ProductPayload } from "@/types/Pay";
import { AppDispatch } from "@/store";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";

// Cập nhật Props để nhận ảnh
interface PayProps {
  className?: string;
  product: Product;
  selectedSize?: string;
  colorCode?: string;
  activeColorImage?: ProductImageType | null;
}

export default function Pay({
  className,
  product,
  selectedSize,
  colorCode,
  activeColorImage,
}: PayProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const loading = useSelector(selectPaymentLoading);

  const handlePayNow = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!colorCode || !selectedSize) {
      return;
    }

    const imageUrl = getSanityImageUrl(activeColorImage);

    const productPayload: ProductPayload[] = [
      {
        productId: product._id,
        quantity: 1,
        size: selectedSize,
        color: colorCode,
        imageUrl: imageUrl,
      },
    ];

    try {
      const result = await dispatch(
        initiateCheckoutThunk(productPayload)
      ).unwrap();

      if (result.checkoutState) {
        router.push(`/checkout?state=${result.checkoutState}`);
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện thanh toán:", error);
    }
  };

  return (
    <button className={className} onClick={handlePayNow} disabled={loading}>
      {loading ? "Đang xử lý..." : "Mua ngay"}
    </button>
  );
}
