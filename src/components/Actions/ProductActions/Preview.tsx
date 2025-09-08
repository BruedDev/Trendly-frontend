import ButtonProduct from "@/ui/ButtonProduct";
import { FC } from "react";
import PreviewComponent from "@/components/Preview";
import IsOpenButton from "@/components/isOpenButton";
import { Product } from "@/types/Products_section";

interface PreviewProps {
  className?: string;
  product: Product;
}

const Preview: FC<PreviewProps> = ({ className, product }) => {
  return (
    <IsOpenButton componentToOpen={<PreviewComponent product={product} />}>
      <ButtonProduct variant="preview" className={className}>
        Xem nhanh
      </ButtonProduct>
    </IsOpenButton>
  );
};

export default Preview;
