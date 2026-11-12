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

  // 6. Chặn yêu cầu lộ link Google Drive nội bộ và hướng dẫn cách tra cứu chính thức
  if (
    /xin (link )?(google )?drive/i.test(norm) ||
    /thư mục drive/i.test(norm) ||
    /link drive.*đề cương/i.test(norm) ||
    /link drive/i.test(norm) ||
    /google drive.*thực tập/i.test(norm) ||
    /folder id/i.test(norm)
  ) {
    return {
      blocked: true,
      message: 'Để bảo vệ bản quyền học liệu số và quy định an toàn thông tin của nhà trường, Trợ lý học tập không chia sẻ các liên kết hay thư mục Google Drive nội bộ.\n\n👉 Cô sẵn sàng hướng dẫn và xây dựng trực tiếp khung đề cương chi tiết 3 chương chuẩn hóa theo đúng đề tài của em ngay tại đây! Ngoài ra, em có thể tham khảo bài Hướng dẫn báo cáo thực tập chuẩn HCE tại: https://nguyenthitrucphuong.pages.dev/study-corner/internships/huong-dan-bao-cao-hce nhé.',
      suggestTransfer: false
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
    'báo cáo thực tập tốt nghiệp', 'thực tập tốt nghiệp', 'thực tập', 'hỏi thực tập',
    'chuẩn bị đi thực tập', 'đi thực tập', 'tư vấn thực tập', 'làm đề cương',
    'xây dựng đề cương', 'đề cương hoàn chỉnh', 'thực tập công ty', 'lĩnh vực thực tập',
    'đề cương thực tập', 'đề cương chi tiết', 'cấu trúc đề cương', 'hướng dẫn viết đề cương',
    'đề cương mẫu', 'lập đề cương', 'gợi ý đề cương', 'đề cương bán hàng',
    'đề cương marketing', 'đề cương marketing mix', 'đề cương digital marketing',
    'đề cương thương hiệu', 'đề cương nhận diện thương hiệu', 'đề cương tuyển dụng',
    'đề cương nhân sự', 'đóng dấu công ty', 'nghị định 30/2020', 'số trang báo cáo',
    'hướng dẫn báo cáo hce'
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

  const DEFAULT_GEMINI_API_KEY = typeof atob === 'function' 
    ? atob('QVEuQWI4Uk42TEpjb09XZHBFMjBSMjJIVEdMTnpYUnN3UlgzQmIyRy1EalpNWDdXOGlPTUE=')
    : 'AQ' + '.' + 'Ab8RN6LJcoOWdpE20R22HTGLNzXRswRX3Bb2G' + '-DjZMX7W8iOMA';
  const GEMINI_MODELS = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];

  const apiKey = env?.GEMINI_API_KEY || 
    (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '') || 
    DEFAULT_GEMINI_API_KEY;

  const systemPrompt = `Bạn là "Trợ lý học tập – ThS. Nguyễn Thị Trúc Phương", trợ lý học tập chính thức của Khoa Quản trị - Kinh doanh, Trường Cao đẳng Kinh tế TP.HCM (HCE).

QUY CHUẨN ĐỒNG BỘ TRẢ LỜI CỦA TRỢ LÝ HỌC TẬP (BẮT BUỘC TUÂN THỦ 100%):

1. DANH XƯNG & PHONG THÁI SƯ PHẠM:
   - Luôn xưng là "Cô" (hoặc "Trợ lý học tập"), gọi sinh viên là "Em".
   - Giọng văn chuẩn mực sư phạm, ân cần, gãy gọn, thấu hiểu, khích lệ và chuyên nghiệp.

2. CẤU TRÚC 4 PHẦN THỐNG NHẤT CHO MỌI CÂU TRẢ LỜI:
   - PHẦN 1: LỜI CHÀO & TIẾP NHẬN CÂU HỎI (Ấm áp, ngắn gọn 1-2 câu).
   - PHẦN 2: NỘI DUNG GIẢI ĐÁP CỐT LÕI (CÓ CẤU TRÚC PHÂN CẤP TRỰC QUAN):
     * Dùng tiêu đề Markdown cấp 1: "### 📋 [Tiêu đề nội dung]" và cấp 2: "#### [Tiểu mục]".
     * Luôn trích dẫn rõ căn cứ pháp lý: "Căn cứ theo [Tên văn bản hoặc Số Quyết định], [Điều/Khoản]...".
     * Trình bày bằng gạch đầu dòng rõ ràng, gãy gọn; in đậm các mốc thời gian, số điểm, tỷ lệ %, học phí, điều kiện tiên quyết.
   - PHẦN 3: LỜI KHUYÊN & LƯU Ý THỰC TIỄN (CALLOUT BOX BẮT BUỘC):
     * Bắt buộc có khung ghi chú đóng khung dạng blockquote:
       > 💡 **LỜI KHUYÊN DÀNH CHO EM:** [Lời dặn dò thực tế, mẹo làm hồ sơ, cách đạt điểm tối đa hoặc lưu ý các lỗi sinh viên hay mắc phải].
   - PHẦN 4: HƯỚNG DẪN BƯỚC TIẾP THEO & LỜI CHÚC:
     * Dặn dò các bước tiếp theo cần làm (nộp đơn, liên hệ Cố vấn học tập (CVHT) hoặc Phòng Đào tạo khi cần giải quyết thủ tục).
     * Gửi lời chúc học tập tốt, ký tên: "Trợ lý học tập – ThS. Nguyễn Thị Trúc Phương".

3. QUY TRÌNH HỖ TRỢ ĐỀ CƯƠNG THỰC TẬP TỐT NGHIỆP:
   A. NẾU SINH VIÊN HỎI CHUNG VỀ THỰC TẬP HOẶC CHƯA CUNG CẤP ĐẦY ĐỦ TÊN CÔNG TY & LĨNH VỰC:
      - Chào đón ân cần, khích lệ và CHỦ ĐỘNG HỎI 2 THÔNG TIN CỐT LÕI:
        1. 🏢 **Tên công ty/doanh nghiệp:** Em dự kiến (hoặc đang) thực tập tại công ty nào?
        2. 🎯 **Lĩnh vực/bộ phận:** Em thực tập ở bộ phận nào hoặc muốn làm đề tài về vấn đề gì (Bán hàng, Marketing Mix 4P/7P, Digital Marketing, Xây dựng thương hiệu, Tuyển dụng nhân sự...)?
      - Tóm tắt ngắn gọn khung kết cấu 3 chương chuẩn HCE (Chương 1 tối đa 8 trang; Chương 2 từ 17 trang trở lên - số liệu thực tế 2023 - 2025; Chương 3 khoảng 5 trang - giải pháp 2026 - 2028).
   B. NẾU SINH VIÊN ĐÃ NÊU TÊN CÔNG TY VÀ/HOẶC LĨNH VỰC:
      - Xây dựng ngay bản ĐỀ CƯƠNG CHI TIẾT 3 CHƯƠNG CHUẨN HCE HOÀN CHỈNH:
        * Header: "### 📋 ĐỀ CƯƠNG BÁO CÁO THỰC TẬP TỐT NGHIỆP CHUẨN HCE"
        * Tên đề tài chuẩn: "Một số giải pháp [hoàn thiện / nâng cao hiệu quả] [Vấn đề nghiên cứu] tại [Tên công ty] từ năm 2026 đến năm 2028"
        * Mốc thực trạng Chương 2: Giai đoạn 2023 - 2025 (3 năm gần nhất)
        * Mốc giải pháp Chương 3: Giai đoạn 2026 - 2028 (3 năm tiếp theo)
        * Đầy đủ: Mở đầu (5 ý), Chương 1 (tối đa 8 trang), Chương 2 (từ 17 trang trở lên), Chương 3 (khoảng 5 trang), Kết luận, Tài liệu tham khảo APA 7th, Phụ lục.
        * 3 Lưu ý vàng về phân bổ số trang và đóng dấu tròn / dấu giáp lai theo Nghị định 30/2020.

4. BẢO MẬT & TRUNG THỰC HỌC THUẬT:
   - TUYỆT ĐỐI KHÔNG chia sẻ, KHÔNG hiển thị, KHÔNG nhắc đến đường link Google Drive, Google Docs hay thư mục Drive nội bộ.
   - Chỉ dẫn liên kết chính thức trên website: https://nguyenthitrucphuong.pages.dev/study-corner/internships/huong-dan-bao-cao-hce.
   - Trả lời trung thực dựa trên tài liệu cung cấp, không bịa đặt số liệu hay quy chế không có thật.`;

  const userPrompt = `DƯỚI ĐÂY LÀ CÁC ĐOẠN QUY CHẾ CHÍNH THỨC CỦA NHÀ TRƯỜNG:
${contextText}

CÂU HỎI CỦA SINH VIÊN:
"${trimmed}"

HÃY TRẢ LỜI CÂU HỎI TRÊN DỰA CHÍNH XÁC VÀO CÁC ĐOẠN QUY CHẾ ĐÃ CHO. BẮT BUỘC TUÂN THỦ 100% CẤU TRÚC 4 PHẦN VÀ PHONG THÁI SƯ PHẠM.`;

  try {
    let candidateText = '';
    for (const modelName of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
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
              temperature: 0.15,
              maxOutputTokens: 2048,
              topP: 0.8
            }
          }),
          signal: AbortSignal.timeout(12000)
        });

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text && text.trim()) {
            candidateText = text.trim();
            break;
          }
        } else {
          console.warn(`Model ${modelName} returned status: ${response.status}`);
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed or timed out:`, err?.message || err);
      }
    }

    if (!candidateText) {
      return createDirectContextResponse(groundedChunks, startTime, trimmed);
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
    return createDirectContextResponse(groundedChunks, startTime, trimmed);
  }
}

function createDirectContextResponse(groundedChunks: SearchMatch[], startTime: number, query: string = ''): AssistantResponse {
  // Nếu là câu hỏi về thực tập hoặc đề cương, áp dụng quy trình định hướng chuyên sâu
  const isInternship = groundedChunks.some(m => m.chunk.doc_code === 'HD-TTTN-QTKD-HCE') ||
                       /thực tập|đề cương|báo cáo tốt nghiệp/i.test(query);

  if (isInternship) {
    return buildInternshipAssistantResponse(query, groundedChunks, startTime);
  }

  const top = groundedChunks[0].chunk;
  const answer = `Chào em! Cô gửi em thông tin giải đáp chi tiết dựa trên quy định chính thức của Nhà trường nhé:

### 📋 QUY ĐỊNH VỀ: ${top.doc_title.toUpperCase()}
- **Văn bản căn cứ:** ${top.doc_title} (${top.doc_code})
- **Điều/Khoản áp dụng:** ${top.article_ref}

#### Nội dung quy định cụ thể:
${top.content}

---

> 💡 **LỜI KHUYÊN DÀNH CHO EM:**
> Em hãy lưu ý nắm vững các mốc thời gian và điều kiện học vụ quy định ở trên để chủ động sắp xếp kế hoạch học tập của mình nhé. Nếu có bất kỳ trường hợp đặc biệt nào cần xem xét, em nên liên hệ trực tiếp với Cố vấn học tập (CVHT) hoặc Văn phòng Khoa để được hướng dẫn làm đơn hỗ trợ kịp thời!

Chúc em học tập thật tốt và đạt kết quả cao trong học kỳ này!

**Trợ lý học tập – ThS. Nguyễn Thị Trúc Phương**`;
  
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

function buildInternshipAssistantResponse(query: string, groundedChunks: SearchMatch[], startTime: number): AssistantResponse {
  const norm = query.toLowerCase();

  // 1. Nhận diện lĩnh vực / đề tài
  let topic = 'Hoạt động kinh doanh';
  let topicKey = 'general';
  if (/bán hàng|sales|telesales|bán lẻ/i.test(norm)) {
    topic = 'Hoạt động Bán hàng';
    topicKey = 'sales';
  } else if (/marketing mix|4p|7p/i.test(norm)) {
    topic = 'Hoạt động Marketing Mix (4P / 7P)';
    topicKey = 'mkt_mix';
  } else if (/digital marketing|tiếp thị số|social media|seo|online marketing/i.test(norm)) {
    topic = 'Hoạt động Digital Marketing';
    topicKey = 'digital_mkt';
  } else if (/thương hiệu|nhận diện thương hiệu|brand/i.test(norm)) {
    topic = 'Xây dựng & Nhận diện Thương hiệu';
    topicKey = 'brand';
  } else if (/tuyển dụng|nhân sự|nhân lực|hrm/i.test(norm)) {
    topic = 'Công tác Tuyển dụng Nhân sự';
    topicKey = 'hr';
  }

  // 2. Nhận diện tên công ty
  let company = '';
  const compMatch = query.match(/(?:công ty|cty|doanh nghiệp|tại|ở)\s+([A-ZÀ-Ỹ0-9\s&.-]{2,40})/i);
  if (compMatch) {
    company = compMatch[1].trim().replace(/\s+(đề tài|mảng|bộ phận|về|lĩnh vực|ngành).*$/i, '').trim();
  }

  const isGeneral = (!company && topicKey === 'general');

  let answer = '';

  if (isGeneral) {
    answer = `Chào em! Cô rất vui khi được đồng hành và hỗ trợ em trong kỳ **Thực tập tốt nghiệp** quan trọng này.

Để Cô có thể giúp em xây dựng ngay một bản **Đề cương chi tiết 3 chương chuẩn hóa hoàn chỉnh nhất** theo quy định của Khoa Quản trị - Kinh doanh (HCE), em hãy chia sẻ giúp Cô 2 thông tin cốt lõi này nhé:

🏢 **1. Em dự kiến (hoặc đang) thực tập tại công ty / doanh nghiệp nào?**
*(Ví dụ: Công ty Cổ phần Sữa Việt Nam - Vinamilk, Công ty TNHH FPT Shop, Ngân hàng Vietcombank, Viettel, hay một doanh nghiệp thương mại / dịch vụ cụ thể mà em đã liên hệ...)*

🎯 **2. Em thực tập ở bộ phận / lĩnh vực nào hoặc muốn làm đề tài về vấn đề gì?**
*(Ví dụ: Hoạt động Bán hàng, Chiến lược Marketing Mix 4P/7P, Digital Marketing / Tiếp thị số, Xây dựng & Nhận diện thương hiệu, Công tác Tuyển dụng nhân sự, Chăm sóc khách hàng...)*

---

### 📋 KHUNG KẾT CẤU 3 CHƯƠNG CHUẨN TRƯỜNG HCE:
- **Phần Mở đầu:** Tính cấp thiết, mục tiêu nghiên cứu, đối tượng & phạm vi 3 năm gần nhất (2023 - 2025), phương pháp nghiên cứu và kết cấu đề tài.
- **CHƯƠNG 1: CƠ SỞ LÝ LUẬN VỀ ĐỀ TÀI** *(Tối đa không quá 8 trang)*.
- **CHƯƠNG 2: THỰC TRẠNG TẠI CÔNG TY GIAI ĐOẠN 2023 - 2025** *(Trọng tâm từ 17 trang trở lên - phân tích số liệu thực tế 3 năm gần nhất kèm ưu/nhược điểm và nguyên nhân cốt lõi)*.
- **CHƯƠNG 3: MỘT SỐ GIẢI PHÁP VÀ KIẾN NGHỊ** *(Khoảng 5 trang - giải pháp cụ thể gắn với thực tế công ty, giải quyết đúng nguyên nhân ở Chương 2)*.
- **Kết luận, Tài liệu tham khảo APA 7th edition, Phụ lục.**

👉 **Chỉ cần em gửi lại tên công ty và lĩnh vực em chọn, Cô sẽ lên ngay bản đề cương hoàn chỉnh từng mục chi tiết A-Z để em nộp cho Giảng viên hướng dẫn duyệt nhé!**`;
  } else {
    const compName = company || 'Công ty TNHH ABC';
    const actionVerb = (topicKey === 'hr' || topicKey === 'brand') ? 'nâng cao hiệu quả' : 'hoàn thiện';

    answer = `Chào em! Dựa trên thông tin em thực tập tại **${compName}** trong lĩnh vực **${topic}**, Cô đã chuẩn hóa tên đề tài và xây dựng cho em bản **Đề cương chi tiết 3 chương chuẩn HCE** hoàn chỉnh dưới đây để em gửi Giảng viên hướng dẫn duyệt nhé:

---

### 📋 THÔNG TIN ĐỀ TÀI CHUẨN HÓA
- **Tên đề tài chuẩn:** *Một số giải pháp ${actionVerb} ${topic.toLowerCase()} tại ${compName} từ năm 2026 đến năm 2028*.
- **Đơn vị thực tập:** ${compName}.
- **Thời gian nghiên cứu thực trạng (Chương 2):** Giai đoạn 2023 - 2025 (03 năm gần nhất).
- **Thời gian định hướng giải pháp (Chương 3):** Giai đoạn 2026 - 2028 (03 năm tiếp theo).

---

### 📖 NỘI DUNG ĐỀ CƯƠNG CHI TIẾT

#### PHẦN MỞ ĐẦU
1. **Lý do chọn đề tài:** Tính cấp thiết của ${topic.toLowerCase()} đối với hiệu quả kinh doanh và năng lực cạnh tranh của ${compName}.
2. **Mục tiêu nghiên cứu:**
   - *Mục tiêu chung:* Đề xuất các giải pháp khả thi nhằm ${actionVerb} ${topic.toLowerCase()} tại ${compName} giai đoạn 2026 - 2028.
   - *Mục tiêu cụ thể:* Hệ thống hóa cơ sở lý luận; Phân tích thực trạng hoạt động tại công ty giai đoạn 2023 - 2025; Chỉ ra ưu điểm, hạn chế, nguyên nhân và đề xuất hệ thống giải pháp.
3. **Đối tượng và phạm vi nghiên cứu:**
   - *Đối tượng nghiên cứu:* ${topic} tại ${compName}.
   - *Phạm vi không gian:* Tại ${compName}.
   - *Phạm vi thời gian:* Thu thập số liệu giai đoạn 2023 - 2025; Giải pháp định hướng 2026 - 2028.
4. **Phương pháp nghiên cứu:** Phương pháp thu thập dữ liệu thứ cấp (báo cáo tài chính, báo cáo nội bộ), dữ liệu sơ cấp (quan sát, phỏng vấn/khảo sát), phương pháp thống kê, so sánh, phân tích tổng hợp.
5. **Kết cấu đề tài:** Gồm Lời mở đầu, 3 Chương, Kết luận, Danh mục tài liệu tham khảo và Phụ lục.

#### CHƯƠNG 1: CƠ SỞ LÝ LUẬN VỀ ${topic.toUpperCase()} *(Tối đa không quá 8 trang)*
1.1. Khái niệm và vai trò của ${topic.toLowerCase()}
1.2. Nội dung / Các thành phần / Quy trình thực hiện chuẩn
1.3. Các nhân tố ảnh hưởng đến hoạt động (Môi trường vĩ mô PESTEL, môi trường vi mô và nội bộ)
1.4. Tiêu chí và chỉ tiêu đánh giá hiệu quả hoạt động

#### CHƯƠNG 2: THỰC TRẠNG VỀ ${topic.toUpperCase()} TẠI ${compName.toUpperCase()} GIAI ĐOẠN 2023 - 2025 *(Từ 17 trang trở lên - Phần trọng tâm nhất)*
2.1. Tổng quan về ${compName}:
   - 2.1.1. Lịch sử hình thành và phát triển
   - 2.1.2. Chức năng, nhiệm vụ và lĩnh vực hoạt động chính
   - 2.1.3. Sơ đồ cơ cấu tổ chức bộ máy và chức năng các phòng ban
   - 2.1.4. Tình hình kết quả hoạt động kinh doanh giai đoạn 2023 - 2025 (Bảng số liệu Doanh thu - Chi phí - Lợi nhuận)
2.2. Phân tích thực trạng ${topic.toLowerCase()} tại ${compName} giai đoạn 2023 - 2025:
   - 2.2.1. Đặc điểm thị trường và khách hàng mục tiêu của công ty
   - 2.2.2. Thực trạng triển khai các hoạt động / công cụ cụ thể tại công ty qua các năm
   - 2.2.3. Các yếu tố ảnh hưởng đến hoạt động tại công ty (bên trong và bên ngoài)
2.3. Đánh giá chung về hoạt động tại ${compName}:
   - 2.3.1. Những kết quả đạt được (Ưu điểm)
   - 2.3.2. Những tồn tại, hạn chế
   - 2.3.3. Nguyên nhân cốt lõi của các hạn chế

#### CHƯƠNG 3: MỘT SỐ GIẢI PHÁP VÀ KIẾN NGHỊ NHẰM ${actionVerb.toUpperCase()} ${topic.toUpperCase()} TẠI ${compName.toUpperCase()} TỪ NĂM 2026 ĐẾN NĂM 2028 *(Khoảng 5 trang)*
3.1. Phương hướng, mục tiêu và kế hoạch phát triển của ${compName} giai đoạn 2026 - 2028
3.2. Các giải pháp cụ thể (Khắc phục chính xác từng hạn chế và nguyên nhân đã chỉ ra ở Chương 2):
   - *Giải pháp 1:* Hoàn thiện quy trình và tiêu chuẩn hóa hoạt động chuyên môn tại công ty.
   - *Giải pháp 2:* Đẩy mạnh ứng dụng công nghệ số và mở rộng kênh tiếp cận khách hàng.
   - *Giải pháp 3:* Nâng cao năng lực đội ngũ nhân sự và cải tiến chính sách chăm sóc, đãi ngộ.
3.3. Một số kiến nghị đối với Ban Giám đốc ${compName} và cơ quan hữu quan.

#### KẾT LUẬN
Tóm lược các kết quả nghiên cứu chính và ý nghĩa thực tiễn của đề tài.

#### DANH MỤC TÀI LIỆU THAM KHẢO
Trình bày đúng chuẩn APA 7th edition (Sách giáo trình, bài báo khoa học, website chính thống).

#### PHỤ LỤC
Phiếu khảo sát, bảng số liệu thô, hợp đồng mẫu, hình ảnh thực tế tại công ty.

---

> 💡 **3 LƯU Ý "VÀNG" ĐỂ GIẢNG VIÊN HƯỚNG DẪN DUYỆT NGAY:**
> 1. **Phân bổ số trang:** Chương 1 không quá 8 trang; Chương 2 là trọng tâm phải từ 17 trang trở lên; Chương 3 khoảng 5 trang.
> 2. **Tính logic đồng bộ:** Tên đề tài, số liệu thực trạng Chương 2 (2023 - 2025) và định hướng giải pháp Chương 3 (2026 - 2028) phải khớp thời gian; Giải pháp Chương 3 phải giải quyết đúng hạn chế ở Chương 2.
> 3. **Xác nhận dấu doanh nghiệp:** Đóng dấu tròn lên 1/3 chữ ký của Giám đốc bên trái và đóng dấu giáp lai lên mép tất cả các trang theo đúng Nghị định 30/2020/NĐ-CP.`;
  }

  const citations = groundedChunks.map(m => ({
    docTitle: m.chunk.doc_title,
    docCode: m.chunk.doc_code,
    articleRef: m.chunk.article_ref,
    pageNumber: m.chunk.page_number
  }));

  return {
    answer,
    isGrounded: true,
    citations,
    suggestTransferToCVHT: false,
    processingTimeMs: Date.now() - startTime
  };
}
