import type { APIRoute } from 'astro';
import db, { type SyllabusCode } from '../../../lib/db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as any;
    const code = String(body.code || '').trim().toUpperCase();

    if (!code) {
      return new Response(
        JSON.stringify({ ok: false, message: 'Vui lòng nhập mã số đề tài hoặc mã tài liệu để tra cứu.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const row = db.prepare('SELECT * FROM syllabus_codes WHERE UPPER(code) = ?').get(code) as SyllabusCode | undefined;
    if (!row) {
      return new Response(
        JSON.stringify({
          ok: false,
          code,
          message: `Hệ thống không tìm thấy tài liệu tương ứng với mã ${code}.`,
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        code: row.code,
        title: row.title,
        url: row.url,
        category: row.category,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Lỗi tra cứu hệ thống.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
