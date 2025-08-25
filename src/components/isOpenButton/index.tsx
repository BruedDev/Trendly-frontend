"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

interface IsOpenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  componentToOpen: ReactNode;
}

const IsOpenButton = forwardRef<HTMLButtonElement, IsOpenButtonProps>(
  ({ children, componentToOpen, ...props }, ref) => {
    const { toggleOverlay } = useOverlay();

    const handleToggle = () => {
      toggleOverlay(componentToOpen);
    };

    return (
      <button ref={ref} onClick={handleToggle} {...props}>
        {children}
      </button>
    );
  }
);

IsOpenButton.displayName = "IsOpenButton";

export default IsOpenButton;
