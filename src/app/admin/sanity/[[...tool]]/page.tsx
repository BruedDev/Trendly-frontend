// src/app/admin/sanity/page.tsx
import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";

export default function AdminSanityPage() {
  return <NextStudio config={config} />;
}
