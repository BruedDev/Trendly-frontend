"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

import { AnimationVariant } from "@/types/Overlay";

interface IsOpenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  componentToOpen: ReactNode;
  variant?: AnimationVariant;
}

const IsOpenButton = forwardRef<HTMLButtonElement, IsOpenButtonProps>(
  ({ children, componentToOpen, variant, ...props }, ref) => {
    const { toggleOverlay } = useOverlay();

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Nếu có onClick từ props, gọi trước
      if (props.onClick) {
        // Ép kiểu để nhận boolean | void
        const result = (
          props.onClick as (
            e: React.MouseEvent<HTMLButtonElement>
          ) => boolean | void
        )(e);
        // Nếu onClick trả về false, không mở overlay
        if (result === false) return;
      }
      toggleOverlay(componentToOpen, variant);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, ...restProps } = props;

    return (
      <button
        ref={ref}
        onClick={handleToggle}
        {...restProps}
        className="relative"
      >
        {children}
      </button>
    );
  }
);

IsOpenButton.displayName = "IsOpenButton";

export default IsOpenButton;
