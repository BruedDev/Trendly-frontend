import styles from "./Cart.module.scss";

export default function CartHeader() {
  return (
    <div className={styles.header}>
      <h2 className={styles.cartTitle}>GIỎ HÀNG</h2>
    </div>
  );
}
