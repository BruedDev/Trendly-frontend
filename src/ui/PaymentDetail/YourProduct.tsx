import Image from "next/image";
import { ProductInToken } from "@/types/Pay";
import styles from "./YourProduct.module.scss";

interface YourProductProps {
  products: ProductInToken[];
}

export default function YourProduct({ products }: YourProductProps) {
  return (
    <div className={styles.content}>
      <h2>Sản phẩm của bạn</h2>
      <div>
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Image
              src={item.imageUrl ?? "/default-image.png"}
              width={100}
              height={100}
              alt="Product Image"
            />
            <p>
              <strong>Số lượng:</strong> {item.quantity}
            </p>
            <p>
              <strong>Size:</strong> {item.size}
            </p>
            <p>
              <strong>Màu:</strong> {item.color}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
