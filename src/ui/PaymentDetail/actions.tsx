import styles from "./actions.module.scss";

interface PaymentDetailActionsProps {
  isEditing: boolean;
  onContinue: () => void;
}

export default function PaymentDetailActions({
  isEditing,
  onContinue,
}: PaymentDetailActionsProps) {
  if (isEditing) {
    return (
      <button
        type="submit"
        form="payment-form" // ✅ Kết nối với form trong PaymentInformation
        className={styles.submitButton}
      >
        Lưu thông tin
      </button>
    );
  }

  // Chế độ xem: Chỉ hiển thị nút "Tiếp tục"
  return (
    <button type="button" className={styles.submitButton} onClick={onContinue}>
      Tiếp tục đến phương thức thanh toán
    </button>
  );
}
