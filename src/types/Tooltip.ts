import { ReactNode, ReactElement } from "react";


export type TooltipPlacement =
  | "top-left"
  | "top-center"
  | "top-right";

export interface TooltipProps {
  title: ReactNode;
  children: ReactElement;
  arrow?: TooltipPlacement;
}