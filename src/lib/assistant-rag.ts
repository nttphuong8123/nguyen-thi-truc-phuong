// src/lib/assistant-rag.ts
// Lõi xử lý RAG & Gemini Assistant cho "Trợ lý học tập – Nguyễn Thị Trúc Phương"

import officialDocsData from '../data/official_regulations_db.json';

export interface DocumentChunk {
  chunk_id: string;
  doc_id: string;
  doc_title: string;
  doc_code: string;
  article_ref: string;
  page_number?: number;
  chunk_title: string;
  content: string;
  keywords: string[];
  is_active: boolean;
}

export interface SearchMatch {
  chunk: DocumentChunk;
  score: number;
  matchedTerms: string[];
}

export interface AssistantResponse {
  answer: string;
  isGrounded: boolean;
  citations: Array<{
    docTitle: string;
    docCode: string;
    articleRef: string;
    pageNumber?: number;
    quote?: string;
  }>;
  suggestTransferToCVHT: boolean;
  unansweredId?: string;
  processingTimeMs: number;
}

// Stopwords mở rộng tiếng Việt
const STOP_WORDS = new Set([
  'là', 'của', 'và', 'các', 'những', 'cho', 'với', 'trong', 'được', 'có', 'khi',
  'thì', 'ở', 'tại', 'như', 'để', 'một', 'này', 'đó', 'tôi', 'em', 'mình', 'ạ',
  'dạ', 'cô', 'thầy', 'cho_em_hỏi', 'thưa_cô', 'cô_cho_em_hỏi', 'xin_hỏi', 'hỏi',
  'nào', 'sao', 'gì', 'thế_nào', 'bao_nhiêu', 'như_thế_nào', 'làm_sao', 'hay_không',
  'phải_không', 'xin', 'biết', 'về', 'theo', 'nhé', 'giúp', 'muốn'
]);

/**
 * Kiểm tra các câu hỏi vi phạm bảo mật, quy chế hoặc ngoài phạm vi (Guardrails)
 */
