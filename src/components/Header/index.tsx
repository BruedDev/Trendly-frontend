import Link from "next/link";
import styles from "./Header.module.scss";
import NavBar from "./NavBar";
import Logo from "./Logo";
import ActionsHeader from "../Actions/HeaderActions";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          <Logo />
        </Link>
        <NavBar isLoading={false} />
        <ActionsHeader />
      </div>
    </header>
  );
}
