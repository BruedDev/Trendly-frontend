"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";
import { saveThemeToBackend } from "@/services/data-theme";

const THEME_KEY = "data-theme";
const UUID_KEY = "trendly_uuid";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Helper lấy giá trị từ cookie
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return undefined;
    }

    // Helper ghi giá trị vào cookie (1 năm)
    function setCookie(name: string, value: string) {
      document.cookie = `${name}=${value}; path=/; max-age=31536000`;
    }

    const savedTheme = getCookie(THEME_KEY);
    const savedUUID = getCookie(UUID_KEY);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme: "dark" | "light") => {
      setIsDark(theme === "dark");
      document.documentElement.setAttribute("data-theme", theme);
      setCookie(THEME_KEY, theme);
      setIsReady(true);
    };

    // Lấy hoặc tạo uuid, chỉ dùng cookie, nếu chưa có thì tạo mới
    let uuid = savedUUID;
    if (!uuid) {
      uuid = crypto.randomUUID();
      setCookie(UUID_KEY, uuid);
    } else {
      setCookie(UUID_KEY, uuid); // refresh cookie
    }

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

  // Xử lý khi người dùng toggle
  const handleToggle = async () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);

    // Helper ghi giá trị vào cookie (1 năm)
    function setCookie(name: string, value: string) {
      document.cookie = `${name}=${value}; path=/; max-age=31536000`;
    }

    setCookie(THEME_KEY, newTheme);

    // Lấy hoặc tạo uuid, chỉ dùng cookie, nếu chưa có thì tạo mới
    const uuid = (function () {
      const cookieUUID = document.cookie
        .split("; ")
        .find((row) => row.startsWith(UUID_KEY + "="))
        ?.split("=")[1];
      if (cookieUUID) return cookieUUID;
      const newUUID = crypto.randomUUID();
      setCookie(UUID_KEY, newUUID);
      return newUUID;
    })();

    // Gửi theme và uuid lên backend (không chặn UI)
    saveThemeToBackend(uuid, newTheme).catch(() => {});
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
