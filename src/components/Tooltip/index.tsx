import MuiTooltip from "@mui/material/Tooltip";
import { TooltipProps } from "@/types/Tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const placementMap: Record<string, string> = {
  "top-left": "top-start",
  "top-center": "top",
  "top-right": "top-end",
  "bottom-left": "bottom-start",
  "bottom-center": "bottom",
  "bottom-right": "bottom-end",
  left: "left",
  right: "right",
};

export default function Tooltip({
  title,
  children,
  arrow = "top-center",
}: TooltipProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const muiPlacement = placementMap[arrow] || "top";
  if (isMobile) {
    return <>{children}</>;
  }
  return (
    <MuiTooltip
      title={title}
      arrow
      placement={
        muiPlacement as import("@mui/material").TooltipProps["placement"]
      }
      PopperProps={{
        modifiers: [
          {
            name: "zIndex",
            enabled: true,
            phase: "write",
            fn: ({ state }: { state: import("@popperjs/core").State }) => {
              state.styles.popper.zIndex = "1000";
            },
          },
          {
            name: "customTooltipColor",
            enabled: true,
            phase: "write",
            fn: ({ state }: { state: import("@popperjs/core").State }) => {
              if (state.elements && state.elements.popper) {
                const tooltip = state.elements.popper.querySelector(
                  ".MuiTooltip-tooltip"
                );
                const arrow =
                  state.elements.popper.querySelector(".MuiTooltip-arrow");
                const bg = "var(--bg-tooltip)";
                if (tooltip) {
                  (tooltip as HTMLElement).style.background = bg;
                  (tooltip as HTMLElement).style.padding = "6px 12px";
                  (tooltip as HTMLElement).style.borderRadius = "5px";
                  (tooltip as HTMLElement).style.fontSize = "12px";
                  (tooltip as HTMLElement).style.textTransform = "capitalize";
                  (tooltip as HTMLElement).style.transition = "none";
                  (tooltip as HTMLElement).style.color = "#eee";
                }
                if (arrow) {
                  (arrow as HTMLElement).style.color = bg;
                }
              }
            },
          },
        ],
      }}
    >
      {children}
    </MuiTooltip>
  );
}
