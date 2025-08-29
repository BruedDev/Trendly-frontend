import { useStatusMessage } from "@/hooks/useStatusMessage";
import React from "react";

export default function StatusMessage() {
  const { status, message } = useStatusMessage();

  if (status === "idle") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 24,
          borderRadius: 8,
          minWidth: 240,
          textAlign: "center",
          fontWeight: 500,
          color:
            status === "success"
              ? "#16a34a"
              : status === "error"
              ? "#dc2626"
              : "#0ea5e9",
        }}
      >
        {status === "loading" && <span>⏳</span>}
        {status === "success" && <span>✅</span>}
        {status === "error" && <span>❌</span>}
        <div style={{ marginTop: 8 }}>{message}</div>
      </div>
    </div>
  );
}
