import ButtonProduct from "@/ui/ButtonProduct";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/types/Products_section";

type AddToCartProductProps = {
  product: Product;
  colorCode: string;
  size?: string; // THÊM size prop (optional)
};

export default function AddToCartProduct({
  product,
  colorCode,
  size,
}: AddToCartProductProps) {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addProductToCart } = cartContext;

  const handleAddToCart = () => {
    console.log("DEBUG: Adding to cart", {
      product: product,
      colorCode: colorCode,
      size: size,
      hasColors: product.colors?.length,
      firstColorCode: product.colors?.[0]?.colorCode,
    });

    addProductToCart(product, colorCode, size);
  };

  return (
    <ButtonProduct
      variant="addToCart"
      text="Thêm vào giỏ"
      onClick={handleAddToCart}
    />
  );
}
