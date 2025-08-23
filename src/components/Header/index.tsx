import Link from "next/link";
import styles from "./Header.module.scss";
import NavBar from "./NavBar";
import Logo from "./Logo";
import ActionsComponent from "../Actions";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
        <NavBar />
        <ActionsComponent />
      </div>
    </header>
  );
}
