import { Swiper, SwiperSlide as SwiperSlideItem } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ReactNode } from "react";
import styles from "./SwiperSlide.module.scss";

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
    <Swiper {...swiperProps} speed={transitionSpeed} modules={[Autoplay]}>
      {data.map((item, idx) => (
        <SwiperSlideItem key={idx}>{renderItem(item, idx)}</SwiperSlideItem>
      ))}
    </Swiper>
  );
}

export default SwiperSlide;
