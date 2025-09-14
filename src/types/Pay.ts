import { User, EditProfilePayload, AccountUserResponse } from "@/types/User";

// Import ProductInToken từ file Product types hiện tại
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

// Định nghĩa cấu trúc dữ liệu của một sản phẩm khi gửi đi để thanh toán
export interface ProductPayload {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  imageUrl?: string;
}

// Kết quả trả về khi xác nhận đơn hàng (confirmOrder)
export interface ConfirmOrderResponse {
  orderId: string;
  payment: {
    id: string;
    status: string;
    links?: Array<{
      href: string;
      rel: string;
      method: string;
    }>;
    [key: string]: unknown;
  };
}

// Kết quả trả về khi thanh toán PayPal thành công
export interface PaypalSuccessResponse {
  success: boolean;
  message: string;
  order: {
    _id: string;
    products: ProductInToken[];
    totalAmount: number;
    status: string;
    [key: string]: unknown;
  };
  paymentData: {
    id: string;
    status: string;
    payer: {
      email_address: string;
      payer_id: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

// Định nghĩa cấu trúc dữ liệu token thanh toán
export interface DecodedToken {
  userId: string;
  products: ProductInToken[];
  missingFields: string[];
  iat: number;
  exp: number;
}

// Định nghĩa cấu trúc dữ liệu trả về từ API khi khởi tạo thanh toán thành công
export interface InitiateCheckoutResponse {
  checkoutState: string;
}

// Đơn vị hành chính
export interface AdminUnit {
  name: string;
  code: number;
}

// Props cho component PaymentDetail
export interface PaymentDetailProps {
  products: ProductInToken[];
  missingFields: string[];
}

// Props cho component PaymentInformation
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
  isEditing: boolean;
  canCancelEdit: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (formData: {
    fullName: string;
    phone: string;
    address: string;
  }) => Promise<void>;
  onContinue?: () => void;
}
