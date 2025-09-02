import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useStatusMessage } from "@/hooks/useStatusMessage";
import {
  getCart,
  addToCart,
  deleteItemCart,
  updateQuantity,
  getCartItemKey,
} from "@/services/cart";
import { Product } from "@/types/Products_section";

interface CartItem {
  productId: string;
  colorCode: string;
  size: string; // THÊM size field
  quantity: number;
  product?: Product;
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

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

function isApiError(error: unknown): error is ApiError {
  return (
    error !== null &&
    typeof error === "object" &&
    "response" in error &&
    error.response !== null &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data !== null &&
    typeof error.response.data === "object" &&
    "error" in error.response.data
  );
}

type CartContextType = {
  cart: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addProductToCart: (
    product: Product,
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CartProviderInner>{children}</CartProviderInner>;
};

// Helper function để lấy size đầu tiên từ product
const getDefaultSize = (
  product: Product,
  colorCode: string
): string | undefined => {
  const selectedColor = product.colors?.find((c) => c.colorCode === colorCode);
  return selectedColor?.sizes?.[0]?.size;
};

const CartProviderInner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState<Set<string>>(
    new Set()
  );
  const { showLoading, showSuccess, showError } = useStatusMessage();
  const debounceTimers = useRef<{ [key: string]: NodeJS.Timeout }>({}).current;

  useEffect(() => {
    try {
      const minimalCart = cart.map((item) => ({
        productId: item.productId,
        colorCode: item.colorCode,
        size: item.size,
        quantity: item.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(minimalCart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCart();
      const cartRes = res as { cart: CartItem[] };
      setCart(cartRes.cart || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addProductToCart = async (
    product: Product,
    colorCode: string,
    size?: string
  ) => {
    const finalSize = size || getDefaultSize(product, colorCode);

    if (!finalSize) {
      showError("Không tìm thấy size cho màu này.");
      return;
    }

    const itemKey = getCartItemKey(product._id, colorCode, finalSize);
    if (processingItems.has(itemKey)) return;

    setProcessingItems((prev) => new Set(prev).add(itemKey));

    const existingItem = cart.find(
      (item) =>
        item.productId === product._id &&
        item.colorCode === colorCode &&
        item.size === finalSize
    );

    if (existingItem && existingItem.quantity >= 10) {
      showError("Bạn chỉ có thể thêm tối đa 10 sản phẩm này.");
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
      return;
    }

    try {
      showLoading("Đang thêm vào giỏ hàng...");
      await addToCart(product, colorCode, finalSize);

      if (existingItem) {
        setCart((prev) =>
          prev.map((item) =>
            item.productId === product._id &&
            item.colorCode === colorCode &&
            item.size === finalSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const foundColor = product.colors?.find(
          (c) => c.colorCode === colorCode
        );
        const selectedColor = foundColor
          ? {
              colorCode: foundColor.colorCode,
              image: foundColor.image?.asset?.url
                ? {
                    asset: {
                      url: foundColor.image.asset.url,
                      alt: foundColor.image.asset.alt ?? "",
                    },
                    alt: foundColor.image.alt ?? "",
                  }
                : undefined,
            }
          : undefined;
        setCart((prev) => [
          ...prev,
          {
            productId: product._id,
            colorCode,
            size: finalSize,
            quantity: 1,
            product,
            selectedColor,
          },
        ]);
      }

      showSuccess("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      if (isApiError(error) && error.response?.data?.error) {
        showError(error.response.data.error);
      } else {
        showError("Thêm vào giỏ hàng thất bại!");
      }
      console.error("Lỗi thêm vào giỏ hàng:", error);
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }
  };

  const deleteItemFromCart = async (
    productId: string,
    colorCode: string,
    size?: string
  ) => {
    let targetItem: CartItem | undefined;
    if (size) {
      targetItem = cart.find(
        (item) =>
          item.productId === productId &&
          item.colorCode === colorCode &&
          item.size === size
      );
    } else {
      targetItem = cart.find(
        (item) => item.productId === productId && item.colorCode === colorCode
      );
    }

    if (!targetItem) return;

    const itemKey = getCartItemKey(productId, colorCode, targetItem.size);
    if (processingItems.has(itemKey)) return;

    setProcessingItems((prev) => new Set(prev).add(itemKey));
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.colorCode === colorCode &&
            item.size === targetItem!.size
          )
      )
    );

    const tryDelete = async (retries = 3) => {
      try {
        await deleteItemCart(productId, colorCode, targetItem!.size);
      } catch (error) {
        console.error(
          `Failed to delete ${itemKey}. Retries left: ${retries - 1}`,
          error
        );
        if (retries > 1) {
          setTimeout(() => tryDelete(retries - 1), (4 - retries) * 1000);
        } else {
          console.error(
            `Could not delete ${itemKey} from cart. UI is out of sync.`
          );
        }
      }
    };

    tryDelete();

    setProcessingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemKey);
      return newSet;
    });
  };

  const updateProductQuantity = async (
    productId: string,
    colorCode: string,
    quantity: number,
    size?: string
  ) => {
    let targetItem: CartItem | undefined;
    if (size) {
      targetItem = cart.find(
        (item) =>
          item.productId === productId &&
          item.colorCode === colorCode &&
          item.size === size
      );
    } else {
      targetItem = cart.find(
        (item) => item.productId === productId && item.colorCode === colorCode
      );
    }

    if (!targetItem) return;

    const itemKey = getCartItemKey(productId, colorCode, targetItem.size);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId &&
        item.colorCode === colorCode &&
        item.size === targetItem!.size
          ? { ...item, quantity }
          : item
      )
    );

    if (debounceTimers[itemKey]) {
      clearTimeout(debounceTimers[itemKey]);
    }

    debounceTimers[itemKey] = setTimeout(async () => {
      try {
        await updateQuantity(productId, colorCode, quantity, targetItem!.size);
      } catch (error) {
        console.error("Failed to update quantity:", error);
        showError("Cập nhật số lượng thất bại.");
        await fetchCart();
      }
      delete debounceTimers[itemKey];
    }, 500);
  };

  const increaseQuantity = (
    productId: string,
    colorCode: string,
    size?: string
  ) => {
    let cartItem: CartItem | undefined;
    if (size) {
      cartItem = cart.find(
        (item) =>
          item.productId === productId &&
          item.colorCode === colorCode &&
          item.size === size
      );
    } else {
      cartItem = cart.find(
        (item) => item.productId === productId && item.colorCode === colorCode
      );
    }

    if (!cartItem) return;

    const newQuantity = cartItem.quantity + 1;
    if (newQuantity > 10) {
      showError("Bạn chỉ có thể mua tối đa 10 sản phẩm này.");
      return;
    }
    if (
      cartItem.stockInfo &&
      newQuantity > cartItem.stockInfo.availableQuantity
    ) {
      showError(
        `Chỉ còn ${cartItem.stockInfo.availableQuantity} sản phẩm trong kho.`
      );
      return;
    }
    updateProductQuantity(productId, colorCode, newQuantity, cartItem.size);
  };

  const decreaseQuantity = (
    productId: string,
    colorCode: string,
    size?: string
  ) => {
    let cartItem: CartItem | undefined;
    if (size) {
      cartItem = cart.find(
        (item) =>
          item.productId === productId &&
          item.colorCode === colorCode &&
          item.size === size
      );
    } else {
      cartItem = cart.find(
        (item) => item.productId === productId && item.colorCode === colorCode
      );
    }

    if (!cartItem) return;

    const newQuantity = cartItem.quantity - 1;
    if (newQuantity < 1) return;

    updateProductQuantity(productId, colorCode, newQuantity, cartItem.size);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemsByProduct = (productId: string) => {
    return cart.filter((item) => item.productId === productId);
  };

  const getCartItem = (productId: string, colorCode: string, size?: string) => {
    if (size) {
      return cart.find(
        (item) =>
          item.productId === productId &&
          item.colorCode === colorCode &&
          item.size === size
      );
    } else {
      return cart.find(
        (item) => item.productId === productId && item.colorCode === colorCode
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addProductToCart,
        deleteItemFromCart,
        updateProductQuantity,
        increaseQuantity,
        decreaseQuantity,
        getCartItemCount,
        getCartItemsByProduct,
        getCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
