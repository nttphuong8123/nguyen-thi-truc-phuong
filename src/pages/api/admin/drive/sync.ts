// src/pages/api/admin/drive/sync.ts
import type { APIRoute } from 'astro';
import { verifyAdminToken } from '../../../../lib/admin-auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : '';
  const admin = verifyAdminToken(token);

  if (!admin || (admin.role !== 'super_admin' && admin.role !== 'editor')) {
    return new Response(JSON.stringify({ success: false, error: 'Yêu cầu đăng nhập quản trị viên.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Kiểm tra trạng thái Google Drive
  // Theo Phần E: Trạng thái ban đầu DRIVE_CONNECTED=false
  return new Response(JSON.stringify({
    success: false,
    error: 'Google Drive hiện chưa được kết nối (DRIVE_CONNECTED=false). Vui lòng kết nối thư mục Google Drive trước khi thực hiện đồng bộ.',
    status: 'drive_not_connected'
  }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
};
