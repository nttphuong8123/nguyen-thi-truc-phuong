import type { APIRoute } from 'astro';
import db, { verifyGateToken } from '../../lib/db';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const studentName = String(body.student_name || 'Sinh viên').trim();
    const studentId = String(body.student_id || '').trim();
    const className = String(body.class_name || '').trim();
    const subjectPath = String(body.subject_path || '/').trim();
    const subjectTitle = String(body.subject_title || 'Bài kiểm tra').trim();
    const examMode = String(body.exam_mode || 'Đề thi thử').trim();
    const testCode = String(body.test_code || 'N/A').trim();
    const score = Number(body.score ?? 0);
    const maxScore = Number(body.max_score ?? 100);
    const durationText = String(body.duration_text || '').trim();

    const stmt = db.prepare(`
      INSERT INTO exam_submissions (
        student_name, student_id, class_name, subject_path, subject_title,
        exam_mode, test_code, score, max_score, duration_text, ip_address
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = stmt.run(
      studentName,
      studentId,
      className,
      subjectPath,
      subjectTitle,
      examMode,
      testCode,
      score,
      maxScore,
      durationText,
      clientAddress || ''
    );

    return new Response(JSON.stringify({ ok: true, id: Number(info.lastInsertRowid) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async ({ url, cookies }) => {
  if (url.searchParams.get('public') === '1') {
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get('limit') || 100)));
    const recentRows = db
      .prepare('SELECT id, student_name, student_id, class_name, subject_title, exam_mode, test_code, score, max_score, duration_text, submitted_at FROM exam_submissions ORDER BY id DESC LIMIT ?')
      .all(limit);
    return new Response(JSON.stringify({ ok: true, rows: recentRows }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }

  const adminToken = cookies.get('tkd_gate_admin')?.value;
  if (!verifyGateToken('admin', adminToken)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const format = url.searchParams.get('format') || 'json';
  const subjectFilter = url.searchParams.get('subject') || '';
  const search = url.searchParams.get('q') || '';

  let sql = 'SELECT * FROM exam_submissions WHERE 1=1';
  const params: (string | number)[] = [];

  if (subjectFilter) {
    sql += ' AND subject_path = ?';
    params.push(subjectFilter);
  }
  if (search) {
    sql += ' AND (student_name LIKE ? OR student_id LIKE ? OR test_code LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY id DESC LIMIT 2000';

  const rows = db.prepare(sql).all(...params) as Array<Record<string, unknown>>;

  if (format === 'csv') {
    const headers = ['ID', 'Họ và Tên', 'Lớp / MSSV', 'Môn học', 'Hình thức', 'Mã đề', 'Điểm số', 'Thang điểm', 'Thời gian làm', 'Thời điểm nộp'];
    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const cols = [
        r.id,
        `"${String(r.student_name || '').replace(/"/g, '""')}"`,
        `"${String(r.student_id || r.class_name || '').replace(/"/g, '""')}"`,
        `"${String(r.subject_title || '').replace(/"/g, '""')}"`,
        `"${String(r.exam_mode || '').replace(/"/g, '""')}"`,
        `"${String(r.test_code || '').replace(/"/g, '""')}"`,
        r.score,
        r.max_score,
        `"${String(r.duration_text || '').replace(/"/g, '""')}"`,
        `"${String(r.submitted_at || '')}"`,
      ];
      csvLines.push(cols.join(','));
    }
    const csvContent = '\uFEFF' + csvLines.join('\r\n');
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bang-diem-trankimdinh-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true, rows }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
