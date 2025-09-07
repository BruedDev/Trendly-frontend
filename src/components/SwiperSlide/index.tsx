import { Swiper, SwiperSlide as SwiperSlideItem } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ReactNode, forwardRef, ForwardedRef } from "react";
import { Swiper as SwiperType } from "swiper";

interface SwiperSlideProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  swiperProps?: React.ComponentProps<typeof Swiper>;
  transitionSpeed?: number;
}

const SwiperSlide = forwardRef(function SwiperSlide<T>(
  { data, renderItem, swiperProps, transitionSpeed }: SwiperSlideProps<T>,
  ref: ForwardedRef<SwiperType>
) {
  return (
    <Swiper
      {...swiperProps}
      speed={transitionSpeed}
      modules={[Autoplay, Pagination]}
      onSwiper={(swiper) => {
        if (typeof ref === "function") {
          ref(swiper);
        } else if (ref) {
          ref.current = swiper;
        }
        if (swiperProps?.onSwiper) {
          swiperProps.onSwiper(swiper);
        }
      }}
    >
      {data.map((item, idx) => (
        <SwiperSlideItem key={idx}>{renderItem(item, idx)}</SwiperSlideItem>
      ))}
    </Swiper>
  );
}) as <T>(
  props: SwiperSlideProps<T> & { ref?: ForwardedRef<SwiperType> }
) => React.ReactElement;

export default SwiperSlide;
