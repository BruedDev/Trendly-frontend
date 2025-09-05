"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import { FlyToCartData } from "@/types/FlyToCart";

interface FlyToCartContextType {
  flyToCartData: FlyToCartData;
  triggerFlyToCart: (
    productId: string,
    productImage: ProductImageType | null
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
  });

  const triggerFlyToCart = useCallback(
    (productId: string, productImage: ProductImageType | null) => {
      setFlyToCartData({
        isActive: true,
        productImage,
        productId,
      });
    },
    []
  );

  const completeFlyToCart = useCallback(() => {
    setFlyToCartData({
      isActive: false,
      productImage: null,
      productId: null,
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

export const useFlyToCart = (): FlyToCartContextType => {
  const context = useContext(FlyToCartContext);
  if (!context) {
    throw new Error("useFlyToCart must be used within FlyToCartProvider");
  }
  return context;
};
