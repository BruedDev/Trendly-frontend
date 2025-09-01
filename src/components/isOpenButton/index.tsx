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

    const handleToggle = () => {
      toggleOverlay(componentToOpen, variant);
    };

    return (
      <button ref={ref} onClick={handleToggle} {...props} className="relative">
        {children}
      </button>
    );
  }
);

IsOpenButton.displayName = "IsOpenButton";

export default IsOpenButton;
