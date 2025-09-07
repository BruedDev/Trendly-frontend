import AddToHeartProduct from "./AddToHeart";
import AddToCartProduct from "./AddTocart";
import Preview from "./Preview";
import styles from "./ProductActions.module.scss";
import {
  Product,
  ProductImage as ProductImageType,
} from "@/types/Products_section";

interface ActionsProductProps {
  type?: string;
  product: Product;
  activeColorIdx?: number | null;
  selectedSize?: string;
  activeColorImage?: ProductImageType | null;
  sectionId?: string;
  noneReponsive?: boolean;
  className?: string; // Thêm prop className
  buttonClassName?: string; // Thêm prop cho custom button
}

export default function ActionsProduct({
  type,
  product,
  activeColorIdx,
  selectedSize,
  activeColorImage,
  sectionId,
  noneReponsive = false,
  className, // Nhận className prop
  buttonClassName, // Nhận buttonClassName prop
}: ActionsProductProps) {
  const types = type ? type.split(" ") : ["cart", "heart", "preview"];
  const colorCode =
    activeColorIdx != null && product.colors && product.colors[activeColorIdx]
      ? product.colors[activeColorIdx].colorCode ?? ""
      : "";
  const size = selectedSize;

  // Combine default class với custom className
  const containerClass = className
    ? `${styles.actionsContainer} ${className}`
    : styles.actionsContainer;

  return (
    <>
      <div className={containerClass}>
        {types.includes("cart") && (
          <AddToCartProduct
            product={product}
            colorCode={colorCode}
            size={size}
            activeColorImage={activeColorImage}
            sectionId={sectionId}
            noneReponsive={noneReponsive}
            className={buttonClassName}
          />
        )}
        {types.includes("heart") && <AddToHeartProduct />}
        {types.includes("preview") && <Preview className={buttonClassName} />}
      </div>
    </>
  );
}
