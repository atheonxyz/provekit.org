import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://provekit.org',
  trailingSlash: 'never',
  prefetch: true,
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
