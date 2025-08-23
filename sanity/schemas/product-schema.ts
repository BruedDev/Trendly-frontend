import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "productSection",
  title: "product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for accessibility and SEO",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional image caption",
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.min(1).error("At least one category is required"),
    },
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Important for accessibility and SEO",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional image caption",
            },
          ],
        },
        {
          type: "table", // Add table type to content array
        },
      ],
    }),
  ],
  preview: {
    select: {
      metaTitle: "seo",
    },
    prepare(selection) {
      const { metaTitle } = selection?.metaTitle || "";
      return {
        title: metaTitle || "Untitle",
      };
    },
  },
});
