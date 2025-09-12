import { useState, useEffect } from "react";
import { PaymentInformationProps } from "@/types/Pay";
import FormInput from "@/components/FormInput";
import styles from "./PaymentInformation.module.scss";
import Link from "next/link";
import Logo from "@/components/Header/Logo";

// ✅ Extend interface để nhận thêm props từ container
interface PaymentInformationExtendedProps extends PaymentInformationProps {
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
}

export default function PaymentInformation(
  props: PaymentInformationExtendedProps
) {
  const {
    user,
    userLoading,
    userError,
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    isEditing,
    canCancelEdit,
    onEdit,
    onCancel,
    // onContinue,
    onSubmit,
  } = props;

  // ✅ State riêng cho UI validation - chỉ check đã nhập gì chưa
  const [uiErrors, setUiErrors] = useState<string[]>([]);
  const [currentInputs, setCurrentInputs] = useState({
    fullName: "",
    phone: "",
  });

  // ✅ Khởi tạo giá trị input khi user thay đổi
  useEffect(() => {
    if (user) {
      setCurrentInputs({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // ✅ Logic UI validation - chỉ check rỗng hay không
  useEffect(() => {
    const errors: string[] = [];

    // Check fullName: rỗng thì đỏ
    if (!currentInputs.fullName.trim()) {
      errors.push("fullName");
    }

    // Check phone: rỗng thì đỏ
    if (!currentInputs.phone.trim()) {
      errors.push("phone");
    }

    // Check address: rỗng VÀ chưa chọn tỉnh thì đỏ
    const hasUserAddress = user?.address && user.address.trim();
    if (!hasUserAddress && !selectedProvince) {
      errors.push("address");
    }

    setUiErrors(errors);
  }, [currentInputs, selectedProvince, user?.address]);

  const formFields = [
    {
      name: "fullName",
      label: "Họ tên",
      type: "text" as const,
      defaultValue: user?.fullName,
      disabled: !isEditing,
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "text" as const,
      defaultValue: user?.phone,
      disabled: !isEditing,
    },
    {
      name: "address",
      label: "Địa chỉ",
      type: "text" as const,
      value: user?.address || "",
      disabled: true,
      readOnly: true,
    },
  ];

  const selectFields = [
    {
      name: "province",
      label: "Tỉnh/Thành phố",
      value: selectedProvince,
      placeholder: "Chọn tỉnh/thành phố",
      options: provinces.map((p) => ({ value: String(p.code), label: p.name })),
      onChange: onProvinceChange,
      disabled: !isEditing,
    },
    {
      name: "district",
      label: "Quận/Huyện",
      value: selectedDistrict,
      placeholder: "Chọn quận/huyện",
      options: districts.map((d) => ({ value: String(d.code), label: d.name })),
      onChange: onDistrictChange,
      disabled: !isEditing || !selectedProvince,
    },
    {
      name: "ward",
      label: "Phường/Xã",
      value: selectedWard,
      placeholder: "Chọn phường/xã",
      options: wards.map((w) => ({ value: String(w.code), label: w.name })),
      onChange: onWardChange,
      disabled: !isEditing || !selectedDistrict,
    },
  ];

  // ✅ Handler cho input changes
  const handleInputChange = (name: string, value: string) => {
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement)
      .value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    let address = user?.address || "";
    if (selectedProvince && selectedDistrict && selectedWard) {
      const provinceObj = provinces.find(
        (p) => String(p.code) === String(selectedProvince)
      );
      const districtObj = districts.find(
        (d) => String(d.code) === String(selectedDistrict)
      );
      const wardObj = wards.find(
        (w) => String(w.code) === String(selectedWard)
      );
      address = `${wardObj?.name || ""}, ${districtObj?.name || ""}, ${
        provinceObj?.name || ""
      }`;
    }

    try {
      await onSubmit({ fullName, phone, address });
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  if (userLoading) return null;
  if (!user) return <div>Không tìm thấy thông tin người dùng.</div>;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Logo />
      </Link>

      <div className={styles.editButton}>
        {isEditing ? (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={!canCancelEdit}
          >
            Hủy
          </button>
        ) : (
          canCancelEdit && (
            <button type="button" className={styles.editBtn} onClick={onEdit}>
              Chỉnh sửa
            </button>
          )
        )}
      </div>

      {/* ✅ Thêm id="payment-form" để PaymentDetailActions có thể submit */}
      <form id="payment-form" className={styles.form} onSubmit={handleSubmit}>
        {/* Text inputs */}
        {formFields.map((field) => (
          <div key={field.name} className={styles.textInput}>
            <FormInput
              label={field.label}
              name={field.name}
              type={field.type}
              defaultValue={field.defaultValue}
              value={field.value}
              disabled={field.disabled}
              readOnly={field.readOnly}
              isError={uiErrors.includes(field.name)} // ✅ Dùng uiErrors thay vì missingFields
              onChange={
                field.name === "fullName" || field.name === "phone"
                  ? (value) => handleInputChange(field.name, value)
                  : undefined
              }
            />
          </div>
        ))}

        {/* Select inputs */}
        <div className={styles.selectRow}>
          {selectFields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type="select"
              value={field.value}
              placeholder={field.placeholder}
              options={field.options}
              onChange={field.onChange}
              disabled={field.disabled}
              isError={uiErrors.includes(field.name)} // ✅ Dùng uiErrors thay vì missingFields
            />
          ))}
        </div>

        {userError && <div className={styles.error}>{userError}</div>}
      </form>
    </div>
  );
}
