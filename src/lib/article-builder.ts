export interface ArticleInput {
  title: string;
  slug?: string;
  author?: string;
  category?: string;
  summary?: string;
  imageUrl?: string;
  imageCaption?: string;
  content: string;
}

export function generateArticleSlug(title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
  return base || 'bai-viet-moi';
}

function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatArticleContent(raw: string): string {
  if (!raw) return '';
  if (/<(p|div|table|ul|ol|h[1-6]|blockquote|figure)\b[^>]*>/i.test(raw)) {
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

    if (line.startsWith('### ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h3 class="text-base sm:text-lg font-bold text-[#A83245] mt-5 mb-2">${escapeHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2 class="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 pb-1 border-b border-slate-200">${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-6 mb-3">${escapeHtml(line.slice(2))}</h2>`);
    } else if (line.startsWith('> ')) {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(`<blockquote class="p-4 my-4 rounded-xl bg-[#F7F5F2] border-l-4 border-[#A83245] italic text-slate-700 text-xs sm:text-sm font-medium">${escapeHtml(line.slice(2))}</blockquote>`);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) {
        result.push('<ul class="list-disc pl-5 my-3 space-y-1.5 text-slate-700 text-xs sm:text-sm">');
        inList = true;
      }
      result.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(`<p class="leading-relaxed mb-4 text-slate-700 text-xs sm:text-sm md:text-base">${escapeHtml(line)}</p>`);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result.join('\n');
}

export function buildArticle(input: ArticleInput) {
  const title = (input.title || '').trim();
  const slug = input.slug ? generateArticleSlug(input.slug) : generateArticleSlug(title);
  const author = (input.author || '').trim() || 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG';
  const category = (input.category || '').trim() || 'Góc chia sẻ';
  
  // Auto-generate summary from first 160 characters if blank
  let summary = (input.summary || '').trim();
  if (!summary && input.content) {
    const plain = input.content.replace(/<[^>]*>/g, '').replace(/[#>*_`\-]/g, '').replace(/\s+/g, ' ').trim();
    summary = plain.slice(0, 160) + (plain.length > 160 ? '...' : '');
  }

  const formattedBody = formatArticleContent(input.content);

  // If image is provided, build figure block
  let figureHtml = '';
  const imageUrl = (input.imageUrl || '').trim();
  const imageCaption = (input.imageCaption || '').trim();
  if (imageUrl) {
    figureHtml = `
      <figure class="my-5 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 shadow-xs">
        <img
          src="${escapeHtml(imageUrl)}"
          alt="${escapeHtml(imageCaption || title)}"
          class="w-full h-auto object-cover max-h-[480px] mx-auto transition-transform duration-300 hover:scale-[1.01]"
          loading="lazy"
        />
        ${imageCaption ? `
        <figcaption class="p-3 text-center text-xs text-slate-600 font-medium italic border-t border-slate-100 bg-slate-50/70">
          ${escapeHtml(imageCaption)}
        </figcaption>
        ` : ''}
      </figure>
    `.trim();
  }

  const content_html = figureHtml ? `${figureHtml}\n\n${formattedBody}` : formattedBody;

  return {
    slug,
    title,
    category,
    summary,
    content_html,
    author,
  };
}
