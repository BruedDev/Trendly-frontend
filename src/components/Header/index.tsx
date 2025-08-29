import Link from "next/link";
import styles from "./Header.module.scss";
import NavBar from "./NavBar";
import Logo from "./Logo";
import ActionsHeader from "../Actions/HeaderActions";
import Skeleton from "@/ui/Skeleton";

export default function Header({ isLoading = false }) {
  if (isLoading) {
    return (
      <header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Skeleton width="100px" height="32px" borderRadius="6px" />
          </div>
          <NavBar isLoading={true} />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Skeleton width="24px" height="24px" variant="circular" />
            <Skeleton width="24px" height="24px" variant="circular" />
            <Skeleton width="24px" height="24px" variant="circular" />
            <Skeleton width="24px" height="24px" variant="circular" />
            <Skeleton width="40px" height="24px" borderRadius="100px" />
          </div>
        </div>
      </header>
    );
  }

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
