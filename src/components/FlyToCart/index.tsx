"use client";

import { useEffect, useState } from "react";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import usePositionXY from "@/hooks/usePositionXY";
import styles from "./FlyToCart.module.scss";

interface FlyToCartProps {
  isActive: boolean;
  productImage: ProductImageType | null;
  startElementId: string;
  targetElementId: string;
  onComplete: () => void;
}

export default function FlyToCart({
  isActive,
  productImage,
  startElementId,
  targetElementId,
  onComplete,
}: FlyToCartProps) {
  const [mounted, setMounted] = useState(false);
  const { calculateDistance } = usePositionXY();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function để play âm thanh
  const playSound = () => {
    try {
      const audio = new Audio("/sound/ting.mp3");
      audio.volume = 0.5;
      audio.play().catch((error) => {
        console.log("Could not play sound:", error);
      });
    } catch (error) {
      console.log("Sound not available:", error);
    }
  };

  useEffect(() => {
    if (!isActive || !productImage || !mounted) return;

    const startElement = document.getElementById(startElementId);
    const targetElement = document.getElementById(targetElementId);

    if (!startElement || !targetElement) {
      console.warn(
        `FlyToCart: Could not find elements with IDs: ${startElementId}, ${targetElementId}`
      );
      onComplete();
      return;
    }

    const calculation = calculateDistance(startElement, targetElement);
    if (!calculation) {
      console.warn("FlyToCart: Could not calculate distance");
      onComplete();
      return;
    }

    const imageUrl = getSanityImageUrl(productImage);
    if (!imageUrl) {
      console.warn("FlyToCart: Could not get image URL");
      onComplete();
      return;
    }

    const preloadImage = new Image();
    preloadImage.onload = () => {
      startAnimation(imageUrl);
    };
    preloadImage.onerror = () => {
      console.warn("FlyToCart: Image failed to load");
      onComplete();
    };
    preloadImage.src = imageUrl;

    const startAnimation = (imageUrl: string) => {
      // Play sound khi bắt đầu animation
      playSound();

      // Add gentle effect to cart
      targetElement.classList.add(styles.cartReceiving);

      // Create animation element
      const flyElement = document.createElement("div");
      flyElement.className = styles.flyToCartElement;

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = productImage.alt || "Product";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.loading = "eager";

      flyElement.appendChild(img);
      document.body.appendChild(flyElement);

      // Set initial position
      flyElement.style.position = "fixed";
      flyElement.style.left = `${calculation.from.left}px`;
      flyElement.style.top = `${calculation.from.top}px`;
      flyElement.style.width = `${calculation.from.width}px`;
      flyElement.style.height = `${calculation.from.height}px`;
      flyElement.style.zIndex = "9999";
      flyElement.style.pointerEvents = "none";
      flyElement.style.opacity = "1";

      // Simple, smooth animation
      const animate = () => {
        const duration = 700;
        const startTime = performance.now();

        const animateFrame = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth easing
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          // Simple curved path
          const deltaX =
            calculation.to.left +
            calculation.to.width / 2 -
            calculation.from.left -
            calculation.from.width / 2;
          const deltaY =
            calculation.to.top +
            calculation.to.height / 2 -
            calculation.from.top -
            calculation.from.height / 2;

          // Gentle arc
          const arcHeight = -Math.abs(deltaX + deltaY) * 0.2;
          const currentArcOffset = arcHeight * Math.sin(Math.PI * easeProgress);

          const currentX =
            calculation.from.left +
            calculation.from.width / 2 +
            deltaX * easeProgress;
          const currentY =
            calculation.from.top +
            calculation.from.height / 2 +
            deltaY * easeProgress +
            currentArcOffset;

          // Smooth scaling
          const currentScale = Math.max(1 - easeProgress * 2, 0.15);
          const currentWidth = Math.max(
            calculation.from.width * currentScale,
            24
          );
          const currentHeight = Math.max(
            calculation.from.height * currentScale,
            24
          );

          flyElement.style.left = `${currentX - currentWidth / 2}px`;
          flyElement.style.top = `${currentY - currentHeight / 2}px`;
          flyElement.style.width = `${currentWidth}px`;
          flyElement.style.height = `${currentHeight}px`;

          // Gradual fade with blur effect
          const fadeOpacity = 1 - easeProgress * 0.3;
          const blurAmount = easeProgress * 2;
          flyElement.style.opacity = `${fadeOpacity}`;
          flyElement.style.filter = `blur(${blurAmount}px)`;

          if (progress < 1) {
            requestAnimationFrame(animateFrame);
          } else {
            flyElement.classList.add(styles.fadeOut);
            setTimeout(cleanup, 400);
          }
        };

        requestAnimationFrame(animateFrame);
      };

      // Start animation with small delay to ensure image is rendered
      const startTimeout = setTimeout(animate, 100);

      const cleanup = () => {
        targetElement.classList.remove(styles.cartReceiving);

        if (document.body.contains(flyElement)) {
          document.body.removeChild(flyElement);
        }
        onComplete();
      };

      const backupTimeout = setTimeout(cleanup, 1500);

      return () => {
        clearTimeout(startTimeout);
        clearTimeout(backupTimeout);
        cleanup();
      };
    };
  }, [
    isActive,
    productImage,
    startElementId,
    targetElementId,
    mounted,
    calculateDistance,
    onComplete,
  ]);

  return null;
}
