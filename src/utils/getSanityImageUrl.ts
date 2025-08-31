// Helper function để build Sanity image URL từ _ref
export function buildSanityImageUrl(ref: string): string {
  const parts = ref.split("-");
  if (parts.length < 3) return "";

  const imageId = parts[1];
  const dimensions = parts[2];
  const format = parts[3];

  return `https://cdn.sanity.io/images/a9ulze55/production/${imageId}-${dimensions}.${format}`;
}
export function getSanityImageUrl(imageObj?: { asset?: { url?: string; _ref?: string } } | null): string | undefined {
  // Nếu có sẵn URL thì dùng luôn
  if (imageObj?.asset?.url) {
    return imageObj.asset.url;
  }

  // Nếu chỉ có _ref thì build URL
  if (imageObj?.asset?._ref) {
    const ref = imageObj.asset._ref;
    const parts = ref.split('-');
    if (parts.length >= 3) {
      const imageId = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `https://cdn.sanity.io/images/a9ulze55/production/${imageId}-${dimensions}.${format}`;
    }
  }

  return undefined;
}