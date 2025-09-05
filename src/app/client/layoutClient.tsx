"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Overlay from "@/components/Overlay";
import ContextProvider from "@/contexts/index";
import { StatusMessageProvider } from "@/contexts/StatusMessageContext";
import { useOverlay } from "@/hooks/useOverlay";
import StatusMessage from "@/components/StatusMessage";
import FlyToCart from "@/components/FlyToCart";
import { useFlyToCart } from "@/hooks/useFlyToCartContext";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  }, []);

  return (
    <StatusMessageProvider>
      <ContextProvider>
        <LayoutContent isLoading={isLoading}>{children}</LayoutContent>
      </ContextProvider>
    </StatusMessageProvider>
  );
}

function LayoutContent({
  children,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const { isOpen, closeOverlay, isExiting } = useOverlay();
  const { flyToCartData, completeFlyToCart } = useFlyToCart();

  return (
    <>
      <Header />
      <StatusMessage />
      {(isOpen || isExiting) && (
        <Overlay onClose={closeOverlay} isExiting={isExiting} />
      )}

      <FlyToCart
        isActive={flyToCartData.isActive}
        productImage={flyToCartData.productImage}
        startElementId={
          flyToCartData.productId
            ? `product-image-${flyToCartData.productId}`
            : ""
        }
        targetElementId="cart-icon-target"
        onComplete={completeFlyToCart}
      />

      {children}
    </>
  );
}
