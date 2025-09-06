"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LogoLight from "../../../public/Icons/logo_light.png";
import LogoDark from "../../../public/Icons/logo_dark.png";

export default function Logo() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const getTheme = () => {
      if (typeof window === "undefined") return null;
      return document.documentElement.getAttribute("data-theme");
    };
    setTheme(getTheme());
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const logoSrc = theme === "light" ? LogoLight : LogoDark;
  return (
    <Image
      src={logoSrc}
      alt="Logo"
      width={100}
      height={100}
      style={{ transition: "opacity 0.2s" }}
      priority
    />
  );
}
