import React, { createContext, useState, useEffect, useCallback } from "react";
import { useStatusMessage } from "@/hooks/useStatusMessage";
import {
  getCart,
  addToCart,
  deleteItemCart,
  updateQuantity,
} from "@/services/cart";
import { Product } from "@/types/Products_section";

interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

type CartContextType = {
  cart: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addProductToCart: (product: Product) => Promise<void>;
  deleteItemFromCart: (productId: string) => Promise<void>;
  updateProductQuantity: (productId: string, quantity: number) => Promise<void>;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
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
  const [processingProducts, setProcessingProducts] = useState<Set<string>>(
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
    debounce(async (productId: string, quantity: number) => {
      try {
        await updateQuantity(productId, quantity);
      } catch (err) {
        showError("Cập nhật số lượng thất bại");
        console.error("Lỗi cập nhật số lượng:", String(err));
        await fetchCart();
      }
    }, 300),
    [updateQuantity, showError, fetchCart]
  );

  const addProductToCart = async (product: Product) => {
    if (processingProducts.has(product._id)) {
      return;
    }
    setProcessingProducts((prev) => new Set(prev).add(product._id));

    // Optimistic update: Cập nhật UI ngay lập tức
    const existingItem = cart.find((item) => item.productId === product._id);
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        showError("Sản phẩm này đã đạt tối đa 10 sản phẩm trong giỏ hàng");
        setProcessingProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product._id);
          return newSet;
        });
        return;
      }
    }
    if (existingItem) {
      if (existingItem.quantity >= 10) {
        showError("Sản phẩm này đã đạt tối đa 10 sản phẩm trong giỏ hàng");
        setProcessingProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product._id);
          return newSet;
        });
        return;
      }
      // Nếu sản phẩm đã có, tăng quantity
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item
        )
      );
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      setCart((prev) => [
        ...prev,
        { productId: product._id, quantity: 1, product },
      ]);
    }

    try {
      await addToCart(product);
      showSuccess("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      showError("Thêm vào giỏ hàng thất bại!");
      console.error("Lỗi thêm vào giỏ hàng:", error);
      // Rollback optimistic update nếu API fail
      await fetchCart();
    } finally {
      setProcessingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }
  };

  const deleteItemFromCart = async (productId: string) => {
    // Backup để rollback nếu cần
    const previousCart = [...cart];

    // Optimistic update: Xóa ngay khỏi UI
    setCart((prev) => prev.filter((item) => item.productId !== productId));

    try {
      await deleteItemCart(productId);
      // Bỏ dòng showSuccess này
      // showSuccess("Xóa sản phẩm thành công");
    } catch (error) {
      showError("Xóa sản phẩm thất bại"); // Vẫn giữ thông báo lỗi
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
      // Rollback nếu API fail
      setCart(previousCart);
    }
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    // Optimistic update: Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, quantity);
  };

  // Tăng quantity - instant update
  const increaseQuantity = (productId: string) => {
    const cartItem = cart.find((item) => item.productId === productId);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + 1;
    if (newQuantity > 10) {
      showError("Sản phẩm này đã đạt tối đa 10 sản phẩm trong giỏ hàng");
      return;
    }

    // Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, newQuantity);
  };

  // Giảm quantity - instant update
  const decreaseQuantity = (productId: string) => {
    const cartItem = cart.find((item) => item.productId === productId);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity - 1;
    if (newQuantity < 1) return; // Không cho phép giảm xuống dưới 1

    // Cập nhật UI ngay lập tức
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Debounced API call
    debouncedUpdateQuantity(productId, newQuantity);
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
