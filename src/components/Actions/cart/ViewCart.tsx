import React from "react";

interface PreviewProps {
  className?: string;
}

export default function ViewCart({ className }: PreviewProps) {
  return <button className={className}>Xem giỏ hàng</button>;
}
