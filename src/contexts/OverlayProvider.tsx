"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

interface OverlayContextType {
  content: ReactNode | null;
  isOpen: boolean;
  isExiting: boolean;
  toggleOverlay: (newContent: ReactNode) => void;
  closeOverlay: () => void;
}

export const OverlayContext = createContext<OverlayContextType | undefined>(
  undefined
);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const closeTimer = React.useRef<NodeJS.Timeout | null>(null);

  const closeOverlay = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setIsExiting(true);
    closeTimer.current = setTimeout(() => {
      setContent(null);
      setIsExiting(false);
    }, 400); // Match the animation duration in Overlay.module.scss
  }, []);

  const toggleOverlay = useCallback(
    (newContent: ReactNode) => {
      // Nếu đang có content và timer đang chạy, clear nó
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }

      if (content) {
        const isSameContent =
          (content as React.ReactElement).type ===
          (newContent as React.ReactElement).type;

        if (isSameContent) {
          closeOverlay();
          return;
        }
      }

      setIsExiting(false);
      setContent(newContent);
    },
    [content, closeOverlay]
  );

  const isOpen = content !== null;

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <OverlayContext.Provider
      value={{ content, isOpen, isExiting, toggleOverlay, closeOverlay }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
