import { defineType, defineField } from "sanity";

export const categorySchema = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().custom((value) => {
        if (!value) return "Title is required";
        // Kiểm tra có dấu tiếng Việt
        if (!/[àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(value)) {
          return "Vui lòng nhập đúng tiếng Việt có dấu";
        }
        // Viết hoa chữ cái đầu
        if (value[0] !== value[0].toUpperCase()) {
          return "Chữ cái đầu phải viết hoa";
        }
        return true;
      }),
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
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
