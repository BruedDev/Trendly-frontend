export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  originalPrice?: number;
  thumbnail?: { asset?: { url: string }; alt?: string };
  categories?: { title: string; slug: { current: string } }[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock?: boolean;
}

export interface ProductSectionProps {
  title: string;
  products: Product[];
}