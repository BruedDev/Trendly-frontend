import ButtonProduct from "@/ui/ButtonProduct";
import { GoHeart } from "react-icons/go";
// , GoHeartFill
import Tooltip from "@/components/Tooltip";
import styles from "./ProductActions.module.scss";

export default function AddToHeartProduct() {
  return (
    <Tooltip title="yêu thích" arrow="left">
      <ButtonProduct variant="addToHeart">
        <span className={styles.addToHeart__icon}>
          <GoHeart className={styles.icon} />
        </span>
      </ButtonProduct>
    </Tooltip>
  );
}
