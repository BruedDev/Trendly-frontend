import { useStatusMessage } from "@/hooks/useStatusMessage";
import React from "react";
import styles from "./StatusMessage.module.scss";

type StatusType = "idle" | "success" | "error" | "loading";

const AnimatedIcon = ({ status }: { status: StatusType }) => {
  return (
    <div className={`${styles.iconWrapper} ${styles[status]}`}>
      {/* Spinner base circle */}
      <div className={styles.spinnerBase}>
        <div className={styles.spinnerCircle}></div>
      </div>

      {/* Success checkmark */}
      {status === "success" && (
        <div className={styles.successIcon}>
          <svg viewBox="0 0 52 52" className={styles.successSvg}>
            <circle
              className={styles.successCircle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={styles.successCheck}
              fill="none"
              d="m14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      )}

      {/* Error X mark */}
      {status === "error" && (
        <div className={styles.errorIcon}>
          <svg viewBox="0 0 52 52" className={styles.errorSvg}>
            <circle
              className={styles.errorCircle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={styles.errorLineLeft}
              fill="none"
              d="m16 36 20-20"
            />
            <path
              className={styles.errorLineRight}
              fill="none"
              d="m36 36-20-20"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default function StatusMessage() {
  const { status, message } = useStatusMessage();

  if (status === "idle") return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[status]}`}>
        <div className={styles.iconContainer}>
          <AnimatedIcon status={status} />
        </div>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
}
