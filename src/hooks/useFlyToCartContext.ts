import { useContext } from "react";
import { FlyToCartContext } from "@/contexts/FlyToCartContext";

export function useFlyToCart() {
  const context = useContext(FlyToCartContext);
  if (!context) {
    throw new Error("useFlyToCart must be used within FlyToCartProvider");
  }
  return context;
}
