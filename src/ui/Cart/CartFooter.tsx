import ViewCart from "@/components/Actions/cart/ViewCart";
import styles from "./Cart.module.scss";
import { formatPrice } from "@/utils/formatNumber";
import { usePay } from "@/hooks/usePay";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import type { ProductPayload } from "@/types/Pay";
import type { CartItem } from "@/types/cart";

interface CartFooterProps {
  total: number;
  cart: CartItem[];
}

export default function CartFooter({ total, cart }: CartFooterProps) {
  const { payNow } = usePay();

  const handlePayCart = () => {
    const productPayload: ProductPayload[] = cart.map((item) => {
      let imgUrl: string | undefined = undefined;
      if (item.selectedColor?.image) {
        imgUrl = getSanityImageUrl(item.selectedColor.image);
      } else if (item.product?.colors) {
        const matchingColor = item.product.colors.find(
          (color) => color.colorCode === item.colorCode
        );
        if (matchingColor?.image) {
          imgUrl = getSanityImageUrl(matchingColor.image);
        }
      }
      if (!imgUrl && item.product?.thumbnail?.defaultImage) {
        imgUrl = getSanityImageUrl(item.product.thumbnail.defaultImage);
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        color: item.colorCode,
        imageUrl: imgUrl,
      };
    });
    payNow(productPayload);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.cartSummary}>
        <span className={styles.cartTotalLabel}>TỔNG TIỀN:</span>
        <span className={styles.cartTotal}>{formatPrice(total)}</span>
      </div>
      <div className={styles.cartActions}>
        <ViewCart className={styles.checkoutBtn} />
        <button className={styles.checkoutBtn} onClick={handlePayCart}>
          Thanh toán
        </button>
      </div>
    </div>
  );
}
