// section-schema.ts
import { defineType, defineField } from "sanity";

export const sectionSchema = defineType({
  name: "sections",
  title: "Sections",
  type: "document",
  fields: [
    defineField({
      name: "sectionName",
      title: "Section Name",
      type: "string"
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string"
    }),
    defineField({
      name: "sections",
      title: "Sections List",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "productSection" },
        {
          type: "reference",
          to: [{ type: "categoryGroup" }],
          options: {
            filter: '_type == "categoryGroup"'
          }
        }
      ],
      description: "Tập hợp các section như hero, product để dễ quản lý và tái sử dụng."
    })
  ],
});