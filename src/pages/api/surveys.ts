import type { APIRoute } from 'astro';
import { addSurvey, getSurveys, verifyGateToken } from '../../lib/db';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const answersObj = body.answers && typeof body.answers === 'object' ? body.answers : {};
    const answersJson = typeof body.answers_json === 'string' ? body.answers_json : JSON.stringify(answersObj);

    const row = addSurvey({
      survey_type: String(body.survey_type || 'nckh').trim(),
      student_name: String(body.student_name || 'Ẩn danh').trim(),
      student_id: String(body.student_id || '').trim(),
      class_name: String(body.class_name || '').trim(),
      answers_json: answersJson,
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
  const surveyType = url.searchParams.get('type') || undefined;
  const rows = getSurveys(surveyType);

  if (format === 'csv') {
    const headers = ['ID', 'Loại khảo sát', 'Họ và Tên', 'MSSV', 'Lớp', 'Nội dung / Câu trả lời JSON', 'Thời điểm gửi'];
    const csvLines = [headers.join(',')];
    for (const r of rows) {
      const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      csvLines.push(
        [
          r.id,
          esc(r.survey_type),
          esc(r.student_name),
          esc(r.student_id),
          esc(r.class_name),
          esc(r.answers_json),
          esc(r.submitted_at),
        ].join(',')
      );
    }
    const csvContent = '\uFEFF' + csvLines.join('\r\n');
    const filePrefix = surveyType === 'contact_message' ? 'tin-nhan-lien-he' : 'khao-sat-nckh';
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filePrefix}-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true, rows }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
