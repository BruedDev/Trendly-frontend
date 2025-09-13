import { User, EditProfilePayload, AccountUserResponse } from "@/types/User";

// Định nghĩa cấu trúc dữ liệu của một sản phẩm khi gửi đi để thanh toán
export interface ProductPayload {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  imageUrl?: string;
}

// Định nghĩa cấu trúc dữ liệu sản phẩm trong token thanh toán
export interface ProductInToken {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
  imageUrl?: string;
  msp: string;
}

// Định nghĩa cấu trúc dữ liệu token thanh toán
export interface DecodedToken {
  userId: string;
  products: ProductInToken[];
  missingFields: string[];
  iat: number;
  exp: number;
}

// Props cho component PaymentDetail
export interface PaymentDetailProps {
  products: ProductInToken[];
  missingFields: string[];
}

// Định nghĩa cấu trúc dữ liệu trả về từ API khi khởi tạo thanh toán thành công
export interface InitiateCheckoutResponse {
  checkoutState: string;
}

export interface AdminUnit {
  name: string;
  code: number;
}

export interface PaymentInformationProps {
  user: User | null;
  editProfile: (data: EditProfilePayload) => Promise<AccountUserResponse>;
  userLoading: boolean;
  userError: string | null;
  missingFields: string[];
  provinces: AdminUnit[];
  districts: AdminUnit[];
  wards: AdminUnit[];
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  onProvinceChange: (code: string) => void;
  onDistrictChange: (code: string) => void;
  onWardChange: (code: string) => void;
}
