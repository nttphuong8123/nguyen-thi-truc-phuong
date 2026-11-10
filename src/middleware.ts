import { defineMiddleware } from 'astro:middleware';
import { syncFromD1, flushD1Writes, normalizeRoutePath } from './lib/db';

const NO_CACHE_PATHS = new Set(['/admin', '/data', '/elearning', '/ngan-hang-de-thi']);
const SKIP_D1_PATHS = new Set(['/api/live-feeds', '/robots.txt', '/favicon.svg', '/favicon-32x32.png', '/apple-touch-icon.png', '/llms.txt', '/llms-full.txt']);

const LEGACY_REDIRECTS: Record<string, string> = {
  '/home': '/',
  '/questionnaire/spss': '/spss',
  '/ebook': '/elearning',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const rawPathname = context.url.pathname;

  // Redirect legacy / uppercase / diacritic page routes (excluding API and static assets)
  if (
    context.request.method === 'GET' &&
    !rawPathname.startsWith('/api/') &&
    !rawPathname.startsWith('/_astro/') &&
    !/\.[a-z0-9]{2,5}$/i.test(rawPathname)
  ) {
    let decodedPath = rawPathname;
    try {
      decodedPath = decodeURIComponent(rawPathname);
    } catch {}
    const cleanPath = normalizeRoutePath(decodedPath);
    const legacyTarget = LEGACY_REDIRECTS[cleanPath];
    if (legacyTarget) {
      return context.redirect(legacyTarget + context.url.search, 301);
    }
    if (decodedPath !== cleanPath) {
      return context.redirect(cleanPath + context.url.search, 301);
    }
  }

  const pathname = rawPathname.toLowerCase();
  const shouldSkipD1 =
    SKIP_D1_PATHS.has(pathname) ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/images/');

  const d1 = (context.locals as any)?.runtime?.env?.DB;
  if (d1 && !shouldSkipD1) {
    const isAdminRoute =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/elearning') ||
      pathname.startsWith('/ngan-hang-de-thi') ||
      pathname.startsWith('/api/admin') ||
      pathname.startsWith('/api/submissions') ||
          await syncFromD1(d1, isAdminRoute);
  }

  const response = await next();

  if (d1) {
    await flushD1Writes(d1);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html') && !contentType.includes('charset')) {
    response.headers.set('content-type', 'text/html; charset=utf-8');
  } else if (contentType.includes('application/json') && !contentType.includes('charset')) {
    response.headers.set('content-type', 'application/json; charset=utf-8');
  }

  if (NO_CACHE_PATHS.has(pathname)) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  } else if (
    context.request.method === 'GET' &&
    contentType.includes('text/html') &&
    !pathname.startsWith('/api/')
  ) {
    if (pathname === '/' || pathname === '/goc-chia-se' || pathname.startsWith('/goc-chia-se/')) {
      response.headers.set(
        'Cache-Control',
        'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
      );
    } else {
      response.headers.set(
        'Cache-Control',
        'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      );
    }
  }
  return response;
});
