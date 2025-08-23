"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  // Luôn đồng bộ logo với theme hiện tại trên DOM
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Hàm lấy theme hiện tại từ DOM
    const getTheme = () => {
      if (typeof window === "undefined") return null;
      return document.documentElement.getAttribute("data-theme");
    };
    setTheme(getTheme());

    // Lắng nghe thay đổi data-theme
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Nếu chưa xác định được theme, có thể render skeleton hoặc logo mặc định
  if (!theme) {
    return (
      <Image
        src="/Icons/logo_light.png"
        alt="Logo"
        width={100}
        height={100}
        style={{ opacity: 0, transition: "opacity 0.2s" }}
      />
    );
  }

  return (
    <Image
      src={theme === "dark" ? "/Icons/logo_dark.png" : "/Icons/logo_light.png"}
      alt="Logo"
      width={100}
      height={100}
      style={{ opacity: 1, transition: "opacity 0.2s" }}
    />
  );
}
