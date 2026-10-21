import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts imported from WordPress by scripts/import-posts.mjs.
// The `slug` frontmatter becomes the entry id, which is also the post URL (/<slug>/).
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    modified: z.coerce.date().optional(),
    author: z.string(),
    authorAvatar: z.string().optional(),
    excerpt: z.string(),
    featuredImage: z.string(),
    featuredImageAlt: z.string().default(''),
    metaTitle: z.string(),
    metaDescription: z.string(),
    robots: z.string().optional(),
    canonical: z.string().url(),
    // Copied verbatim from the live page's <head>; keys mirror og:* / twitter:* with ":" as "_".
    og: z.record(z.string(), z.string()).default({}),
    article: z
      .object({
        section: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published_time: z.string().optional(),
        modified_time: z.string().optional(),
      })
      .optional(),
    twitter: z.record(z.string(), z.string()).default({}),
  }),
});

export const collections = { blog };
