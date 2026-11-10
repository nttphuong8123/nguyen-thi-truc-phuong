import type { APIRoute } from 'astro';
import { getEducationNews, EDUCATION_SOURCES } from '../../lib/education-news';

// Rate limit ép làm mới: Tối thiểu 15 giây giữa các lần force reload
let lastForceReloadTime = 0;
const FORCE_RELOAD_COOLDOWN_MS = 15000;

export const GET: APIRoute = async ({ url }) => {
  try {
    const forceParam = url.searchParams.get('force') === '1';
    const sourceParam = url.searchParams.get('source') || 'all';
    const limitParam = parseInt(url.searchParams.get('limit') || '0', 10);
    const pageParam = parseInt(url.searchParams.get('page') || '1', 10);

    const now = Date.now();
    let allowForce = false;
    if (forceParam && now - lastForceReloadTime > FORCE_RELOAD_COOLDOWN_MS) {
      allowForce = true;
      lastForceReloadTime = now;
    }

    const newsData = await getEducationNews(allowForce);

    let filteredItems = newsData.items;
    if (sourceParam && sourceParam !== 'all') {
      filteredItems = filteredItems.filter((it) => it.sourceId === sourceParam);
    }

    let pagedItems = filteredItems;
    if (limitParam > 0) {
      const start = Math.max(0, (pageParam - 1) * limitParam);
      pagedItems = filteredItems.slice(start, start + limitParam);
    }

    const payload = {
      ok: true,
      total: filteredItems.length,
      allTotal: newsData.total,
      page: pageParam,
      limit: limitParam > 0 ? limitParam : filteredItems.length,
      updatedAt: newsData.updatedAt,
      cached: newsData.cached,
      sources: newsData.sources,
      availableSources: EDUCATION_SOURCES.map((s) => ({
        id: s.id,
        name: s.name,
        shortName: s.shortName,
        homeUrl: s.homeUrl,
        color: s.color,
      })),
      items: pagedItems,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': allowForce
          ? 'no-store, no-cache, must-revalidate'
          : 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: err?.message || 'Không thể tổng hợp tin tức giáo dục',
        items: [],
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
};
