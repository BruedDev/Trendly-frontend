// getSanityImageUrl.ts
// Trả về url hình ảnh từ object Sanity image (có thể null)

export function getSanityImageUrl(imageObj?: { asset?: { url?: string } } | null): string | undefined {
  return imageObj?.asset?.url;
}
