"use client";

import NavBar from "./NavBar";
import styles from "./NavMenu.module.scss";
import { IoClose } from "react-icons/io5";
import { useOverlay } from "@/hooks/useOverlay";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import ActionsHeader from "../Actions/HeaderActions";

type NavMenuProps = {
  isOpen: boolean;
};

export default function NavMenu({ isOpen }: NavMenuProps) {
  const { closeOverlay } = useOverlay();
  const { user } = useUser();

  return (
    <nav
      className={isOpen ? `${styles.navMenu} ${styles.open}` : styles.navMenu}
    >
      {isOpen && (
        <>
          <div className={styles.header}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <Image
                  src={user?.avatar ?? ""}
                  alt="User Avatar"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.avatarInfo}>
                <p className={styles.title}>Tài khoản</p>
                <p className={styles.fullName}>Xin chào {user?.fullName}</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={closeOverlay}
              aria-label="Đóng menu"
            >
              <IoClose />
            </button>
          </div>
          <div className={styles.navList}>
            <NavBar className={styles.nav} />
            <ActionsHeader type={"theme"} />
          </div>
        </>
      )}
    </nav>
  );
}
