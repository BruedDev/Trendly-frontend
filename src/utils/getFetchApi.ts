import {FetchApiOptions} from "@/types/getFetchApi";

export default async function getFetchApi<T = unknown, R = unknown>(
  url: string,
  options: FetchApiOptions<T>
): Promise<R> {
  const { method, data, headers = {} } = options;
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(data);
  }
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error('Fetch API thất bại');
  }
  return res.json();
}
