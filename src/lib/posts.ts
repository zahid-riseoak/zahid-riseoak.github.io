import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All imported posts, newest first. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Author archive slugs, matching WordPress (/author/<slug>/). */
export const authors: Record<string, { slug: string }> = {
  'Prasanna Perera': { slug: 'prasanna' },
};

export const authorUrl = (name: string) => (authors[name] ? `/author/${authors[name].slug}/` : undefined);

/** Elementor's posts widget trims excerpts to 25 words with no ellipsis. */
export function listExcerpt(text: string, words = 25): string {
  return text.split(/\s+/).slice(0, words).join(' ');
}

/** Posts still listed on /blog/ that have not been imported yet (all older than the imported ones). */
export const legacyPosts = [
  {
    href: '/overcoming-seasonal-demand-fluctuations-for-msps/',
    img: '/images/2025/06/MSP-Leads-Drop-Twice-a-Year-—-Outsmart-It-2.jpg',
    alt: 'MSP Leads Drop Twice a Year — Outsmart It (2)',
    title: 'MSP Leads Drop Twice a Year — Outsmart It',
    excerpt: 'If you’ve noticed your MSP lead generation taking dips at certain times of the year, you’re not imagining things. There are two predictable seasonal downturns',
  },
  {
    href: '/msp-growth/',
    img: '/images/2025/06/3-Must-Know-MSP-Growth-Areas-for-2025-and-Beyond.jpg',
    alt: '3 Must-Know MSP Growth Areas for 2025 and Beyond',
    title: '3 Proven MSP Growth Areas That Drive 20%+ Revenue Growth in 2025',
    excerpt: 'With nearly 60% of MSPs expecting revenue growth exceeding 20%, the question isn’t whether growth is possible—it’s which strategies deliver results. Based on insights from',
  },
  {
    href: '/how-to-hook-visitors-on-your-msp-landing-page/',
    img: '/images/2025/05/You-Only-Have-3-Seconds-—-Heres-How-to-Hook-Visitors-on-Your-MSP-Landing-Page.jpg',
    alt: 'You Only Have 3 Seconds — Here’s How to Hook Visitors on Your MSP Landing Page',
    title: 'You Only Have 3 Seconds — Here’s How to Hook Visitors on Your MSP Landing Page',
    excerpt: 'When a visitor arrives at your MSP landing page, you have just three seconds to capture their attention before they click away to another website.',
  },
];
