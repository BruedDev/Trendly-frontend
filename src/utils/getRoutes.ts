const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export function createRoutes(routes: Record<string, string>) {
  const result: Record<string, string> = {};
  for (const key in routes) {
    result[key] = `${BASE_URL}${routes[key]}`;
  }
  return result;
}
