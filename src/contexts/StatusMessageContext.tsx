import React, { createContext, useState } from "react";

interface StatusMessageContextType {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  showLoading: (msg?: string) => void;
  showSuccess: (msg?: string) => void;
  showError: (msg?: string) => void;
  reset: () => void;
}

export const StatusMessageContext = createContext<
  StatusMessageContextType | undefined
>(undefined);

export const StatusMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const showLoading = (msg = "Đang xử lý...") => {
    setStatus("loading");
    setMessage(msg);
  };
  const showSuccess = (msg?: string) => {
    setStatus("success");
    setMessage(msg || "");
    setTimeout(() => setStatus("idle"), 1500);
  };

  const showError = (msg?: string) => {
    setStatus("error");
    setMessage(msg || "");
    setTimeout(() => setStatus("idle"), 1500);
  };
  const reset = () => {
    setStatus("idle");
    setMessage("");
  };

  return (
    <StatusMessageContext.Provider
      value={{ status, message, showLoading, showSuccess, showError, reset }}
    >
      {children}
    </StatusMessageContext.Provider>
  );
};
