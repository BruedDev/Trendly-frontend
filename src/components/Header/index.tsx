import Link from "next/link";
import styles from "./Header.module.scss";
import NavBar from "./NavBar";
import Logo from "./Logo";
import ActionsHeader from "../Actions/HeaderActions";
import { IoIosMenu } from "react-icons/io";
import IsOpenButton from "@/components/isOpenButton";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <IsOpenButton
          className={styles.menuButton}
          componentToOpen={<NavMenu isOpen={true} />}
          aria-label="Open menu"
          scope="global"
        >
          <IoIosMenu />
        </IsOpenButton>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
        <NavBar className={styles.desktopNavBar} />
        <ActionsHeader removeResponsive={["search", "user", "theme"]} />
      </div>
    </header>
  );
}
