import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PaymentDetailProps, ProductInToken } from "@/types/Pay";
import CheckoutPaylUI from "@/ui/CheckoutPay";
import { useUser } from "@/hooks/useUser";
import { editProfile } from "@/services/user";
import { removeItem, confirmOrder } from "@/services/pay"; // ✅ thêm confirmOrder
import {
  getProvinces,
  getDistricts,
  getWards,
} from "@/services/VietnamRegions";
import { User } from "@/types/User";

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

export default function CheckoutPayComponent(props: PaymentDetailProps) {
  const router = useRouter();
  const { user, loading, error, setUser } = useUser();
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

  // ✅ Optimistic missing fields calculation
  const calculateMissingFields = useCallback(
    (userData: User | null) => {
      if (!userData) return [];

      const missing: string[] = [];
      if (!userData.fullName?.trim()) missing.push("fullName");
      if (!userData.phone?.trim()) missing.push("phone");

      const hasAddress = userData.address?.trim();
      const hasLocationSelected =
        selectedProvince && selectedDistrict && selectedWard;
      if (!hasAddress && !hasLocationSelected) missing.push("address");

      return missing;
    },
    [selectedProvince, selectedDistrict, selectedWard]
  );

  const currentMissingFields = calculateMissingFields(user);

  // ✅ Cập nhật products khi props.products thay đổi
  useEffect(() => {
    setProducts(props.products || []);
  }, [props.products]);

  // ✅ Quản lý chế độ chỉnh sửa với delay
  useEffect(() => {
    if (!user || loading || !isInitialized) return;

    const timer = setTimeout(() => {
      if (currentMissingFields.length > 0) {
        setIsEditing(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [user, loading, isInitialized, currentMissingFields]);

  // ✅ Khởi tạo provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces as AdminUnit[]);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      } finally {
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

      const newURL = `${window.location.pathname}?state=${result.checkoutState}`;
      router.replace(newURL);

      console.log("Sản phẩm đã được xóa thành công");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  // ✅ Hàm mới: gọi confirmOrder
  const handleConfirmOrder = async () => {
    if (!products || !products.length) {
      console.warn("Không có sản phẩm để thanh toán");
      return;
    }

    try {
      const totalAmount = products.reduce(
        (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
        0
      );

      const res = await confirmOrder({
        products,
        totalAmount,
        paymentMethod: "paypal", // hiện tại chỉ PayPal
      });

      type PaypalLink = { rel: string; href: string };
      const approvalUrl = res.payment.links?.find(
        (l: PaypalLink) => l.rel === "approve"
      )?.href;

      if (approvalUrl) {
        window.location.href = approvalUrl; // ✅ redirect sang PayPal
      } else {
        console.error("Không tìm thấy approvalUrl từ PayPal");
      }
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn:", error);
    }
  };

  const handleSubmit = async (formData: {
    fullName: string;
    phone: string;
    address: string;
  }) => {
    try {
      const res = await editProfile(formData);
      if (res && res.user) {
        setUser(res.user);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      throw error;
    }
  };

  const canCancelEdit = Boolean(
    user && !loading && isInitialized && currentMissingFields.length === 0
  );

  return (
    <CheckoutPaylUI
      {...props}
      products={products}
      user={user}
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
      onContinue={handleConfirmOrder} // ✅ truyền hàm mới
      onSubmit={handleSubmit}
      editProfile={editProfile}
      onRemoveProduct={handleRemoveProduct}
    />
  );
}
