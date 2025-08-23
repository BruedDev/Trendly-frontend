export const heroSection = {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'object',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'subtitle', title: 'Subtitle', type: 'string' },
      {
        name: 'images',
        title: 'Slider Images',
        type: 'array',
        of: [
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string',
                description: 'Important for accessibility and SEO',
              }
            ]
          }
        ]
      }
    ]
};
