import { ReactNode, ReactElement } from "react";


export type TooltipPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left"
  | "right";

export interface TooltipProps {
  title: ReactNode;
  children: ReactElement;
  arrow?: TooltipPlacement;
}