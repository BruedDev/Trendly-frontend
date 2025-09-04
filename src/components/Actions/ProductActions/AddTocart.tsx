import ButtonProduct from "@/ui/ButtonProduct";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/types/Products_section";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BagIcon from "../../../../public/Icons/bag.svg";
import styles from "./ProductActions.module.scss";

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
  const [isClient, setIsClient] = useState(false);
  const cartContext = useContext(CartContext);
  const protectAction = useProtectRoute();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!cartContext) return null;

  const { addProductToCart } = cartContext;

  const handleAddToCart = protectAction(() => {
    addProductToCart(product, colorCode, size);
  });

  return (
    <>
      {isClient && (
        <ButtonProduct
          variant="addToCart"
          onClick={handleAddToCart}
          {...(isMobile ? { className: styles.addToCart__icon } : {})}
        >
          {isMobile ? <BagIcon /> : "Thêm vào giỏ"}
        </ButtonProduct>
      )}
    </>
  );
}
