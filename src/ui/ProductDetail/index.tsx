import type {
  ProductProps,
  RelatedProductsProps,
} from "@/types/Products_section";
import { ProductImage as ProductImageType } from "@/types/Products_section";
import styles from "./ProductDetail.module.scss";
import SiderBar from "./siderBar";
import ImageMain from "./imageMain";
import Info from "./info";
import Tabs from "./Tabs";
import RelatedProducts from "./relatedProducts";

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
  isPreview?: boolean;
  relatedProducts: RelatedProductsProps["products"];
}

export default function ProductDetailUI({
  product,
  relatedProducts,
  currentImages,
  selectedImageIndex,
  onThumbnailClick,
  sizes,
  selectedSize,
  onSizeClick,
  activeColor,
  setActiveColor,
  activeColorImage,
  isPreview = false,
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
            isPreview={isPreview}
          />
        </div>
      </div>
      {!isPreview && (
        <div className={styles.Tabs}>
          <Tabs product={product} />
        </div>
      )}

      <div className={styles.relatedProducts}>
        <RelatedProducts products={relatedProducts ?? []} />
      </div>
    </div>
  );
}
