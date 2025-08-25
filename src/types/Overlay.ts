import {ReactNode} from "react"

export type AnimationVariant =
  | "slideUp"
  | "fadeScale"
  | "gentleRise"
  | "softBounce"
  | "smoothSlide"
  | "cleanPop"
  | "modernLift";

export interface OverlayProps {
  onClose: () => void;
  children: ReactNode;
  variant?: AnimationVariant;
}