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
  const timeoutRefs = useRef<(NodeJS.Timeout | null)[]>([null, null]); // [stretchTimeout, shrinkTimeout]

  // Clear all timeouts helper function
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => {
      if (timeout) clearTimeout(timeout);
    });
    timeoutRefs.current = [null, null];
  };

  useEffect(() => {
    const newActiveIndex = navItems.findIndex((item) => item.isActive);

    if (newActiveIndex === -1) {
      clearAllTimeouts();
      setUnderlineStyle({ left: 0, width: 0, opacity: 0 });
      setIsAnimating(false);
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

      if (oldActiveIndex === null || oldActiveIndex === newActiveIndex) {
        clearAllTimeouts();
        setUnderlineStyle(targetPos);
        setIsAnimating(false);
      } else {
        const oldLinkEl = linkRefs.current[oldActiveIndex];
        if (!oldLinkEl) {
          clearAllTimeouts();
          setUnderlineStyle(targetPos);
          setIsAnimating(false);
          return;
        }

        // Cancel previous animation if running
        if (isAnimating) {
          clearAllTimeouts();
        }

        setIsAnimating(true);
        const oldLinkRect = oldLinkEl.getBoundingClientRect();
        const currentPos = {
          left: oldLinkRect.left - navRect.left,
          width: oldLinkRect.width,
        };

        // Phase 1: Giãn ra
        timeoutRefs.current[0] = setTimeout(() => {
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

          // Phase 2: Co lại
          timeoutRefs.current[1] = setTimeout(() => {
            setUnderlineStyle(targetPos);
            setTimeout(() => {
              setIsAnimating(false);
            }, 350);
          }, 350);
        }, 100);
      }
      previousActiveIndexRef.current = newActiveIndex;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  // Khôi phục underline sau khi loading xong
  useEffect(() => {
    if (!isLoading && navItems.length > 0) {
      const activeIndex = navItems.findIndex((item) => item.isActive);
      if (activeIndex !== -1) {
        setTimeout(() => {
          const activeLinkEl = linkRefs.current[activeIndex];
          const navEl = navRef.current;
          if (activeLinkEl && navEl) {
            const navRect = navEl.getBoundingClientRect();
            const activeLinkRect = activeLinkEl.getBoundingClientRect();
            setUnderlineStyle({
              left: activeLinkRect.left - navRect.left,
              width: activeLinkRect.width,
              opacity: 1,
            });
            previousActiveIndexRef.current = activeIndex;
          }
        }, 100);
      }
    }
  }, [isLoading, navItems]);

  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

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
