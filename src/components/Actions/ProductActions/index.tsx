import AddToHeartProduct from "./AddToHeart";
import AddToCartProduct from "./AddTocart";
import Pay from "./Pay";
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
  className?: string;
  buttonClassName?: string;
}

export default function ActionsProduct({
  type,
  product,
  activeColorIdx,
  selectedSize,
  activeColorImage,
  sectionId,
  noneReponsive = false,
  className,
  buttonClassName,
}: ActionsProductProps) {
  const types = type ? type.split(" ") : ["cart", "heart", "preview", "pay"];
  const colorCode =
    activeColorIdx != null && product.colors && product.colors[activeColorIdx]
      ? product.colors[activeColorIdx].colorCode ?? ""
      : "";
  const size = selectedSize;

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
        {types.includes("preview") && (
          <Preview className={buttonClassName} product={product} />
        )}
        {types.includes("pay") && (
          <Pay
            className={buttonClassName}
            product={product}
            selectedSize={size}
            colorCode={colorCode}
            activeColorImage={activeColorImage} // THÊM PROP MỚI Ở ĐÂY
          />
        )}
      </div>
    </>
  );
}
