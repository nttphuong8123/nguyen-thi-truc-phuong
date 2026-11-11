// src/pages/api/admin/questions.ts
import type { APIRoute } from 'astro';
import { verifyAdminToken } from '../../../lib/admin-auth';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : '';
  const admin = verifyAdminToken(token);

  if (!admin) {
    return new Response(JSON.stringify({ success: false, error: 'Yêu cầu đăng nhập quản trị.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      const { results: questions } = await db.prepare(`
        SELECT * FROM unanswered_questions ORDER BY created_at DESC LIMIT 50
      `).all();
      return new Response(JSON.stringify({ success: true, data: questions }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.warn('Lỗi query D1:', e);
    }
  }

  // Danh sách mẫu nếu chưa có D1
  return new Response(JSON.stringify({
    success: true,
    data: [
      {
        id: 1,
        question: 'Thủ tục xin cấp lại thẻ sinh viên bị mất như thế nào ạ?',
        context_topic: 'Công tác sinh viên',
        status: 'pending',
        frequency: 3,
        created_at: '2026-11-10 14:20:00'
      },
      {
        id: 2,
        question: 'Lịch đăng ký thi lại môn Pháp luật đại cương đợt 2 là khi nào?',
        context_topic: 'Khảo thí',
        status: 'pending',
        frequency: 2,
        created_at: '2026-11-11 09:15:00'
      }
    ]
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
