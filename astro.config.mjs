import { defineConfig } from 'astro/config';
import { site } from './src/data/site.ts';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site: site.canonicalOrigin || undefined,
  devToolbar: { enabled: false },
});
