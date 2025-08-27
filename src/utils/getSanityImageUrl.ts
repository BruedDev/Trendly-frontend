export function getSanityImageUrl(imageObj?: { asset?: { url?: string } } | null): string | undefined {
  return imageObj?.asset?.url;
}
