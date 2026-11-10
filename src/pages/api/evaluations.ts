import type { APIRoute } from 'astro';
import { addEvaluation, getEvaluations, verifyGateToken } from '../../lib/db';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const ratingsObj = body.ratings && typeof body.ratings === 'object' ? body.ratings : {};
    const ratingsJson = typeof body.ratings_json === 'string' ? body.ratings_json : JSON.stringify(ratingsObj);

    const row = addEvaluation({
      semester_year: String(body.semester_year || 'HK I - Năm học 2026 - 2027').trim(),
      course_name: String(body.course_name || 'Chưa rõ').trim(),
      class_code: String(body.class_code || '').trim(),
      instructor_name: String(body.instructor_name || 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG').trim(),
      ratings_json: ratingsJson,
      average_score: Number(body.average_score ?? 5),
      overall_satisfaction: String(body.overall_satisfaction || 'Hài lòng').trim(),
      positives: String(body.positives || '').trim(),
      improvements: String(body.improvements || '').trim(),
      ip_address: clientAddress || '',
    });

    return new Response(JSON.stringify({ ok: true, id: row.id }), {
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
  const adminToken = cookies.get('tkd_gate_admin')?.value;
  if (!verifyGateToken('admin', adminToken)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const format = url.searchParams.get('format') || 'json';
  const rows = getEvaluations();

  if (format === 'csv') {
    const headers = [
      'ID',
      'Học kỳ / Niên khóa',
      'Môn học',
      'Mã lớp',
      'Giảng viên',
      'Điểm TB (/5.0)',
      'Mức độ hài lòng',
      'Điểm tâm đắc',
      'Cần cải tiến',
      'Chi tiết điểm Likert',
      'Thời điểm nộp',
    ];
    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      csvLines.push(
        [
          r.id,
          esc(r.semester_year),
          esc(r.course_name),
          esc(r.class_code),
          esc(r.instructor_name),
          r.average_score,
          esc(r.overall_satisfaction),
          esc(r.positives),
          esc(r.improvements),
          esc(r.ratings_json),
          esc(r.submitted_at),
        ].join(',')
      );
    }
    const csvContent = '\uFEFF' + csvLines.join('\r\n');
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="danh-gia-giang-vien-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true, rows }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
