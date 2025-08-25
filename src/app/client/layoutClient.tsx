"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Overlay from "@/ui/Overlay";
import ContextProvider from "@/contexts/index";
import { useOverlay } from "@/hooks/useOverlay";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });
  }, []);

  return (
    <ContextProvider>
      <LayoutContent isLoading={isLoading}>{children}</LayoutContent>
    </ContextProvider>
  );
}

function LayoutContent({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const { content, isOpen, closeOverlay, isExiting } = useOverlay();

  return (
    <>
      <Header isLoading={isLoading} />
      {(isOpen || isExiting) && (
        <Overlay onClose={closeOverlay} isExiting={isExiting}>
          {content}
        </Overlay>
      )}
      {children}
    </>
  );
}
