export type AnimationVariant =
  | "slideUp"
  | "fadeScale"
  | "gentleRise"
  | "softBounce"
  | "smoothSlide"
  | "cleanPop"
  | "modernLift"
  | "cart";

export interface OverlayProps {
  onClose: () => void;
  variant?: AnimationVariant;
}