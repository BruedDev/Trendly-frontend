import AddToHeartProduct from "./AddToHeart";
import AddToCartProduct from "./AddTocart";
import Preview from "./Preview";
import styles from "./ProductActions.module.scss";
import { Product } from "@/types/Products_section";

interface ActionsProductProps {
  type?: string;
  product: Product;
  activeColorIdx?: number | null;
  selectedSize?: string;
}

export default function ActionsProduct({
  type,
  product,
  activeColorIdx,
  selectedSize,
}: ActionsProductProps) {
  const types = type ? type.split(" ") : ["cart", "heart", "preview"];
  const colorCode =
    activeColorIdx != null && product.colors
      ? product.colors[activeColorIdx]?.colorCode ?? ""
      : "";
  const size = selectedSize;

  return (
    <>
      <div className={`${styles.actionsContainer}`}>
        {types.includes("cart") && (
          <AddToCartProduct
            product={product}
            colorCode={colorCode}
            size={size}
          />
        )}
        {types.includes("heart") && <AddToHeartProduct />}
        {types.includes("preview") && <Preview />}
      </div>
    </>
  );
}
