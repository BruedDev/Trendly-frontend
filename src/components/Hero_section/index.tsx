"use client";

import Image from "next/image";
import SwiperSlide from "@/components/SwiperSlide";
import { getTimeSpeed } from "@/utils/getTimeSpeed";
import styles from "./HeroSection.module.scss";
import { BannerSection } from "@/types/Hero_section";

export default function HeroSection({ data }: { data?: BannerSection }) {
  if (!data || !data.images || data.images.length === 0) return null;

  const images = data.images.filter((img) => img?.asset?.url);

  return (
    <div className={styles.container}>
      <SwiperSlide
        data={images}
        renderItem={(image, index) => (
          <div className={styles.imageWrapper}>
            <Image
              src={image.asset!.url!}
              alt={image.alt || `slide ${index + 1}`}
              width={1000}
              height={1000}
              priority={index === 0}
              className={styles.image}
            />
          </div>
        )}
        swiperProps={{
          slidesPerView: 1,
          loop: true,
          autoplay: { delay: 5000 },
        }}
        transitionSpeed={getTimeSpeed(1000)}
      />
    </div>
  );
}
