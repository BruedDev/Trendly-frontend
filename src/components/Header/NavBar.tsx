"use client";

import NavigationLink from "../NavigationLink";
import useNavItems from "@/hooks/useNavItems";
import styles from "./Header.module.scss";
import Skeleton from "@/ui/Skeleton";
import { useRef, useEffect, useState } from "react";

export default function NavBar({ isLoading = false }) {
  const navItems = useNavItems();
  const navRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const previousActiveIndexRef = useRef<number | null>(null);

  // Di chuyển useEffect lên trên early return
  useEffect(() => {
    // Chỉ chạy logic khi không loading
    if (isLoading) return;

    const newActiveIndex = navItems.findIndex((item) => item.isActive);

    if (newActiveIndex === -1) {
      setUnderlineStyle({ left: 0, width: 0, opacity: 0 });
      return;
    }

    const oldActiveIndex = previousActiveIndexRef.current;

    requestAnimationFrame(() => {
      const newLinkEl = linkRefs.current[newActiveIndex];
      const navEl = navRef.current;
      if (!newLinkEl || !navEl) return;

      const navRect = navEl.getBoundingClientRect();
      const newLinkRect = newLinkEl.getBoundingClientRect();

      const targetPos = {
        left: newLinkRect.left - navRect.left,
        width: newLinkRect.width,
        opacity: 1,
      };

      if (
        oldActiveIndex === null ||
        oldActiveIndex === newActiveIndex ||
        isAnimating
      ) {
        setUnderlineStyle(targetPos);
      } else {
        const oldLinkEl = linkRefs.current[oldActiveIndex];
        if (!oldLinkEl) {
          setUnderlineStyle(targetPos);
          return;
        }

        setIsAnimating(true);
        const oldLinkRect = oldLinkEl.getBoundingClientRect();
        const currentPos = {
          left: oldLinkRect.left - navRect.left,
          width: oldLinkRect.width,
        };

        if (targetPos.left >= currentPos.left) {
          setUnderlineStyle({
            ...underlineStyle,
            left: currentPos.left,
            width: targetPos.left - currentPos.left + targetPos.width,
          });
        } else {
          setUnderlineStyle({
            ...underlineStyle,
            left: targetPos.left,
            width: currentPos.left - targetPos.left + currentPos.width,
          });
        }

        setTimeout(() => {
          setUnderlineStyle(targetPos);
          setTimeout(() => {
            setIsAnimating(false);
          }, 150);
        }, 150);
      }
      previousActiveIndexRef.current = newActiveIndex;
    });
  }, [navItems, isLoading, isAnimating, underlineStyle]); // Thêm dependencies

  // Early return sau khi gọi tất cả hooks
  if (isLoading) {
    return (
      <nav className={styles.nav} ref={navRef}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            padding: "0 8px",
          }}
        >
          <Skeleton width="70px" height="16px" borderRadius="4px" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            padding: "0 8px",
          }}
        >
          <Skeleton width="85px" height="16px" borderRadius="4px" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            padding: "0 8px",
          }}
        >
          <Skeleton width="95px" height="16px" borderRadius="4px" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            padding: "0 8px",
          }}
        >
          <Skeleton width="80px" height="16px" borderRadius="4px" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            padding: "0 8px",
          }}
        >
          <Skeleton width="75px" height="16px" borderRadius="4px" />
        </div>
      </nav>
    );
  }

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
      <div className={styles["nav-underline"]} style={underlineStyle} />
    </nav>
  );
}
