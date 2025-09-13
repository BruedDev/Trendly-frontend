import { useState, useEffect } from "react";
import { PaymentInformationProps } from "@/types/Pay";
import FormInput from "@/components/FormInput";
import styles from "./PaymentInformation.module.scss";
import Link from "next/link";
import Logo from "@/components/Header/Logo";

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
    onSubmit,
  } = props;

  const [uiErrors, setUiErrors] = useState<string[]>([]);
  const [currentInputs, setCurrentInputs] = useState({
    fullName: "",
    phone: "",
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Prevent flash error on first load
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // ✅ Delay showing errors to prevent flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInteracted(true);
      setIsInitialLoad(false);
    }, 1200); // 1.2s delay để user có thời gian nhìn thấy data

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentInputs({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
      setTouched({});
      setIsSubmitted(false);
    }
  }, [user]);

  useEffect(() => {
    // ✅ Chỉ validate sau khi đã interact hoặc đang editing
    if (!hasInteracted && !isEditing) return;

    const errors: string[] = [];
    if (!currentInputs.fullName.trim()) errors.push("fullName");
    if (!currentInputs.phone.trim()) errors.push("phone");
    const hasUserAddress = user?.address && user.address.trim();
    if (!hasUserAddress && !selectedProvince) errors.push("address");
    setUiErrors(errors);
  }, [
    currentInputs,
    selectedProvince,
    user?.address,
    hasInteracted,
    isEditing,
  ]);

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

  const handleInputChange = (name: string, value: string) => {
    setCurrentInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // ✅ Helper để quyết định có show error không
  const shouldShowFieldError = (fieldName: string) => {
    // Không show error trong initial load
    if (isInitialLoad) return false;

    // Show error nếu đã submit hoặc đã touch field đó và đã interact
    return (
      hasInteracted &&
      (isSubmitted || touched[fieldName]) &&
      uiErrors.includes(fieldName)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setHasInteracted(true); // Force show errors when submitting

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

      <form id="payment-form" className={styles.form} onSubmit={handleSubmit}>
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
              isError={shouldShowFieldError(field.name)}
              onChange={
                field.name === "fullName" || field.name === "phone"
                  ? (value) => handleInputChange(field.name, value)
                  : undefined
              }
            />
          </div>
        ))}

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
              onChange={(value) => {
                field.onChange(value);
                setTouched((prev) => ({ ...prev, [field.name]: true }));
              }}
              disabled={field.disabled}
              isError={shouldShowFieldError(field.name)}
            />
          ))}
        </div>

        {userError && <div className={styles.error}>{userError}</div>}
      </form>
    </div>
  );
}
