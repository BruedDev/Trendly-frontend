"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import { FlyToCartData } from "@/types/FlyToCart";

interface FlyToCartContextType {
  flyToCartData: FlyToCartData;
  triggerFlyToCart: (
    productId: string,
    productImage: ProductImageType | null,
    sectionId?: string
  ) => void;
  completeFlyToCart: () => void;
}

export const FlyToCartContext = createContext<FlyToCartContextType | null>(
  null
);

interface FlyToCartProviderProps {
  children: ReactNode;
}

export function FlyToCartProvider({ children }: FlyToCartProviderProps) {
  const [flyToCartData, setFlyToCartData] = useState<FlyToCartData>({
    isActive: false,
    productImage: null,
    productId: null,
    sectionId: null,
  });

  const triggerFlyToCart = useCallback(
    (
      productId: string,
      productImage: ProductImageType | null,
      sectionId?: string
    ) => {
      setFlyToCartData({
        isActive: true,
        productImage,
        productId,
        sectionId: sectionId || null,
      });
    },
    []
  );

  const completeFlyToCart = useCallback(() => {
    setFlyToCartData({
      isActive: false,
      productImage: null,
      productId: null,
      sectionId: null,
    });
  }, []);

  return (
    <FlyToCartContext.Provider
      value={{
        flyToCartData,
        triggerFlyToCart,
        completeFlyToCart,
      }}
    >
      {children}
    </FlyToCartContext.Provider>
  );
}
