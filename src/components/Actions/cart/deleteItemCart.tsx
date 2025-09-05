import React, { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { IoClose } from "react-icons/io5";
import Tooltip from "@/components/Tooltip";

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
    <Tooltip title="Xóa sản phẩm" arrow="left">
      <button onClick={handleDelete}>
        <IoClose size={24} color="#000" />
      </button>
    </Tooltip>
  );
};

export default DeleteItemCartButton;
