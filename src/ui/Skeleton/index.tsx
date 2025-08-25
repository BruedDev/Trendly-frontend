import React from "react";
import styles from "./Skeleton.module.scss";

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  variant = "text",
  animation = "pulse",
  className = "",
  style = {},
  count = 1,
  ...props
}) {
  const skeletonStyle = {
    width,
    height,
    borderRadius: variant === "circular" ? "50%" : borderRadius,
    ...style,
  };

  const skeletonClass = [
    styles.skeleton,
    styles[`skeleton--${variant}`],
    styles[`skeleton--${animation}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (count > 1) {
    return (
      <div className={styles.skeletonGroup}>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className={skeletonClass}
            style={skeletonStyle}
            {...props}
          />
        ))}
      </div>
    );
  }

  return <div className={skeletonClass} style={skeletonStyle} {...props} />;
}
