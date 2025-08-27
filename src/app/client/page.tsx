import type { Product } from "@/types/Products_section";
import HeroSection from "@/components/Hero_section";
import ProductSection from "@/components/ProductSection";
import { getPage } from "../../../sanity/query/sanity.query";
import { getSectionById } from "@/utils/getSectionById";
import {
  HeroSection as HeroSectionType,
  ProductSection as ProductSectionType,
} from "../../../sanity/types/sanity-codegen";
type ProductSectionWithProducts = ProductSectionType & { products?: Product[] };

export default async function Home() {
  const pageData = await getPage("/");
  if (!pageData) {
    return (
      <main>
        Không tìm thấy dữ liệu trang home. Hãy kiểm tra lại trên Sanity Studio.
      </main>
    );
  }

  // Lấy dữ liệu HeroSection
  const heroSection = getSectionById<HeroSectionType>(
    pageData.body,
    "5cb364e8f8f2"
  );

  // Lấy dữ liệu newProductSections (SẢN PHẨM MỚI)
  const newProductSections = getSectionById<ProductSectionWithProducts>(
    pageData.body,
    "6c2fc8079296"
  );

  // Lấy dữ liệu BestsellerProductSections (SẢN PHẨM BÁN CHẠY)
  const BestsellerProductSections = getSectionById<ProductSectionWithProducts>(
    pageData.body,
    "b475ab074c96"
  );

  if (!heroSection) {
    return (
      <main>Không tìm thấy section heroSection trong body của trang home.</main>
    );
  }

  const heroSectionProps = {
    title: heroSection.title,
    description: heroSection.subtitle,
    images: Array.isArray(heroSection.images)
      ? heroSection.images.slice(0, 3).map((img) => ({
          asset: {
            url:
              typeof img.asset === "object" && "url" in img.asset
                ? (img.asset as { url: string }).url
                : "",
          },
          alt: img.alt || "",
        }))
      : [],
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="heroSection" aria-label="Hero Section">
        <HeroSection data={heroSectionProps} />
      </section>

      {/* Product Section (new product)  */}
      <section
        id="newProducts"
        aria-label="New Products"
        className="container_section"
      >
        {newProductSections && (
          <ProductSection
            title={newProductSections.sectionTitle || "Sản phẩm mới"}
            description={newProductSections.description}
            products={newProductSections.products ?? []}
          />
        )}
      </section>

      <section
        id="bestsellerProducts"
        aria-label="Bestseller Products"
        className="container_section"
      >
        {BestsellerProductSections && (
          <ProductSection
            title={
              BestsellerProductSections.sectionTitle || "Sản phẩm bán chạy"
            }
            description={BestsellerProductSections.description}
            products={BestsellerProductSections.products ?? []}
          />
        )}
      </section>
    </main>
  );
}
