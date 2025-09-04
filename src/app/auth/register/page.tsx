"use client";
import { useState } from "react";
import { register } from "@/services/auth";
import Link from "next/link";

export default function AuthRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await register({ fullName, email, address, password, phone });
      setSuccess("Đăng ký thành công! Hãy đăng nhập.");
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");
    } catch {
      setError(
        "Đăng ký thất bại. Email/SĐT có thể đã tồn tại hoặc có lỗi hệ thống."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "40px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Số điện thoại (tùy chọn)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Địa chỉ  (tùy chọn)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 8 }}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginTop: 8 }}>{success}</div>
        )}
      </form>
      <Link href="/auth/login">Đã có tài khoản? Đăng nhập ngay</Link>
    </div>
  );
}
