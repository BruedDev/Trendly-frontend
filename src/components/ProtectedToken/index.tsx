import { ReactNode } from "react";

export default function ProtectedComponent({
  children,
}: {
  children: ReactNode;
}) {
  // Middleware đã xử lý việc bảo vệ, component này chỉ cần render children
  return <>{children}</>;
}
