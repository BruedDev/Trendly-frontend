import { Swiper, SwiperSlide as SwiperSlideItem } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ReactNode } from "react";

interface SwiperSlideProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  swiperProps?: React.ComponentProps<typeof Swiper>;
  transitionSpeed?: number;
}

function SwiperSlide<T>({
  data,
  renderItem,
  swiperProps,
  transitionSpeed,
}: SwiperSlideProps<T>) {
  return (
    <Swiper
      {...swiperProps}
      speed={transitionSpeed}
      modules={[Autoplay, Pagination]}
    >
      {data.map((item, idx) => (
        <SwiperSlideItem key={idx}>{renderItem(item, idx)}</SwiperSlideItem>
      ))}
    </Swiper>
  );
}

export default SwiperSlide;
