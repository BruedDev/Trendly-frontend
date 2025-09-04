"use client";

import { useRef } from "react";
import styles from "./Overlay.module.scss";
import { OverlayProps } from "@/types/Overlay";
import { useOverlay } from "@/hooks/useOverlay";

export default function Overlay({
  onClose,
  variant = "slideUp",
  isExiting = false,
  scope: _scope,
}: OverlayProps & {
  isExiting?: boolean;
  scope?: string;
  isCentered?: boolean;
}) {
  const { state } = useOverlay();
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

  const handleTouchStart = () => {
    isDragging.current = false;
  };

  const handleTouchMove = () => {
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) {
      onClose();
    }
    isDragging.current = false;
  };

  const effectiveVariant = state.variant || variant;
  const effectiveScope = state.scope || _scope;

  const isCentered =
    typeof effectiveScope === "string" && effectiveScope.includes("visible");

  const overlayClass = [
    styles.overlay,
    isExiting ? styles.exiting : "",
    effectiveScope && effectiveScope.includes("global")
      ? isCentered
        ? `${styles.global} ${styles.visible}`
        : styles.global
      : "",
  ].join(" ");

  return (
    <div
      className={overlayClass}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`${styles.overlay_content} ${styles[effectiveVariant]}`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {state.content}
      </div>
    </div>
  );
}
