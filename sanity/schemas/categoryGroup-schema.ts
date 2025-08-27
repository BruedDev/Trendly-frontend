import { defineType, defineField } from "sanity";

export const categoryGroupSchema = defineType({
  name: "categoryGroup",
  title: "Category Group",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên nhóm danh mục",
      type: "string",
      validation: (Rule) => Rule.required().error("Tên nhóm danh mục là bắt buộc"),
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
    }),
    defineField({
      name: "categories",
      title: "Danh sách danh mục con",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.min(1).error("Phải có ít nhất một danh mục section"),
    }),
  ],
});