import styles from "./CircleQuantity.module.scss";
import { formatNumber } from "@/utils/formatNumber";

export default function CircleQuantity({ quantity = 0 }) {
  const isMultipleDigits = quantity > 9;
  const displayQuantity = quantity > 99 ? "99+" : formatNumber(quantity);

  return (
    <div
      className={`${styles.circle} ${isMultipleDigits ? styles.twoDigits : ""}`}
    >
      <span className={styles.quantity}>{displayQuantity}</span>
    </div>
  );
}
