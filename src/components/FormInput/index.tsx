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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ✅ Ngăn chặn hoàn toàn nếu disabled hoặc readOnly
    if (disabled || readOnly) {
      e.preventDefault();
      return;
    }

    const newValue = e.target.value;
    setHasValue(Boolean(newValue && newValue.length > 0));
    onChange?.(newValue);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // ✅ Ngăn chặn hoàn toàn nếu disabled
    if (disabled) {
      e.preventDefault();
      return;
    }

    const newValue = e.target.value;
    setHasValue(Boolean(newValue && newValue.length > 0));
    onChange?.(newValue);
  };

  // ✅ Ngăn chặn tất cả sự kiện click, focus, keydown
  const handleBlockInteraction = (
    e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent
  ) => {
    if (disabled || readOnly) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
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
            onClick={handleBlockInteraction}
            onFocus={handleBlockInteraction}
            onKeyDown={handleBlockInteraction}
            style={{
              pointerEvents: disabled ? "none" : "auto",
              cursor: disabled ? "not-allowed" : "pointer",
              userSelect: "none",
            }}
            tabIndex={disabled ? -1 : 0}
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
            readOnly={readOnly || disabled}
            disabled={disabled}
            placeholder=" "
            onChange={handleInputChange}
            onClick={handleBlockInteraction}
            onFocus={handleBlockInteraction}
            onKeyDown={handleBlockInteraction}
            onMouseDown={handleBlockInteraction}
            style={{
              pointerEvents: disabled || readOnly ? "none" : "auto",
              cursor: disabled || readOnly ? "not-allowed" : "text",
              userSelect: "none",
            }}
            tabIndex={disabled || readOnly ? -1 : 0}
          />
          <label className={styles.label}>{label}</label>
        </>
      )}
    </div>
  );
}
