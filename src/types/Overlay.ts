export type AnimationVariant =
  | "slideUp"
  | "fadeScale"
  | "gentleRise"
  | "softBounce"
  | "smoothSlide"
  | "cleanPop"
  | "modernLift"
  | "global";

export interface OverlayProps {
  onClose: () => void;
  variant?: AnimationVariant;
  isExiting?: boolean;
  isOpen?: boolean;
  content?: React.ReactNode;
}