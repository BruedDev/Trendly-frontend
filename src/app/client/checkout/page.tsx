"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import PaymentDetail from "@/components/PaymentDetail";
import { ProductInToken, DecodedToken } from "@/types/Pay";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const checkoutState = searchParams.get("state");
  const [decodedProducts, setDecodedProducts] = useState<ProductInToken[]>([]);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (checkoutState) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(checkoutState);
        setMissingFields(decodedToken.missingFields || []);
        setDecodedProducts(decodedToken.products || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Lỗi giải mã token, chuyển hướng:", err);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [checkoutState, router]);

  if (!checkoutState || isLoading) {
    return null;
  }

  return (
    <PaymentDetail products={decodedProducts} missingFields={missingFields} />
  );
}
