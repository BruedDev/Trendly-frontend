import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaymentDetailProps, ProductInToken } from "@/types/Pay";
import PaymentDetailUI from "@/ui/PaymentDetail";
import { useUser } from "@/hooks/useUser";
import { editProfile } from "@/services/user";
import { removeItem } from "@/services/pay";
import {
  getProvinces,
  getDistricts,
  getWards,
} from "@/services/VietnamRegions";

interface AdminUnit {
  name: string;
  code: number;
}

interface ProvinceResponse {
  name: string;
  code: number;
  districts: AdminUnit[];
}

interface DistrictResponse {
  name: string;
  code: number;
  wards: AdminUnit[];
}

export default function PaymentDetail(props: PaymentDetailProps) {
  const router = useRouter();
  const { user, loading, error, fetchUser } = useUser();
  const [provinces, setProvinces] = useState<AdminUnit[]>([]);
  const [districts, setDistricts] = useState<AdminUnit[]>([]);
  const [wards, setWards] = useState<AdminUnit[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  // ✅ Quản lý products từ props
  const [products, setProducts] = useState<ProductInToken[]>(
    props.products || []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Cập nhật products khi props.products thay đổi
  useEffect(() => {
    setProducts(props.products || []);
  }, [props.products]);

  // ✅ Tính toán missing fields 1 lần duy nhất
  const currentMissingFields = (() => {
    if (!user || loading || !isInitialized) return [];

    const missing: string[] = [];

    if (!user.fullName?.trim()) {
      missing.push("fullName");
    }

    if (!user.phone?.trim()) {
      missing.push("phone");
    }

    const hasAddress = user.address?.trim();
    const hasLocationSelected =
      selectedProvince && selectedDistrict && selectedWard;
    if (!hasAddress && !hasLocationSelected) {
      missing.push("address");
    }

    return missing;
  })();

  // ✅ Quản lý chế độ chỉnh sửa
  useEffect(() => {
    if (!user || loading || !isInitialized) return;

    if (currentMissingFields.length > 0) {
      setIsEditing(true);
    }
  }, [
    user,
    loading,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    isInitialized,
    currentMissingFields,
  ]);

  // ✅ Khởi tạo provinces và đánh dấu đã sẵn sàng
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces as AdminUnit[]);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
        setIsInitialized(true);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = (await getDistricts(
            selectedProvince
          )) as ProvinceResponse;
          setDistricts(response.districts || []);
        } catch (error) {
          console.error("Failed to fetch districts:", error);
          setDistricts([]);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
    setWards([]);
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = (await getWards(
            selectedDistrict
          )) as DistrictResponse;
          setWards(response.wards || []);
        } catch (error) {
          console.error("Failed to fetch wards:", error);
          setWards([]);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (currentMissingFields.length === 0) {
      setIsEditing(false);
    }
  };

  // ✅ Logic xóa sản phẩm - SIÊU ĐỠN GIẢN
  const handleRemoveProduct = async (
    productId: string,
    color: string,
    size: string
  ) => {
    try {
      const result = await removeItem({
        products: products,
        productId,
        color,
        size,
      });

      // ✅ Backend đã trả về JWT mới, chỉ cần update URL
      const newURL = `${window.location.pathname}?state=${result.checkoutState}`;
      router.replace(newURL);

      console.log("Sản phẩm đã được xóa thành công");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleContinue = async () => {
    // Logic tiếp tục thanh toán
    if (!products || !products.length) {
      console.warn("Không có sản phẩm để thanh toán");
      return;
    }
    console.log("Tiếp tục thanh toán với sản phẩm:", products);
  };

  const handleSubmit = async (formData: {
    fullName: string;
    phone: string;
    address: string;
  }) => {
    try {
      await editProfile(formData);
      await fetchUser();
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      throw error;
    }
  };

  const canCancelEdit = Boolean(
    user && !loading && isInitialized && currentMissingFields.length === 0
  );

  // ✅ Không render UI nếu chưa khởi tạo xong
  if (!isInitialized) {
    return null;
  }

  return (
    <PaymentDetailUI
      {...props}
      products={products}
      user={user}
      fetchUser={fetchUser}
      userLoading={loading}
      userError={error}
      missingFields={currentMissingFields}
      provinces={provinces}
      districts={districts}
      wards={wards}
      selectedProvince={selectedProvince}
      selectedDistrict={selectedDistrict}
      selectedWard={selectedWard}
      onProvinceChange={setSelectedProvince}
      onDistrictChange={setSelectedDistrict}
      onWardChange={setSelectedWard}
      isEditing={isEditing}
      canCancelEdit={canCancelEdit}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onContinue={handleContinue}
      onSubmit={handleSubmit}
      editProfile={editProfile}
      onRemoveProduct={handleRemoveProduct}
    />
  );
}
