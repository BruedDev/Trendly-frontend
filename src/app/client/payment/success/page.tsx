"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { handlePaypalSuccess } from "@/services/pay";

interface OrderData {
  order?: {
    _id: string;
  };
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (token) {
      handlePaypalSuccess(token)
        .then((data) => {
          setStatus("success");
          setOrderData(data);
        })
        .catch((error) => {
          console.error("Payment confirmation failed:", error);
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [token]);

  if (status === "processing") {
    return <div>Đang xử lý thanh toán...</div>;
  }

  if (status === "error") {
    return <div>Lỗi thanh toán!</div>;
  }

  if (status === "success") {
    return (
      <div>
        <div>Thanh toán thành công!</div>
        <div>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</div>

        {orderData && (
          <div>
            <div>Thông tin đơn hàng:</div>
            <div>Mã đơn: {orderData.order?._id}</div>
            <div>Mã giao dịch: {token}</div>
            <div>Trạng thái: Đã thanh toán</div>
          </div>
        )}

        <button onClick={() => router.push("/orders")}>Xem đơn hàng</button>
        <button onClick={() => router.push("/")}>Tiếp tục mua sắm</button>
      </div>
    );
  }

  return null;
}
