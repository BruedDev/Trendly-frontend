import { useState, useEffect } from "react";
import styles from "./FormInput.module.scss";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "select";
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
  isError?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  defaultValue,
  readOnly = false,
  disabled = false,
  isError = false,
  options = [],
  onChange,
}: FormInputProps) {
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    const checkValue = value || defaultValue;
    setHasValue(Boolean(checkValue && checkValue.length > 0));
  }, [value, defaultValue]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setHasValue(Boolean(newValue));
    onChange?.(newValue);
  };

  const formGroupClasses = [
    styles.formGroup,
    hasValue && styles.hasValue,
    isError && styles.error,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={formGroupClasses}>
      {type === "select" ? (
        <>
          <select
            className={styles.select}
            value={value || ""}
            onChange={handleSelectChange}
            disabled={disabled}
          >
            <option value=""></option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label className={styles.label}>{label}</label>
        </>
      ) : (
        <>
          <input
            className={styles.input}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            readOnly={readOnly}
            disabled={disabled}
            placeholder=" "
            onChange={(e) => onChange?.(e.target.value)}
          />
          <label className={styles.label}>{label}</label>
        </>
      )}
    </div>
  );
}
