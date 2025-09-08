import Image from "next/image";
import { getSanityImageUrl } from "@/utils/getSanityImageUrl";
import { ProductImageProps } from "@/types/Products_section";
import ActionsProduct from "@/components/Actions/ProductActions";
import styles from "./Product.module.scss";
import AddToHeartProduct from "@/components/Actions/ProductActions/AddToHeart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

export default function ProductImage({
  product,
  isHover,
  activeColorImage,
  showActions,
  activeColor,
  sectionId,
}: ProductImageProps & {
  showActions?: boolean;
  sectionId?: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const defaultImg = activeColorImage || product.thumbnail?.defaultImage;
  const hoverImg = product.thumbnail?.hoverImage;
  const defaultUrl = getSanityImageUrl(defaultImg);
  const hoverUrl = getSanityImageUrl(hoverImg);

  // Tạo unique ID với sectionId
  const imageId = sectionId
    ? `product-image-${sectionId}-${product._id}`
    : `product-image-${product._id}`;

  if (!defaultUrl) return null;

  const handleDefaultImageLoad = () => {
    setImageLoaded(true);
  };

  const handleHoverImageLoad = () => {
    setHoverImageLoaded(true);
  };

  // Đảm bảo actions chỉ hiện khi image đã load
  const canShowActions = imageLoaded && (!hoverUrl || hoverImageLoaded);

  if (!hoverUrl) {
    return (
      <div className={styles.imageContainer} id={imageId}>
        <Image
          src={defaultUrl}
          alt={defaultImg?.alt || product.title}
          className={styles.productImage}
          width={1000}
          height={1000}
          onLoad={handleDefaultImageLoad}
          priority
        />
        {/* Actions chỉ hiện khi image đã load */}
        {canShowActions && (
          <div className={styles.heartIcon}>
            <AddToHeartProduct />
            {isMobile && (
              <ActionsProduct
                type="cart"
                product={product}
                activeColorIdx={activeColor}
                selectedSize=""
                activeColorImage={activeColorImage}
                sectionId={sectionId}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.imageContainer} id={imageId}>
      {/* Actions overlay */}
      {canShowActions && (
        <div className={styles.heartIcon}>
          <AddToHeartProduct />
          {isMobile && (
            <ActionsProduct
              type="cart"
              product={product}
              activeColorIdx={activeColor}
              selectedSize=""
              activeColorImage={activeColorImage}
              sectionId={sectionId}
            />
          )}
        </div>
      )}

      {/* Default Image */}
      <Image
        src={defaultUrl}
        alt={defaultImg?.alt || product.title}
        className={`${styles.productImage} ${styles.defaultImage} ${
          isHover ? styles.hidden : ""
        }`}
        width={1000}
        height={1000}
        onLoad={handleDefaultImageLoad}
        priority
      />

      {/* Hover Image */}
      <Image
        src={hoverUrl}
        alt={hoverImg?.alt || product.title}
        className={`${styles.productImage} ${styles.hoverImage} ${
          isHover ? styles.visible : ""
        }`}
        width={1000}
        height={1000}
        onLoad={handleHoverImageLoad}
        priority
      />

      {/* Desktop Actions Overlay */}
      <div
        className={`${styles.actionsOverlay} ${
          showActions ? styles.visible : ""
        }`}
      >
        {!isMobile && canShowActions && (
          <ActionsProduct
            type="cart preview"
            product={product}
            activeColorIdx={activeColor}
            selectedSize=""
            activeColorImage={activeColorImage}
            sectionId={sectionId}
          />
        )}
      </div>
    </div>
  );
}
