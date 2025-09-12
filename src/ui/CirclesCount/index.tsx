import styles from "./CircleQuantity.module.scss";
import { formatNumber } from "@/utils/formatNumber";

interface CircleQuantityProps {
  quantity?: number;
  className?: string;
}

export default function CircleQuantity({
  quantity = 0,
  className = "",
}: CircleQuantityProps) {
  const isMultipleDigits = quantity > 9;
  const displayQuantity = quantity > 99 ? "99+" : formatNumber(quantity);

  return (
    <div
      className={`${styles.circle} ${
        isMultipleDigits ? styles.twoDigits : ""
      } ${className}`.trim()}
    >
      <span className={styles.quantity}>{displayQuantity}</span>
    </div>
  );
}
