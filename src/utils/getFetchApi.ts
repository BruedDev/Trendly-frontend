import {FetchApiOptions} from "@/types/getFetchApi";

export default async function getFetchApi<T = unknown, R = unknown>(
  url: string,
  options: FetchApiOptions<T>
): Promise<R> {
  const { method, data, headers = {} } = options;

  console.log('=== FRONTEND FETCH DEBUG ===');
  console.log('URL:', url);
  console.log('Method:', method);
  console.log('Cookies before request:', document.cookie);

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  };

  if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(data);
  }

  console.log('Fetch options:', fetchOptions);

  const res = await fetch(url, fetchOptions);

  console.log('Response status:', res.status);
  console.log('Response headers:', Object.fromEntries(res.headers.entries()));
  console.log('Set-Cookie header:', res.headers.get('set-cookie'));
  console.log('Cookies after response:', document.cookie);

  if (!res.ok) {
    const errorText = await res.text();
    console.log('Error response:', errorText);
    throw new Error('Fetch API thất bại');
  }

  const result = await res.json();
  console.log('Final cookies after parsing:', document.cookie);
  console.log('============================');

  return result;
}