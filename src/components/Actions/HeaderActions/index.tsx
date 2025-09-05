"use client";

import CartComponent from "./Cart.action";
import HeartComponent from "./Heart.action";
import SearchAction from "./Seach.action";
import UserComponent from "./User.action";
import styles from "./Actions.module.scss";
import ThemeToggle from "../../ThemeToggle";

const ACTIONS = [
  { key: "search", component: SearchAction },
  { key: "user", component: UserComponent },
  { key: "heart", component: HeartComponent },
  { key: "cart", component: CartComponent },
  { key: "theme", component: ThemeToggle },
];

export default function ActionsHeader({
  removeResponsive,
  type,
}: { removeResponsive?: string[]; type?: string } = {}) {
  let actionsToRender = ACTIONS;
  if (type) {
    const keys = type
      .split(/\s+/)
      .map((k) => k.trim())
      .filter(Boolean);
    actionsToRender = ACTIONS.filter(({ key }) => keys.includes(key));
  }
  return (
    <ul className={styles.headerActions} aria-label="User actions">
      {actionsToRender.map(({ key, component: Component }) => {
        const hideOnMobile =
          Array.isArray(removeResponsive) && removeResponsive.includes(key);
        return (
          <li
            className={
              styles.headerActions_item +
              (hideOnMobile ? " " + styles["hide-on-mobile"] : "")
            }
            key={key}
          >
            <Component />
          </li>
        );
      })}
    </ul>
  );
}
