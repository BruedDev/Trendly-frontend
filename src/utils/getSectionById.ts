export interface SectionBase {
  _type?: string;
  _key?: string;
  sections?: SectionBase[];
}
// Lấy section theo _key từ body (hỗ trợ cả section trong reference sections)


export function getSectionById<T>(

  body: SectionBase[] | undefined,
  id: string
): T | undefined {
  if (!Array.isArray(body)) return undefined;
  for (const item of body) {
    if (item._key === id) {
      // Nếu là kiểu sections và có mảng sections, trả về section con đầu tiên
      if (item._type === "sections" && Array.isArray(item.sections) && item.sections.length > 0) {
        return item.sections[0] as T;
      }
      return item as T;
    }
    if (item._type === "sections" && Array.isArray(item.sections)) {
      for (const subSection of item.sections) {
        if (subSection._key === id) {
          return subSection as T;
        }
      }
    }
  }
  return undefined;
}