import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/ui/Tooltip";
import { IoIosHeartEmpty } from "react-icons/io";

export default function HeartComponent() {
  return (
    <Tooltip title="Danh sách yêu thích" arrow="top-center">
      <button data-original-title="Danh sách yêu thích" className="relative">
        <CircleQuantity quantity={0} />
        <IoIosHeartEmpty />
      </button>
    </Tooltip>
  );
}
