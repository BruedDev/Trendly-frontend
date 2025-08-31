import styles from "./Cart.module.scss";
import { useGetCart } from "@/hooks/useGetCart";
import { CartItem } from "@/types/Products_section";
import Image from "next/image";
import { formatPrice } from "@/utils/formatNumber";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import DeleteItemCartButton from "@/components/Actions/cart/deleteItemCart";

export default function Cart() {
  const { cart } = useGetCart();

  if (!cart || cart.length === 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.header}>
          <h2 className={styles.cartTitle}>GIỎ HÀNG</h2>
        </div>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
              <path
                d="M12 8L16 8L20 32L52 32L56 16L24 16"
                stroke="#ccc"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="24"
                cy="40"
                r="4"
                stroke="#ccc"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="44"
                cy="40"
                r="4"
                stroke="#ccc"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <p className={styles.emptyCartText}>Hiện chưa có sản phẩm</p>
        </div>
        <div className={styles.cartSummary}>
          <span className={styles.cartTotalLabel}>TỔNG TIỀN:</span>
          <span className={styles.cartTotal}>0₫</span>
        </div>
        <div className={styles.cartActions}>
          <button className={styles.viewCartBtn}>XEM GIỎ HÀNG</button>
          <button className={styles.checkoutBtn}>THANH TOÁN</button>
        </div>
      </div>
    );
  }

  // Tính tổng tiền
  const total = cart.reduce((sum, item: CartItem) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <h2 className={styles.cartTitle}>GIỎ HÀNG</h2>
      </div>
      <ul className={styles.cartList}>
        {cart.map((item: CartItem) => {
          const product = item.product;
          const defaultImg = product?.thumbnail?.defaultImage;
          const imgUrl = getSanityImageUrl(defaultImg);
          return (
            <li key={item.productId} className={styles.cartItem}>
              <div className={styles.cartItemImageWrapper}>
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={defaultImg?.alt || product?.title || "Hình sản phẩm"}
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
                  {product?.colors?.[0]?.colorCode
                    ? ` / ${product.colors[0].colorCode}`
                    : ""}
                </div>
                <div className={styles.cartItemQuantityRow}>
                  <div className={styles.cartItemControls}>
                    <button className={styles.cartItemQtyBtn}>-</button>
                    <span className={styles.cartItemQty}>{item.quantity}</span>
                    <button className={styles.cartItemQtyBtn}>+</button>
                  </div>
                  <span className={styles.cartItemPrice}>
                    {formatPrice(product?.price ?? 0)}
                  </span>
                </div>
              </div>
              <DeleteItemCartButton productId={item.productId} />
            </li>
          );
        })}
      </ul>
      <div className={styles.cartSummary}>
        <span className={styles.cartTotalLabel}>TỔNG TIỀN:</span>
        <span className={styles.cartTotal}>{formatPrice(total)}</span>
      </div>
      <div className={styles.cartActions}>
        <button className={styles.viewCartBtn}>XEM GIỎ HÀNG</button>
        <button className={styles.checkoutBtn}>THANH TOÁN</button>
      </div>
    </div>
  );
}
