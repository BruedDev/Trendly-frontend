import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './sanity/schemas/index.ts',
  outputPath: './sanity/types/sanity-codegen.ts',
};

export default config;