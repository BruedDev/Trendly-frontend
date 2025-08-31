import React, { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

interface DeleteItemCartProps {
  productId: string;
}

const DeleteItemCartButton: React.FC<DeleteItemCartProps> = ({ productId }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { deleteItemFromCart } = cartContext;

  const handleDelete = async () => {
    await deleteItemFromCart(productId);
  };

  return (
    <button onClick={handleDelete} title="Xóa sản phẩm">
      ×
    </button>
  );
};

export default DeleteItemCartButton;
