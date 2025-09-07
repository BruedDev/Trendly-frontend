import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./SiderBar.module.scss";
import { useMediaQuery } from "@/hooks/useMediaQuery";
// Thêm thư viện xử lý cử chỉ
import { useDrag } from "@use-gesture/react";

interface SiderBarProps {
  currentImages: string[];
  selectedImageIndex: number;
  onThumbnailClick: (index: number) => void;
}

export default function SiderBar({
  currentImages,
  selectedImageIndex,
  onThumbnailClick,
}: SiderBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null); // Ref để điều khiển trực tiếp list
  const [scrollOffset, setScrollOffset] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // TOÀN BỘ LOGIC RESPONSIVE CỦA BẠN ĐƯỢC GIỮ NGUYÊN
  const isSmall700 = useMediaQuery("(max-width: 700px)");
  const isSmall685 = useMediaQuery("(max-width: 685px)");
  const isSmall600 = useMediaQuery("(max-width: 600px)");
  const isSmall560 = useMediaQuery("(max-width: 560px)");
  const isSmall475 = useMediaQuery("(max-width: 475px)");
  const isSmall400 = useMediaQuery("(max-width: 400px)");
  const isSmall375 = useMediaQuery("(max-width: 376px)");
  const isSmall325 = useMediaQuery("(max-width: 325px)");

  const ITEM_HEIGHT = 108;
  const VISIBLE_ITEMS = 5;
  const ITEM_WIDTH = 88;

  const getVisibleItemsMobile = () => {
    if (isSmall325) return 2.8;
    if (isSmall375) return 3.6;
    if (isSmall400) return 4;
    if (isSmall475) return 4;
    if (isSmall560) return 5.5;
    if (isSmall600) return 6;
    if (isSmall685) return 6.5;
    if (isSmall700) return 7;
    return 8;
  };

  const VISIBLE_ITEMS_MOBILE = getVisibleItemsMobile();

  // Tính toán giới hạn cuộn để dùng chung
  const maxScrollOffset = useMemo(() => {
    const totalItems = currentImages.length;
    if (isMobile) {
      if (totalItems <= VISIBLE_ITEMS_MOBILE) return 0;
      return (totalItems - VISIBLE_ITEMS_MOBILE) * ITEM_WIDTH;
    } else {
      if (totalItems <= VISIBLE_ITEMS) return 0;
      return (totalItems - VISIBLE_ITEMS) * ITEM_HEIGHT;
    }
  }, [currentImages.length, isMobile, VISIBLE_ITEMS_MOBILE]);

  // useEffect để TỰ ĐỘNG cuộn khi click chọn ảnh
  useEffect(() => {
    if (listRef.current) {
      // Luôn đảm bảo có transition cho việc cuộn tự động
      listRef.current.style.transition = "transform 0.3s ease";
    }
    if (selectedImageIndex === -1) return;

    let idealOffset;
    if (isMobile) {
      idealOffset = (selectedImageIndex - 1) * ITEM_WIDTH;
    } else {
      idealOffset = (selectedImageIndex - 2) * ITEM_HEIGHT;
    }

    const newScrollOffset = Math.max(0, Math.min(idealOffset, maxScrollOffset));
    setScrollOffset(newScrollOffset);
  }, [
    selectedImageIndex,
    currentImages.length,
    isMobile,
    VISIBLE_ITEMS_MOBILE,
    maxScrollOffset,
  ]);

  // LOGIC VUỐT CHO MOBILE
  const bind = useDrag(
    ({ down, movement: [mx], memo = scrollOffset }) => {
      if (!isMobile) return; // Chỉ hoạt động trên mobile

      // Tắt transition khi đang kéo để vuốt mượt, bật lại khi nhả tay
      if (listRef.current) {
        listRef.current.style.transition = down
          ? "none"
          : "transform 0.3s ease";
      }

      const newOffset = memo - mx; // Tính vị trí mới
      const clampedOffset = Math.max(0, Math.min(newOffset, maxScrollOffset)); // Giới hạn
      setScrollOffset(clampedOffset); // Cập nhật vị trí

      return down ? memo : clampedOffset;
    },
    { axis: "x" } // Chỉ cho phép vuốt ngang
  );

  if (!currentImages || currentImages.length === 0) {
    return (
      <div className={styles.siderBar_item}>
        <p>Không có hình ảnh</p>
      </div>
    );
  }

  // GIAO DIỆN JSX CỦA BẠN ĐƯỢC GIỮ NGUYÊN
  return (
    <div className={styles.siderBar_item}>
      <div
        ref={containerRef}
        className={styles.thumbnailContainer}
        style={{
          height: isMobile ? "100px" : `${VISIBLE_ITEMS * ITEM_HEIGHT}px`,
          overflow: "hidden",
        }}
      >
        <div
          // 1. Thêm ref và bind() vào đây
          ref={listRef}
          {...(isMobile ? bind() : {})} // Chỉ áp dụng bind() trên mobile
          className={styles.thumbnailList}
          style={{
            transform: isMobile
              ? `translateX(-${scrollOffset}px)`
              : `translateY(-${scrollOffset}px)`,
            transition: "transform 0.3s ease",
            // 2. Thêm touchAction để vuốt không bị xung đột (không ảnh hưởng giao diện)
            touchAction: isMobile ? "pan-y" : "auto",
          }}
        >
          {currentImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${
                selectedImageIndex === index ? styles.active : ""
              }`}
              onClick={() => onThumbnailClick(index)}
            >
              <Image
                src={imageUrl}
                alt={`Product ${index + 1}`}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
