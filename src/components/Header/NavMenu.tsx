"use client";

import NavBar from "./NavBar";
import styles from "./NavMenu.module.scss";
import { IoClose } from "react-icons/io5";
import { useOverlay } from "@/hooks/useOverlay";

type NavMenuProps = {
  isOpen: boolean;
};

export default function NavMenu({ isOpen }: NavMenuProps) {
  const { closeOverlay } = useOverlay();

  return (
    <nav
      className={isOpen ? `${styles.navMenu} ${styles.open}` : styles.navMenu}
    >
      {isOpen && (
        <>
          <button
            className={styles.closeButton}
            onClick={closeOverlay}
            aria-label="Đóng menu"
          >
            <IoClose />
          </button>
          <NavBar className={styles.nav} />
        </>
      )}
    </nav>
  );
}
