import { User } from "@/types/User";

export default function Profile({ user }: { user: User }) {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Thông tin tài khoản</h1>
      <div style={{ lineHeight: "1.8" }}>
        <p>Họ và tên: {user.fullName}</p>
        <p>Email: {user.email}</p>
        <p>Địa chỉ: {user.address}</p>
        <p>Số điện thoại: {user.phone || ""}</p>
        <p>
          Thành viên từ:
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
