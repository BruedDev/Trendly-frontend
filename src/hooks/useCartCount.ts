import { useMemo } from "react";
import { useGetCart } from "./useGetCart";

export function useCartCount() {
  const { cart, loading } = useGetCart();
  const count = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return { count, loading };
}