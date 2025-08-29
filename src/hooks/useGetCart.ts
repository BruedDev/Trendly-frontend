import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

export function useGetCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useGetCart must be used within CartProvider");
  }
  return context;
}