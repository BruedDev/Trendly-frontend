"use client";

import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  return <div>Demo title: {slug}</div>;
}
