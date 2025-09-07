import ButtonProduct from "@/ui/ButtonProduct";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { useFlyToCart } from "@/hooks/useFlyToCart";
import {
  Product,
  ProductImage as ProductImageType,
} from "@/types/Products_section";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BagIcon from "../../../../public/Icons/bag.svg";
import styles from "./ProductActions.module.scss";

type AddToCartProductProps = {
  product: Product;
  colorCode: string;
  size?: string;
  activeColorImage?: ProductImageType | null;
  sectionId?: string;
  noneReponsive?: boolean;
  className?: string;
};

export default function AddToCartProduct({
  product,
  colorCode,
  size,
  activeColorImage,
  sectionId,
  noneReponsive = false,
  className,
}: AddToCartProductProps) {
  const [isClient, setIsClient] = useState(false);
  const cartContext = useContext(CartContext);
  const { triggerFlyToCart } = useFlyToCart();
  const protectAction = useProtectRoute();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!cartContext) return null;

  const { addProductToCart } = cartContext;

  const handleAddToCart = protectAction(() => {
    const imageToFly = activeColorImage || product.thumbnail?.defaultImage;

    addProductToCart(product, colorCode, size, () => {
      if (imageToFly) {
        triggerFlyToCart(product._id, imageToFly, sectionId);
      }
    });
  });

  const shouldShowIcon = noneReponsive ? false : isMobile;

  return (
    <>
      {isClient && (
        <ButtonProduct
          variant="addToCart"
          onClick={handleAddToCart}
          className={
            className || (shouldShowIcon ? styles.addToCart__icon : undefined)
          }
        >
          {shouldShowIcon ? <BagIcon /> : "Thêm vào giỏ"}
        </ButtonProduct>
      )}
    </>
  );
}
