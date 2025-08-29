import AddToHeartProduct from "./AddToHeart";
import AddToCartProduct from "./AddTocart";
import Preview from "./Preview";
import styles from "./ProductActions.module.scss";
import PayProduct from "./Pay";
import { Product } from "@/types/Products_section";

interface ActionsProductProps {
  type?: string;
  product: Product;
}

export default function ActionsProduct({ type, product }: ActionsProductProps) {
  const types = type ? type.split(" ") : ["cart", "heart", "pay", "preview"];
  return (
    <>
      <div className={`${styles.actionsContainer}`}>
        {types.includes("cart") && <AddToCartProduct product={product} />}
        {types.includes("heart") && <AddToHeartProduct />}
        {types.includes("pay") && <PayProduct />}
        {types.includes("preview") && <Preview />}
      </div>
    </>
  );
}
