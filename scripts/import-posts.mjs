// Import WordPress posts into src/content/blog/*.md.
//
// Reads the snapshots saved under reference/ (REST API JSON + live page HTML),
// converts the Elementor body to Markdown, downloads every riseoak.com upload the
// post uses into public/images/blog/, and copies the live <head> metadata.
//
// Usage: node scripts/import-posts.mjs [--refetch] [--overwrite] <slug> [<slug> ...]
//   --refetch    re-download the API JSON and live page before converting.
//   --overwrite  replace an existing src/content/blog/<slug>.md. Imported posts get
//                hand edits (e.g. internal links), so existing files are skipped by default.

import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const ROOT = process.cwd();
const SITE = 'https://riseoak.com';
const UPLOADS = `${SITE}/wp-content/uploads/`;
const API_DIR = path.join(ROOT, 'reference/blog-api');
const PAGE_DIR = path.join(ROOT, 'reference/posts');
const OUT_DIR = path.join(ROOT, 'src/content/blog');
const IMG_DIR = path.join(ROOT, 'public/images/blog');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const args = process.argv.slice(2);
const refetch = args.includes('--refetch');
const overwrite = args.includes('--overwrite');
const slugs = args.filter((a) => !a.startsWith('--'));
if (!slugs.length) {
  console.error('Usage: node scripts/import-posts.mjs [--refetch] <slug> [...]');
  process.exit(1);
}

const decode = (s) => parse(`<p>${s ?? ''}</p>`).text;
const pending = new Map(); // remote url -> local file

/** Map a riseoak.com upload URL to /images/blog/<yyyy>/<mm>/<file> and queue its download. */
function localImage(url) {
  if (!url?.startsWith(UPLOADS)) return url;
  const rel = decodeURI(url.slice(UPLOADS.length).split('?')[0]);
  pending.set(url, path.join(IMG_DIR, rel));
  return `/images/blog/${rel.split('/').map(encodeURIComponent).join('/')}`;
}

