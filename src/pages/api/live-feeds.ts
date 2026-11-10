import type { APIRoute } from 'astro';
import { getLiveFeeds } from '../../lib/live-feeds';

export const GET: APIRoute = async ({ url }) => {
  const force = url.searchParams.get('force') === '1';
  const data = await getLiveFeeds(force);
  return new Response(JSON.stringify({ ok: true, ...data }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': force
        ? 'no-store'
        : 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600',
    },
  });
};
