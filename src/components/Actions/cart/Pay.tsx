import React from "react";

interface PayProps {
  className?: string;
}

export default function Pay({ className }: PayProps) {
  return <button className={className}>Thanh toán</button>;
}
