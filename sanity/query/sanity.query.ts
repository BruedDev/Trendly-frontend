import { groq } from "next-sanity";
import { client } from "../lib/index"

// Lấy thông tin trang theo slug
export async function getPage(slug: string = "/") {
  return client.fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
      _type,
      seo,
      metaImageAlt,
      openGraphImageAlt,
      canonical,
      schemaMarkup,
      slug,
      author->{
        _id,
        name,
        image,
        bio
      },
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
        // Welcome Section
        _type == "welcomeSection" => {
          _key,
          _type,
          title,
          description,
          image{
            asset->{
              url
            },
            alt
          }
        },
        // Vision & Mission Section
        _type == "visionMissionSection" => {
          _key,
          _type,
          sectionTitle,
          sectionSubtitle,
          items[] {
            icon {
              asset->{
                url
              },
              alt
            },
            title,
            description
          }
        },
        // Reference Section (e.g., Section)
        _type == "reference" => @->{
          _id,
          _type,
          title,
          description,
          tab_key,
          sectionName,
          categoryFilter[]->{
            _id,
            _type,
            title,
            slug,
            "icon": icon.asset->url,
            "blogs": *[
              _type == "blog" &&
              references(^._id)
            ]{
              _id,
              _type,
              title,
              content,
              _createdAt,
              thumbnail {
                asset->{
                  url
                },
                alt
              }
            }
          }
        },
        // Our Team Section
        _type == "teamSection" => {
          _key,
          _type,
          sectionTitle,
          sectionSubtitle,
          members[] {
            photo {
              asset->{
                url
              },
              alt
            },
            name,
            position,
            socialLinks {
              facebook,
              instagram,
              x,
              tiktok
            }
          }
        },
        // Banner Section
        _type == "banner" => {
          _key,
          _type,
          title,
          image {
            asset->{
              url
            },
            alt
          },
          link,
          description
        },
        // General Section
        _type == "generalContent" => {
          _key,
          _type,
          title,
          slug,
          gallery[] {
            _key,
            _type,
            ...,
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions,
                palette
              }
            }
          },
          content[] {
            ...,
            _type == "image" => {
              _key,
              _type,
              alt,
              caption,
              asset->{
                _id,
                url,
                metadata {
                  lqip,
                  dimensions,
                  palette
                }
              }
            }
          }
        }
      }
    }`,
    { slug }
  );
}

// Lấy nội dung general-content theo slug
export async function getGeneralContent(slug: string) {
  return client.fetch(
    groq`*[_type == "general-content" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      gallery[] {
        _key,
        _type,
        ...,
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions,
            palette
          }
        }
      },
      content[] {
        ...,
        _type == "image" => {
          _key,
          _type,
          alt,
          caption,
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions,
              palette
            }
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
