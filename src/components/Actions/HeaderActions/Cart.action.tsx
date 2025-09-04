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
      <IsOpenButton
        componentToOpen={<Cart />}
        scope="global visible"
        onClick={handleOpenCart}
      >
        <CircleQuantity quantity={count} />
        <IoCartOutline />
      </IsOpenButton>
    </Tooltip>
  );
}
