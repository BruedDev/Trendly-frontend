'use client'

import schemas from "./sanity/schemas";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { table } from "@sanity/table";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  // projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a9ulze55',
  // dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: "Your Project Title",
  apiVersion: "2024-11-01",
  basePath: "/admin/sanity",
  plugins: [
    structureTool(),
    visionTool(),
    table(),
  ],
  schema: { types: schemas },
});