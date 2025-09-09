// Sản phẩm liên quan (Related Product)
export interface RelatedProduct {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  thumbnail?: ProductThumbnail;
  msp: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
}

export interface RelatedProductsProps {
  products: RelatedProduct[];
}
// ===== CUSTOM TYPES =====
export type ActiveColor = number | null;

// Props for ProductImage component
export interface ProductImageProps {
  product: Product;
  isHover: boolean;
  activeColorImage?: ProductImage | null;
  showActions?: boolean;
  activeColor?: number | null;
}

// Props for ProductPrice component
export interface ProductProps {
  product: Product;
}

// Props for ProductColors component
export interface ProductColorsProps {
  product: Product;
  activeColor: number | null;
  setActiveColor: (idx: number, image?: ProductImage | null) => void;
  classButton?: string;
}

export interface ProductSectionType {
  _key: string;
  sectionTitle?: string;
  products?: Product[];
}

// CẬP NHẬT: Thêm sizes vào ProductColor
export interface ProductColor {
  colorCode: string;
  image?: {
    asset: {
      url: string;
      alt?: string;
    };
    alt: string;
  };
  detailImages?: Array<{
    asset?: {
      url: string;
      alt?: string;
    };
    alt?: string;
  }>;
  sizes?: Array<{
    size: string;
    quantity: number;
  }>;
}

export interface ProductCategory {
  _id: string;
  title: string;
  slug: { current: string };
  image?: { asset?: { url?: string }; alt?: string };
  type?: string;
  material?: string;
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
  type?: string;
  description?: {
    subtitle?: string;
    mainDescription?: string;
    details?: Array<{
      label: string;
      value: string;
    }>;
    styling?: string[];
    tags?: string[];
  };
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
  setActiveColor: (
    colorIdx: number | null,
    image?: ProductImage | null
  ) => void;
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
export interface CartProduct extends Omit<Product, "_id"> {
  _id?: string;
}

// Cart stock information
export interface CartStockInfo {
  inStock: boolean;
  availableQuantity: number;
}

// CẬP NHẬT: Main CartItem interface - thêm size
export interface CartItem {
  productId: string;
  colorCode: string;
  size: string; // THÊM size field
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

// CẬP NHẬT: Cart API request interfaces - thêm size
export interface AddToCartRequest {
  productId: string;
  colorCode: string;
  size?: string; // Optional vì backend sẽ lấy default
}

export interface UpdateQuantityRequest {
  productId: string;
  colorCode: string;
  quantity: number;
  size?: string; // Optional
}

export interface RemoveItemRequest {
  productId: string;
  colorCode: string;
  size?: string; // Optional
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

// CẬP NHẬT: useGetCart hook return type - thêm size parameters
export interface UseGetCartReturn {
  cart: CartItem[] | null;
  loading: boolean;
  error: string | null;
  total: number;
  increaseQuantity: (
    productId: string,
    colorCode: string,
    size?: string
  ) => Promise<void>;
  decreaseQuantity: (
    productId: string,
    colorCode: string,
    size?: string
  ) => Promise<void>;
  removeItem: (
    productId: string,
    colorCode: string,
    size?: string
  ) => Promise<void>;
  refreshCart: () => Promise<void>;
}

// THÊM: Helper types cho cart operations
export interface CartItemIdentifier {
  productId: string;
  colorCode: string;
  size?: string;
}

export interface CartItemWithSize extends CartItemIdentifier {
  quantity: number;
  selectedColor?: CartSelectedColor;
}

// THÊM: Size-related types
export interface ProductSize {
  size: string;
  quantity: number;
}

export interface ColorSizeOption {
  colorCode: string;
  availableSizes: ProductSize[];
}

// THÊM: Cart state management types
export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

export interface CartAction {
  type:
    | "SET_CART"
    | "ADD_ITEM"
    | "UPDATE_QUANTITY"
    | "REMOVE_ITEM"
    | "SET_LOADING"
    | "SET_ERROR";
  payload?: CartItem[] | CartItem | CartItemIdentifier | number | string | null;
}
