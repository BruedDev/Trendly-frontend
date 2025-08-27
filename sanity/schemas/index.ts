import { productSchema } from './product-schema';
import { categoryGroupSchema } from './categoryGroup-schema';
import { categorySchema } from './category-schema';
import { pageSchema } from './page-schema';
import { sectionSchema } from './sections-schemas';
import sections from '../sections';

const schemas = [
  productSchema,
  categoryGroupSchema,
  categorySchema,
  pageSchema,
  sectionSchema,
  ...sections,
];

export default schemas;