"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Overlay from "@/ui/Overlay";
import ContextProvider from "@/contexts/index";
import { StatusMessageProvider } from "@/contexts/StatusMessageContext";
import { useOverlay } from "@/hooks/useOverlay";
import StatusMessage from "@/components/StatusMessage";

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
    <StatusMessageProvider>
      <ContextProvider>
        <LayoutContent isLoading={isLoading}>{children}</LayoutContent>
      </ContextProvider>
    </StatusMessageProvider>
  );
}

function LayoutContent({
  children,
}: // isLoading,
{
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const { isOpen, closeOverlay, isExiting } = useOverlay();

  return (
    <>
      <StatusMessage />
      <Header />
      {(isOpen || isExiting) && (
        <Overlay onClose={closeOverlay} isExiting={isExiting} />
      )}

      {children}
    </>
  );
}
