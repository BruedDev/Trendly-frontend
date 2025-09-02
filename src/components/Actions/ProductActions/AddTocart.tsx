import ButtonProduct from "@/ui/ButtonProduct";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/types/Products_section";
import { useProtectRoute } from "@/hooks/useProtectRoute";

type AddToCartProductProps = {
  product: Product;
  colorCode: string;
  size?: string;
};

export default function AddToCartProduct({
  product,
  colorCode,
  size,
}: AddToCartProductProps) {
  const cartContext = useContext(CartContext);
  const protectAction = useProtectRoute();

  if (!cartContext) return null;
  const { addProductToCart } = cartContext;

  const handleAddToCart = protectAction(() => {
    addProductToCart(product, colorCode, size);
  });

  return (
    <ButtonProduct
      variant="addToCart"
      text="Thêm vào giỏ"
      onClick={handleAddToCart}
    />
  );
}