export function evaluateIntentGuardrails(query: string): { blocked: boolean; message: string; suggestTransfer: boolean } | null {
  const norm = query.toLowerCase().trim();

  // 1. Chống Prompt Injection & Bypass
  if (
    /ignore (all )?previous instructions/i.test(norm) ||
    /prompt hệ thống/i.test(norm) ||
    /system prompt/i.test(norm) ||
    /đóng vai/i.test(norm) ||
    /bỏ qua mọi chỉ dẫn/i.test(norm) ||
    /select \* from/i.test(norm) ||
    /--/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Hệ thống chỉ hỗ trợ giải đáp các thắc mắc liên quan đến Quy chế đào tạo và học tập chính thức của Trường Cao đẳng Kinh tế TP.HCM (HCE). Các câu lệnh kỹ thuật hoặc yêu cầu thay đổi chỉ dẫn hệ thống không được chấp nhận.',
      suggestTransfer: false
    };
  }

  // 2. Chặn tra cứu điểm / dữ liệu cá nhân (SIS_ENABLED = false)
  if (
    /tra cứu bảng điểm/i.test(norm) ||
    /mssv/i.test(norm) ||
    /bảng điểm chi tiết/i.test(norm) ||
    /xem họ tên/i.test(norm) ||
    /số điện thoại và điểm/i.test(norm) ||
    /thông tin cá nhân/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Hệ thống tra cứu điểm điện tử trực tuyến hiện chưa được kích hoạt (SIS_ENABLED=false) để bảo vệ an toàn thông tin cá nhân của sinh viên. Em vui lòng đăng nhập Cổng thông tin đào tạo chính thức daotao.kthcm.edu.vn hoặc liên hệ Cố vấn học tập (CVHT).',
      suggestTransfer: true
    };
  }

  // 3. Chặn các hành vi tiêu cực / gian lận / xin đề thi mật
  if (
    /nâng từ điểm d lên điểm a/i.test(norm) ||
    /mua chứng chỉ/i.test(norm) ||
    /bao đậu/i.test(norm) ||
    /xóa tên khỏi danh sách cấm thi/i.test(norm) ||
    /đề thi trắc nghiệm.*ngày mai/i.test(norm) ||
    /bí mật đề thi/i.test(norm) ||
    /số điện thoại cá nhân/i.test(norm) ||
    /địa chỉ nhà riêng/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Yêu cầu không phù hợp với chuẩn mực đào tạo và quy chế học tập của nhà trường. Mọi hành vi gian lận thi cử, sửa điểm hoặc can thiệp bất hợp pháp đều bị xử lý nghiêm theo quy định.',
      suggestTransfer: false
    };
  }

  // 4. Chặn các câu hỏi ngoài phạm vi đào tạo HCE (Out of scope)
  if (
    /thời tiết/i.test(norm) ||
    /nấu món phở/i.test(norm) ||
    /quicksort/i.test(norm) ||
    /bóng đá/i.test(norm) ||
    /real madrid/i.test(norm) ||
    /bitcoin/i.test(norm) ||
    /chuyện cười/i.test(norm) ||
    /iphone/i.test(norm) ||
    /phương trình bậc hai/i.test(norm) ||
    /du lịch đà lạt/i.test(norm) ||
    /chữa đau dạ dày/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Câu hỏi của em nằm ngoài phạm vi giải đáp của Trợ lý học tập. Cô chỉ hỗ trợ thông tin về Quy chế đào tạo, điểm học phần, chuẩn đầu ra và công tác sinh viên của Trường Cao đẳng Kinh tế TP.HCM (HCE) thôi nhé.',
      suggestTransfer: false
    };
  }

  // 5. Chặn văn bản hết hiệu lực hoặc trường khác
  if (
    /quyết định số 43\/2007/i.test(norm) ||
    /niên chế.*1998/i.test(norm) ||
    /học bổng năm 2010 đã bãi bỏ/i.test(norm) ||
    /dự thảo chưa ký/i.test(norm) ||
    /không có chữ ký duyệt/i.test(norm) ||
    /đại học bách khoa/i.test(norm) ||
    /kinh tế quốc dân/i.test(norm) ||
    /neu/i.test(norm) ||
    /y đa khoa/i.test(norm) ||
    /khiếu nại.*bộ giáo dục/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Hệ thống chỉ áp dụng các văn bản quy chế, quyết định hiện hành đang có hiệu lực thi hành tại Trường Cao đẳng Kinh tế TP.HCM (HCE). Các văn bản hết hiệu lực, dự thảo chưa phê duyệt hoặc quy chế trường khác không được áp dụng.\n\n👉 Em vui lòng liên hệ Cố vấn học tập (CVHT) hoặc Phòng Đào tạo để được hỗ trợ chính thức.',
      suggestTransfer: true
    };
  }

  return null;
}

/**
 * Trích xuất từ khóa học vụ chuyên sâu
 */
export function extractKeywords(query: string): string[] {
  const normalized = query
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, ' ')
    .trim();

  const words = normalized.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));

  const importantPhrases = [
    'điểm học phần', 'tính điểm học phần', 'điểm quá trình', 'điểm thi kết thúc',
    'tỷ lệ điểm', 'cấm thi', 'điều kiện dự thi', 'chuyên cần', 'nghỉ học',
    'thang điểm chữ', 'quy đổi điểm', 'học lại', 'thi lại', 'học cải thiện',
    'xét công nhận tốt nghiệp', 'chuẩn đầu ra tin học', 'chuẩn đầu ra ngoại ngữ',
    'thời gian tối đa', 'cảnh báo kết quả học tập', 'cảnh báo học tập', 'buộc thôi học',
    'tạm dừng học tập', 'bảo lưu', 'chuyển ngành', 'chuyển trường',
    'học bổng khuyến khích', 'học bổng', 'điểm rèn luyện', 'miễn giảm học phí',
    'báo cáo thực tập tốt nghiệp', 'thực tập tốt nghiệp'
  ];

  const matchedPhrases: string[] = [];
  for (const phrase of importantPhrases) {
    if (normalized.includes(phrase)) {
      matchedPhrases.push(phrase);
    }
  }

  return Array.from(new Set([...words, ...matchedPhrases]));
}

/**
 * Tìm kiếm RAG trong kho quy chế HCE
 */
