"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";

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
      }, 400);
    });
  }, []);

  return (
    <>
      <Header isLoading={isLoading} />
      {children}
    </>
  );
}
