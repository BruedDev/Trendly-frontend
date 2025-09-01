import AddToHeartProduct from "./AddToHeart";
import AddToCartProduct from "./AddTocart";
import styles from "./ProductActions.module.scss";
import { Product } from "@/types/Products_section";

interface ActionsProductProps {
  type?: string;
  product: Product;
  activeColorIdx?: number | null;
}

export default function ActionsProduct({
  type,
  product,
  activeColorIdx,
}: ActionsProductProps) {
  const types = type ? type.split(" ") : ["cart", "heart"];
  return (
    <>
      <div className={`${styles.actionsContainer}`}>
        {types.includes("cart") && (
          <AddToCartProduct
            product={product}
            colorCode={
              activeColorIdx != null && product.colors
                ? product.colors[activeColorIdx]?.colorCode ?? ""
                : ""
            }
          />
        )}
        {types.includes("heart") && <AddToHeartProduct />}
      </div>
    </>
  );
}
