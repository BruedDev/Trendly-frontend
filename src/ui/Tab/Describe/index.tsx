import React from "react";
import styles from "./Describe.module.scss";
import { ProductProps } from "@/types/Products_section";

export default function DescribeTab({ product }: ProductProps) {
  return (
    <div className={styles.tabPane}>
      <h3 className={styles.title}>
        {product.title} {product.msp}
      </h3>
      {product.description && (
        <>
          {product.description.subtitle && (
            <p className={styles.subtitle}>{product.description.subtitle}</p>
          )}
          {product.description.mainDescription && (
            <p className={styles.mainDescription}>
              {product.description.mainDescription}
            </p>
          )}
          {product.description.details &&
            product.description.details.length > 0 && (
              <ul className={styles.detailsList}>
                {product.description.details.map(
                  (detail: { label: string; value: string }, idx: number) => (
                    <li key={idx}>
                      <strong>{detail.label}:</strong> {detail.value}
                    </li>
                  )
                )}
              </ul>
            )}
          {product.description.styling &&
            product.description.styling.length > 0 && (
              <div className={styles.stylingSection}>
                <strong>Phong cách gợi ý:</strong>
                <ul>
                  {product.description.styling.map(
                    (style: string, idx: number) => (
                      <li key={idx}>{style}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          {product.description.tags && product.description.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <strong>Tags:</strong>
              <ul>
                {product.description.tags.map((tag: string, idx: number) => (
                  <li key={idx}>#{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
