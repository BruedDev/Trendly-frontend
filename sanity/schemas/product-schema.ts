import { defineType, defineField } from "sanity";
import MSPInput from "../components/MSPInput";
import PriceInput from "../components/PriceInput";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
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
      type: "object",
      fields: [
        {
          name: "defaultImage",
          title: "Default Image",
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
          validation: (Rule) =>
            Rule.required().error("Default image is required"),
        },
        {
          name: "hoverImage",
          title: "Hover Image",
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
          hidden: ({ parent }) => !parent?.defaultImage,
        },
      ],
    }),
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
            },
            {
              name: "detailImages",
              title: "Hình chi tiết cho màu này",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      title: "Mô tả hình ảnh",
                      type: "string",
                      description: "Mô tả ngắn cho hình ảnh chi tiết sản phẩm.",
                    },
                  ],
                },
              ],
              description: "Upload nhiều hình cho từng màu.",
            },
            {
              name: "sizes",
              title: "Kích cỡ và tồn kho từng size",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "size",
                      title: "Size",
                      type: "string",
                      options: {
                        list: [
                          { title: "XS", value: "XS" },
                          { title: "S", value: "S" },
                          { title: "M", value: "M" },
                          { title: "L", value: "L" },
                          { title: "XL", value: "XL" },
                          { title: "XXL", value: "XXL" },
                        ],
                      },
                    },
                    {
                      name: "quantity",
                      title: "Tồn kho size này",
                      type: "number",
                      validation: (Rule) =>
                        Rule.required().min(0).error("Tồn kho phải >= 0"),
                      initialValue: 0,
                    },
                  ],
                },
              ],
              description: "Nhập số lượng tồn kho cho từng size của màu này.",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) =>
        Rule.required().positive().error("Valid price is required"),
      components: {
        input: PriceInput,
      },
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "Price before discount (optional)",
      components: {
        input: PriceInput,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) =>
        Rule.min(1).error("At least one category section is required"),
    }),

    // ===== PHẦN MỚI: DESCRIPTION ĐƯỢC NÂNG CẤP =====
    defineField({
      name: "description",
      title: "Product Description",
      type: "object",
      fields: [
        {
          name: "subtitle",
          title: "Phụ đề sản phẩm",
          type: "string",
          description: "VD: Thanh lịch – Thời trang – Dễ phối đồ",
          placeholder: "Thanh lịch – Thời trang – Dễ phối đồ",
        },
        {
          name: "mainDescription",
          title: "Mô tả chính",
          type: "text",
          rows: 4,
          description:
            "Mô tả chi tiết về sản phẩm, có thể sử dụng **text** để in đậm",
          placeholder:
            "Chiếc áo thun có bẻ tay ngắn với 2 gam màu cơ bản: **đen** và **kem**...",
        },
        {
          name: "details",
          title: "Chi tiết sản phẩm",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Tên thuộc tính",
                  type: "string",
                  options: {
                    list: [
                      { title: "Chất liệu", value: "Chất liệu" },
                      { title: "Form dáng", value: "Form dáng" },
                      { title: "Màu sắc", value: "Màu sắc" },
                      { title: "Size", value: "Size" },
                      { title: "Chi tiết", value: "Chi tiết" },
                      { title: "Xuất xứ", value: "Xuất xứ" },
                      { title: "Thương hiệu", value: "Thương hiệu" },
                    ],
                  },
                },
                {
                  name: "value",
                  title: "Giá trị",
                  type: "string",
                },
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "value",
                },
              },
            },
          ],
          description: "Thông tin chi tiết dạng danh sách",
        },
        {
          name: "styling",
          title: "Phong cách gợi ý",
          type: "array",
          of: [{ type: "string" }],
          description: "Cách phối đồ, mix & match",
          options: {
            layout: "list",
          },
        },
        {
          name: "tags",
          title: "Tags/Hashtags",
          type: "array",
          of: [{ type: "string" }],
          description: "Các hashtags cho sản phẩm",
          options: {
            layout: "tags",
          },
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
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
    defineField({
      name: "msp",
      title: "Mã sản phẩm (MSP)",
      type: "string",
      description: "Mã sản phẩm gồm 8 số, tự động sinh khi tạo mới.",
      readOnly: true,
      validation: (Rule) =>
        Rule.custom(async (msp, context) => {
          if (!msp) return true;

          if (!/^\d{8}$/.test(msp)) {
            return "MSP phải là 8 chữ số";
          }

          const client = context.getClient({ apiVersion: "2023-01-01" });
          const id = context.document?._id;

          if (id) {
            const cleanId = id.replace("drafts.", "");
            const query =
              '*[_type == "product" && msp == $msp && _id != $id && _id != $draftId][0]._id';
            const duplicate = await client.fetch(query, {
              msp,
              id: cleanId,
              draftId: `drafts.${cleanId}`,
            });

            if (duplicate) {
              return "MSP này đã tồn tại ở sản phẩm khác! Vui lòng tạo lại mã.";
            }
          }
          return true;
        }),
      components: {
        input: MSPInput,
      },
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
        subtitle: price ? `${price.toLocaleString("vi-VN")} VNĐ` : "No price",
        media,
      };
    },
  },
});
