export function getSectionByKey<T, K extends keyof T>(
  body: Array<T> | undefined,
  key: K,
  value: T[K]
): T | undefined {
  return body?.find((section) => section[key as keyof T] === value);
}