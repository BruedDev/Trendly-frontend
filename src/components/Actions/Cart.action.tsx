import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/ui/Tooltip";
import { IoCartOutline } from "react-icons/io5";

export default function CartComponent() {
  return (
    <Tooltip title="Giỏ hàng" arrow="top-center">
      <button data-original-title="Giỏ hàng" className="relative">
        <CircleQuantity quantity={1} />
        <IoCartOutline />
      </button>
    </Tooltip>
  );
}
