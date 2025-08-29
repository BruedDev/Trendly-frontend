import { defineType, defineField } from "sanity";
import MSPInput from '../components/MSPInput';
import PriceInput from '../components/PriceInput';

export const productSchema = defineType({
 name: "product",
 title: "Product",
 type: "document",
 fields: [
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
             name: "quantity",
             title: "Tồn kho màu này (Quantity)",
             type: "number",
             validation: (Rule) => Rule.required().min(0).error("Tồn kho màu phải >= 0"),
             initialValue: 0,
             description: "Số lượng tồn kho riêng cho màu này.",
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
         validation: (Rule) => Rule.required().error("Default image is required"),
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
     name: "price",
     title: "Price",
     type: "number",
     validation: (Rule) => Rule.required().positive().error("Valid price is required"),
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
     validation: (Rule) => Rule.min(1).error("At least one category section is required"),
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
   /* Mã sản phẩm gồm 8 số, tự động sinh, duy nhất cho mỗi sản phẩm. dùng để search hiển thị ra ngoài cho đẹp không thay _id thật của sanity sinh ra */
   defineField({
     name: "msp",
     title: "Mã sản phẩm (MSP)",
     type: "string",
     description: "Mã sản phẩm gồm 8 số, tự động sinh khi tạo mới.",
     readOnly: true,
     validation: Rule => Rule
       .custom(async (msp, context) => {
         // Nếu không có MSP thì bỏ qua validation
         if (!msp) return true;

         // Kiểm tra format 8 số
         if (!/^\d{8}$/.test(msp)) {
           return "MSP phải là 8 chữ số";
         }

         const client = context.getClient({ apiVersion: '2023-01-01' });
         const id = context.document?._id;

         // Chỉ kiểm tra trùng lặp nếu có ID khác
         if (id) {
           const cleanId = id.replace('drafts.', '');
           const query = '*[_type == "product" && msp == $msp && _id != $id && _id != $draftId][0]._id';
           const duplicate = await client.fetch(query, {
             msp,
             id: cleanId,
             draftId: `drafts.${cleanId}`
           });

           if (duplicate) {
             return 'MSP này đã tồn tại ở sản phẩm khác! Vui lòng tạo lại mã.';
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
       subtitle: price ? `${price.toLocaleString('vi-VN')} VNĐ` : "No price",
       media,
     };
   },
 },
});