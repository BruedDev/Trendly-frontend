"use client";
import NavigationLink from "../NavigationLink";
import useNavItems from "@/hooks/useNavItems";
import styles from "./Header.module.scss";
import { useRef, useEffect, useState } from "react";

export default function NavBar() {
  const navItems = useNavItems();
  const navRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const activeIdx = navItems.findIndex((item) => item.isActive);
    const activeLinkEl = linkRefs.current[activeIdx];

    if (activeLinkEl && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLinkEl.getBoundingClientRect();

      const newUnderline = {
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      };

      setUnderline(newUnderline);
    }
  }, [navItems]);

  return (
    <nav className={styles.nav} ref={navRef}>
      {navItems.map((item, idx) => (
        <NavigationLink
          key={item.path}
          href={item.path}
          className={styles.link}
          active={item.isActive}
          ref={(el) => {
            linkRefs.current[idx] = el;
          }}
        >
          {item.label}
        </NavigationLink>
      ))}
      {underline.width > 0 && (
        <div
          className={styles["nav-underline"]}
          style={{ left: underline.left, width: underline.width }}
        />
      )}
    </nav>
  );
}
