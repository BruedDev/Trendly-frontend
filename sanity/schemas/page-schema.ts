import { defineType, defineField } from "sanity";

export const pageSchema = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        // { type: "heroSection" },
        // { type: "productSection" },
        { type: "reference", to: [{ type: "sections" }] },
      ],
    }),
  ],
});