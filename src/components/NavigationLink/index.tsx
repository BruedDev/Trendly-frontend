import React from "react";
import Link from "next/link";
import { NavigationLinkProps } from "@/types/NavigationLink";
import styles from "./NavigationLink.module.scss";
import clsx from "clsx";

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ href, children, active = false, className = "", onClick }, ref) => {
    return (
      <Link
        href={href}
        ref={ref}
        onClick={onClick}
        className={clsx(styles["nav-link"], className, {
          [styles["nav-active"]]: active,
        })}
      >
        <span className={styles["nav-text"]} data-text={children as string}>
          {children}
        </span>
      </Link>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export default NavigationLink;
