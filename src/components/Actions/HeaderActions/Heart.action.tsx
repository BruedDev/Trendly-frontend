import CircleQuantity from "@/ui/CirclesCount";
import Tooltip from "@/components/Tooltip";
import { IoIosHeartEmpty } from "react-icons/io";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useRouter } from "next/navigation";

export default function HeartComponent() {
  const router = useRouter();
  const protectRoute = useProtectRoute();

  const handleOpenHeart = protectRoute(() => {
    router.push("/danh-sach-yeu-thich");
  });

  return (
    <Tooltip title="Danh sách yêu thích" arrow="top-center">
      <button
        data-original-title="Danh sách yêu thích"
        className="relative"
        onClick={handleOpenHeart}
      >
        <CircleQuantity quantity={0} />
        <IoIosHeartEmpty />
      </button>
    </Tooltip>
  );
}
