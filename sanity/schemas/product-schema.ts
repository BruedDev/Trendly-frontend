import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    // ...existing fields...
    defineField({
      name: "colors",
      title: "Màu sắc",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "colorCode",
              title: "Mã màu",
              type: "string",
            },
            {
              name: "image",
              title: "Hình minh họa",
              type: "image",
              options: { hotspot: true },
            }
          ]
        }
      ]
    }),
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Product name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
    }),
    defineField({
      name: "thumbnail",
      title: "Product Image",
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
      validation: (Rule) => Rule.required().error("Product image is required"),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive().error("Valid price is required"),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "Price before discount (optional)",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.min(1).error("At least one category is required"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isNew",
      title: "New Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isBestseller",
      title: "Bestseller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      price: "price",
    },
    prepare(selection) {
      const { title, media, price } = selection;
      return {
        title: title,
        subtitle: price ? `${price.toLocaleString()} VNĐ` : "No price",
        media,
      };
    },
  },
});