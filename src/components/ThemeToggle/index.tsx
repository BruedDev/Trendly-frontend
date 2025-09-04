"use client";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

const THEME_KEY = "data-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return undefined;
    }

    function setCookie(name: string, value: string) {
      document.cookie = `${name}=${value}; path=/; max-age=31536000`;
    }

    const savedTheme = getCookie(THEME_KEY);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: "dark" | "light") => {
      setIsDark(theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
      setCookie(THEME_KEY, theme);
      setIsReady(true);
    };

    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      applyTheme(mediaQuery.matches ? "dark" : "light");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!getCookie(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      };
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);

    function setCookie(name: string, value: string) {
      document.cookie = `${name}=${value}; path=/; max-age=31536000`;
    }

    setCookie(THEME_KEY, newTheme);
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
