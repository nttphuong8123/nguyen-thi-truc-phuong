import type { APIRoute } from 'astro';
import { getHceNews } from '../../lib/hce-news';

export const GET: APIRoute = async () => {
  try {
    const news = await getHceNews();
    return new Response(JSON.stringify({ success: true, count: news.length, items: news, data: news }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=600, s-maxage=600'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: (e as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
};
