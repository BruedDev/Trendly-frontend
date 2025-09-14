import { PaymentDetailProps } from "@/types/Pay";
import { User, EditProfilePayload, AccountUserResponse } from "@/types/User";
import styles from "./CheckoutPaylUI.module.scss";
import CheckoutInformation from "./CheckoutInformation";
import YourProduct from "./YourProduct";
import CheckoutActions from "./CheckoutActions";

interface AdminUnit {
  name: string;
  code: number;
}

export interface PaymentDetailUIProps extends PaymentDetailProps {
  user: User | null;
  editProfile: (data: EditProfilePayload) => Promise<AccountUserResponse>;
  userLoading: boolean;
  userError: string | null;
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
  onContinue: () => void;
  onSubmit: (formData: {
    fullName: string;
    phone: string;
    address: string;
  }) => Promise<void>;
  onRemoveProduct: (
    productId: string,
    color: string,
    size: string
  ) => Promise<void>;
}

export default function CheckoutPaylUI(props: PaymentDetailUIProps) {
  return (
    <div className={`${styles.container} container_section`}>
      <div className={styles.paymentInformation}>
        <CheckoutInformation
          user={props.user}
          editProfile={props.editProfile}
          userLoading={props.userLoading}
          userError={props.userError}
          missingFields={props.missingFields}
          provinces={props.provinces}
          districts={props.districts}
          wards={props.wards}
          selectedProvince={props.selectedProvince}
          selectedDistrict={props.selectedDistrict}
          selectedWard={props.selectedWard}
          onProvinceChange={props.onProvinceChange}
          onDistrictChange={props.onDistrictChange}
          onWardChange={props.onWardChange}
          isEditing={props.isEditing}
          canCancelEdit={props.canCancelEdit}
          onEdit={props.onEdit}
          onCancel={props.onCancel}
          onContinue={props.onContinue}
          onSubmit={props.onSubmit}
        />
        <div className={styles.actions}>
          <CheckoutActions
            isEditing={props.isEditing}
            onContinue={props.onContinue}
          />
        </div>
      </div>
      <div className={styles.yourProduct}>
        <YourProduct
          products={props.products}
          onRemoveProduct={props.onRemoveProduct}
        />
      </div>
    </div>
  );
}
