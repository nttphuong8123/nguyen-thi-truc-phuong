export interface ChapterSectionInput {
  number?: string;
  title: string;
  content: string;
}

export interface ChapterInput {
  number?: number;
  title: string;
  description?: string;
  objectives?: string[];
  sections: ChapterSectionInput[];
}

export interface TextbookInput {
  title: string;
  slug?: string;
  courseCode?: string;
  credits?: string;
  instructor?: string;
  department?: string;
  description?: string;
  chapters: ChapterInput[];
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatContentParagraphs(raw: string): string {
  if (!raw) return '';
  // If it already looks like rich HTML, return it
  if (/<(p|div|table|ul|ol|h[1-6]|blockquote)\b[^>]*>/i.test(raw)) {
    return raw;
  }

  const lines = raw.split(/\r?\n/);
  const result: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      continue;
    }

    // Markdown-style headings inside section
    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h4 class="text-sm font-bold text-[#742D3A] uppercase tracking-wide mt-3 mb-1.5">${escapeHtml(line.slice(4))}</h4>`);
    } else if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3 class="text-base font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200">${escapeHtml(line.slice(3))}</h3>`);
    } else if (line.startsWith('> ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<blockquote class="p-3.5 my-3 rounded-xl bg-[#F7F5F2] border-l-4 border-[#A83245] italic text-slate-700 text-xs sm:text-sm">${escapeHtml(line.slice(2))}</blockquote>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        result.push('<ul class="list-disc pl-5 my-2.5 space-y-1 text-slate-700">');
        inList = true;
      }
      result.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(`<p class="m-0 leading-relaxed">${escapeHtml(line)}</p>`);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result.join('\n');
}

