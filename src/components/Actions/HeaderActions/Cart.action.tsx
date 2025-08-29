import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/ui/Tooltip";
import { IoCartOutline } from "react-icons/io5";
import { useCartCount } from "@/hooks/useCartCount";

export default function CartComponent() {
  const { count } = useCartCount();

  return (
    <Tooltip title="Giỏ hàng" arrow="top-center">
      <button data-original-title="Giỏ hàng" className="relative">
        <CircleQuantity quantity={count} />
        <IoCartOutline />
      </button>
    </Tooltip>
  );
}
