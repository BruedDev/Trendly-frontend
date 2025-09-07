"use client";

import styles from "./ButtonProduct.module.scss";
import { ReactNode, ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProductProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant: "addToCart" | "addToHeart" | "preview" | "pay";
}

const ButtonProduct = forwardRef<HTMLButtonElement, ButtonProductProps>(
  ({ children, onClick, variant, className, ...props }, ref) => {
    const buttonClass =
      variant === "addToHeart" ? styles.buttonHeart : styles.button;
    const mergedClassName = className || buttonClass;

    return (
      <button
        ref={ref}
        className={mergedClassName}
        onClick={onClick}
        {...props}
      >
        <span className={styles.text}>{children}</span>
        {variant !== "addToHeart" && (
          <>
            <span className={styles.border_one}></span>
            <span className={styles.border_two}></span>
            <span className={styles.border_three}></span>
            <span className={styles.border_four}></span>
          </>
        )}
      </button>
    );
  }
);

ButtonProduct.displayName = "ButtonProduct";

export default ButtonProduct;
