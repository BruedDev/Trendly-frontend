import React from "react";
import styles from "./Product.module.scss";
import { ProductHeaderProps } from "@/types/Products_section";

export default function ProductHeader({
  title,
  description,
}: ProductHeaderProps) {
  return (
    <div className={styles.wrapper_header}>
      <h2 className={`${styles.title} title-center`}>{title}</h2>
      <span className={`underline`}></span>
      <p className={`${styles.description}`}>
        {description || "Top trending tuần này"}
      </p>
    </div>
  );
}
