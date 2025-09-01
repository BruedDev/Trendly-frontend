// Props for ProductImage component
export interface ProductImageProps {
  product: Product;
  isHover: boolean;
  activeColorImage?: ProductImage | null;
  showActions?: boolean;
  activeColor?: number | null;
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
  image?: {
    asset: {
      url: string;
      alt?: string;
    };
    alt: string;
  };
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

// ===== CART TYPES =====

// Cart selected color interface
export interface CartSelectedColor {
  colorCode: string;
  image?: {
    asset?: {
      url: string;
      alt?: string;
    };
    alt?: string;
  } | null;
}

// Cart product interface (extends Product but with optional fields)
export interface CartProduct extends Omit<Product, '_id'> {
  _id?: string;
}

// Cart stock information
export interface CartStockInfo {
  inStock: boolean;
  availableQuantity: number;
}

// Main CartItem interface
export interface CartItem {
  productId: string;
  colorCode: string;
  quantity: number;
  selectedColor?: CartSelectedColor;
  product?: CartProduct;
  stockInfo?: CartStockInfo;
}

// Full Cart interface
export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
}

// Cart API response interface
export interface CartResponse {
  cart: CartItem[];
  total: number;
}

// Cart API request interfaces
export interface AddToCartRequest {
  productId: string;
  colorCode: string;
}

export interface UpdateQuantityRequest {
  productId: string;
  colorCode: string;
  quantity: number;
}

export interface RemoveItemRequest {
  productId: string;
  colorCode: string;
}

// General cart API response
export interface CartApiResponse {
  success?: boolean;
  cart?: Cart | CartItem[];
  total?: number;
  error?: string;
  details?: string;
  availableQuantity?: number;
}

// useGetCart hook return type
export interface UseGetCartReturn {
  cart: CartItem[] | null;
  loading: boolean;
  error: string | null;
  total: number;
  increaseQuantity: (productId: string, colorCode: string) => Promise<void>;
  decreaseQuantity: (productId: string, colorCode: string) => Promise<void>;
  removeItem: (productId: string, colorCode: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}