"use client";
import NavigationLink from "../NavigationLink";
import useNavItems from "@/hooks/useNavItems";
import styles from "./Header.module.scss";
import { useRef, useEffect, useState } from "react";

export default function NavBar() {
  const navItems = useNavItems();
  const navRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const currentPos = useRef({ left: 0, width: 0 });

  // Khởi tạo vị trí ban đầu
  useEffect(() => {
    // Đợi một chút để DOM render hoàn toàn
    const initializeUnderline = () => {
      const routeActiveIdx = navItems.findIndex((item) => item.isActive);
      const activeLink = linkRefs.current[routeActiveIdx];

      if (activeLink && navRef.current && routeActiveIdx >= 0) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        // Kiểm tra nếu getBoundingClientRect trả về giá trị hợp lệ
        if (linkRect.width > 0 && linkRect.height > 0) {
          const newPos = {
            left: linkRect.left - navRect.left,
            width: linkRect.width,
          };
          setUnderline(newPos);
          setActiveIdx(routeActiveIdx);
          currentPos.current = newPos;
          setIsInitialized(true);
          return true;
        }
      }
      return false;
    };

    // Thử khởi tạo ngay lập tức
    if (!initializeUnderline()) {
      // Nếu không thành công, đợi một chút rồi thử lại
      const timeoutId = setTimeout(() => {
        if (!initializeUnderline()) {
          // Nếu vẫn không thành công, thử với requestAnimationFrame
          requestAnimationFrame(() => {
            initializeUnderline();
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [navItems]);

  const handleLinkClick = (targetIdx: number) => {
    if (isAnimating || targetIdx === activeIdx || !isInitialized) return;

    const targetLink = linkRefs.current[targetIdx];
    if (!targetLink || !navRef.current) return;

    setIsAnimating(true);
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();
    const targetPos = {
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    };

    // Bước 1: Dài ra để bao phủ khoảng cách
    if (targetPos.left >= currentPos.current.left) {
      setUnderline({
        left: currentPos.current.left,
        width: targetPos.left - currentPos.current.left + targetPos.width,
      });
    } else {
      setUnderline({
        left: targetPos.left,
        width:
          currentPos.current.left - targetPos.left + currentPos.current.width,
      });
    }

    // Bước 2: Co lại về vị trí mới và update active
    setTimeout(() => {
      setUnderline(targetPos);
      setActiveIdx(targetIdx);
      currentPos.current = targetPos;

      setTimeout(() => {
        setIsAnimating(false);
      }, 150);
    }, 300);
  };

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
          onClick={() => handleLinkClick(idx)}
        >
          {item.label}
        </NavigationLink>
      ))}
      {isInitialized && (
        <div
          className={styles["nav-underline"]}
          style={{ left: underline.left, width: underline.width }}
        />
      )}
    </nav>
  );
}
