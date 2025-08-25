import styles from "./CircleQuantity.module.scss";

export default function CircleQuantity({ quantity = 0 }) {
  const isMultipleDigits = quantity > 9;

  const displayQuantity = quantity > 99 ? "99+" : quantity.toString();

  return (
    <div
      className={`${styles.circle} ${isMultipleDigits ? styles.twoDigits : ""}`}
    >
      <span className={styles.quantity}>{displayQuantity}</span>
    </div>
  );
}
