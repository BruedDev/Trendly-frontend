import CartComponent from "./Cart.action";
import HeartComponent from "./Heart.action";
import SearchAction from "./Seach.action";
import UserComponent from "./User.action";
import styles from "./Actions.module.scss";
import ThemeToggle from "../../ThemeToggle";

export default function ActionsHeader() {
  const actions = [
    <SearchAction key="search" />,
    <UserComponent key="user" />,
    <HeartComponent key="heart" />,
    <CartComponent key="cart" />,
    <ThemeToggle key="theme" />,
  ];

  return (
    <ul className={styles.headerActions} aria-label="User actions">
      {actions.map((Action, idx) => (
        <li className={styles.headerActions_item} key={idx}>
          {Action}
        </li>
      ))}
    </ul>
  );
}
