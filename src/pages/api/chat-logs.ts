import type { APIRoute } from 'astro';
import {
  verifyGateToken,
  getToroChatLogs,
  addToroChatLog,
  purgeOldChatLogs,
} from '../../lib/db';

function escapeCsvCell(val: unknown): string {
  const s = String(val ?? '').replace(/\r\n/g, '\n');
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function calcDaysRemaining(createdAt: string): string {
  if (!createdAt) return '30 ngày';
  const createdMs = Date.parse(createdAt.replace(' ', 'T') + 'Z');
  if (Number.isNaN(createdMs)) return '30 ngày';
  const expireMs = createdMs + 30 * 86400 * 1000;
  const diffDays = Math.max(0, Math.ceil((expireMs - Date.now()) / (86400 * 1000)));
  return `Còn ${diffDays} ngày`;
}

export const GET: APIRoute = async ({ request, cookies }) => {
  purgeOldChatLogs(30, true);

  const adminToken = cookies.get('tkd_gate_admin')?.value;
  if (!verifyGateToken('admin', adminToken)) {
    return new Response(JSON.stringify({ ok: false, message: 'Chưa đăng nhập quyền Quản trị.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const url = new URL(request.url);
  const format = (url.searchParams.get('format') || 'csv').toLowerCase();
  const rows = getToroChatLogs(2000);
  const dateStamp = new Date().toISOString().slice(0, 10);

  if (format === 'txt') {
    const header = [
      '========================================================================',
      'LỊCH SỬ CÂU HỎI VÀ CÂU TRẢ LỜI TRỢ LÝ AI TORO & SUSI (TỰ ĐỘNG XÓA SAU 30 NGÀY)',
      `Ngày xuất file: ${new Date().toLocaleString('vi-VN')} | Tổng số bản ghi: ${rows.length}`,
      '========================================================================',
      '',
    ].join('\r\n');

    const body = rows
      .map((r, idx) => {
        return [
          `--- [#${idx + 1} | ID: ${r.id}] Thời gian: ${r.created_at} (${calcDaysRemaining(r.created_at)}) | Nhân vật: ${r.character_name} | Nguồn: ${r.source_page} ---`,
          `[HỎI]: ${r.question}`,
          `[TRẢ LỜI]:`,
          `${r.answer}`,
          '',
        ].join('\r\n');
      })
      .join('\r\n');

    return new Response('\uFEFF' + header + body, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="cau-hoi-va-tra-loi-toro-30ngay-${dateStamp}.txt"`,
      },
    });
  }

  if (format === 'csv') {
    const headers = [
      'ID',
      'Thời gian hỏi (UTC)',
      'Thời hạn tự xóa (30 ngày)',
      'Nhân vật AI',
      'Trang đặt câu hỏi',
      'Câu hỏi của Sinh viên',
      'Câu trả lời của Trợ lý AI',
      'Địa chỉ IP',
    ];
    const lines = [
      headers.map(escapeCsvCell).join(','),
      ...rows.map((r) =>
        [
          r.id,
          r.created_at,
          calcDaysRemaining(r.created_at),
          r.character_name,
          r.source_page,
          r.question,
          r.answer,
          r.ip_address,
        ]
          .map(escapeCsvCell)
          .join(',')
      ),
    ];
    const csvContent = '\uFEFF' + lines.join('\r\n');
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="cau-hoi-va-tra-loi-toro-30ngay-${dateStamp}.csv"`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true, rows }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const question = String(body.question || '').trim().slice(0, 4000);
    const answer = String(body.answer || '').trim().slice(0, 16000);
    const character_name = String(body.character || 'TORO').trim().toUpperCase().slice(0, 20);
    const source_page = String(body.source || '/tro-ly-toro').trim().slice(0, 120);

    if (!question || !answer) {
      return new Response(JSON.stringify({ ok: false, message: 'Thiếu nội dung câu hỏi hoặc câu trả lời.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for') ||
      clientAddress ||
      'unknown';

    const row = addToroChatLog({
      character_name,
      question,
      answer,
      source_page,
      ip_address: ip,
    });

    return new Response(JSON.stringify({ ok: true, id: row.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, message: e?.message || 'Lỗi lưu lịch sử hỏi đáp' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
};
