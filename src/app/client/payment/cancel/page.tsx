"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div>
      <div>Thanh toán đã bị hủy</div>
      <div>Bạn đã hủy quá trình thanh toán. Đơn hàng chưa được xác nhận.</div>

      <button onClick={() => router.back()}>Thử lại</button>
      <button onClick={() => router.push("/")}>Về trang chủ</button>
    </div>
  );
}
