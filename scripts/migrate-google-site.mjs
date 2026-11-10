import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const EXPORT_DIR = path.join(ROOT_DIR, 'tmp', 'exported_site');
const DATA_DIR = path.join(ROOT_DIR, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'trankimdinh.db');
const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS access_gates (
    gate_key TEXT PRIMARY KEY,
    gate_name TEXT NOT NULL,
    passcodes_json TEXT NOT NULL,
    description TEXT,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS syllabus_codes (
    code TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'DeTai',
    url TEXT NOT NULL,
    is_public INTEGER DEFAULT 0,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS site_pages (
    route_path TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    page_type TEXT NOT NULL,
    html_content TEXT NOT NULL,
    custom_css TEXT DEFAULT '',
    custom_js TEXT DEFAULT '',
    requires_gate TEXT DEFAULT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS exam_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    student_id TEXT DEFAULT '',
    class_name TEXT DEFAULT '',
    subject_path TEXT NOT NULL,
    subject_title TEXT NOT NULL,
    exam_mode TEXT NOT NULL,
    test_code TEXT NOT NULL,
    score REAL NOT NULL,
    max_score REAL DEFAULT 100,
    duration_text TEXT DEFAULT '',
    ip_address TEXT DEFAULT '',
    submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS midterm_exam_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    student_id TEXT NOT NULL,
    exam_code TEXT NOT NULL,
    generated_de_code TEXT NOT NULL,
    opened_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS birthday_wishes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    role_or_class TEXT DEFAULT 'Sinh viên',
    birth_day INTEGER NOT NULL,
    birth_month INTEGER NOT NULL,
    wish_message TEXT NOT NULL,
    avatar_emoji TEXT DEFAULT '🎂',
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Góc chia sẻ',
    summary TEXT NOT NULL,
    content_html TEXT NOT NULL,
    author TEXT DEFAULT 'ThS. Trần Kim Đính',
    published_at TEXT DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 120
  );
`);

// 1. Seed access_gates (preserve existing if modified, or upsert defaults)
const upsertGate = db.prepare(`
  INSERT INTO access_gates (gate_key, gate_name, passcodes_json, description, updated_at)
  VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(gate_key) DO UPDATE SET
    gate_name = excluded.gate_name,
    description = excluded.description
`);

upsertGate.run('elearning', 'Cổng Thông Tin Lớp Học (/ELEARNING)', JSON.stringify(['HL753907@', 'NNYC']), 'Mã truy cập dành cho sinh viên các lớp học phần do Thầy Trần Kim Đính phụ trách');
upsertGate.run('datacenter', 'Hệ Thống Lưu Trữ Khoa QTKD (/Data)', JSON.stringify(['Ud20101991@']), 'Mật mã truy cập kho dữ liệu hành chính và hồ sơ nội bộ Khoa QTKD');
upsertGate.run('admin', 'Quản Trị Hệ Thống (/admin)', JSON.stringify(['Admin2026@', 'Ud20101991@']), 'Mật khẩu đăng nhập trang Admin CMS của Giảng viên Trần Kim Đính');

// 2. Seed syllabus_codes from DCCT.html
const dcctCodes = [
  { code: '00', title: 'Đề cương chi tiết học phần thực tập tốt nghiệp', category: 'TaiLieuChung', url: 'https://docs.google.com/document/d/1YXNO898_BBonDMTRmFyhrDTRYqHiIXmbvZThOif42gM/edit?usp=drive_link', is_public: 1 },
  { code: '01', title: 'Mẫu bảng điểm & Phiếu chấm điểm thực tập của đơn vị', category: 'TaiLieuChung', url: 'https://docs.google.com/document/d/19y1iS9SzS3b88z4q8c4xZqhq0f7FrOIpvlHak8gkEjQ/edit?usp=drive_link', is_public: 1 },
  { code: 'A040201', title: 'Đề cương hướng dẫn đề tài thực tập mã A040201', category: 'DeTai', url: 'https://docs.google.com/document/d/1ujLI3XeDZntrg9wwJEL1NBpj1GcWOGFVrIrq9-_kANg/edit?usp=drive_link', is_public: 0 },
  { code: 'B040202', title: 'Đề cương hướng dẫn đề tài thực tập mã B040202', category: 'DeTai', url: 'https://docs.google.com/document/d/11U5Yue-dDprhsWHsakXi6-i9Ik-A5bfWfDt_YWTUTwg/edit?usp=drive_link', is_public: 0 },
  { code: 'C040203', title: 'Đề cương hướng dẫn đề tài thực tập mã C040203', category: 'DeTai', url: 'https://docs.google.com/document/d/1H4Or-zZD5eGXQ_Dfpu5yXw1NASFRla6ssSWucoEHhOw/edit?usp=drive_link', is_public: 0 },
  { code: 'D040204', title: 'Đề cương hướng dẫn đề tài thực tập mã D040204', category: 'DeTai', url: 'https://docs.google.com/document/d/1R6QK02dVVQtiN6sCn3RR2GuXrVzgHhna2TE1uWpOsWk/edit?usp=drive_link', is_public: 0 },
  { code: 'E040205', title: 'Đề cương hướng dẫn đề tài thực tập mã E040205', category: 'DeTai', url: 'https://docs.google.com/document/d/1mBKg7oDxu8jqEFCIGZT5x7msztTdm-D8iww_0y7GNeg/edit?usp=drive_link', is_public: 0 },
  { code: 'F040206', title: 'Đề cương hướng dẫn đề tài thực tập mã F040206', category: 'DeTai', url: 'https://docs.google.com/document/d/19Ac2fEsAiUK1y5o4VFCniThLjHk_AU8FpuLWSqBXdeY/edit?usp=drive_link', is_public: 0 },
  { code: 'G040207', title: 'Đề cương hướng dẫn đề tài thực tập mã G040207', category: 'DeTai', url: 'https://docs.google.com/document/d/1KKYhEmhaCMY0GwLkJK2VrrSHZdMQcdcMi8L7yDN0Fi4/edit?usp=drive_link', is_public: 0 },
  { code: 'H040208', title: 'Đề cương hướng dẫn đề tài thực tập mã H040208', category: 'DeTai', url: 'https://docs.google.com/document/d/1saE-MXec0PMcbemLZTeuAt54esLyDZ1L54kFUNB4NlE/edit?usp=drive_link', is_public: 0 },
  { code: 'I040209', title: 'Đề cương hướng dẫn đề tài thực tập mã I040209', category: 'DeTai', url: 'https://docs.google.com/document/d/1SP712K7AF3u-qs42U57wUy6ceodYSNHzmbSo7p2BlEc/edit?usp=drive_link', is_public: 0 },
  { code: 'J040210', title: 'Đề cương hướng dẫn đề tài thực tập mã J040210', category: 'DeTai', url: 'https://docs.google.com/document/d/1T1zsBMP8tCgtzKaAA-LxA7mwS-84iVaa8Hw2EfT3yoY/edit?usp=drive_link', is_public: 0 },
  { code: 'K040211', title: 'Đề cương hướng dẫn đề tài thực tập mã K040211', category: 'DeTai', url: 'https://docs.google.com/document/d/1qK1SCIXcnKl7oPMYWM-VNx3OjZJZxAVKZx5PSlcSTRw/edit?usp=drive_link', is_public: 0 },
  { code: 'L040212', title: 'Đề cương hướng dẫn đề tài thực tập mã L040212', category: 'DeTai', url: 'https://docs.google.com/document/d/1UbdPzUcM9egfr8UgNUvWDhwfQgRQUuRtXWY5nvhemEo/edit?usp=drive_link', is_public: 0 },
  { code: 'M040213', title: 'Đề cương hướng dẫn đề tài thực tập mã M040213', category: 'DeTai', url: 'https://docs.google.com/document/d/1NOPL2xtSyf4BTUroHipXe58ekQDWOJT77_QDLnWpAq4/edit?usp=drive_link', is_public: 0 },
  { code: 'N040214', title: 'Đề cương hướng dẫn đề tài thực tập mã N040214', category: 'DeTai', url: 'https://docs.google.com/document/d/1XrJ1WcSS0ON3dLZnztA2nKAdTsGzd0R-ufnYmdDK79c/edit?usp=drive_link', is_public: 0 },
  { code: 'O040215', title: 'Đề cương hướng dẫn đề tài thực tập mã O040215', category: 'DeTai', url: 'https://docs.google.com/document/d/1706-bxIkL7V6tEBzpXstSSfc3h35u5W40sm9mM0iRPM/edit?usp=drive_link', is_public: 0 },
  { code: 'P040216', title: 'Đề cương hướng dẫn đề tài thực tập mã P040216', category: 'DeTai', url: 'https://docs.google.com/document/d/1LPnpTKwYqO_gtSev-N0BJKeP3FJCVAb3nGBiVuT__c8/edit?usp=drive_link', is_public: 0 },
  { code: 'Q040217', title: 'Đề cương hướng dẫn đề tài thực tập mã Q040217', category: 'DeTai', url: 'https://docs.google.com/document/d/19jc31YhUzVNpR4ZgIjrNJDp0XV3rtp4dx2jMfmMo3tI/edit?usp=drive_link', is_public: 0 },
  { code: 'R040218', title: 'Đề cương hướng dẫn đề tài thực tập mã R040218', category: 'DeTai', url: 'https://docs.google.com/document/d/1b5m5wPeFTNSY51mJBbrdUx1oZIljnrGnONM42KTzTrw/edit?usp=drive_link', is_public: 0 },
  { code: 'S040219', title: 'Đề cương hướng dẫn đề tài thực tập mã S040219', category: 'DeTai', url: 'https://docs.google.com/document/d/1ZRz4aCq0MgfR4x4Lgwi6OUIUZgGItp9iyVkx5mrYxWg/edit?usp=drive_link', is_public: 0 },
  { code: 'T040220', title: 'Đề cương hướng dẫn đề tài thực tập mã T040220', category: 'DeTai', url: 'https://docs.google.com/document/d/1ppYgrSMWxQpdfOlAzkN8DRgjp0wKdLs3ko2fBtXiriI/edit?usp=drive_link', is_public: 0 },
];

const upsertSyllabus = db.prepare(`
  INSERT INTO syllabus_codes (code, title, category, url, is_public, updated_at)
  VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(code) DO UPDATE SET
    title = excluded.title,
    category = excluded.category,
    url = excluded.url,
    is_public = excluded.is_public
`);

for (const item of dcctCodes) {
  upsertSyllabus.run(item.code, item.title, item.category, item.url, item.is_public);
}

// 3. Helper to scope page CSS under .tkd-page-scope and normalize responsive rules
function scopeCssRules(cssText, routePath) {
  if (!cssText || !cssText.trim()) return '';

  // Remove anti-print rules and custom scrollbars
  let css = cssText
    .replace(/@media\s+print\s*\{\s*html,\s*body\s*\{\s*display:\s*none\s*!important;\s*\}\s*\}/gi, '')
    .replace(/html::-webkit-scrollbar,\s*body::-webkit-scrollbar\s*\{[^}]*\}/gi, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  // Upgrade micro-font sizes in .compact-table from 8.5px–11px to readable 12px/13.5px
  css = css
    .replace(/font-size:\s*(?:8|8\.5|9|9\.5)px\s*!important/gi, 'font-size: 12px !important')
    .replace(/font-size:\s*(?:10|10\.5|11)px\s*!important/gi, 'font-size: 13px !important')
    .replace(/padding:\s*(?:3|3\.5|4|4\.5)px\s+(?:4|5|6)px\s*!important/gi, 'padding: 6px 8px !important')
    .replace(/padding:\s*5px\s+(?:6|7|8)px\s*!important/gi, 'padding: 8px 10px !important');

  // Fix sticky header inside quiz pages so it doesn't collide with MainLayout's sticky navbar
  css = css.replace(/position:\s*sticky;\s*top:\s*0;/gi, 'position: relative;');

  // Fix /ELEARNING/exam #login-overlay so it doesn't cover MainLayout's top navigation bar
  if (routePath === '/ELEARNING/exam') {
    css = css.replace(
      /#login-overlay\s*\{[^}]*\}/i,
      `#login-overlay {
        position: relative;
        width: 100%;
        min-height: calc(100vh - 3.5rem);
        background: linear-gradient(135deg, #2e1065, #4c1d95, #5b21b6);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        padding: 24px 16px;
        text-align: center;
      }`
    );
  }

  function processBlock(blockCss) {
    let out = '';
    let i = 0;
    const len = blockCss.length;

    while (i < len) {
      // Skip whitespace
      while (i < len && /\s/.test(blockCss[i])) {
        out += blockCss[i];
        i++;
      }
      if (i >= len) break;

      // Check for @import or @charset
      if (blockCss.slice(i).startsWith('@import') || blockCss.slice(i).startsWith('@charset')) {
        const semi = blockCss.indexOf(';', i);
        if (semi === -1) {
          out += blockCss.slice(i);
          break;
        }
        out += blockCss.slice(i, semi + 1);
        i = semi + 1;
        continue;
      }

      // Find next '{'
      const openBrace = blockCss.indexOf('{', i);
      if (openBrace === -1) {
        out += blockCss.slice(i);
        break;
      }

      const prelude = blockCss.slice(i, openBrace).trim();

      // Find matching '}'
      let depth = 1;
      let j = openBrace + 1;
      while (j < len && depth > 0) {
        if (blockCss[j] === '{') depth++;
        else if (blockCss[j] === '}') depth--;
        j++;
      }

      const innerContent = blockCss.slice(openBrace + 1, j - 1);

      if (/^@(-webkit-)?keyframes/i.test(prelude) || /^@font-face/i.test(prelude)) {
        out += `${prelude} {${innerContent}}\n`;
      } else if (/^@media/i.test(prelude) || /^@supports/i.test(prelude)) {
        out += `${prelude} {\n${processBlock(innerContent)}\n}\n`;
      } else {
        // Normal selector list
        const scopedSelectors = prelude
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .map((sel) => {
            if (sel.startsWith('@')) return sel;
            if (sel === ':root') return ':root, .tkd-page-scope';
            if (sel === 'html' || sel === 'body') return '.tkd-page-scope';
            if (sel === '*') return '.tkd-page-scope *, .tkd-page-scope *::before, .tkd-page-scope *::after';
            if (sel.startsWith('.tkd-page-scope')) return sel;
            if (/^(html|body)\b/i.test(sel)) {
              return sel.replace(/^(html|body)\b/i, '.tkd-page-scope');
            }
            return `.tkd-page-scope ${sel}`;
          })
          .join(', ');

        // Remove aggressive "* { margin: 0; padding: 0; }" resets that break Tailwind spacing
        let cleanedInner = innerContent;
        if (prelude.trim() === '*') {
          cleanedInner = cleanedInner
            .replace(/margin\s*:\s*0\s*;/gi, '')
            .replace(/padding\s*:\s*0\s*;/gi, '');
        }
        // Prevent 100vh lock on .tkd-page-scope
        if (prelude.includes('body') || prelude.includes('html')) {
          cleanedInner = cleanedInner.replace(/height\s*:\s*100%\s*!important\s*;/gi, '');
        }

        out += `${scopedSelectors} {${cleanedInner}}\n`;
      }

      i = j;
    }

    return out;
  }

  return processBlock(css);
}

// Helper to parse each exported HTML file into clean body, styles, and scripts
function extractHtmlParts(rawHtml, routePath, pageTitle) {
  // Rewrite absolute https://www.trankimdinh.com/... to relative internal paths
  // Also fix known broken link /QUESTIONNAIRE/SPSS -> /SPSS
  let html = rawHtml
    .replace(/https?:\/\/(?:www\.)?trankimdinh\.com\/QUESTIONNAIRE\/SPSS/gi, '/SPSS')
    .replace(/https?:\/\/(?:www\.)?trankimdinh\.com(\/[^"'\s<>\\]*)/gi, '$1');

  // Extract <style> tags
  const styles = [];
  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, css) => {
    const scoped = scopeCssRules(css, routePath);
    if (scoped.trim()) styles.push(scoped.trim());
    return '';
  });

  // Extract external scripts (like Chart.js or Moment.js) except tailwind cdn
  const extScripts = [];
  html = html.replace(/<script[^>]+src=["']([^"']+)["'][^>]*>\s*<\/script>/gi, (full, src) => {
    if (src.includes('cdn.tailwindcss.com')) return '';
    extScripts.push(full);
    return '';
  });

  // Extract inline <script> tags
  const inlineScripts = [];
  html = html.replace(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi, (_, js) => {
    inlineScripts.push(js.trim());
    return '';
  });

  // Extract <body> innerHTML if present
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1].trim() : html.trim();

  // Remove head/html/doctype remnants if any
  bodyContent = bodyContent
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');

  // Upgrade micro-typography and cramped widths across all migrated pages for mobile & desktop readability
  bodyContent = bodyContent
    .replace(/\btext-\[(?:8|8\.5|9|9\.5)px\]/g, 'text-xs')
    .replace(/\btext-\[(?:10|10\.5|11)px\]/g, 'text-xs sm:text-sm')
    .replace(/\bmax-w-3xl\b/g, 'max-w-5xl');

  let combinedJs = inlineScripts.join('\n\n');

  // Check if this is a Quiz page with displayResult(score)
  const isQuiz = combinedJs.includes('function displayResult(score)') || combinedJs.includes('function submitTest()');
  if (isQuiz && routePath !== '/Study-Corner/Entrepreneurship/PEST') {
    // Inject automatic submission recording to /api/submissions AND Result Export buttons inside displayResult(score)
    const submissionHook = `
      try {
        const _spentSec = (typeof totalConfigTime !== 'undefined' && typeof testDuration !== 'undefined') ? (totalConfigTime - testDuration) : 0;
        const _spentMin = Math.floor(_spentSec / 60);
        const _remSec = _spentSec % 60;
        const _durStr = _spentMin + ' phút ' + _remSec + ' giây';
        const _classInput = document.getElementById('studentClassInput');
        const _stName = typeof studentName !== 'undefined' ? studentName : 'Sinh viên';
        const _stClass = _classInput ? _classInput.value.trim() : '';
        const _modeTitle = typeof testModeTitle !== 'undefined' ? testModeTitle : (typeof getSelectedMode === 'function' ? getSelectedMode() : 'Đề thi thử');
        const _tCode = typeof testCode !== 'undefined' ? String(testCode) : 'QUIZ';
        const _numScore = Number(score) || 0;
        fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            student_name: _stName,
            student_id: _stClass,
            class_name: _stClass,
            subject_path: ${JSON.stringify(routePath)},
            subject_title: ${JSON.stringify(pageTitle)},
            exam_mode: _modeTitle,
            test_code: _tCode,
            score: _numScore,
            max_score: 100,
            duration_text: _durStr
          })
        }).catch(() => {});

        setTimeout(() => {
          const _resScreen = document.getElementById('resultScreen');
          if (_resScreen && !document.getElementById('tkdExportResultBox')) {
            const _box = document.createElement('div');
            _box.id = 'tkdExportResultBox';
            _box.style.cssText = 'margin: 14px auto; padding: 12px 16px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center;';
            _box.innerHTML = '<span style="font-size:12px;font-weight:700;color:#0369a1;">✅ Đã lưu kết quả vào hệ thống!</span>' +
              '<button type="button" id="btnPrintCert" style="background:#0284c7;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">🖨️ Xuất / In Phiếu Kết Quả (PDF)</button>' +
              '<button type="button" id="btnCsvCert" style="background:#059669;color:#fff;border:none;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">📥 Xuất File Kết Quả (.CSV)</button>';
            _resScreen.prepend(_box);
            document.getElementById('btnPrintCert').onclick = () => window.print();
            document.getElementById('btnCsvCert').onclick = () => {
              const _csv = '\\uFEFFHọ tên,Lớp/MSSV,Môn thi,Hình thức,Mã đề,Điểm số,Thời gian hoàn thành\\n' +
                '"' + _stName + '","' + _stClass + '","' + ${JSON.stringify(pageTitle)} + '","' + _modeTitle + '","' + _tCode + '","' + _numScore + '/100","' + _durStr + '"\\n';
              const _blob = new Blob([_csv], { type: 'text/csv;charset=utf-8;' });
              const _a = document.createElement('a');
              _a.href = URL.createObjectURL(_blob);
              _a.download = 'ket-qua-thi-' + _tCode + '.csv';
              _a.click();
            };
          }
        }, 150);
      } catch (_err) {}
    `;
    combinedJs = combinedJs.replace(
      /function\s+displayResult\s*\(\s*score\s*\)\s*\{/,
      `function displayResult(score) {\n${submissionHook}`
    );

    // Also add an optional Class / MSSV input field right below studentNameInput so teacher can track class/MSSV
    bodyContent = bodyContent.replace(
      /(<input[^>]+id=["']studentNameInput["'][^>]*>)/i,
      `$1\n        <input type="text" id="studentClassInput" class="input" placeholder="Nhập Lớp hoặc MSSV (tuỳ chọn)..." style="margin-top: 8px; display: inline-block; width: 100%; max-width: 260px;">`
    );
  }

  // If this is /ELEARNING/exam, hook openCode() to also log exam opening to /api/submissions
  if (routePath === '/ELEARNING/exam') {
    combinedJs = combinedJs.replace(
      /codeOutput\.innerHTML\s*=\s*content;/,
      `codeOutput.innerHTML = content;
       try {
         fetch('/api/submissions', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             student_name: studentName,
             student_id: studentId,
             class_name: studentId,
             subject_path: '/ELEARNING/exam',
             subject_title: 'Kiểm tra giữa kỳ (Mở mã đề)',
             exam_mode: 'Mã mở đề: ' + inputCode,
             test_code: inputCode,
             score: 100,
             max_score: 100,
             duration_text: 'Đã mở đề thành công'
           })
         }).catch(() => {});
       } catch (_e) {}`
    );
  }

  return {
    htmlContent: `<div class="tkd-page-scope">${extScripts.join('\n')}\n${bodyContent}</div>`,
    customCss: styles.join('\n\n'),
    customJs: combinedJs,
    pageType: isQuiz ? 'quiz' : 'content',
  };
}

// 4. Load full_site_inventory.json and migrate all pages
const invPath = path.join(ROOT_DIR, 'tmp', 'full_site_inventory.json');
const inventory = JSON.parse(fs.readFileSync(invPath, 'utf-8'));

const upsertPage = db.prepare(`
  INSERT INTO site_pages (route_path, title, category, page_type, html_content, custom_css, custom_js, requires_gate, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(route_path) DO UPDATE SET
    title = excluded.title,
    category = excluded.category,
    page_type = excluded.page_type,
    html_content = excluded.html_content,
    custom_css = excluded.custom_css,
    custom_js = excluded.custom_js,
    requires_gate = excluded.requires_gate,
    updated_at = CURRENT_TIMESTAMP
`);

let migratedCount = 0;

for (const item of inventory) {
  const routePath = item.path;
  const pageTitle = item.title || 'Trần Kim Đính';
  let rawCombined = '';

  if (routePath === '/') {
    // Home has block1 and block2; block2 is the rich Tailwind portal
    const b2 = fs.readFileSync(path.join(EXPORT_DIR, 'home__block2.html'), 'utf-8');
    rawCombined = b2;
  } else if (routePath === '/Study-Corner/Production-Management/bài-tập-theo-chương') {
    let nat = fs.readFileSync(path.join(EXPORT_DIR, 'Study-Corner__Production-Management__bài-tập-theo-chương__native.html'), 'utf-8');
    // Remove the first Google Sites raw banner section and style images/tables cleanly
    nat = nat
      .replace(/<section id="h\.6b17188f1e185d78_1"[\s\S]*?<\/section>/i, '')
      .replace(/<table\b/gi, '<div class="overflow-x-auto my-3 rounded-xl border border-slate-200"><table class="w-full text-xs sm:text-sm border-collapse"')
      .replace(/<\/table>/gi, '</table></div>')
      .replace(/<img\b([^>]*)>/gi, '<img$1 class="max-w-full h-auto rounded-xl border border-slate-200 my-3 shadow-2xs mx-auto" loading="lazy">');
    rawCombined = `
      <header class="w-full bg-gradient-to-br from-sky-800 via-sky-700 to-cyan-800 text-white py-6 px-4 text-center shadow-sm mb-6">
        <div class="max-w-5xl mx-auto space-y-1.5">
          <span class="inline-block bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-0.5 text-xs font-semibold text-sky-200 uppercase">Quản Trị Sản Xuất</span>
          <h1 class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">Hệ Thống Bài Tập Ôn Tập Theo Chương</h1>
        </div>
      </header>
      <main class="max-w-5xl mx-auto px-3 sm:px-6 pb-8">
        <div class="bg-white rounded-2xl shadow-xs border border-sky-200 p-4 sm:p-8 space-y-4 overflow-x-hidden">${nat}</div>
      </main>
    `;
  } else if (item.saved_html_files && item.saved_html_files.length > 0) {
    rawCombined = item.saved_html_files
      .map((fn) => fs.readFileSync(path.join(EXPORT_DIR, fn), 'utf-8'))
      .join('\n');
  }

  let category = 'General';
  if (routePath.startsWith('/Study-Corner')) category = 'Study-Corner';
  else if (routePath.startsWith('/ELEARNING')) category = 'E-Learning';
  else if (routePath.startsWith('/SPSS')) category = 'SPSS';
  else if (routePath === '/DCCT') category = 'Internship';
  else if (routePath === '/Data') category = 'Data-Center';

  let requiresGate = null;
  if (routePath === '/ELEARNING') requiresGate = 'elearning';
  else if (routePath === '/Data') requiresGate = 'datacenter';

  const { htmlContent, customCss, customJs, pageType } = extractHtmlParts(rawCombined, routePath, pageTitle);

  upsertPage.run(
    routePath,
    pageTitle,
    category,
    pageType,
    htmlContent,
    customCss,
    customJs,
    requiresGate
  );
  migratedCount++;
}

// 5. Seed the 5 new Subject Pages requested by the client (Quản trị Marketing, Marketing căn bản, Bài giảng Quản trị chiến lược)
const additionalSubjectPages = [
  {
    route_path: '/Study-Corner/Marketing-Management',
    title: 'Bài giảng & Đề cương học phần Quản trị Marketing',
    category: 'Study-Corner',
    page_type: 'content',
    html_content: `<div class="tkd-page-scope">
      <header class="w-full bg-gradient-to-br from-sky-800 via-sky-700 to-cyan-800 text-white py-6 px-4 text-center shadow-sm">
        <div class="max-w-5xl mx-auto space-y-1.5">
          <span class="inline-block bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-0.5 text-xs font-semibold text-sky-200 uppercase">Góc Học Tập • Chuyên Ngành Marketing</span>
          <h1 class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">Học Phần Quản Trị Marketing (Marketing Management)</h1>
          <p class="text-xs sm:text-sm text-sky-100/90">Hệ thống bài giảng, mô hình phân tích STP, Marketing Mix 4Ps/7Ps và chiến lược cạnh tranh</p>
        </div>
      </header>
      <main class="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <div class="bg-white rounded-2xl border border-sky-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-base sm:text-lg font-extrabold text-sky-950">🎯 Ngân Hàng Đề Thi Thử Quản Trị Marketing</h2>
            <p class="text-xs sm:text-sm text-slate-600">Luyện tập trắc nghiệm trực tuyến có bấm giờ, chấm điểm tự động và xuất phiếu kết quả.</p>
          </div>
          <a href="/Study-Corner/Marketing-Management/test" title="Làm đề thi thử môn Quản trị Marketing" class="bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0">✍️ Làm Đề Thi Thử Ngay →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Chương 1 & 2</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Tổng quan Quản trị Marketing & Phân tích Môi trường</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Khái niệm cốt lõi của Philip Kotler về Quản trị Marketing theo định hướng giá trị khách hàng; phân tích môi trường vĩ mô (PESTEL), vi mô (5 áp lực cạnh tranh Porter) và SWOT.</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Chương 3 & 4</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Hệ thống Thông tin Marketing (MIS) & Hành vi Khách hàng</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Quy trình nghiên cứu thị trường, mô hình hộp đen hành vi người tiêu dùng (B2C) và quy trình mua hàng của khách hàng tổ chức (B2B).</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Chương 5</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Chiến lược Phân khúc, Chọn thị trường mục tiêu & Định vị (STP)</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Tiêu thức phân khúc thị trường, đánh giá mức độ hấp dẫn của từng phân khúc, thiết lập bản đồ định vị (Positioning Map) và tuyên bố giá trị (Value Proposition).</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Chương 6, 7, 8, 9</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Hoạch định Chiến lược Marketing-Mix (4Ps & 7Ps)</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Quản trị chu kỳ sống sản phẩm (PLC), chiến lược định giá, thiết kế kênh phân phối đa kênh (Omnichannel) và truyền thông Marketing tích hợp (IMC).</p>
          </section>
        </div>
      </main>
    </div>`,
  },
  {
    route_path: '/Study-Corner/Marketing-Management/test',
    title: 'Đề thi thử Trắc nghiệm Quản trị Marketing',
    category: 'Study-Corner',
    page_type: 'quiz',
    html_content: `<div class="tkd-page-scope">
      <div class="max-w-5xl mx-auto px-3 sm:px-6 py-6">
        <div class="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs text-center space-y-4">
          <span class="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">🎯 Đề Thi Thử Trực Tuyến</span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-sky-950 uppercase">Ngân Hàng Đề Thi Thử Môn Quản Trị Marketing</h1>
          <p class="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">Hệ thống đề thi thử Quản trị Marketing đã được tích hợp trực tiếp vào Trung tâm Ngân hàng Đề thi Online để hỗ trợ đăng ký thông tin, chấm điểm tự động và xuất phiếu kết quả PDF/CSV.</p>
          <div class="pt-2">
            <a href="/ngan-hang-de-thi?subject=marketing-management" title="Bắt đầu làm bài thi Quản trị Marketing" class="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors">🚀 Bắt Đầu Làm Bài Thi Quản Trị Marketing →</a>
          </div>
        </div>
      </div>
    </div>`,
  },
  {
    route_path: '/Study-Corner/Principles-of-Marketing',
    title: 'Bài giảng & Đề cương học phần Marketing Căn Bản',
    category: 'Study-Corner',
    page_type: 'content',
    html_content: `<div class="tkd-page-scope">
      <header class="w-full bg-gradient-to-br from-sky-800 via-sky-700 to-cyan-800 text-white py-6 px-4 text-center shadow-sm">
        <div class="max-w-5xl mx-auto space-y-1.5">
          <span class="inline-block bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-0.5 text-xs font-semibold text-sky-200 uppercase">Góc Học Tập • Học Phần Cơ Sở Ngành</span>
          <h1 class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">Học Phần Marketing Căn Bản (Principles of Marketing)</h1>
          <p class="text-xs sm:text-sm text-sky-100/90">Kiến thức nền tảng về nhu cầu, thị trường, nghiên cứu Marketing, STP và bộ công cụ 4Ps</p>
        </div>
      </header>
      <main class="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <div class="bg-white rounded-2xl border border-sky-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-base sm:text-lg font-extrabold text-sky-950">🎯 Đề Thi Thử Trắc Nghiệm Marketing Căn Bản</h2>
            <p class="text-xs sm:text-sm text-slate-600">Làm bài thi thử 20 - 40 câu, chấm điểm tức thì, lưu bảng vàng và tải phiếu điểm PDF.</p>
          </div>
          <a href="/Study-Corner/Principles-of-Marketing/test" title="Làm đề thi thử môn Marketing căn bản" class="bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0">✍️ Làm Đề Thi Thử Ngay →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Phần 1</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Bản chất của Marketing & Nhu cầu Khách hàng</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Phân biệt Nhu cầu tự nhiên (Needs), Mong muốn (Wants) và Nhu cầu có khả năng thanh toán (Demands). Sự tiến hóa của 5 quan điểm quản trị Marketing.</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Phần 2</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Môi trường Marketing & Hành vi Mua của Người tiêu dùng</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">6 yếu tố môi trường vĩ mô, 6 yếu tố môi trường vi mô và 5 giai đoạn trong quá trình ra quyết định mua hàng của người tiêu dùng.</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Phần 3</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Chính sách Sản phẩm (Product) & Định giá (Price)</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">3 cấp độ sản phẩm, nhãn hiệu, bao gói, chu kỳ sống sản phẩm (PLC) và các phương pháp định giá cơ bản (dựa trên chi phí, giá trị cảm nhận, cạnh tranh).</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Phần 4</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Chính sách Phân phối (Place) & Xúc tiến hỗn hợp (Promotion)</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Cấu trúc kênh phân phối trực tiếp/gián tiếp và 5 công cụ truyền thông cổ động: Quảng cáo, Khuyến mãi, PR, Bán hàng cá nhân và Marketing trực tiếp.</p>
          </section>
        </div>
      </main>
    </div>`,
  },
  {
    route_path: '/Study-Corner/Principles-of-Marketing/test',
    title: 'Đề thi thử Trắc nghiệm Marketing Căn Bản',
    category: 'Study-Corner',
    page_type: 'quiz',
    html_content: `<div class="tkd-page-scope">
      <div class="max-w-5xl mx-auto px-3 sm:px-6 py-6">
        <div class="bg-white rounded-2xl border border-sky-200 p-6 shadow-xs text-center space-y-4">
          <span class="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">🎯 Đề Thi Thử Trực Tuyến</span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-sky-950 uppercase">Ngân Hàng Đề Thi Thử Môn Marketing Căn Bản</h1>
          <p class="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">Hệ thống đề thi thử Marketing căn bản tích hợp tại Ngân hàng Đề thi Online: chọn số lượng câu hỏi, làm bài trực tuyến, lưu điểm và xuất phiếu kết quả PDF.</p>
          <div class="pt-2">
            <a href="/ngan-hang-de-thi?subject=principles-of-marketing" title="Bắt đầu làm bài thi Marketing căn bản" class="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors">🚀 Bắt Đầu Làm Bài Thi Marketing Căn Bản →</a>
          </div>
        </div>
      </div>
    </div>`,
  },
  {
    route_path: '/Study-Corner/strategic-management/bai-giang',
    title: 'Bài giảng & Tóm tắt lý thuyết Quản trị Chiến lược',
    category: 'Study-Corner',
    page_type: 'content',
    html_content: `<div class="tkd-page-scope">
      <header class="w-full bg-gradient-to-br from-sky-800 via-sky-700 to-cyan-800 text-white py-6 px-4 text-center shadow-sm">
        <div class="max-w-5xl mx-auto space-y-1.5">
          <span class="inline-block bg-sky-900/60 border border-sky-400/30 rounded-full px-3 py-0.5 text-xs font-semibold text-sky-200 uppercase">Góc Học Tập • Quản Trị Chiến Lược</span>
          <h1 class="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">Bài Giảng & Mô Hình Trọng Tâm Quản Trị Chiến Lược</h1>
          <p class="text-xs sm:text-sm text-sky-100/90">Ma trận EFE, IFE, SWOT, BCG, IE, QSPM và quy trình hoạch định - thực thi - kiểm soát chiến lược</p>
        </div>
      </header>
      <main class="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        <div class="bg-white rounded-2xl border border-sky-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-base sm:text-lg font-extrabold text-sky-950">🎯 Ngân Hàng 195 Câu Trắc Nghiệm Quản Trị Chiến Lược</h2>
            <p class="text-xs sm:text-sm text-slate-600">Ôn tập và làm đề thi thử trực tuyến học phần Quản trị chiến lược.</p>
          </div>
          <a href="/Study-Corner/strategic-management" title="Làm đề thi thử Quản trị chiến lược" class="bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0">✍️ Làm Đề Thi Thử (195 Câu) →</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Giai đoạn 1: Nhập liệu</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Ma trận EFE, IFE & CPM</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Đánh giá các yếu tố bên ngoài (EFE), các yếu tố nội bộ (IFE) và ma trận hình ảnh cạnh tranh (CPM) với tổng trọng số = 1.0 và điểm trung bình 2.5.</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Giai đoạn 2: Kết hợp</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Ma trận SWOT, BCG, IE & SPACE</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Hình thành các phương án chiến lược SO, WO, ST, WT; phân bổ danh mục đầu tư BCG (Ngôi sao, Dấu hỏi, Bò sữa, Chó mực) và ma trận nội ngoại IE 9 ô.</p>
          </section>
          <section class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800">Giai đoạn 3: Quyết định</span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900">Ma trận QSPM & Thẻ điểm cân bằng BSC</h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Lượng hóa mức độ hấp dẫn (AS & TAS) để chọn chiến lược tối ưu bằng ma trận QSPM và triển khai mục tiêu qua 4 khía cạnh Balanced Scorecard (BSC).</p>
          </section>
        </div>
      </main>
    </div>`,
  },
];

for (const sp of additionalSubjectPages) {
  upsertPage.run(sp.route_path, sp.title, sp.category, sp.page_type, sp.html_content, '', '', null);
  migratedCount++;
}

// 6. Seed Birthday Wishes (if empty)
const bdayCount = db.prepare('SELECT COUNT(*) as c FROM birthday_wishes').get().c;
if (bdayCount === 0) {
  const curMonth = new Date().getMonth() + 1;
  const curDay = new Date().getDate();
  const insBday = db.prepare(`
    INSERT INTO birthday_wishes (full_name, role_or_class, birth_day, birth_month, wish_message, avatar_emoji, is_active)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `);
  insBday.run('Nguyễn Minh Anh', 'Lớp CĐ QTKD K26A', curDay, curMonth, 'Chúc em tuổi mới tràn đầy năng lượng, đạt học bổng xuất sắc và chinh phục mọi mục tiêu học tập!', '🎂');
  insBday.run('Trần Hoàng Bảo Ngọc', 'Lớp CĐ Marketing K26B', curDay, curMonth, 'Chúc mừng sinh nhật Bảo Ngọc! Chúc em luôn giữ vững đam mê sáng tạo và gặt hái điểm A+ các học phần chuyên ngành.', '🎉');
  insBday.run('Lê Quốc Khánh', 'Lớp CĐ QTKD K25C', Math.min(28, curDay + 2), curMonth, 'Chúc Quốc Khánh tuổi mới bản lĩnh, hoàn thành xuất sắc kỳ thực tập tốt nghiệp và khởi đầu sự nghiệp rực rỡ!', '🌟');
  insBday.run('Phạm Thuỳ Dương', 'Lớp CĐ Logistics & chuỗi cung ứng', Math.max(1, curDay - 1), curMonth, 'Chúc Thuỳ Dương sinh nhật thật nhiều niềm vui, sức khỏe và luôn là hạt nhân tích cực của tập thể lớp!', '💐');
}

// 7. Seed News Articles for Góc Chia Sẻ -> Tin tức (if empty)
const newsCount = db.prepare('SELECT COUNT(*) as c FROM news_articles').get().c;
if (newsCount === 0) {
  const insNews = db.prepare(`
    INSERT INTO news_articles (slug, title, category, summary, content_html, author, views)
    VALUES (?, ?, ?, ?, ?, 'ThS. Trần Kim Đính', ?)
  `);
  insNews.run(
    'bi-quyet-on-thi-va-lam-bai-trac-nghiem-dat-diem-toi-da',
    'Bí quyết ôn thi và làm bài trắc nghiệm các môn Quản trị & Kinh tế đạt điểm tối đa',
    'Phương pháp học tập',
    'Tổng hợp phương pháp hệ thống hóa kiến thức bằng sơ đồ tư duy, cách phân bổ thời gian làm bài trắc nghiệm và tránh các bẫy câu hỏi thường gặp.',
    `<p>Trong các học phần chuyên ngành như <strong>Quản trị học, Kinh tế vi mô, Quản trị sản xuất, Quản trị chiến lược và Marketing</strong>, hình thức thi trắc nghiệm kết hợp bài tập tự luận đòi hỏi sinh viên không chỉ nhớ khái niệm mà còn phải hiểu rõ bản chất vận dụng.</p>
     <h3>1. Nắm vững từ khóa cốt lõi (Keywords) của từng chương</h3>
     <p>Thay vì học thuộc lòng cả đoạn văn dài, các bạn hãy gạch chân các từ khóa phân biệt giữa các cấp quản trị (Cao cấp - Trung gian - Cơ sở), các chức năng quản trị (Hoạch định - Tổ chức - Lãnh đạo - Kiểm tra) hoặc các ma trận chiến lược (EFE, IFE, SWOT, BCG).</p>
     <h3>2. Luyện tập thường xuyên trên Ngân hàng đề thi Online</h3>
     <p>Hãy tận dụng tối đa hệ thống <strong>Ngân hàng đề thi thử trực tuyến</strong> trên website. Việc làm đề có bấm giờ giúp rèn phản xạ phân bổ thời gian (trung bình 45-60 giây/câu) và nhận diện ngay những mảng kiến thức còn hổng để ôn tập bổ sung.</p>`,
    342
  );
  insNews.run(
    'huong-dan-quy-trinh-xu-ly-du-lieu-spss-cho-sinh-vien-nckh',
    'Quy trình 5 bước xử lý dữ liệu SPSS chuẩn xác cho Nghiên cứu khoa học & Khóa luận',
    'Nghiên cứu khoa học',
    'Hướng dẫn từ khâu làm sạch dữ liệu, thống kê mô tả, kiểm định độ tin cậy Cronbach Alpha, phân tích nhân tố khám phá EFA đến hồi quy tuyến tính bội.',
    `<p>Khi thực hiện đề tài <strong>Nghiên cứu khoa học sinh viên</strong> hoặc khóa luận tốt nghiệp, phần mềm SPSS là công cụ đắc lực giúp kiểm định mô hình nghiên cứu định lượng.</p>
     <h3>Quy trình 5 bước chuẩn trên SPSS 20:</h3>
     <ul>
       <li><strong>Bước 1:</strong> Mã hóa thang đo Likert 5 mức độ và làm sạch phiếu khảo sát không hợp lệ.</li>
       <li><strong>Bước 2:</strong> Thống kê mô tả (Frequencies & Descriptives) để nắm đặc điểm mẫu khảo sát.</li>
       <li><strong>Bước 3:</strong> Kiểm định độ tin cậy thang đo bằng hệ số <em>Cronbach's Alpha</em> (yêu cầu Alpha ≥ 0.6 và tương quan biến tổng ≥ 0.3).</li>
       <li><strong>Bước 4:</strong> Phân tích nhân tố khám phá <em>EFA</em> (kiểm tra hệ số KMO ≥ 0.5, kiểm định Bartlett Sig. &lt; 0.05).</li>
       <li><strong>Bước 5:</strong> Phân tích tương quan Pearson và Hồi quy tuyến tính bội (Multiple Linear Regression) để đánh giá mức độ tác động của từng nhân tố.</li>
     </ul>`,
    489
  );
  insNews.run(
    'kinh-nghiem-viet-bao-cao-thuc-tap-tot-nghiep-chuan-hce-ctim',
    'Kinh nghiệm viết Báo cáo Thực tập Tốt nghiệp đạt điểm A: Từ chọn đề tài đến bảo vệ',
    'Thực tập tốt nghiệp',
    'Những lỗi trình bày phổ biến cần tránh, cách thu thập số liệu thực tế tại doanh nghiệp trong 3 năm gần nhất và cách đề xuất giải pháp khả thi.',
    `<p>Kỳ thực tập tốt nghiệp là bước chuyển giao quan trọng giúp sinh viên đối chiếu lý thuyết trên giảng đường với thực tiễn vận hành tại doanh nghiệp.</p>
     <h3>3 nguyên tắc vàng khi viết Báo cáo thực tập:</h3>
     <ol>
       <li><strong>Số liệu phải nhất quán và cập nhật:</strong> Bảng kết quả hoạt động kinh doanh cần lấy đủ chuỗi 3 năm liên tiếp, có nguồn trích dẫn từ phòng Kế toán/Tài chính hoặc Nhân sự của đơn vị.</li>
       <li><strong>Nhận xét bám sát biểu bảng:</strong> Sau mỗi bảng số liệu hoặc sơ đồ quy trình, bắt buộc phải có đoạn phân tích xu hướng tăng/giảm (tuyệt đối và tương đối %) cùng nguyên nhân thực tế.</li>
       <li><strong>Giải pháp ở Chương 3 phải khớp với Hạn chế ở Chương 2:</strong> Mỗi nhược điểm chỉ ra ở phần đánh giá thực trạng cần có giải pháp khắc phục cụ thể, nêu rõ cách làm, chi phí dự kiến và kết quả kỳ vọng.</li>
     </ol>`,
    518
  );
  insNews.run(
    'ung-dung-phan-mem-pom-qm-trong-bai-toan-quan-tri-san-xuat',
    'Ứng dụng phần mềm POM-QM for Windows giải nhanh bài toán Dự báo & Hoạch định sản xuất',
    'Công nghệ & Phần mềm',
    'Cách nhập dữ liệu và đọc bảng kết quả dự báo nhu cầu (Moving Average, Exponential Smoothing), tính sai số MAD, MSE, MAPE trên POM-QM.',
    `<p>Phần mềm <strong>POM-QM for Windows</strong> giúp sinh viên kiểm tra nhanh kết quả các bài toán định lượng trong môn Quản trị sản xuất và Quản trị sản xuất & dịch vụ.</p>
     <p>Các phân hệ quan trọng nhất sinh viên cần thành thạo gồm: <em>Forecasting (Dự báo nhu cầu)</em>, <em>Aggregate Planning (Hoạch định tổng hợp)</em>, <em>Inventory (Quản trị hàng tồn kho EOQ/POQ)</em> và <em>MRP (Hoạch định nhu cầu nguyên vật liệu)</em>. Toàn bộ bộ cài đặt và hướng dẫn chi tiết đã được tích hợp sẵn tại chuyên mục Kho phần mềm và Góc học tập.</p>`,
    276
  );
}

// 8. Seed initial Top Exam Submissions (if fewer than 5 records exist) so Homepage Leaderboard is populated
const subCount = db.prepare('SELECT COUNT(*) as c FROM exam_submissions').get().c;
if (subCount < 5) {
  const insSub = db.prepare(`
    INSERT INTO exam_submissions (student_name, student_id, class_name, subject_path, subject_title, exam_mode, test_code, score, max_score, duration_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 100, ?)
  `);
  insSub.run('Nguyễn Thị Minh Thư', 'SV260108', 'CĐ QTKD K26A', '/Study-Corner/Management/Management-exercise', 'Quản trị học', 'Đề thi thử 40 câu', 'QTH-01', 98, '14 phút 20 giây');
  insSub.run('Trần Quốc Tuấn', 'SV260215', 'CĐ QTKD K26B', '/Study-Corner/Microeconomics/Microeconomics-TEST', 'Kinh tế vi mô', 'Đề thi thử 40 câu', 'KTVM-02', 95, '16 phút 05 giây');
  insSub.run('Lê Hoàng Phương Thảo', 'SV260319', 'CĐ Marketing K26A', '/Study-Corner/Marketing-Management/test', 'Quản trị Marketing', 'Đề thi thử 40 câu', 'QTMKT-01', 95, '15 phút 42 giây');
  insSub.run('Phạm Gia Huy', 'SV250412', 'CĐ QTKD K25A', '/Study-Corner/Product-and-Service-Management/Test', 'Quản trị sản xuất và dịch vụ', 'Đề thi thử 50 câu', 'QTSXDV-03', 92, '18 phút 10 giây');
  insSub.run('Võ Ngọc Bảo Trâm', 'SV260188', 'CĐ Marketing K26B', '/Study-Corner/Brand-Management/brand-assignment', 'Quản trị thương hiệu', 'Đề thi thử 40 câu', 'QTTH-01', 90, '13 phút 50 giây');
  insSub.run('Đặng Minh Khôi', 'SV250209', 'CĐ QTKD K25B', '/Study-Corner/strategic-management', 'Quản trị chiến lược', 'Đề thi thử 60 câu', 'QTCL-02', 90, '21 phút 15 giây');
}

console.log(`✅ Successfully migrated ${migratedCount} pages, ${dcctCodes.length} DCCT syllabus codes, birthdays, news & leaderboard into SQLite (${DB_PATH})!`);
