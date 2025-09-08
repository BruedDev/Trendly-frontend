"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { ReactNode, forwardRef, HTMLAttributes } from "react";

import { AnimationVariant } from "@/types/Overlay";

interface IsOpenButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  componentToOpen: ReactNode;
  variant?: AnimationVariant;
  scope?: string;
}

const IsOpenButton = forwardRef<HTMLDivElement, IsOpenButtonProps>(
  ({ children, componentToOpen, variant, scope, ...props }, ref) => {
    const { toggleOverlay } = useOverlay();

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onClick) {
        const result = (
          props.onClick as (
            e: React.MouseEvent<HTMLDivElement>
          ) => boolean | void
        )(e);
        if (result === false) return;
      }
      toggleOverlay(componentToOpen, variant, scope);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, ...restProps } = props;

    return (
      <div
        ref={ref}
        onClick={handleToggle}
        {...restProps}
        className={`relative ${restProps.className ?? ""}`}
        style={{ width: "100%" }}
      >
        {children}
      </div>
    );
  }
);

IsOpenButton.displayName = "IsOpenButton";

export default IsOpenButton;