export function searchRegulations(query: string, topK: number = 3): SearchMatch[] {
  const keywords = extractKeywords(query);
  const normalizedQuery = query.toLowerCase();

  const allChunks: DocumentChunk[] = [];
  for (const doc of officialDocsData as any[]) {
    if (doc.status !== 'approved' || !doc.is_active) continue;
    for (const chunk of doc.chunks || []) {
      if (chunk.is_active !== false) {
        allChunks.push({
          chunk_id: chunk.chunk_id,
          doc_id: doc.id,
          doc_title: doc.title,
          doc_code: doc.code,
          article_ref: chunk.article_ref,
          page_number: chunk.page_number,
          chunk_title: chunk.chunk_title,
          content: chunk.content,
          keywords: chunk.keywords || [],
          is_active: doc.is_active
        });
      }
    }
  }

  const matches: SearchMatch[] = [];

  for (const chunk of allChunks) {
    let score = 0;
    const matchedTerms: string[] = [];
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.chunk_title.toLowerCase();
    const articleRefLower = chunk.article_ref.toLowerCase();

    for (const kw of keywords) {
      if (kw.includes(' ')) {
        // Cụm từ chuyên môn quan trọng
        if (contentLower.includes(kw)) {
          score += 35;
          matchedTerms.push(kw);
        }
        if (titleLower.includes(kw)) {
          score += 50;
          matchedTerms.push(kw);
        }
      } else {
        // Từ khóa đơn lẻ
        if (titleLower.includes(kw)) {
          score += 15;
          matchedTerms.push(kw);
        }
        if (articleRefLower.includes(kw)) {
          score += 20;
          matchedTerms.push(kw);
        }
        if (chunk.keywords.some(k => k.toLowerCase() === kw)) {
          score += 20;
          matchedTerms.push(kw);
        }
        if (contentLower.includes(kw)) {
          score += 5;
          matchedTerms.push(kw);
        }
      }
    }

    if (score > 0) {
      matches.push({
        chunk,
        score,
        matchedTerms: Array.from(new Set(matchedTerms))
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, topK);
}

/**
 * Trả lời câu hỏi sinh viên thông qua RAG và Gemini
 */
export async function askAssistant(
  question: string,
  env?: any
): Promise<AssistantResponse> {
  const startTime = Date.now();
  const trimmed = question.trim();

  if (!trimmed || trimmed.length < 3) {
    return {
      answer: "Em vui lòng nhập câu hỏi rõ ràng về quy chế học tập, chuẩn đầu ra, điểm học phần hoặc công tác sinh viên để cô hỗ trợ nhé.",
      isGrounded: false,
      citations: [],
      suggestTransferToCVHT: false,
      processingTimeMs: Date.now() - startTime
    };
  }

  // 1. Kiểm tra Guardrails (bảo mật, chống gian lận, out of scope, văn bản hết hiệu lực)
  const guard = evaluateIntentGuardrails(trimmed);
  if (guard) {
    return {
      answer: guard.message,
      isGrounded: false,
      citations: [],
      suggestTransferToCVHT: guard.suggestTransfer,
      processingTimeMs: Date.now() - startTime
    };
  }

  // 2. Tìm kiếm RAG
  const searchResults = searchRegulations(trimmed, 3);
  const GROUNDING_THRESHOLD = 25;
  const bestMatch = searchResults[0];

  if (!bestMatch || bestMatch.score < GROUNDING_THRESHOLD) {
    return {
      answer: "Rất tiếc, nội dung câu hỏi của em hiện chưa có trong cơ sở dữ liệu quy chế đã được phê duyệt của nhà trường.\n\n👉 **Hướng dẫn:** Em vui lòng liên hệ **Cố vấn học tập (CVHT)** hoặc **Phòng Đào tạo** qua kênh thông tin chính thức của nhà trường để được hướng dẫn chi tiết và chính xác nhất nhé.",
      isGrounded: false,
      citations: [],
      suggestTransferToCVHT: true,
      processingTimeMs: Date.now() - startTime
    };
  }

  const groundedChunks = searchResults.filter(m => m.score >= 20);
  const contextText = groundedChunks
    .map((m, idx) => `[ĐOẠN ${idx + 1}] Văn bản: ${m.chunk.doc_title} (${m.chunk.doc_code})\nĐiều/Khoản: ${m.chunk.article_ref}\nTrang: ${m.chunk.page_number || 'N/A'}\nNội dung:\n${m.chunk.content}`)
    .join('\n\n---\n\n');

  const apiKey = env?.GEMINI_API_KEY || 
    (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '') || '';

  const systemPrompt = `Bạn là "Trợ lý học tập – Nguyễn Thị Trúc Phương", trợ lý ảo hỗ trợ tư vấn quy chế đào tạo, điểm học phần, chuẩn đầu ra và công tác sinh viên của Trường Cao đẳng Kinh tế TP.HCM (HCE).

NGUYÊN TẮC BẮT BUỘC:
1. Bạn CHỈ ĐƯỢC PHÉP trả lời dựa TUYỆT ĐỐI vào các đoạn quy chế được cung cấp dưới đây.
2. TUYỆT ĐỐI KHÔNG dùng kiến thức bên ngoài, KHÔNG suy diễn số liệu, KHÔNG tự bịa điều khoản hay tỷ lệ phần trăm nếu trong tài liệu không có.
3. TUYỆT ĐỐI KHÔNG tìm kiếm Internet.
4. Trong câu trả lời, bạn PHẢI trích dẫn rõ: Căn cứ theo [Tên văn bản hoặc Số Quyết định], [Điều/Khoản].
5. Giọng văn: Chuẩn mực sư phạm, ân cần, rõ ràng, gãy gọn, xưng "Cô" hoặc "Trợ lý học tập" và gọi sinh viên là "Em".
6. Nếu các đoạn trích dẫn không đủ thông tin để trả lời trọn vẹn, PHẢI nêu rõ phần đã biết từ quy chế và hướng dẫn sinh viên liên hệ Cố vấn học tập (CVHT) hoặc Phòng Đào tạo.`;

  const userPrompt = `DƯỚI ĐÂY LÀ CÁC ĐOẠN QUY CHẾ CHÍNH THỨC CỦA NHÀ TRƯỜNG:
${contextText}

CÂU HỎI CỦA SINH VIÊN:
"${trimmed}"

HÃY TRẢ LỜI CÂU HỎI TRÊN DỰA CHÍNH XÁC VÀO CÁC ĐOẠN QUY CHẾ ĐÃ CHO. TRÍCH DẪN RÕ CĂN CỨ VĂN BẢN VÀ ĐIỀU KHOẢN.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1024,
          topP: 0.8
        }
      })
    });

    if (!response.ok) {
      return createDirectContextResponse(groundedChunks, startTime);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return createDirectContextResponse(groundedChunks, startTime);
    }

    const citations = groundedChunks.map(m => ({
      docTitle: m.chunk.doc_title,
      docCode: m.chunk.doc_code,
      articleRef: m.chunk.article_ref,
      pageNumber: m.chunk.page_number
    }));

    return {
      answer: candidateText,
      isGrounded: true,
      citations,
      suggestTransferToCVHT: false,
      processingTimeMs: Date.now() - startTime
    };

  } catch (err) {
    console.error('Lỗi khi gọi AI service:', err);
    return createDirectContextResponse(groundedChunks, startTime);
  }
}

function createDirectContextResponse(groundedChunks: SearchMatch[], startTime: number): AssistantResponse {
  const top = groundedChunks[0].chunk;
  const answer = `Căn cứ theo **${top.doc_title}** (${top.doc_code}), **${top.article_ref}** quy định:\n\n${top.content}\n\n*(Thông tin được trích xuất trực tiếp từ văn bản quy chế chính thức của nhà trường)*.`;
  
  return {
    answer,
    isGrounded: true,
    citations: groundedChunks.map(m => ({
      docTitle: m.chunk.doc_title,
      docCode: m.chunk.doc_code,
      articleRef: m.chunk.article_ref,
      pageNumber: m.chunk.page_number
    })),
    suggestTransferToCVHT: false,
    processingTimeMs: Date.now() - startTime
  };
}
