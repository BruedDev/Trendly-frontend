import { useContext } from "react";
import { StatusMessageContext } from "@/contexts/StatusMessageContext";

export const useStatusMessage = () => {
  const ctx = useContext(StatusMessageContext);
  if (!ctx)
    throw new Error(
      "useStatusMessage must be used within StatusMessageProvider"
    );
  return ctx;
};
