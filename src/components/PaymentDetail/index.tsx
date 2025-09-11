import { useState, useEffect } from "react";
import { PaymentDetailProps } from "@/types/Pay";
import PaymentDetailUI from "@/ui/PaymentDetail";
import { useUser } from "@/hooks/useUser";
import { editProfile } from "@/services/user";
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
  const { user, loading, error, fetchUser } = useUser();
  const [provinces, setProvinces] = useState<AdminUnit[]>([]);
  const [districts, setDistricts] = useState<AdminUnit[]>([]);
  const [wards, setWards] = useState<AdminUnit[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces as AdminUnit[]);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
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

          // Lấy districts array từ response object
          const districtsArray = response.districts || [];
          setDistricts(districtsArray);
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

          // Lấy wards array từ response object
          const wardsArray = response.wards || [];
          setWards(wardsArray);
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

  return (
    <PaymentDetailUI
      {...props}
      user={user}
      editProfile={editProfile}
      fetchUser={fetchUser}
      userLoading={loading}
      userError={error}
      provinces={provinces}
      districts={districts}
      wards={wards}
      selectedProvince={selectedProvince}
      selectedDistrict={selectedDistrict}
      selectedWard={selectedWard}
      onProvinceChange={setSelectedProvince}
      onDistrictChange={setSelectedDistrict}
      onWardChange={setSelectedWard}
    />
  );
}
