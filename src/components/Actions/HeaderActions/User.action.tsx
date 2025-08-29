import Tooltip from "@/ui/Tooltip";
import { CiUser } from "react-icons/ci";

export default function UserComponent() {
  return (
    <Tooltip title="Đăng nhập" arrow="top-center">
      <button data-original-title="Đăng nhập">
        <CiUser />
      </button>
    </Tooltip>
  );
}