/** Internal riseoak.com links become root-relative; everything else is left alone. */
function localLink(href) {
  const m = href?.match(/^https?:\/\/(?:www\.)?riseoak\.com(\/[^#?]*)?([?#].*)?$/i);
  if (!m || href.startsWith(UPLOADS)) return href;
  return `${m[1] || '/'}${m[2] || ''}`;
}

function youtubeId(url) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m?.[1];
}

/** Flatten the Elementor section/widget tree into plain article HTML, in reading order. */
function elementorToHtml(content) {
  const root = parse(content);
  const sections = root.querySelectorAll('[data-elementor-type="wp-post"] > section');
  if (!sections.length) return content; // not built with Elementor
  const out = [];
  for (const section of sections) {
    const widgets = section.querySelectorAll('[data-widget_type]');
    const button = widgets.find((w) => w.getAttribute('data-widget_type') === 'button.default');
    if (button) {
      // The in-article CTA band: heading + outline button on a tinted background.
      const heading = widgets.find((w) => w.getAttribute('data-widget_type') === 'heading.default');
      const a = button.querySelector('a');
      out.push(
        `<div class="post-cta"><p class="post-cta-title">${heading?.querySelector('.elementor-heading-title')?.innerHTML.trim() ?? ''}</p>` +
          `<a class="post-cta-btn" href="${localLink(a.getAttribute('href'))}">${a.querySelector('.elementor-button-text')?.innerHTML.trim() ?? a.text.trim()}</a></div>`,
      );
      continue;
    }
    for (const w of widgets) {
      const type = w.getAttribute('data-widget_type');
      const body = w.querySelector('.elementor-widget-container') ?? w;
      if (type === 'heading.default') {
        const h = body.querySelector('.elementor-heading-title');
        const tag = /^h[1-6]$/i.test(h.tagName) ? h.tagName.toLowerCase() : 'p';
        out.push(`<${tag}>${h.innerHTML.trim()}</${tag}>`);
      } else if (type === 'text-editor.default') {
        out.push(body.innerHTML);
      } else if (type === 'image.default') {
        const img = body.querySelector('img');
        const cap = body.querySelector('figcaption');
        out.push(`<p><img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt') ?? ''}"></p>` + (cap ? `<p><em>${cap.innerHTML}</em></p>` : ''));
      } else if (type === 'video.default') {
        const settings = JSON.parse(w.getAttribute('data-settings') ?? '{}');
        const id = youtubeId(settings.youtube_url ?? '');
        // Non-empty on purpose: Turndown skips custom rules for blank elements.
        if (id) out.push(`<div class="post-video" data-yt="${id}">YouTube video</div>`);
        else console.warn(`  ! video widget without a YouTube URL`);
      } else {
        console.warn(`  ! unhandled widget ${type}, keeping its HTML`);
        out.push(body.innerHTML);
      }
    }
  }
  return out.join('\n');
}

/** Normalise links, images and Word/Google-Docs residue so Markdown stays clean. */
function cleanHtml(html) {
  const root = parse(html);
  root.querySelectorAll('a[href]').forEach((a) => a.setAttribute('href', localLink(a.getAttribute('href'))));
  root.querySelectorAll('img').forEach((img) => {
    img.setAttribute('src', localImage(img.getAttribute('src')));
    ['srcset', 'sizes', 'class', 'width', 'height', 'loading', 'decoding'].forEach((a) => img.removeAttribute(a));
  });
  // Styled spans and paragraphs inside table cells break Markdown tables.
  root.querySelectorAll('span').forEach((s) => s.replaceWith(s.innerHTML));
  root.querySelectorAll('td p, th p').forEach((p) => p.replaceWith(p.innerHTML));
  root.querySelectorAll('p').forEach((p) => {
    if (!p.text.trim() && !p.querySelector('img')) p.remove();
  });
  return root.toString().replace(/<!--[\s\S]*?-->/g, '');
}

function toMarkdown(html) {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
  td.use(gfm);
  td.addRule('youtube', {
    filter: (node) => node.nodeName === 'DIV' && node.getAttribute('class') === 'post-video',
    replacement: (_c, node) => {
      const id = node.getAttribute('data-yt');
      return `\n\n<div class="post-video"><iframe src="https://www.youtube.com/embed/${id}?controls=1&rel=0" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>\n\n`;
    },
  });
  td.addRule('cta', {
    filter: (node) => node.nodeName === 'DIV' && node.getAttribute('class') === 'post-cta',
    replacement: (_c, node) => `\n\n${node.outerHTML}\n\n`,
  });
  return td.turndown(html).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/** Read <title>, description, canonical, og:*, article:* and twitter:* from the live page. */
function headMeta(pageHtml) {
  const head = parse(pageHtml).querySelector('head');
  const meta = (attr, key) => head.querySelectorAll(`meta[${attr}="${key}"]`).map((m) => decode(m.getAttribute('content')));
  const one = (attr, key) => meta(attr, key)[0];
  const og = {};
  for (const m of head.querySelectorAll('meta[property^="og:"]')) {
    const k = m.getAttribute('property').slice(3).replace(/:/g, '_');
    og[k] = decode(m.getAttribute('content'));
  }
  const twitter = {};
  for (const m of head.querySelectorAll('meta[name^="twitter:"]')) twitter[m.getAttribute('name').slice(8)] = decode(m.getAttribute('content'));
  return {
    metaTitle: decode(head.querySelector('title')?.innerHTML ?? ''),
    metaDescription: one('name', 'description'),
    robots: one('name', 'robots'),
    canonical: head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    og,
    article: {
      section: one('property', 'article:section'),
      tags: meta('property', 'article:tag'),
      published_time: one('property', 'article:published_time'),
      modified_time: one('property', 'article:modified_time'),
    },
    twitter,
  };
}

const yaml = (obj, indent = '') =>
  Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${indent}${k}:\n${v.map((x) => `${indent}  - ${JSON.stringify(x)}`).join('\n')}`;
      if (typeof v === 'object') return `${indent}${k}:\n${yaml(v, indent + '  ')}`;
      return `${indent}${k}: ${JSON.stringify(v)}`;
    })
    .join('\n');

async function fetchTo(url, file) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

for (const slug of slugs) {
  console.log(`\n${slug}`);
  if (!overwrite && fs.existsSync(path.join(OUT_DIR, `${slug}.md`))) {
    console.log('  exists, skipped (pass --overwrite to replace it and lose hand edits)');
    continue;
  }
  const apiFile = path.join(API_DIR, `${slug}.json`);
  const pageFile = path.join(PAGE_DIR, `${slug}.html`);
  if (refetch || !fs.existsSync(apiFile)) await fetchTo(`${SITE}/wp-json/wp/v2/posts?slug=${slug}&_embed`, apiFile);
  if (refetch || !fs.existsSync(pageFile)) await fetchTo(`${SITE}/${slug}/`, pageFile);

  const [post] = JSON.parse(fs.readFileSync(apiFile, 'utf8'));
  if (!post) throw new Error(`No post with slug ${slug}`);
  const page = fs.readFileSync(pageFile, 'utf8');
  const head = headMeta(page);
  const pageRoot = parse(page);

  // The REST API refuses the author (404) and some media (401) anonymously; the live page has both.
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredUrl = media?.source_url ?? head.og.image;
  const featuredAlt = media?.alt_text ?? head.og.image_alt ?? '';
  const authorBox = pageRoot.querySelector('.elementor-author-box');
  const author = authorBox?.querySelector('.elementor-author-box__name')?.text.trim() ?? head.twitter.data1;
  const avatarUrl = authorBox?.querySelector('img')?.getAttribute('src');

  let authorAvatar;
  if (avatarUrl) {
    const file = `authors/${author.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`;
    pending.set(decode(avatarUrl), path.join(IMG_DIR, file));
    authorAvatar = `/images/blog/${file}`;
  }

  const body = toMarkdown(cleanHtml(elementorToHtml(post.content.rendered)));
  const frontmatter = {
    title: decode(post.title.rendered),
    slug: post.slug,
    date: `${post.date_gmt}Z`,
    modified: `${post.modified_gmt}Z`,
    author,
    authorAvatar,
    excerpt: decode(post.excerpt.rendered).replace(/\s*\[…\]\s*$/, '').trim(),
    featuredImage: localImage(featuredUrl),
    featuredImageAlt: featuredAlt,
    metaTitle: head.metaTitle,
    metaDescription: head.metaDescription,
    robots: head.robots,
    canonical: head.canonical,
    og: head.og,
    article: head.article,
    twitter: head.twitter,
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), `---\n${yaml(frontmatter)}\n---\n\n${body}`);
  console.log(`  wrote src/content/blog/${slug}.md (${body.length} chars)`);
}

for (const [url, file] of pending) {
  if (fs.existsSync(file)) continue;
  await fetchTo(url, file);
  console.log(`  image ${path.relative(ROOT, file)} (${fs.statSync(file).size} bytes)`);
}
