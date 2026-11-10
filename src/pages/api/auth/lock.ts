import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = (await request.json()) as any;
    const gateKey = String(body.gate_key || '').trim();
    if (gateKey) {
      cookies.delete(`tkd_gate_${gateKey}`, { path: '/' });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
};
