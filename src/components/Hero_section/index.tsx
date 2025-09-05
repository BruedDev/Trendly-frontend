"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
const SwiperSlide = dynamic(() => import("@/components/SwiperSlide"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
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
        renderItem={(image, index) => {
          const img = image as import("@/types/Hero_section").ImageType;
          return (
            <div className={styles.imageWrapper}>
              <Image
                src={img.asset?.url || ""}
                alt={img.alt || `slide ${index + 1}`}
                width={1000}
                height={1000}
                priority={index === 0}
                className={styles.image}
              />
            </div>
          );
        }}
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
