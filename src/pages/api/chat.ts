// src/pages/api/chat.ts
import type { APIRoute } from 'astro';
import { askAssistant } from '../../lib/assistant-rag';

export const prerender = false;

// Bộ nhớ đệm tạm thời cho rate-limit theo IP (tối đa 20 câu hỏi/phút trên mỗi IP)
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (entry.count >= 20) {
    return false;
  }
  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // 1. Kiểm tra rate limit
    const clientIp = request.headers.get('cf-connecting-ip') || 
                     request.headers.get('x-forwarded-for') || 
                     '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Bạn gửi câu hỏi quá nhanh. Vui lòng đợi trong giây lát rồi thử lại nhé.'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Parse body
    const body = await request.json().catch(() => null);
    if (!body || typeof body.message !== 'string') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Nội dung câu hỏi không hợp lệ.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const question = body.message.trim();
    if (!question) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Vui lòng nhập nội dung câu hỏi.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Lấy runtime env nếu có (Cloudflare Secrets)
    const env = (locals as any)?.runtime?.env || {};

    // 4. Xử lý RAG và Gemini
    const result = await askAssistant(question, env);

    // 5. Ghi log vào D1 nếu có kết nối
    const db = (locals as any)?.runtime?.env?.DB;
    if (db) {
      try {
        const sessionId = body.sessionId || 'session_' + Math.random().toString(36).substring(2, 9);
        await db.prepare(`
          INSERT INTO chat_logs (session_id, question, answer, is_grounded, citations_json, response_time_ms)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          sessionId,
          question,
          result.answer,
          result.isGrounded ? 1 : 0,
          JSON.stringify(result.citations),
          result.processingTimeMs
        ).run();

        // Nếu không có căn cứ, ghi nhận vào danh sách câu hỏi chưa giải đáp
        if (!result.isGrounded) {
          await db.prepare(`
            INSERT INTO unanswered_questions (question, context_topic, session_id)
            VALUES (?, ?, ?)
          `).bind(question, 'Tư vấn quy chế', sessionId).run();
        }
      } catch (dbErr) {
        console.warn('Ghi log D1 không thành công (có thể chưa binding D1):', dbErr);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      data: result
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error('Lỗi tại /api/chat:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
