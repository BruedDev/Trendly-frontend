import { set, StringInputProps } from "sanity";
import { Button, Stack, TextInput } from "@sanity/ui";
import React, { useState } from "react";
import { useGenerateUniqueMSP } from "../hooks/useGenerateUniqueMSP";

export default function MSPInput(props: StringInputProps) {
  const { value, onChange, elementProps, validation } = props;
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const generateUniqueMSP = useGenerateUniqueMSP();

  const error =
    (validation &&
      Array.isArray(validation) &&
      validation.length > 0 &&
      validation[0].message) ||
    localError;

  const handleGenerate = async () => {
    setLoading(true);
    setLocalError(null);
    try {
      const msp = await generateUniqueMSP();
      onChange(set(msp));
    } catch {
      setLocalError("Không thể sinh mã MSP duy nhất, thử lại!");
    }
    setLoading(false);
  };

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        value={value || ""}
        readOnly
        placeholder="Nhấn nút để tạo mã tự động"
        style={error ? { borderColor: "red" } : {}}
      />
      <Button
        text={loading ? "Đang tạo..." : "Tạo mã tự động"}
        tone="primary"
        disabled={loading}
        onClick={handleGenerate}
      />
      {error && (
        <div style={{ color: "red", fontSize: "0.9em", marginTop: "10px" }}>
          {error}
        </div>
      )}
    </Stack>
  );
}
