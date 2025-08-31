// Props for ProductImage component
export interface ProductImageProps {
  product: Product;
  isHover: boolean;
  activeColorImage?: ProductImage | null;
  showActions?: boolean;
}
export interface ProductImageProps {
  product: Product;
  isHover: boolean;
  activeColorImage?: ProductImage | null;
}

// Props for ProductPrice component
export interface ProductPriceProps {
  product: Product;
}
// Props for ProductColors component
export interface ProductColorsProps {
  product: Product;
  activeColor: number | null;
  setActiveColor: (idx: number, image?: ProductImage | null) => void;
}
export interface ProductSectionType {
  _key: string;
  sectionTitle?: string;
  products?: Product[];
}

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
  msp: string;
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
  description?: string;
}

// Props for Product Card component
export interface ProductCardProps {
  product: Product;
  isHover: boolean;
  showActions?: boolean;
  onImageMouseEnter: () => void;
  onImageMouseLeave: () => void;
  activeColor: number | null;
  setActiveColor: (colorIdx: number | null, image?: ProductImage | null) => void;
  activeColorImage?: ProductImage | null;
}
export interface ProductCardProps {
  product: Product;
  isHover: boolean;
  onImageMouseEnter: () => void;
  onImageMouseLeave: () => void;
  activeColor: number | null;
  setActiveColor: (colorIdx: number | null, image?: ProductImage | null) => void;
  activeColorImage?: ProductImage | null;
}

export interface ProductHeaderProps {
  title: string;
  description?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}
