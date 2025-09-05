"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { AnimationVariant } from "@/types/Overlay";

interface OverlayState {
  content: ReactNode | null;
  variant?: AnimationVariant;
  scope?: string;
}

interface OverlayContextType {
  state: OverlayState;
  isOpen: boolean;
  isExiting: boolean;
  toggleOverlay: (
    newContent: ReactNode,
    variant?: AnimationVariant,
    scope?: string
  ) => void;
  closeOverlay: () => void;
}

export const OverlayContext = createContext<OverlayContextType | undefined>(
  undefined
);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<OverlayState>({ content: null });
  const [isExiting, setIsExiting] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (state.content) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.content]);

  const closeOverlay = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setIsExiting(true);
    closeTimer.current = setTimeout(() => {
      setState({ content: null });
      setIsExiting(false);
    }, 200);
  }, []);

  const toggleOverlay = useCallback(
    (newContent: ReactNode, variant?: AnimationVariant, scope?: string) => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }

      if (state.content) {
        const isSameContent =
          (state.content as React.ReactElement).type ===
          (newContent as React.ReactElement).type;

        if (isSameContent) {
          closeOverlay();
          return;
        }
      }

      setIsExiting(false);
      setState({ content: newContent, variant, scope });
    },
    [state.content, closeOverlay]
  );

  const isOpen = state.content !== null;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeOverlay();

    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, [pathname, closeOverlay]);

  return (
    <OverlayContext.Provider
      value={{ state, isOpen, isExiting, toggleOverlay, closeOverlay }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
