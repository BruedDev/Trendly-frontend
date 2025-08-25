import { productSchema } from './product-schema';
import { categorySchema } from './category-schema';
import { pageSchema } from './page-schema';
import sections from '../sections';

const schemas = [
  productSchema,
  categorySchema,
  pageSchema,
  ...sections,
];

export default schemas;