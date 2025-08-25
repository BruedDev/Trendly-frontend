"use client";

import React from "react";
import { ProductSectionProps } from "@/types/Products_section";
import Product from "@/ui/Product";

export default function ProductSection({
  title,
  products,
}: ProductSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
