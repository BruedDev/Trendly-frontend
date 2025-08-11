import { RequestConfig } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchClient<
  TResponse = unknown,
  TBody = unknown,
  TParams = Record<string, string | number>
>(
  url: string,
  config: RequestConfig<TBody, TParams> = {}
): Promise<TResponse> {
  const { method = 'GET', headers = {}, body, params } = config;

  // Xử lý query params nếu có
  const queryString = params
    ? '?' +
      Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&')
    : '';

  const response = await fetch(`${BASE_URL}${url}${queryString}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error:', errorData || response.statusText);
    throw new Error((errorData as { message?: string }).message || response.statusText);
  }

  return response.json() as Promise<TResponse>;
}
