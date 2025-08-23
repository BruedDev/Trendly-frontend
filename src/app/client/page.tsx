import HeroSection from "@/components/Hero_section";
import { getPage } from "../../../sanity/query/sanity.query";

export default async function Home() {
  // Lấy dữ liệu trang home với slug là '/'
  const pageData = await getPage("hero-section");
  if (!pageData) {
    return (
      <main>
        Không tìm thấy dữ liệu trang home (slug '/'). Hãy kiểm tra lại trên
        Sanity Studio.
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

  return (
    <main>
      <HeroSection data={heroProps} />
    </main>
  );
}
