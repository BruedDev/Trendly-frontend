import { FetchApiOptions } from "@/types/getFetchApi";

export default async function getFetchApi<T = unknown, R = unknown>(
  url: string,
  options: FetchApiOptions<T>
): Promise<R> {
  const { method, data, headers = {} } = options;

  // ✅ Thêm base URL nếu thiếu
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const finalUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

  const finalHeaders = { ...headers };
  if (typeof document !== "undefined" && !finalHeaders["Authorization"]) {
    const match = document.cookie.match(/token=([^;]+)/);
    const token = match ? match[1] : "";
    if (token) {
      finalHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...finalHeaders,
    },
    credentials: "include",
  };

  if (
    data &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())
  ) {
    fetchOptions.body = JSON.stringify(data);
  }

  const res = await fetch(finalUrl, fetchOptions); // ✅ Dùng finalUrl

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch error:", res.status, errorText);
    throw new Error(`Fetch API thất bại: ${res.status} - ${errorText}`);
  }

  const result = await res.json();
  return result;
}
