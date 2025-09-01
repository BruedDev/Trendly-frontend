import React, { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

interface DeleteItemCartProps {
  productId: string;
  colorCode: string;
}
const DeleteItemCartButton: React.FC<DeleteItemCartProps> = ({
  productId,
  colorCode,
}) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { deleteItemFromCart } = cartContext;

  const handleDelete = async () => {
    await deleteItemFromCart(productId, colorCode);
  };

  return (
    <button onClick={handleDelete} title="Xóa sản phẩm">
      ×
    </button>
  );
};

export default DeleteItemCartButton;
