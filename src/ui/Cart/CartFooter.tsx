import styles from "./Cart.module.scss";
import { formatPrice } from "@/utils/formatNumber";

interface CartFooterProps {
  total: number;
}

export default function CartFooter({ total }: CartFooterProps) {
  return (
    <div className={styles.footer}>
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
