"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

const THEME_KEY = "Mode";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Kiểm tra theme hệ thống và localStorage khi load
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: "dark" | "light") => {
      setIsDark(theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
      setIsReady(true);
    };

    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      applyTheme(mediaQuery.matches ? "dark" : "light");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, []);

  // Xử lý khi người dùng toggle
  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!isReady) return null;

  return (
    <div className={styles.toggle}>
      <input
        className={styles.input}
        type="checkbox"
        id="toggle"
        checked={isDark}
        onChange={handleToggle}
      />
      <label className={styles.label} htmlFor="toggle"></label>
    </div>
  );
}
