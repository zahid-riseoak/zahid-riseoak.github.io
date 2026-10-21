import { defineConfig } from 'astro/config';

// Match WordPress permalinks: every page lives at /slug/ with a trailing slash.
export default defineConfig({
  site: 'https://riseoak.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Same 301s the live site serves for links used in the header/popup.
  redirects: {
    '/msp-marketing-agency/': '/',
    '/apply-free-consultation/': '/consultation/',
    '/msp-ai-visibility-roadmap/': '/msp-ai-pilot/',
  },
});
