import ButtonProduct from "@/ui/ButtonProduct";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/types/Products_section";

type AddToCartProductProps = {
  product: Product;
  colorCode: string;
};

export default function AddToCartProduct({
  product,
  colorCode,
}: AddToCartProductProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addProductToCart } = cartContext;

  const handleAddToCart = () => {
    addProductToCart(product, colorCode);
  };

  return (
    <ButtonProduct
      variant="addToCart"
      text="Thêm vào giỏ"
      onClick={handleAddToCart}
    />
  );
}
