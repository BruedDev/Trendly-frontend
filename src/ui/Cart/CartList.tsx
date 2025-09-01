import styles from "./Cart.module.scss";
import { CartItem } from "@/types/Products_section";
import Image from "next/image";
import { formatPrice } from "@/utils/formatNumber";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import DeleteItemCartButton from "@/components/Actions/cart/deleteItemCart";

interface CartListProps {
  cart: CartItem[];
  increaseQuantity: (productId: string, colorCode?: string) => void;
  decreaseQuantity: (productId: string, colorCode?: string) => void;
}

export default function CartList({
  cart,
  increaseQuantity,
  decreaseQuantity,
}: CartListProps) {
  return (
    <ul className={styles.cartList}>
      {cart.map((item: CartItem) => {
        const product = item.product;
        const selectedColorImage = item.selectedColor?.image;
        let imgUrl = null;
        if (selectedColorImage) {
          imgUrl = getSanityImageUrl(selectedColorImage);
        } else {
          const matchingColor = product?.colors?.find(
            (color) => color.colorCode === item.colorCode
          );
          if (matchingColor?.image) {
            imgUrl = getSanityImageUrl(matchingColor.image);
          }
        }
        const defaultImg = product?.thumbnail?.defaultImage;
        const fallbackImgUrl = getSanityImageUrl(defaultImg);
        const finalImgUrl = imgUrl || fallbackImgUrl;
        const isQuantityZero = item.quantity === 1;
        return (
          <li
            key={`${item.productId}-${item.colorCode || "default"}`}
            className={styles.cartItem}
          >
            <div className={styles.cartItemImageWrapper}>
              {finalImgUrl ? (
                <Image
                  src={finalImgUrl}
                  alt={product?.title || "Hình sản phẩm"}
                  width={64}
                  height={64}
                  className={styles.cartItemImage}
                />
              ) : (
                <span className={styles.cartItemImagePlaceholder}>
                  No Image
                </span>
              )}
            </div>
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemTitle}>
                {product?.title || "Sản phẩm không xác định"}
              </div>
              <div className={styles.cartItemCode}>{product?.msp}</div>
              <div className={styles.cartItemCategory}>
                {product?.categories?.[0]?.title
                  ? `${product.categories[0].title}`
                  : ""}
                {item.selectedColor?.colorCode
                  ? ` / ${item.selectedColor.colorCode}`
                  : item.colorCode
                  ? ` / ${item.colorCode}`
                  : ""}
              </div>
              <div className={styles.cartItemQuantityRow}>
                <div className={styles.cartItemControls}>
                  <button
                    className={`${styles.cartItemQtyBtn} ${
                      isQuantityZero ? styles.disabled : ""
                    }`}
                    onClick={() =>
                      decreaseQuantity(item.productId, item.colorCode)
                    }
                    disabled={isQuantityZero}
                  >
                    -
                  </button>
                  <span className={styles.cartItemQty}>{item.quantity}</span>
                  <button
                    className={styles.cartItemQtyBtn}
                    onClick={() =>
                      increaseQuantity(item.productId, item.colorCode)
                    }
                  >
                    +
                  </button>
                </div>
                <span className={styles.cartItemPrice}>
                  {formatPrice(product?.price ?? 0)}
                </span>
              </div>
            </div>
            <DeleteItemCartButton
              productId={item.productId}
              colorCode={item.colorCode}
            />
          </li>
        );
      })}
    </ul>
  );
}
