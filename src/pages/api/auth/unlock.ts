import type { APIRoute } from 'astro';
import { checkGatePasscode, createGateToken } from '../../../lib/db';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = (await request.json()) as any;
    const gateKey = String(body.gate_key || '').trim();
    const passcode = String(body.passcode || '').trim();

    if (!gateKey || !passcode) {
      return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập mã xác thực.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isValid = checkGatePasscode(gateKey, passcode);
    if (!isValid) {
      return new Response(JSON.stringify({ ok: false, message: 'Mã xác thực không chính xác. Vui lòng kiểm tra lại!' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = createGateToken(gateKey);
    cookies.set(`tkd_gate_${gateKey}`, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: 'Lỗi xử lý hệ thống.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
