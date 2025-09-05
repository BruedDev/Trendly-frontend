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

    // Tạo element cho animation
    const flyElement = document.createElement("div");
    flyElement.className = styles.flyToCartElement;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = productImage.alt || "Product";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";

    flyElement.appendChild(img);
    document.body.appendChild(flyElement);

    // Set vị trí ban đầu
    flyElement.style.position = "fixed";
    flyElement.style.left = `${calculation.from.left}px`;
    flyElement.style.top = `${calculation.from.top}px`;
    flyElement.style.width = `${calculation.from.width}px`;
    flyElement.style.height = `${calculation.from.height}px`;
    flyElement.style.zIndex = "9999";
    flyElement.style.pointerEvents = "none";
    flyElement.style.borderRadius = "8px";
    flyElement.style.overflow = "hidden";
    flyElement.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    flyElement.style.opacity = "1";

    // Animation
    const animate = () => {
      flyElement.style.transition =
        "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      flyElement.style.left = `${
        calculation.to.left + calculation.to.width / 2 - 15
      }px`;
      flyElement.style.top = `${
        calculation.to.top + calculation.to.height / 2 - 15
      }px`;
      flyElement.style.width = "30px";
      flyElement.style.height = "30px";
      flyElement.style.opacity = "0";
    };

    requestAnimationFrame(animate);

    const cleanup = () => {
      if (document.body.contains(flyElement)) {
        document.body.removeChild(flyElement);
      }
      onComplete();
    };

    const timeoutId = setTimeout(cleanup, 800);

    return () => {
      clearTimeout(timeoutId);
      cleanup();
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