export function buildTextbook(input: TextbookInput) {
  const cleanTitle = (input.title || '').trim().replace(/^giáo trình\s+/i, '');
  const titleUpper = cleanTitle.toUpperCase();
  const rawSlug = input.slug ? input.slug.trim() : generateSlug(cleanTitle);
  const route_path = rawSlug.startsWith('/study-corner/')
    ? rawSlug
    : `/study-corner/${rawSlug.replace(/^\/+/, '')}`;

  const instructor = input.instructor || 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG';
  const department = input.department || 'Khoa Quản trị - Kinh doanh';
  const courseCode = input.courseCode || '';
  const credits = input.credits || '3 Tín Chỉ (45 Tiết)';
  const description = input.description || `Giáo trình học phần ${cleanTitle} bậc đại học & cao đẳng chính quy, biên soạn chuẩn sư phạm và định hướng ứng dụng thực tiễn của ${instructor}.`;

  const chapters = Array.isArray(input.chapters) ? input.chapters : [];

  const chaptersHtml = chapters.map((ch, idx) => {
    const chNum = idx + 1;
    const chNumStr = String(chNum).padStart(2, '0');
    const chTitle = ch.title || `Chương ${chNum}`;
    const chDesc = ch.description || '';
    const objectives = Array.isArray(ch.objectives) ? ch.objectives.filter(Boolean) : [];
    const sections = Array.isArray(ch.sections) ? ch.sections : [];

    const objectivesHtml = objectives.length > 0 ? `
        <!-- Mục tiêu trọng tâm chương -->
        <div class="bg-[#F7F5F2]/80 rounded-2xl p-4 sm:p-5 border border-[#E8DDE0] shadow-2xs">
          <div class="flex items-center gap-2.5 mb-3 border-b border-[#E8DDE0] pb-2.5">
            <span class="w-7 h-7 rounded-lg bg-[#C65B69] text-white flex items-center justify-center text-sm shadow-xs">🎯</span>
            <div>
              <h3 class="font-extrabold text-slate-900 text-xs sm:text-sm m-0 tracking-tight">Mục Tiêu Trọng Tâm Chương ${chNum}</h3>
              <p class="text-[11px] text-slate-500 m-0">Chuẩn đầu ra kiến thức và năng lực đạt được:</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            ${objectives.map((obj, oIdx) => `
            <div class="p-3 bg-white rounded-xl border border-slate-200/80 flex items-start gap-2.5 shadow-2xs">
              <span class="w-6 h-6 rounded-md bg-[#002B49] text-amber-300 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">${String(oIdx + 1).padStart(2, '0')}</span>
              <div class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">${escapeHtml(obj)}</div>
            </div>
            `).join('')}
          </div>
        </div>
    ` : '';

    const sectionsHtml = sections.map((sec, sIdx) => {
      const secNum = sec.number || `${chNum}.${sIdx + 1}`;
      const secTitle = sec.title || `Đề mục ${secNum}`;
      return `
          <!-- Đề mục: ${escapeHtml(secTitle)} -->
          <div class="space-y-3">
            <h3 class="text-sm sm:text-base md:text-lg font-bold text-[#303039] flex items-center gap-2 border-b border-[#E8DDE0] pb-2 m-0">
              <span class="w-3 h-3 rounded-full bg-[#C65B69] inline-block shrink-0"></span>
              <span>${escapeHtml(secNum)} ${escapeHtml(secTitle)}</span>
            </h3>
            <div class="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              ${formatContentParagraphs(sec.content)}
            </div>
          </div>
      `;
    }).join('\n');

    return `
      <section id="chuong${chNum}" class="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden text-slate-800 font-sans transition-all mb-6">
        <div class="p-3.5 sm:p-6 space-y-6">
          <!-- Chapter Header Banner -->
          <div class="p-5 sm:p-7 bg-gradient-to-r from-slate-900 via-[#A83245] to-[#742D3A] rounded-2xl text-white shadow-md relative overflow-hidden border border-[#C65B69]/30">
            <div class="relative z-10 flex flex-col gap-2">
              <span class="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider rounded-md w-fit shadow-xs">
                CHƯƠNG ${chNumStr}
              </span>
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase text-white m-0">
                ${escapeHtml(chTitle)}
              </h2>
              ${chDesc ? `<p class="mt-1 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-4xl m-0">${escapeHtml(chDesc)}</p>` : ''}
            </div>
          </div>

          ${objectivesHtml}

          <!-- Nội dung các đề mục -->
          <div class="space-y-6 pt-1">
            ${sectionsHtml}
          </div>
        </div>
      </section>
    `;
  }).join('\n');

  const html_content = `
  <div class="tkd-page-scope font-sans antialiased bg-[#F7F5F2] text-[#333333]">

    <!-- COVER HEADER CHO BẢN IN HOẶC XUẤT PDF A4 -->
    <div class="print-document-header hidden print:block text-center border-b-2 border-[#A83245] pb-4 mb-6">
      <div class="text-[12pt] font-semibold text-[#A83245] tracking-wider uppercase">${escapeHtml(department)} — TRƯỜNG HCE</div>
      <h1 class="text-[20pt] font-extrabold text-[#111827] uppercase tracking-tight mt-2 mb-1">
        GIÁO TRÌNH ${titleUpper}
      </h1>
      <div class="text-[11pt] text-[#4B5563] italic">
        Tài liệu học tập chính quy bậc Cao đẳng &amp; Đại học — Chủ biên: ${escapeHtml(instructor)}
      </div>
      <div class="text-[10pt] text-[#6B7280] mt-2 flex justify-between items-center border-t border-[#E5E7EB] pt-1">
        <span>${courseCode ? `Mã học phần: ${escapeHtml(courseCode)} | ` : ''}${credits ? `${escapeHtml(credits)} | ` : ''}Đơn vị: ${escapeHtml(department)}</span>
        <span class="print-timestamp">Năm học: <span class="js-current-year"></span></span>
        <span>Cổng học liệu số: NGUYỄN THỊ TRÚC PHƯƠNG</span>
      </div>
    </div>

    <!-- HEADER BANNER ONLINE LUXURY RED TONE -->
    <header class="no-print w-full bg-gradient-to-r from-[#742D3A] via-[#A83245] to-[#C65B69] text-white py-6 sm:py-8 px-4 shadow-md border-b border-[#F8EDEF]/20">
      <div class="max-w-5xl mx-auto text-center space-y-2.5">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#F8EDEF] border border-[#F8EDEF]/30 text-xs font-bold tracking-wider uppercase">
          <span>📖 ${escapeHtml(department)}</span>
        </div>
        <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase leading-tight text-white drop-shadow-xs m-0">
          GIÁO TRÌNH ${titleUpper}
        </h1>
        <p class="text-xs sm:text-sm text-white/95 max-w-3xl mx-auto m-0 leading-relaxed font-normal">
          ${escapeHtml(description)}
        </p>
        <div class="pt-1 flex flex-wrap justify-center items-center gap-2 text-xs text-white">
          <span class="bg-black/20 px-3 py-1 rounded-full border border-white/10">Chủ biên: <strong>${escapeHtml(instructor)}</strong></span>
          ${courseCode ? `<span class="bg-black/20 px-3 py-1 rounded-full border border-white/10">Mã môn: <strong>${escapeHtml(courseCode)}</strong></span>` : ''}
          ${credits ? `<span class="bg-black/20 px-3 py-1 rounded-full border border-white/10">Khối lượng: <strong>${escapeHtml(credits)}</strong></span>` : ''}
        </div>
      </div>
    </header>

    <!-- THANH ĐIỀU HƯỚNG NHANH & HÀNH ĐỘNG HỌC LIỆU -->
    <div class="no-print bg-white border-b border-[#E8DDE0] sticky top-0 z-30 shadow-2xs">
      <div class="max-w-5xl mx-auto px-3.5 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2">
          <a href="/study-corner" class="inline-flex items-center gap-1.5 font-bold text-[#A83245] hover:text-[#C65B69] bg-[#F8EDEF] px-3 py-1.5 rounded-lg transition-colors">
            <span>←</span> Về Góc Học Tập
          </a>
          <span id="activeChapterName" class="hidden sm:inline-block text-slate-600 font-medium truncate max-w-xs md:max-w-md">
            Đang xem: Chương 1
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" onclick="window.print()" class="inline-flex items-center gap-1.5 font-bold text-[#A83245] hover:bg-[#F8EDEF] border border-[#A83245]/40 px-3 py-1.5 rounded-lg transition-all cursor-pointer">
            <span>🖨️</span> In Giáo Trình
          </button>
          <button type="button" id="btnBackToTop" class="inline-flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
            <span>↑ Đầu trang</span>
          </button>
        </div>
      </div>
    </div>

    <!-- NỘI DUNG CHÍNH CÁC CHƯƠNG CHẠY DỌC TỰ NHIÊN -->
    <main class="max-w-5xl mx-auto px-3.5 sm:px-6 py-5 sm:py-7 space-y-6">
      ${chaptersHtml}
    </main>

  </div>
  `.trim();

  const custom_css = `
  /* Academic Global Typography & Scope */
  .tkd-page-scope {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    background-color: #F7F5F2;
    color: #333333;
    line-height: 1.65;
  }

  .tkd-page-scope section[id^="chuong"] {
    scroll-margin-top: 5rem;
  }

  html {
    scroll-behavior: smooth;
  }

  @page {
    size: A4 portrait;
    margin: 20mm 20mm 20mm 25mm;
  }

  @media print {
    nav, #mainNavbar, footer, .site-sticky-navbar,
    .academic-breadcrumb-trail, .academic-silo-nav,
    .no-print, #academicFloatingBar,
    .toolbar-bottom, .btn-print-action, button,
    .histats-container {
      display: none !important;
    }

    body {
      background: #ffffff !important;
      color: #111827 !important;
      font-size: 11pt !important;
      line-height: 1.45 !important;
      padding: 0 !important;
      margin: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .tkd-page-scope {
      background: #ffffff !important;
      color: #111827 !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    section[id^="chuong"] {
      page-break-before: always !important;
      break-before: page !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 0 24pt 0 !important;
    }

    table, tr, .katex-display, .formula-card, .academic-callout, .svg-container, svg {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
  }
  `.trim();

  const chapterListJson = JSON.stringify(
    chapters.map((ch, idx) => ({ id: `chuong${idx + 1}`, name: `Chương ${idx + 1}: ${ch.title}` }))
  );

  const custom_js = `
  (function() {
    const year = new Date().getFullYear();
    document.querySelectorAll('#currentYear, .js-current-year').forEach(el => {
      el.textContent = year;
    });

    const activeChapterNameEl = document.getElementById('activeChapterName');
    const btnBackToTop = document.getElementById('btnBackToTop');
    btnBackToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const chapters = ${chapterListJson};

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && activeChapterNameEl) {
            const match = chapters.find(c => c.id === entry.target.id);
            if (match) {
              activeChapterNameEl.textContent = 'Đang xem: ' + match.name;
            }
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });

      chapters.forEach(c => {
        const el = document.getElementById(c.id);
        if (el) observer.observe(el);
      });
    }
  })();
  `.trim();

  return {
    route_path,
    title: `GIÁO TRÌNH ${titleUpper}`,
    category: 'Study-Corner',
    page_type: 'content',
    html_content,
    custom_css,
    custom_js,
    requires_gate: null,
  };
}

