import { groq } from "next-sanity";
import { client } from "../lib/index"

// Lấy thông tin trang theo slug
export async function getPage(slug: string = "/") {
  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
      _type,
      slug,
      title,
      "body": body[]{
        _key,
        _type,
        // Hero Section
        _type == "heroSection" => {
          _key,
          _type,
          title,
          subtitle,
          images[]{
            asset->{
              url
            },
            alt
          }
        },
        // Product Section
        _type == "productSection" => {
          _key,
          _type,
          sectionTitle,
          displayType,
          limit,
          "products": *[
            _type == "product" &&
            (^.displayType == "all" ||
             (^.displayType == "new" && isNew == true) ||
             (^.displayType == "bestseller" && isBestseller == true))
          ][0...20] {
            _id,
            title,
            slug,
            price,
            originalPrice,
            thumbnail {
              asset->{
                url
              },
              alt
            },
            categories[]->{
              title,
              slug
            },
            isNew,
            isBestseller,
            inStock
          }
        }
      }
    }`,
    { slug }
  );
}

// Lấy tất cả slug của page
export async function getAllSlugs() {
  return client.fetch(
    groq`*[_type == "page" && defined(slug.current)][]{
      "slug": slug.current
    }`
  );
}