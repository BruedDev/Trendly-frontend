import { defineType, defineField } from "sanity";

export const sectionSchema = defineType({
	name: "section",
	title: "Section",
	type: "document",
	fields: [
		defineField({ name: "sectionName", title: "Section Name", type: "string" }),
		defineField({ name: "title", title: "Title", type: "string" }),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "categoryFilter",
			title: "Category Filter",
			type: "array",
			of: [{ type: "reference", to: [{ type: "category" }] }],
		}),
	],
});
