// components/CartComponent.tsx (hoặc file tương ứng)
import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/components/Tooltip";
import { IoCartOutline } from "react-icons/io5";
import { useCartCount } from "@/hooks/useCartCount";
import IsOpenButton from "@/components/isOpenButton";
import Cart from "@/ui/Cart";
import { useProtectRoute } from "@/hooks/useProtectRoute";

export default function CartComponent() {
  const { count } = useCartCount();
  const protectRoute = useProtectRoute();

  const handleOpenCart = protectRoute(() => {
    return true;
  });

  return (
    <Tooltip title="Giỏ hàng" arrow="top-center">
      <div
        id="cart-icon-target"
        className="relative w-full h-full flex items-center"
      >
        <IsOpenButton
          componentToOpen={<Cart />}
          scope="global visible"
          onClick={handleOpenCart}
        >
          <CircleQuantity quantity={count} />
          <IoCartOutline />
        </IsOpenButton>
      </div>
    </Tooltip>
  );
}
