import {FetchApiOptions} from "@/types/getFetchApi";

export default async function getFetchApi<T = unknown, R = unknown>(
  url: string,
  options: FetchApiOptions<T>
): Promise<R> {
  const { method, data, headers = {} } = options;

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
      'Content-Type': 'application/json',
      ...finalHeaders,
    },
    credentials: 'include',
  };

  if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(data);
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error('Fetch API thất bại');
  }

  const result = await res.json();

  return result;
}