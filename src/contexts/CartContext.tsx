import React, { createContext, useState, useEffect } from "react";
import { useStatusMessage } from "@/hooks/useStatusMessage";
import { getCart, addToCart, deleteItemCart } from "@/services/cart";
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
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Tránh lỗi hook, tạo custom wrapper để dùng context
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
  const { showLoading, showSuccess, showError } = useStatusMessage();

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

  const addProductToCart = async (product: Product) => {
    if (processingProducts.has(product._id)) {
      return;
    }
    setProcessingProducts((prev) => new Set(prev).add(product._id));
    setLoading(true);
    showLoading();
    try {
      await addToCart(product);
      showSuccess();
      await fetchCart();
    } catch (error) {
      showError();
      console.error("Lỗi thêm vào giỏ hàng:", error);
    } finally {
      setLoading(false);
      setProcessingProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }
  };

  const deleteItemFromCart = async (productId: string) => {
    setLoading(true);
    showLoading();
    try {
      await deleteItemCart(productId);
      showSuccess("Xóa sản phẩm thành công");
      await fetchCart();
    } catch (error) {
      showError("Xóa sản phẩm thất bại");
      console.error("Lỗi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, loading, fetchCart, addProductToCart, deleteItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
