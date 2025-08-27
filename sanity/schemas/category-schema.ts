import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên danh mục nhỏ",
      type: "string",
      validation: (Rule) => Rule.required().error("Tên danh mục nhỏ là bắt buộc"),
    }),
    defineField({
      name: "slug",
      title: "Đường dẫn",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Đường dẫn là bắt buộc"),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
    })
  ],
});