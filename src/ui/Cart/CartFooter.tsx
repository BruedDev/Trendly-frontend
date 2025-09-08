import ViewCart from "@/components/Actions/cart/ViewCart";
import styles from "./Cart.module.scss";
import { formatPrice } from "@/utils/formatNumber";
import Pay from "@/components/Actions/ProductActions/Pay";

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
        <ViewCart className={styles.checkoutBtn} />
        <Pay className={styles.checkoutBtn} />
      </div>
    </div>
  );
}
