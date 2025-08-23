export function getSectionByType<T extends { _type: string }>(
  body: Array<T> | undefined,
  type: string
): T | undefined {
  return body?.find((section) => section._type === type);
}
