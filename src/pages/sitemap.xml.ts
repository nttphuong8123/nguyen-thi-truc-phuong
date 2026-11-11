import type { APIRoute } from 'astro';
import db, { normalizeRoutePath } from '../lib/db';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://nguyenthitrucphuong.pages.dev';
  const pages = db
    .prepare(
      `SELECT route_path, updated_at FROM site_pages
       WHERE route_path NOT LIKE '/elearning%' 
         AND route_path != '/data'`
    )
    .all() as { route_path: string; updated_at: string }[];

  const articles = db
    .prepare('SELECT slug, published_at FROM news_articles ORDER BY id DESC')
    .all() as { slug: string; published_at: string }[];

  const staticRoutes = [
    '/ngan-hang-de-thi',
    '/goc-chia-se',
    '/study-corner',
    '/spss',
    '/software',
    '/contact',
    '/teaching',
    '/mentor',
  ];
  const today = new Date().toISOString().split('T')[0];

  const seenPaths = new Set<string>();
  const urlEntries: string[] = [];

  for (const p of pages) {
    const clean = normalizeRoutePath(p.route_path);
    if (seenPaths.has(clean)) continue;
    seenPaths.add(clean);
    const loc = `${siteUrl}${clean === '/' ? '/' : clean}`;
    const lastmod = p.updated_at ? p.updated_at.split(' ')[0] : today;
    const priority = clean === '/' ? '1.0' : clean.split('/').length === 2 ? '0.8' : '0.7';
    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  for (const sr of staticRoutes) {
    if (seenPaths.has(sr)) continue;
    seenPaths.add(sr);
    urlEntries.push(`  <url>
    <loc>${siteUrl}${sr}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  for (const a of articles) {
    const loc = `${siteUrl}/goc-chia-se/${encodeURIComponent(a.slug)}`;
    const lastmod = a.published_at ? a.published_at.split(' ')[0] : today;
    urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
