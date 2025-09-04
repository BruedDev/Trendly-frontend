"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";

import { AnimationVariant } from "@/types/Overlay";

interface IsOpenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  componentToOpen: ReactNode;
  variant?: AnimationVariant;
  scope?: string;
}

const IsOpenButton = forwardRef<HTMLButtonElement, IsOpenButtonProps>(
  ({ children, componentToOpen, variant, scope, ...props }, ref) => {
    const { toggleOverlay } = useOverlay();

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        const result = (
          props.onClick as (
            e: React.MouseEvent<HTMLButtonElement>
          ) => boolean | void
        )(e);
        if (result === false) return;
      }
      toggleOverlay(componentToOpen, variant, scope);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, ...restProps } = props;

    return (
      <button
        ref={ref}
        onClick={handleToggle}
        {...restProps}
        className={`relative ${restProps.className ?? ""}`}
      >
        {children}
      </button>
    );
  }
);

IsOpenButton.displayName = "IsOpenButton";

export default IsOpenButton;
