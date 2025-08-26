import HeroSection from "@/components/Hero_section";
import ProductSection from "@/components/ProductSection";
import { getPage } from "../../../sanity/query/sanity.query";

export default async function Home() {
  const pageData = await getPage("/");
  if (!pageData) {
    return (
      <main>
        Không tìm thấy dữ liệu trang home. Hãy kiểm tra lại trên Sanity Studio.
      </main>
    );
  }

  // Lấy section heroSection từ body
  const heroSection = Array.isArray(pageData.body)
    ? pageData.body.find(
        (section: { _type: string }) => section._type === "heroSection"
      )
    : undefined;

  if (!heroSection) {
    return (
      <main>Không tìm thấy section heroSection trong body của trang home.</main>
    );
  }

  const heroProps = {
    title: heroSection.title,
    description: heroSection.subtitle,
    images: Array.isArray(heroSection.images)
      ? heroSection.images.slice(0, 3)
      : [],
  };

  // Lấy section productSection Sản phẩm mới
  const productSection = Array.isArray(pageData.body)
    ? pageData.body.find(
        (section: { _type: string }) => section._type === "productSection"
      )
    : undefined;

  console.log("Product Section:", productSection);

  return (
    <main>
      {/* Hero Section */}
      <section id="heroSection" aria-label="Hero Section">
        <HeroSection data={heroProps} />
      </section>

      {/* Product Section (new product)  */}
      <section
        id="newProducts"
        aria-label="New Products"
        className="container_section"
      >
        {productSection && (
          <ProductSection
            title={productSection.sectionTitle || "Sản phẩm mới"}
            products={
              Array.isArray(productSection.products)
                ? productSection.products
                : []
            }
          />
        )}
      </section>
    </main>
  );
}
