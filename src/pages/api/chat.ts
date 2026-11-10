import type { APIRoute } from 'astro';
import { generateKnowledgeResponse } from '../../lib/toro-engine';
import { getTeachingSchedule } from '../../lib/db';
import { getEducationNews } from '../../lib/education-news';
import { getHceNews } from '../../lib/hce-news';

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro',
];
const TIMEOUT_MS = 4500;

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { headers: CORS });
};

export const POST: APIRoute = async ({ request, locals }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: { message: 'Body không hợp lệ.' } }, 400);
  }

  const payload = body?.payload;
  if (!payload || !Array.isArray(payload.contents) || payload.contents.length === 0) {
    return json({ error: { message: 'Thiếu nội dung hội thoại.' } }, 400);
  }

  const sysText = String(payload?.systemInstruction?.parts?.[0]?.text || '');
  const character =
    body?.character === 'SUSI' || /ĐÓNG VAI:\s*SUSI/i.test(sysText) ? 'SUSI' : 'TORO';
  const history = payload.contents || [];
  const lastUserItem = [...history].reverse().find((item: any) => item.role === 'user');
  const latestPromptText = lastUserItem?.parts?.[0]?.text || '';

  // 1. Kiểm tra API Key từ Client (nếu user tự cấu hình) hoặc từ Cloudflare Pages Environment
  const cfEnv = ((locals as any)?.runtime?.env || {}) as Record<string, unknown>;
  const clientKey = typeof body?.apiKey === 'string' ? body.apiKey.trim() : '';
  const serverKey = typeof cfEnv?.GEMINI_API_KEY === 'string' ? cfEnv.GEMINI_API_KEY.trim() : '';
  const nodeEnvKey = typeof process.env.GEMINI_API_KEY === 'string' ? process.env.GEMINI_API_KEY.trim() : '';

  const apiKey = clientKey || serverKey || nodeEnvKey;
  
  const EXTRA_SYSTEM_RULES = `
LỆNH BẮT BUỘC 1 (TRA CỨU GIẢNG VIÊN):
Khi người dùng hỏi thông tin giảng viên (email, số điện thoại, môn dạy, lịch giảng dạy, phòng làm việc...):
- BẮT BUỘC người dùng phải cung cấp đủ 2 yếu tố: (1) Mã số sinh viên gồm 8 chữ số bất kỳ (MSSV), và (2) Họ và tên cụ thể đầy đủ của giảng viên (viết hoa lịch sự, tối thiểu 2 từ, ví dụ: Thầy NGUYỄN THỊ TRÚC PHƯƠNG, Cô Nguyễn Thị Thanh Thảo, Thầy Nguyễn Ngọc Đức).
- NẾU THIẾU MÃ SỐ SINH VIÊN (8 chữ số): TUYỆT ĐỐI KHÔNG cung cấp thông tin, yêu cầu người dùng cung cấp Mã số sinh viên gồm 8 chữ số.
- NẾU GHI TÊN KHÔNG (chỉ ghi mỗi tên như "thầy Đính", "cô Thảo", "thầy Đức"): TUYỆT ĐỐI KHÔNG cung cấp thông tin, yêu cầu cung cấp đầy đủ cả Họ và Tên cụ thể của Thầy/Cô.
- CHỈ KHI CÓ ĐỦ CẢ HAI: Mới cung cấp thông tin giảng viên.

LỆNH BẮT BUỘC 2 (GIỚI THIỆU NGÀNH HỌC):
Khi người dùng hỏi về ngành học, các ngành đào tạo của Trường Cao đẳng Kinh tế TP.HCM (HCE):
- BẮT BUỘC ưu tiên giới thiệu ngành Marketing và ngành Quản trị kinh doanh trước tiên.
- Sau đó giới thiệu các ngành khác của trường và dẫn link chính thức: https://sites.google.com/kthcm.edu.vn/tuyensinh/tr%C3%ACnh-%C4%91%E1%BB%99-cao-%C4%91%E1%BA%B3ng-ch%C3%ADnh-quy-h%E1%BB%8Dc-ban-ng%C3%A0y/ng%C3%A0nh-%C4%91%C3%A0o-t%E1%BA%A1o
`;

  const isKeyValidFormat = apiKey && apiKey.startsWith('AIzaSy');

  // 2. Nếu có API key hợp lệ, thử gọi Google Gemini API
  if (isKeyValidFormat) {
    const p = { ...payload };
    delete p.tools;

    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (res.ok) {
          const text = await res.text();
          return new Response(text, {
            status: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
          });
        }
      } catch {
        continue;
      }
    }
  }

  // 3. Kết nối trực tiếp toàn bộ kho dữ liệu gốc (D1 Teaching Schedule + HCE News + Education News + 56 Site Pages + 28 Syllabus Codes + 188 Staff + QĐ 624)
  let scheduleItems: any[] = [];
  try {
    scheduleItems = getTeachingSchedule().filter((item) => item.is_active !== false);
  } catch {}

  let educationNewsItems: any[] = [];
  try {
    const newsData = await getEducationNews();
    if (newsData && Array.isArray(newsData.items)) {
      educationNewsItems = newsData.items;
    }
  } catch {}

  let hceNewsItems: any[] = [];
  try {
    const hceData = await getHceNews();
    if (Array.isArray(hceData)) {
      hceNewsItems = hceData;
    }
  } catch {}

  const localReply = generateKnowledgeResponse(
    latestPromptText,
    history,
    character,
    scheduleItems,
    educationNewsItems,
    hceNewsItems
  );

  // Đóng gói theo chuẩn format Gemini Response để frontend đọc mượt mà
  const fallbackResponse = {
    candidates: [
      {
        content: {
          parts: [{ text: localReply }],
          role: 'model',
        },
        finishReason: 'STOP',
        index: 0,
      },
    ],
    usageMetadata: {
      promptTokenCount: 150,
      candidatesTokenCount: 380,
      totalTokenCount: 530,
    },
    engine: 'toro-knowledge-engine-v3',
  };

  return json(fallbackResponse, 200);
};
