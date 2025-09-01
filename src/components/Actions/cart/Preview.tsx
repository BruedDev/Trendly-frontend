import React from "react";

interface PreviewProps {
  className?: string;
}

export default function Preview({ className }: PreviewProps) {
  return <button className={className}>Xem nhanh</button>;
}
