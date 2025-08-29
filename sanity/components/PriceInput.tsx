import { set, NumberInputProps } from "sanity";
import { Stack, TextInput, Text } from "@sanity/ui";
import React, { useState } from "react";

export default function PriceInput(props: NumberInputProps) {
  const { value, onChange, elementProps, validation } = props;
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  const error =
    validation &&
    Array.isArray(validation) &&
    validation.length > 0 &&
    validation[0].message;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d]/g, ""); // Chỉ giữ lại số
    setInputValue(rawValue);

    if (rawValue === "") {
      onChange(set(undefined));
    } else {
      const numValue = parseInt(rawValue, 10);
      onChange(set(numValue));
    }
  };

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        value={inputValue}
        onChange={handleChange}
        placeholder="Ví dụ: 350000"
        style={error ? { borderColor: "red" } : {}}
      />

      {/* Hiển thị preview format */}
      {value && (
        <Text size={1} style={{ color: "#666", fontStyle: "italic" }}>
          Hiển thị: {formatNumber(value)} VNĐ
        </Text>
      )}

      {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}
    </Stack>
  );
}
