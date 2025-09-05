"use client";

import Image from "next/image";
import SwiperSlide from "@/components/SwiperSlide";
import { getTimeSpeed } from "@/utils/getTimeSpeed";
import styles from "./HeroSection.module.scss";
import { BannerSection } from "@/types/Hero_section";

export default function HeroSection({ data }: { data?: BannerSection }) {
  const images = data?.images?.filter((img) => img?.asset?.url) || [];

  return (
    <div className={styles.container}>
      {images.length === 0 ? (
        <div className={styles.imageWrapper}>
          <Image
            src="/images/hero.avif"
            alt="Hero static"
            width={1000}
            height={1000}
            priority
            className={styles.image}
          />
        </div>
      ) : (
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
          transitionSpeed={getTimeSpeed(800)}
        />
      )}
    </div>
  );
}
