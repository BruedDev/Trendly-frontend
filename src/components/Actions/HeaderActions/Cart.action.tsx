import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/ui/Tooltip";
import { IoCartOutline } from "react-icons/io5";
import { useCartCount } from "@/hooks/useCartCount";
import IsOpenButton from "@/components/isOpenButton";
import Cart from "@/ui/Cart";

export default function CartComponent() {
  const { count } = useCartCount();

  return (
    <Tooltip title="Giỏ hàng" arrow="top-center">
      <IsOpenButton componentToOpen={<Cart />}>
        <CircleQuantity quantity={count} />
        <IoCartOutline />
      </IsOpenButton>
    </Tooltip>
  );
}
