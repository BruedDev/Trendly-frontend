// Data type for addToCart
export interface AddToCartData {
	productId: string;
	colorCode: string;
	size?: string;
}

// Data type for deleteItemCart
export interface DeleteItemCartData {
	productId: string;
	colorCode: string;
	size?: string;
}

// Data type for updateQuantity
export interface UpdateQuantityData {
	productId: string;
	colorCode: string;
	quantity: number;
	size?: string;
}
// Interface cho cart item với color và size
export interface CartItemParams {
	productId: string;
	colorCode: string;
	size?: string;
}


// Interface cho cart item trả về từ API
export interface CartItem {
	productId: string;
	colorCode: string;
	size: string;
	quantity: number;
	product?: import("@/types/Products_section").Product;
	selectedColor?: {
		colorCode: string;
		image?: {
			asset: {
				url: string;
				alt: string;
			};
			alt: string;
		};
	};
	stockInfo?: {
		inStock: boolean;
		availableQuantity: number;
	};
}

export interface ApiError {
	response?: {
		data?: {
			error?: string;
		};
	};
}

export type CartContextType = {
	cart: CartItem[];
	loading: boolean;
	fetchCart: () => Promise<void>;
	addProductToCart: (
		product: import("@/types/Products_section").Product,
		colorCode: string,
		size?: string
	) => Promise<void>;
	deleteItemFromCart: (
		productId: string,
		colorCode: string,
		size?: string
	) => Promise<void>;
	updateProductQuantity: (
		productId: string,
		colorCode: string,
		quantity: number,
		size?: string
	) => Promise<void>;
	increaseQuantity: (
		productId: string,
		colorCode: string,
		size?: string
	) => void;
	decreaseQuantity: (
		productId: string,
		colorCode: string,
		size?: string
	) => void;
	getCartItemCount: () => number;
	getCartItemsByProduct: (productId: string) => CartItem[];
	getCartItem: (
		productId: string,
		colorCode: string,
		size?: string
	) => CartItem | undefined;
};
