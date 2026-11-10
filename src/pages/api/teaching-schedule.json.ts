import type { APIRoute } from 'astro';
import { getTeachingSchedule } from '../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const items = getTeachingSchedule().filter((item) => item.is_active !== false);
    return new Response(JSON.stringify({ success: true, count: items.length, items }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=60'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: (e as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
};
