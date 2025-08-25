import type { Rule } from 'sanity';

export const productSection = {
  name: 'productSection',
  title: 'Product Section',
  type: 'object',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Products'
    },
    {
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'New Products', value: 'new' },
          { title: 'Best Sellers', value: 'bestseller' },
          { title: 'All Products', value: 'all' }
        ]
      },
      initialValue: 'new'
    },
    {
      name: 'limit',
      title: 'Number of Products',
      type: 'number',
      initialValue: 8,
      validation: (Rule: Rule) => Rule.min(1).max(20)
    }
  ]
};