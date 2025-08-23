 type ImageType = {
  asset?: { url?: string };
  alt?: string;
};

export type BannerSection = {
  title?: string;
  images?: ImageType[];
  description?: string;
  link?: string;
};