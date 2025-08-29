import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Product
 *
 *
 */
export interface Product extends SanityDocument {
  _type: "product";

  /**
   * Màu sắc — `array`
   *
   *
   */
  colors?: Array<
    SanityKeyed<{
      /**
       * Mã màu — `string`
       *
       *
       */
      colorCode?: string;

      /**
       * Hình minh họa — `image`
       *
       *
       */
      image?: {
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      };

      /**
       * Tồn kho màu này (Quantity) — `number`
       *
       * Số lượng tồn kho riêng cho màu này.
       */
      quantity?: number;
    }>
  >;

  /**
   * Product Name — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Product Image — `object`
   *
   *
   */
  thumbnail?: {
    _type: "thumbnail";
    /**
     * Default Image — `image`
     *
     *
     */
    defaultImage?: {
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alternative Text — `string`
       *
       * Important for accessibility and SEO
       */
      alt?: string;
    };

    /**
     * Hover Image — `image`
     *
     *
     */
    hoverImage?: {
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alternative Text — `string`
       *
       * Important for accessibility and SEO
       */
      alt?: string;
    };
  };

  /**
   * Price — `number`
   *
   *
   */
  price?: number;

  /**
   * Original Price — `number`
   *
   * Price before discount (optional)
   */
  originalPrice?: number;

  /**
   * Categories — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;

  /**
   * Description — `text`
   *
   *
   */
  description?: string;

  /**
   * New Product — `boolean`
   *
   *
   */
  isNew?: boolean;

  /**
   * Bestseller — `boolean`
   *
   *
   */
  isBestseller?: boolean;

  /**
   * In Stock — `boolean`
   *
   *
   */
  inStock?: boolean;

  /**
   * Mã sản phẩm (MSP) — `string`
   *
   * Mã sản phẩm gồm 8 số, tự động sinh khi tạo mới.
   */
  msp?: string;
}

/**
 * Category Group
 *
 *
 */
export interface CategoryGroup extends SanityDocument {
  _type: "categoryGroup";

  /**
   * Tên nhóm danh mục — `string`
   *
   *
   */
  title?: string;

  /**
   * Đường dẫn — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Mô tả — `text`
   *
   *
   */
  description?: string;

  /**
   * Danh sách danh mục con — `array`
   *
   *
   */
  categories?: Array<SanityKeyedReference<Category>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Tên danh mục nhỏ — `string`
   *
   *
   */
  title?: string;

  /**
   * Đường dẫn — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Mô tả — `text`
   *
   *
   */
  description?: string;
}

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Body — `array`
   *
   *
   */
  body?: Array<SanityKeyedReference<Sections>>;
}

/**
 * Sections
 *
 *
 */
export interface Sections extends SanityDocument {
  _type: "sections";

  /**
   * Section Name — `string`
   *
   *
   */
  sectionName?: string;

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Sections List — `array`
   *
   * Tập hợp các section như hero, product để dễ quản lý và tái sử dụng.
   */
  sections?: Array<
    | SanityKeyed<HeroSection>
    | SanityKeyed<ProductSection>
    | SanityKeyedReference<CategoryGroup>
  >;
}

export type HeroSection = {
  _type: "heroSection";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Subtitle — `string`
   *
   *
   */
  subtitle?: string;

  /**
   * Slider Images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alternative Text — `string`
       *
       * Important for accessibility and SEO
       */
      alt?: string;
    }>
  >;
};

export type ProductSection = {
  _type: "productSection";
  /**
   * Section Title — `string`
   *
   *
   */
  sectionTitle?: string;

  /**
   * Description — `text`
   *
   * Mô tả cho section sản phẩm
   */
  description?: string;

  /**
   * Display Type — `string`
   *
   *
   */
  displayType?: "new" | "bestseller" | "all";

  /**
   * Number of Products — `number`
   *
   *
   */
  limit?: number;
};

export type Documents = Product | CategoryGroup | Category | Page | Sections;
