import React from "react";
import Link from "next/link";
import { NavigationLinkProps } from "@/types/NavigationLink";
import styles from "./NavigationLink.module.scss";

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ href, children, active = false, className = "", onClick }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <Link href={href} passHref legacyBehavior>
        <a
          ref={ref}
          className={`${styles["nav-link"]} ${className} ${
            active ? styles["nav-active"] : ""
          }`.trim()}
          onClick={handleClick}
        >
          <span className={styles["nav-text"]} data-text={children}>
            {children}
          </span>
        </a>
      </Link>
    );
  }
);

export default NavigationLink;
