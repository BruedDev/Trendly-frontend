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
      // Nếu đã có THEME_KEY thì chỉ dùng giá trị này, không cần kiểm tra hệ thống nữa
      applyTheme(savedTheme);
    } else {
      // Nếu chưa có thì lấy theo hệ thống, và lắng nghe thay đổi hệ thống
      applyTheme(mediaQuery.matches ? "dark" : "light");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Chỉ đổi theme nếu chưa có THEME_KEY
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
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

  if (!isReady)
    return (
      <div className={styles.toggle}>
        <div className={styles.skeleton} />
      </div>
    );

  return (
    <button className={styles.toggle} aria-label="Toggle theme">
      <input
        className={styles.input}
        type="checkbox"
        id="toggle"
        checked={isDark}
        onChange={handleToggle}
      />
      <label className={styles.label} htmlFor="toggle"></label>
    </button>
  );
}
