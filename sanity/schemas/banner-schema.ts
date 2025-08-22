import { defineType, defineField } from "sanity";

export const bannerSchema = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for accessibility and SEO",
        },
      ],
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
        defineField({
          name: "isActive",
          title: "Active",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "SEO meta title for the banner page",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "SEO meta description for the banner page",
        }),
        defineField({
          name: "metaKeywords",
          title: "Meta Keywords",
          type: "string",
          description: "SEO keywords, separated by commas",
        }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});