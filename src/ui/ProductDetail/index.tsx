import type { ProductProps } from "@/types/Products_section";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import styles from "./ProductDetail.module.scss";
import SiderBar from "./siderBar";
import ImageMain from "./imageMain";
import Info from "./info";
import Tabs from "./Tabs";

interface ProductDetailUIProps extends ProductProps {
  currentImages: string[];
  selectedImageIndex: number;
  onThumbnailClick: (index: number) => void;
  sizes: string[];
  selectedSize: string | null;
  onSizeClick: (size: string) => void;
  activeColor: number | null;
  setActiveColor: (
    colorIdx: number | null,
    image?: ProductImageType | null
  ) => void;
  activeColorImage: ProductImageType | null;
    isPreview?: boolean; // Added prop for preview functionality
}

export default function ProductDetailUI({
  product,
  currentImages,
  selectedImageIndex,
  onThumbnailClick,
  sizes,
  selectedSize,
  onSizeClick,
  activeColor,
  setActiveColor,
  activeColorImage,
    isPreview = false, // Default value for isPreview
}: ProductDetailUIProps) {
  const handleImageChange = (index: number) => {
    onThumbnailClick(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {!isPreview && (
          <div className={styles.siderBar}>
            <SiderBar
              currentImages={currentImages}
              selectedImageIndex={selectedImageIndex}
              onThumbnailClick={handleImageChange}
            />
          </div>
        )}
        <div className={styles.imageMain}>
          <ImageMain
            currentImages={currentImages}
            selectedImageIndex={selectedImageIndex}
            onImageChange={handleImageChange}
          />
        </div>
        <div className={styles.info}>
            <Info
              product={product}
              sizes={sizes}
              selectedSize={selectedSize}
              onSizeClick={onSizeClick}
              activeColor={activeColor}
              setActiveColor={setActiveColor}
              activeColorImage={activeColorImage}
              isPreview={isPreview} // Pass isPreview prop to Info component
            />
        </div>
      </div>
      {!isPreview && (
        <div className={styles.describe}>
          <Tabs product={product} />
        </div>
      )}
    </div>
  );
}
