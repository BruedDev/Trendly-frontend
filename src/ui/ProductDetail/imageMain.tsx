import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ImageMain.module.scss";
import SwiperSlide from "@/components/SwiperSlide";
import { Swiper as SwiperType } from "swiper";

interface ImageMainProps {
  currentImages: string[];
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  classImage?: string;
}

export default function ImageMain({
  currentImages,
  selectedImageIndex,
  onImageChange,
  classImage,
}: ImageMainProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [canZoom, setCanZoom] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (
      swiperRef.current &&
      selectedImageIndex !== swiperRef.current.activeIndex
    ) {
      swiperRef.current.slideTo(selectedImageIndex);

      setCanZoom(false);
      setIsZoomed(false);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }

      setTimeout(() => {
        setCanZoom(true);
      }, 300);
    }
  }, [selectedImageIndex, hoverTimeout]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    if (!canZoom) return;

    const timeout = setTimeout(() => {
      if (canZoom) {
        setIsZoomed(true);
      }
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsZoomed(false);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCanZoom(false);
    setIsZoomed(false);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    onImageChange(swiper.activeIndex);

    setTimeout(() => {
      setCanZoom(true);
      if (isMouseOver) {
        const timeout = setTimeout(() => {
          setIsZoomed(true);
        }, 300);
        setHoverTimeout(timeout);
      }
    }, 300);
  };

  const renderMainImage = (imageUrl: string, index: number) => (
    <div className={classImage ? classImage : styles.mainImageContainer}>
      <div
        className={`${styles.imageWrapper} ${isZoomed ? styles.zoomed : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={imageUrl}
          alt={`Product ${index}`}
          width={600}
          height={600}
          style={{ objectFit: "cover" }}
          className={styles.productImage}
        />

        {isZoomed && (
          <div
            className={styles.zoomOverlay}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.imageMain}>
      {currentImages && currentImages.length > 0 && (
        <SwiperSlide
          ref={swiperRef}
          data={currentImages}
          renderItem={renderMainImage}
          swiperProps={{
            slidesPerView: 1,
            spaceBetween: 0,
            initialSlide: selectedImageIndex,
            onSlideChange: handleSlideChange,
          }}
        />
      )}
    </div>
  );
}
