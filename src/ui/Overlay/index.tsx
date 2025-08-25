"use client";
import { useRef } from "react";
import styles from "./Overlay.module.scss";
import { OverlayProps } from "@/types/Overlay";

export default function Overlay({
  onClose,
  children,
  variant = "slideUp",
  isExiting = false,
}: OverlayProps & { isExiting?: boolean }) {
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = false;
  };

  const handleMouseMove = () => {
    isDragging.current = true;
  };

  const handleClick = () => {
    if (!isDragging.current) {
      onClose();
    }
    isDragging.current = false;
  };

  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.exiting : ""}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div
        className={`${styles.overlay_content} ${styles[variant]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
