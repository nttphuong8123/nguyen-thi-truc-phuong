const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'giao-trinh-qtrr', 'GiaoTrinh_QuanTriRuiRo_ThS_NguyenThiTrucPhuong_HoanThien.md');
const outHtmlPath = path.join(__dirname, '..', 'giao-trinh-qtrr', 'GiaoTrinh_QuanTriRuiRo_ThS_NguyenThiTrucPhuong_HoanThien.html');

const mdContent = fs.readFileSync(mdPath, 'utf8');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseMarkdown(md) {
  const lines = md.split('\n');
  const htmlParts = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let inTable = false;
  let tableHeader = [];
  let tableRows = [];
  let inList = false;

  function closeList() {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
  }

  function closeTable() {
    if (inTable) {
      let tHtml = '<div class="table-responsive-wrapper"><table class="qtrr-table">';
      if (tableHeader.length > 0) {
        tHtml += '<thead><tr>';
        tableHeader.forEach(th => {
          tHtml += `<th>${th.trim()}</th>`;
        });
        tHtml += '</tr></thead>';
      }
      tHtml += '<tbody>';
      tableRows.forEach((row, rIdx) => {
        tHtml += `<tr class="${rIdx % 2 === 0 ? 'row-even' : 'row-odd'}">`;
        row.forEach((cell, cIdx) => {
          const colName = tableHeader[cIdx] ? tableHeader[cIdx].trim().replace(/<[^>]*>?/gm, '') : '';
          tHtml += `<td data-label="${escapeHtml(colName)}">${cell.trim()}</td>`;
        });
        tHtml += '</tr>';
      });
      tHtml += '</tbody></table></div>';
      htmlParts.push(tHtml);
      inTable = false;
      tableHeader = [];
      tableRows = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Code block check
    if (line.startsWith('```')) {
      closeList();
      closeTable();
      if (inCodeBlock) {
        // End of code block
        const codeText = escapeHtml(codeBuffer.join('\n'));
        htmlParts.push(`<pre class="qtrr-diagram-box"><code>${codeText}</code></pre>`);
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Table check
    if (line.startsWith('|') && line.endsWith('|')) {
      closeList();
      const cells = line.slice(1, -1).split('|');
      // Check if separator line
      const isSep = cells.every(c => /^[\s\-:]+$/.test(c));
      if (isSep) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells.map(c => parseInline(c));
      } else {
        tableRows.push(cells.map(c => parseInline(c)));
      }
      continue;
    } else {
      closeTable();
    }

    // Blank line
    if (!line) {
      closeList();
      continue;
    }

    // Horizontal rule
    if (line === '---' || line === '***') {
      closeList();
      htmlParts.push('<hr class="qtrr-divider" />');
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      closeList();
      htmlParts.push(`<h1 class="qtrr-h1">${parseInline(line.substring(2))}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      htmlParts.push(`<h2 class="qtrr-h2">${parseInline(line.substring(3))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      closeList();
      htmlParts.push(`<h3 class="qtrr-h3">${parseInline(line.substring(4))}</h3>`);
      continue;
    }
    if (line.startsWith('#### ')) {
      closeList();
      htmlParts.push(`<h4 class="qtrr-h4">${parseInline(line.substring(5))}</h4>`);
      continue;
    }
    if (line.startsWith('##### ')) {
      closeList();
      htmlParts.push(`<h5 class="qtrr-h5">${parseInline(line.substring(6))}</h5>`);
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      closeList();
      const bqText = parseInline(line.substring(2));
      htmlParts.push(`<div class="qtrr-callout">${bqText}</div>`);
      continue;
    }

    // Bullet lists
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        htmlParts.push('<ul class="qtrr-list">');
        inList = true;
      }
      const itemText = parseInline(line.substring(2));
      htmlParts.push(`<li>${itemText}</li>`);
      continue;
    }

    closeList();
    // Regular paragraph
    htmlParts.push(`<p class="qtrr-p">${parseInline(line)}</p>`);
  }

  closeList();
  closeTable();
  return htmlParts.join('\n');
}

function parseInline(text) {
  let s = text;
  // Bold
  s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic
  s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  return s;
}

const bodyHtml = parseMarkdown(mdContent);

const fullPage = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>GIÁO TRÌNH MÔN HỌC: QUẢN TRỊ RỦI RO — ThS. NGUYỄN THỊ TRÚC PHƯƠNG</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&family=Noto+Serif:ital,wght@0,600;0,700;1,400&family=Roboto+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" crossorigin="anonymous"></script>

  <style>
    :root {
      --primary: #A60018; /* Ruby Red */
      --primary-dark: #742D3A;
      --gold: #F2C45D; /* Champagne Gold */
      --cream-bg: #FFF9EC;
      --bg-body: #F7F5F2;
      --text-main: #1E293B;
      --text-muted: #64748B;
      --border-color: #E2E8F0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    html, body {
      width: 100%;
      min-height: 100%;
      background-color: var(--bg-body);
      color: var(--text-main);
      font-family: 'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
      font-size: 15px;
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Academic Container */
    .qtrr-container {
      max-width: 960px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px 48px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
      border-radius: 16px;
      margin-top: 24px;
      margin-bottom: 40px;
      border: 1px solid var(--border-color);
    }

    /* Headings */
    .qtrr-h1 {
      color: var(--primary);
      font-size: 1.85rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      margin-top: 2.2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
      border-bottom: 2.5px solid var(--gold);
      padding-bottom: 8px;
    }

    .qtrr-h2 {
      color: var(--primary-dark);
      font-size: 1.45rem;
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 1.8rem;
      margin-bottom: 0.8rem;
      line-height: 1.35;
      border-left: 4px solid var(--primary);
      padding-left: 12px;
    }

    .qtrr-h3 {
      color: #0F172A;
      font-size: 1.25rem;
      font-weight: 700;
      margin-top: 1.4rem;
      margin-bottom: 0.6rem;
    }

    .qtrr-h4 {
      color: #334155;
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .qtrr-h5 {
      color: #475569;
      font-size: 1.0rem;
      font-weight: 600;
      margin-top: 1.0rem;
      margin-bottom: 0.4rem;
    }

    .qtrr-p {
      margin-bottom: 1.1rem;
      text-align: justify;
    }

    .qtrr-divider {
      border: 0;
      height: 1.5px;
      background: linear-gradient(to right, transparent, var(--border-color), transparent);
      margin: 2.2rem 0;
    }

    /* Lists */
    .qtrr-list {
      margin-left: 1.4rem;
      margin-bottom: 1.2rem;
    }

    .qtrr-list li {
      margin-bottom: 0.45rem;
      text-align: justify;
    }

    /* Callout Alert Box */
    .qtrr-callout {
      background: var(--cream-bg);
      border-left: 4px solid var(--gold);
      border-radius: 8px;
      padding: 16px 20px;
      margin: 1.4rem 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      font-size: 0.96rem;
    }

    /* ASCII / Code Diagrams */
    .qtrr-diagram-box {
      background: #091526;
      color: #E2E8F0;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.8rem;
      line-height: 1.45;
      padding: 18px 20px;
      border-radius: 12px;
      border: 1px solid #1E293B;
      margin: 1.4rem 0;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: hidden;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .inline-code {
      background: #F1F5F9;
      color: var(--primary);
      font-family: 'Roboto Mono', monospace;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.9em;
      border: 1px solid #E2E8F0;
    }

    /* Tables */
    .table-responsive-wrapper {
      width: 100%;
      margin: 1.4rem 0;
      overflow-x: hidden;
    }

    .qtrr-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
      table-layout: auto;
    }

    .qtrr-table th {
      background: var(--primary-dark);
      color: #FFFFFF;
      font-weight: 700;
      padding: 12px 14px;
      text-align: left;
      border: 1px solid #5C1E2A;
      font-size: 0.88rem;
    }

    .qtrr-table td {
      padding: 10px 14px;
      border: 1px solid #CBD5E1;
      vertical-align: top;
      text-align: justify;
    }

    .row-even {
      background-color: #FFFFFF;
    }

    .row-odd {
      background-color: #F8FAFC;
    }

    .qtrr-table tr:hover {
      background-color: #FEF3C7;
    }

    /* Responsive Mobile Layout (No Horizontal Scrollbar, Card Transformation) */
    @media (max-width: 768px) {
      .qtrr-container {
        padding: 20px 16px;
        margin-top: 12px;
        margin-bottom: 20px;
        border-radius: 10px;
        border: none;
      }

      .qtrr-h1 {
        font-size: 1.4rem;
      }

      .qtrr-h2 {
        font-size: 1.2rem;
      }

      .qtrr-h3 {
        font-size: 1.05rem;
      }

      .qtrr-diagram-box {
        font-size: 0.65rem;
        padding: 12px 14px;
      }

      /* Transform Multi-column Table into Card Stack on Mobile */
      .qtrr-table, .qtrr-table thead, .qtrr-table tbody, .qtrr-table th, .qtrr-table td, .qtrr-table tr {
        display: block;
      }

      .qtrr-table thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }

      .qtrr-table tr {
        border: 1.5px solid var(--border-color);
        border-radius: 10px;
        margin-bottom: 14px;
        background: #FFFFFF;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        padding: 6px 10px;
      }

      .qtrr-table td {
        border: none;
        border-bottom: 1px solid #F1F5F9;
        position: relative;
        padding: 8px 6px;
        text-align: left;
        font-size: 0.88rem;
      }

      .qtrr-table td:last-child {
        border-bottom: none;
      }

      .qtrr-table td[data-label]:before {
        content: attr(data-label) ": ";
        font-weight: 700;
        color: var(--primary-dark);
        display: block;
        margin-bottom: 2px;
        font-size: 0.82rem;
        text-transform: uppercase;
      }
    }

    @media print {
      body {
        background: #FFFFFF;
        color: #000000;
      }
      .qtrr-container {
        box-shadow: none;
        border: none;
        max-width: 100%;
        padding: 0;
      }
      .qtrr-h1 {
        page-break-before: always;
      }
    }
  </style>
</head>
<body>

  <div class="qtrr-container">
    ${bodyHtml}
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError : false
        });
      }
    });
  </script>
</body>
</html>`;

fs.writeFileSync(outHtmlPath, fullPage, 'utf8');
console.log('Saved HTML textbook:', outHtmlPath);
console.log('HTML size:', fullPage.length, 'bytes');