/**
 * Trình phân tích văn bản thô / Markdown thành cấu trúc giáo trình thông minh:
 * Hỗ trợ các định dạng:
 * # Chương 1: Tên chương
 * Mục tiêu: Mục tiêu 1 | Mục tiêu 2...
 * ## 1.1 Tên đề mục
 * Nội dung...
 */
export function parseRawTextbook(rawText: string, defaultTitle: string = 'Giáo trình mới'): TextbookInput {
  const lines = rawText.split(/\r?\n/);
  let textbookTitle = defaultTitle;
  let description = '';
  const chapters: ChapterInput[] = [];

  let currentChapter: ChapterInput | null = null;
  let currentSection: ChapterSectionInput | null = null;
  let inObjectives = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Check title of textbook: # GIÁO TRÌNH X
    if (/^#\s+(giáo trình|môn học)\b/i.test(line)) {
      textbookTitle = line.replace(/^#\s+(giáo trình|môn học)\s*:?\s*/i, '').trim();
      continue;
    }

    // Check chapter header: Chương 1: ... or # Chương 1...
    const chMatch = line.match(/^(?:#\s*)?(?:chương|chuong)\s*(\d+)[:.\-—]\s*(.*)$/i);
    if (chMatch) {
      if (currentSection && currentChapter) {
        currentChapter.sections.push(currentSection);
        currentSection = null;
      }
      if (currentChapter) {
        chapters.push(currentChapter);
      }
      currentChapter = {
        number: parseInt(chMatch[1], 10),
        title: chMatch[2].trim() || `Chương ${chMatch[1]}`,
        description: '',
        objectives: [],
        sections: [],
      };
      inObjectives = false;
      continue;
    }

    // Check objectives: "Mục tiêu: ..." or "- Mục tiêu: ..."
    if (/^(?:mục tiêu|muc tieu|chuẩn đầu ra)[:.\-—]\s*(.*)$/i.test(line)) {
      inObjectives = true;
      const content = line.replace(/^(?:mục tiêu|muc tieu|chuẩn đầu ra)[:.\-—]\s*/i, '').trim();
      if (content && currentChapter) {
        content.split(/[|;]/).map(s => s.trim()).filter(Boolean).forEach(obj => {
          currentChapter!.objectives?.push(obj);
        });
      }
      continue;
    }

    if (inObjectives && currentChapter && (line.startsWith('- ') || line.startsWith('* '))) {
      currentChapter.objectives?.push(line.replace(/^[-*]\s*/, '').trim());
      continue;
    }

    // Check section header: "## 1.1 Tên đề mục" or "1.1 Tên đề mục"
    const secMatch = line.match(/^(?:##\s*)?(\d+\.\d+)[:.\-—\s]\s*(.*)$/);
    if (secMatch && currentChapter) {
      inObjectives = false;
      if (currentSection) {
        currentChapter.sections.push(currentSection);
      }
      currentSection = {
        number: secMatch[1],
        title: secMatch[2].trim() || `Đề mục ${secMatch[1]}`,
        content: '',
      };
      continue;
    }

    // Otherwise it's content
    inObjectives = false;
    if (currentSection) {
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    } else if (currentChapter) {
      if (!currentChapter.description) {
        currentChapter.description = line;
      } else {
        // Create an introductory section
        currentSection = {
          number: `${currentChapter.number || 1}.1`,
          title: 'Tổng quan nội dung',
          content: line,
        };
      }
    } else {
      description += (description ? ' ' : '') + line;
    }
  }

  if (currentSection && currentChapter) {
    currentChapter.sections.push(currentSection);
  }
  if (currentChapter) {
    chapters.push(currentChapter);
  }

  return {
    title: textbookTitle,
    description,
    chapters,
  };
}
