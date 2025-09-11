import { PaymentInformationProps } from "@/types/Pay";
import FormInput from "@/components/FormInput";
import styles from "./PaymentInformation.module.scss";

export default function PaymentInformation(props: PaymentInformationProps) {
  const {
    user,
    editProfile,
    fetchUser,
    userLoading,
    userError,
    missingFields,
    provinces,
    districts,
    wards,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
  } = props;

  // Cấu hình các field dạng map
  const formFields = [
    {
      name: "fullName",
      label: "Họ tên",
      type: "text" as const,
      defaultValue: user?.fullName,
    },
    {
      name: "phone",
      label: "Số điện thoại",
      type: "text" as const,
      defaultValue: user?.phone,
    },
    {
      name: "address",
      label: "Địa chỉ",
      type: "text" as const,
      value: user?.address || "",
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
      disabled: false,
    },
    {
      name: "district",
      label: "Quận/Huyện",
      value: selectedDistrict,
      placeholder: "Chọn quận/huyện",
      options: districts.map((d) => ({ value: String(d.code), label: d.name })),
      onChange: onDistrictChange,
      disabled: !selectedProvince,
    },
    {
      name: "ward",
      label: "Phường/Xã",
      value: selectedWard,
      placeholder: "Chọn phường/xã",
      options: wards.map((w) => ({ value: String(w.code), label: w.name })),
      onChange: onWardChange,
      disabled: !selectedDistrict,
    },
  ];

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

    await editProfile({ fullName, phone, address });
    await fetchUser();
  };

  if (userLoading) return <div>Đang tải thông tin...</div>;
  if (!user) return <div>Không tìm thấy thông tin người dùng.</div>;

  return (
    <div className={styles.container}>
      <h2>Thông tin cá nhân</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Text inputs */}
        {formFields.map((field) => (
          <div key={field.name} className={styles.textInput}>
            <FormInput
              label={field.label}
              name={field.name}
              type={field.type}
              defaultValue={field.defaultValue}
              value={field.value}
              readOnly={field.readOnly}
              isError={missingFields.includes(field.name)}
            />
          </div>
        ))}

        {/* Select inputs in one row */}
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
              isError={missingFields.includes(field.name)}
            />
          ))}
        </div>

        <button type="submit" className={styles.submitButton}>
          Cập nhật thông tin
        </button>

        {userError && <div className={styles.error}>{userError}</div>}
      </form>
    </div>
  );
}
