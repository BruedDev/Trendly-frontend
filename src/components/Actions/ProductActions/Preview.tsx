import ButtonProduct from "@/ui/ButtonProduct";
import { FC } from "react";

interface PreviewProps {
  className?: string;
}

const Preview: FC<PreviewProps> = ({ className }) => {
  return (
    <ButtonProduct variant="preview" className={className}>
      Xem nhanh
    </ButtonProduct>
  );
};

export default Preview;
