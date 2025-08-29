import ButtonProduct from "@/ui/ButtonProduct";
import { useGetCart } from "@/hooks/useGetCart";
import { Product } from "@/types/Products_section";

interface AddToCartProductProps {
  product: Product;
}

export default function AddToCartProduct({ product }: AddToCartProductProps) {
  const { addProductToCart } = useGetCart();

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  return (
    <ButtonProduct
      variant="addToCart"
      text="Thêm vào giỏ"
      onClick={handleAddToCart}
    />
  );
}
