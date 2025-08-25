import Image from "next/image";
import React from "react";
import { Product as ProductType } from "@/types/Products_section";

interface ProductProps {
  product: ProductType;
}

function Product({ product }: ProductProps) {
  return (
    <div style={{ border: "1px solid #eee", padding: 16, width: 220 }}>
      {product.thumbnail?.asset?.url && (
        <Image
          src={product.thumbnail.asset.url}
          alt={product.thumbnail.alt || product.title}
          style={{ objectFit: "cover", marginBottom: 8 }}
          width={1000}
          height={1000}
        />
      )}
      <h3>{product.title}</h3>
      <p>Giá: {product.price?.toLocaleString()} VNĐ</p>
      {product.originalPrice && (
        <p style={{ textDecoration: "line-through", color: "#888" }}>
          {product.originalPrice.toLocaleString()} VNĐ
        </p>
      )}
      {product.isNew && <span style={{ color: "green" }}>Sản phẩm mới</span>}
      {product.isBestseller && (
        <span style={{ color: "orange", marginLeft: 8 }}>Bán chạy</span>
      )}
    </div>
  );
}

export default Product;
