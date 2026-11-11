// src/pages/api/admin/documents.ts
import type { APIRoute } from 'astro';
import { verifyAdminToken } from '../../../lib/admin-auth';
import officialDocsData from '../../../data/official_regulations_db.json';

export const prerender = false;

// Helper xác thực admin session
function getAuthenticatedAdmin(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  let token = match ? match[1] : '';

  if (!token) {
    const authHeader = request.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  return verifyAdminToken(token);
}

// GET /api/admin/documents - Lấy danh sách tài liệu quy chế
export const GET: APIRoute = async ({ request, locals }) => {
  const admin = getAuthenticatedAdmin(request);
  if (!admin) {
    return new Response(JSON.stringify({ success: false, error: 'Yêu cầu đăng nhập quản trị.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      const { results: docs } = await db.prepare(`SELECT * FROM documents ORDER BY created_at DESC`).all();
      return new Response(JSON.stringify({ success: true, data: docs }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.warn('Lỗi query D1, fallback JSON:', e);
    }
  }

  // Fallback từ officialDocsData
  return new Response(JSON.stringify({
    success: true,
    data: officialDocsData.map(d => ({
      id: d.id,
      title: d.title,
      code: d.code,
      issuer: d.issuer,
      issue_date: d.issue_date,
      effective_date: d.effective_date,
      category: d.category,
      status: d.status,
      is_active: d.is_active,
      chunks_count: d.chunks ? d.chunks.length : 0,
      source_type: 'direct_upload'
    }))
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

// POST /api/admin/documents - Thêm tài liệu mới (chờ duyệt)
export const POST: APIRoute = async ({ request, locals }) => {
  const admin = getAuthenticatedAdmin(request);
  if (!admin || (admin.role !== 'super_admin' && admin.role !== 'editor')) {
    return new Response(JSON.stringify({ success: false, error: 'Không đủ quyền thực hiện.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.code) {
    return new Response(JSON.stringify({ success: false, error: 'Thiếu thông tin bắt buộc (title, code).' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Tài liệu mới mặc định có status là 'pending_review' và is_active = 0
  const newDoc = {
    id: 'doc_' + Date.now(),
    title: body.title.trim(),
    code: body.code.trim(),
    issuer: body.issuer?.trim() || 'Trường Cao đẳng Kinh tế TP.HCM',
    issue_date: body.issue_date || new Date().toISOString().split('T')[0],
    effective_date: body.effective_date || new Date().toISOString().split('T')[0],
    category: body.category || 'academic_regulations',
    status: 'pending_review',
    is_active: 0,
    uploaded_by: admin.username,
    created_at: new Date().toISOString()
  };

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      await db.prepare(`
        INSERT INTO documents (id, title, code, issuer, issue_date, effective_date, category, status, is_active, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        newDoc.id, newDoc.title, newDoc.code, newDoc.issuer, newDoc.issue_date,
        newDoc.effective_date, newDoc.category, newDoc.status, newDoc.is_active, newDoc.uploaded_by
      ).run();
    } catch (e) {
      console.warn('Lỗi ghi D1:', e);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Tài liệu đã được tải lên thành công và đang ở trạng thái Chờ phê duyệt (pending_review).',
    data: newDoc
  }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
};

// PATCH /api/admin/documents - Cập nhật trạng thái duyệt hoặc hiệu lực
export const PATCH: APIRoute = async ({ request, locals }) => {
  const admin = getAuthenticatedAdmin(request);
  if (!admin || admin.role !== 'super_admin') {
    return new Response(JSON.stringify({ success: false, error: 'Chỉ Quản trị viên cấp cao mới có quyền phê duyệt tài liệu.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.id) {
    return new Response(JSON.stringify({ success: false, error: 'Thiếu Document ID.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      if (body.status) {
        await db.prepare(`UPDATE documents SET status = ?, approved_by = ?, is_active = ? WHERE id = ?`)
          .bind(body.status, admin.username, body.status === 'approved' ? 1 : 0, body.id).run();
      }
      if (typeof body.is_active === 'number' || typeof body.is_active === 'boolean') {
        await db.prepare(`UPDATE documents SET is_active = ? WHERE id = ?`)
          .bind(body.is_active ? 1 : 0, body.id).run();
      }
    } catch (e) {
      console.warn('Lỗi cập nhật D1:', e);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Cập nhật tài liệu thành công.'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
