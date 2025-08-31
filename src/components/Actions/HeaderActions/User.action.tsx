import Tooltip from "@/ui/Tooltip";
import { CiUser } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function UserComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/account");
  };

  return (
    <Tooltip title="Tài khoản" arrow="top-center">
      <button data-original-title="Tài khoản" onClick={handleClick}>
        <CiUser />
      </button>
    </Tooltip>
  );
}
