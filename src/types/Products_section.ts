
export interface ProductColor {
  colorCode: string;
  image?: { asset?: { url?: string }; alt?: string };
}

export interface ProductCategory {
  title: string;
  slug: { current: string };
  image?: { asset?: { url?: string }; alt?: string };
}

export interface ProductImage {
  asset?: { url?: string };
  alt?: string;
}

export interface ProductThumbnail {
  defaultImage?: ProductImage;
  hoverImage?: ProductImage;
}

export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  thumbnail?: ProductThumbnail;
  categories?: ProductCategory[];
  colors?: ProductColor[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
}

export interface ProductSectionProps {
  title: string;
  products: Product[];
}