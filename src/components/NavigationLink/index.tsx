import React from "react";
import Link from "next/link";
import { NavigationLinkProps } from "@/types/NavigationLink";

const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  children,
  active = false,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`${className} ${active ? "nav-active" : ""}`.trim()}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
