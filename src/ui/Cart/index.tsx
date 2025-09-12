import styles from "./Cart.module.scss";
import { useGetCart } from "@/hooks/useGetCart";
import { useOverlay } from "@/hooks/useOverlay";
import { IoCartOutline, IoClose } from "react-icons/io5";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useGetCart();
  const { closeOverlay } = useOverlay();

  if (!cart || cart.length === 0) {
    return (
      <div className={styles.cart}>
        <button className={styles.closeButton} onClick={closeOverlay}>
          <IoClose size={20} />
        </button>
        <CartHeader />
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <IoCartOutline size={100} color="#000" />
          </div>
          <p className={styles.emptyCartText}>Hiện chưa có sản phẩm</p>
        </div>
        <CartFooter total={0} cart={[]} />
      </div>
    );
  }

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      <button className={styles.closeButton} onClick={closeOverlay}>
        <IoClose size={20} />
      </button>
      <CartHeader />
      <CartList
        cart={cart}
        increaseQuantity={(productId, colorCode) =>
          increaseQuantity(productId, colorCode ?? "")
        }
        decreaseQuantity={(productId, colorCode) =>
          decreaseQuantity(productId, colorCode ?? "")
        }
      />
      <CartFooter total={total} cart={cart} />
    </div>
  );
}
