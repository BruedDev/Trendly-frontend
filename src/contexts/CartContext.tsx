import React, { createContext, useState, useEffect, useCallback } from "react";
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

// Interface và type guard cho error handling
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
  addProductToCart: (product: Product, colorCode: string) => Promise<void>;
  deleteItemFromCart: (productId: string, colorCode: string) => Promise<void>;
  updateProductQuantity: (
    productId: string,
    colorCode: string,
    quantity: number
  ) => Promise<void>;
  increaseQuantity: (productId: string, colorCode: string) => void;
  decreaseQuantity: (productId: string, colorCode: string) => void;
  getCartItemCount: () => number;
  getCartItemsByProduct: (productId: string) => CartItem[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CartProviderInner>{children}</CartProviderInner>;
};

const CartProviderInner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingItems, setProcessingItems] = useState<Set<string>>(
    new Set()
  );
  const { showSuccess, showError } = useStatusMessage();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCart();
      const cartRes = res as { cart: CartItem[] };
      setCart(cartRes.cart || []);
    } finally {
      setLoading(false);
    }
  };

  // Debounced API call để batch updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateQuantity = useCallback(
    debounce(async (productId: string, colorCode: string, quantity: number) => {
      try {
        await updateQuantity(productId, colorCode, quantity);
      } catch (error: unknown) {
        showError("Cập nhật số lượng thất bại");
        console.error("Lỗi cập nhật số lượng:", error);
        await fetchCart();
      }
    }, 300),
    [updateQuantity, showError, fetchCart]
  );

  // Debounced delete function để tránh spam click
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDelete = useCallback(
    debounce(async (productId: string, colorCode: string) => {
      const itemKey = getCartItemKey(productId, colorCode);

      try {
        await deleteItemCart(productId, colorCode);
        console.log("Đã xóa sản phẩm thành công");
      } catch (error: unknown) {
        console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
        // Nếu API fail, fetch lại cart để sync với server
        await fetchCart();
      } finally {
        // Remove from processing set after delay
        setTimeout(() => {
          setProcessingItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemKey);
            return newSet;
          });
        }, 100);
      }
    }, 200), // 200ms delay để tránh spam
    [fetchCart]
  );

  const addProductToCart = async (product: Product, colorCode: string) => {
    const itemKey = getCartItemKey(product._id, colorCode);

    if (processingItems.has(itemKey)) {
      return;
    }
    setProcessingItems((prev) => new Set(prev).add(itemKey));

    // Tìm item với cùng productId và colorCode
    const existingItem = cart.find(
      (item) => item.productId === product._id && item.colorCode === colorCode
    );

    if (existingItem && existingItem.quantity >= 10) {
      showError("Sản phẩm này đã đạt tối đa 10 sản phẩm trong giỏ hàng");
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
      return;
    }

    // Backup current state for rollback
    const previousCart = [...cart];

    // Optimistic update: Cập nhật UI ngay lập tức
    if (existingItem) {
      // Nếu sản phẩm đã có, tăng quantity
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product._id && item.colorCode === colorCode
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item
        )
      );
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      const foundColor = product.colors?.find((c) => c.colorCode === colorCode);
      const selectedColor = foundColor
        ? {
            colorCode: foundColor.colorCode,
            image:
              foundColor.image &&
              foundColor.image.asset &&
              foundColor.image.asset.url
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
          quantity: 1,
          product,
          selectedColor,
        },
      ]);
    }

    try {
      await addToCart(product, colorCode);
      showSuccess("Thêm vào giỏ hàng thành công!");
    } catch (error: unknown) {
      // Handle specific API errors
      if (isApiError(error) && error.response?.data?.error) {
        showError(error.response.data.error);
      } else {
        showError("Thêm vào giỏ hàng thất bại!");
      }
      console.error("Lỗi thêm vào giỏ hàng:", error);

      // Rollback optimistic update nếu API fail
      setCart(previousCart);
    } finally {
      setProcessingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }
  };

  const deleteItemFromCart = async (productId: string, colorCode: string) => {
    const itemKey = getCartItemKey(productId, colorCode);

    // Prevent multiple deletions of the same item
    if (processingItems.has(itemKey)) {
      return;
    }

    setProcessingItems((prev) => new Set(prev).add(itemKey));

    // Optimistic update: Xóa ngay khỏi UI
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.colorCode === colorCode)
      )
    );

    // Call debounced delete function
    debouncedDelete(productId, colorCode);
  };

  const updateProductQuantity = async (
    productId: string,
    colorCode: string,
    quantity: number
  ) => {
    // Optimistic update: Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.colorCode === colorCode
          ? { ...item, quantity }
          : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, colorCode, quantity);
  };

  // Tăng quantity - instant update
  const increaseQuantity = (productId: string, colorCode: string) => {
    const itemKey = getCartItemKey(productId, colorCode);

    // Prevent action if item is being processed
    if (processingItems.has(itemKey)) {
      return;
    }

    const cartItem = cart.find(
      (item) => item.productId === productId && item.colorCode === colorCode
    );
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + 1;
    if (newQuantity > 10) {
      showError("Sản phẩm này đã đạt tối đa 10 sản phẩm trong giỏ hàng");
      return;
    }

    // Kiểm tra stock nếu có thông tin
    if (cartItem.stockInfo && !cartItem.stockInfo.inStock) {
      showError("Sản phẩm này đã hết hàng");
      return;
    }

    if (
      cartItem.stockInfo &&
      newQuantity > cartItem.stockInfo.availableQuantity
    ) {
      showError(
        `Chỉ còn ${cartItem.stockInfo.availableQuantity} sản phẩm màu này trong kho`
      );
      return;
    }

    // Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.colorCode === colorCode
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, colorCode, newQuantity);
  };

  // Giảm quantity - instant update
  const decreaseQuantity = (productId: string, colorCode: string) => {
    const itemKey = getCartItemKey(productId, colorCode);

    // Prevent action if item is being processed
    if (processingItems.has(itemKey)) {
      return;
    }

    const cartItem = cart.find(
      (item) => item.productId === productId && item.colorCode === colorCode
    );
    if (!cartItem) return;

    const newQuantity = cartItem.quantity - 1;
    if (newQuantity < 1) return; // Không cho phép giảm xuống dưới 1

    // Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.colorCode === colorCode
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, colorCode, newQuantity);
  };

  // Helper functions
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemsByProduct = (productId: string) => {
    return cart.filter((item) => item.productId === productId);
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Utility debounce function với proper typing
function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export { CartContext };
