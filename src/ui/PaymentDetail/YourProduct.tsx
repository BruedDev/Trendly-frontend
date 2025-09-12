import Image from "next/image";
import { useState } from "react";
import { ProductInToken } from "@/types/Pay";
import { formatPrice } from "@/utils/formatNumber";
import styles from "./YourProduct.module.scss";
import { IoClose } from "react-icons/io5";

interface YourProductProps {
  products: ProductInToken[];
  onRemoveProduct: (
    productId: string,
    color: string,
    size: string
  ) => Promise<void>; // ✅ Thêm handler
}

export default function YourProduct({
  products,
  onRemoveProduct,
}: YourProductProps) {
  const [discountCode, setDiscountCode] = useState("");
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set()); // ✅ Tracking loading state

  // Tính toán giá
  const subtotal = products.reduce((sum, item) => sum + item.total, 0);
  const shippingFee = 0; // Miễn phí vận chuyển hoặc tính theo logic riêng
  const total = subtotal + shippingFee;

  const handleApplyDiscount = () => {
    // Logic áp dụng mã giảm giá
    console.log("Applying discount code:", discountCode);
  };

  // ✅ Handler xóa sản phẩm
  const handleRemoveItem = async (item: ProductInToken) => {
    const itemKey = `${item.productId}-${item.color}-${item.size}`;

    // Tránh spam click
    if (removingItems.has(itemKey)) return;

    try {
      // Đánh dấu đang xóa
      setRemovingItems((prev) => new Set(prev).add(itemKey));

      // Gọi handler từ parent
      await onRemoveProduct(item.productId, item.color, item.size);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      // Có thể hiển thị toast error ở đây
    } finally {
      // Bỏ đánh dấu đang xóa
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        {products.map((item, index) => {
          const itemKey = `${item.productId}-${item.color}-${item.size}`;
          const isRemoving = removingItems.has(itemKey);

          return (
            <div key={index} className={styles.productItem}>
              <div className={styles.productImage}>
                <Image
                  src={item.imageUrl || "/default-image.png"}
                  width={64}
                  height={64}
                  alt={item.name || "Product Image"}
                  className={styles.image}
                />
                <div className={styles.quantity}>{item.quantity}</div>
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  {item.name || "Tên sản phẩm"}
                </div>
                <div className={styles.productCode}>{item.msp}</div>
                <div className={styles.productCategory}>
                  {item.color} / {item.size}
                </div>
                <div className={styles.productBottomRow}>
                  <span className={styles.productPrice}>
                    {formatPrice(item.total)}
                  </span>
                </div>
              </div>
              <button
                className={styles.removeItem}
                onClick={() => handleRemoveItem(item)}
                disabled={isRemoving} // ✅ Disable khi đang xóa
                title="Xóa sản phẩm"
              >
                <IoClose />
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.discountSection}>
        <div className={styles.discountInput}>
          <input
            type="text"
            placeholder="Mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleApplyDiscount} className={styles.applyButton}>
            Sử dụng
          </button>
        </div>
      </div>

      <div className={styles.summarySection}>
        <div className={styles.summaryRow}>
          <span>Tạm tính</span>
          <span className={styles.amount}>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Phí vận chuyển</span>
          <span>{shippingFee === 0 ? "—" : formatPrice(shippingFee)}</span>
        </div>

        <div className={styles.totalRow}>
          <span>Tổng cộng</span>
          <div className={styles.totalPrice}>
            <span className={styles.amount}>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
