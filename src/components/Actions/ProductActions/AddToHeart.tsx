import ButtonProduct from "@/ui/ButtonProduct";
import { IoIosHeartEmpty } from "react-icons/io";
import Tooltip from "@/ui/Tooltip";

export default function AddToHeartProduct() {
  return (
    <Tooltip title="yêu thích" arrow="left">
      <ButtonProduct variant="addToHeart">
        <IoIosHeartEmpty />
      </ButtonProduct>
    </Tooltip>
  );
}
