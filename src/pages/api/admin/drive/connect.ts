// src/pages/api/admin/drive/connect.ts
import type { APIRoute } from 'astro';
import { verifyAdminToken } from '../../../../lib/admin-auth';

export const prerender = false;

// Trạng thái Google Drive ban đầu theo yêu cầu Phần E: DRIVE_CONNECTED = false
let driveState = {
  connected: false,
  folderId: '',
  lastConnectedAt: null as string | null,
  accountEmail: ''
};

export const GET: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({
    success: true,
    data: driveState
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : '';
  const admin = verifyAdminToken(token);

  if (!admin || admin.role !== 'super_admin') {
    return new Response(JSON.stringify({ success: false, error: 'Chỉ Super Admin mới được cấu hình liên kết Google Drive.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => null);
  const action = body?.action; // 'connect' | 'disconnect'

  if (action === 'disconnect') {
    driveState = {
      connected: false,
      folderId: '',
      lastConnectedAt: null,
      accountEmail: ''
    };
    return new Response(JSON.stringify({
      success: true,
      message: 'Đã ngắt kết nối với Google Drive.',
      data: driveState
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (action === 'connect') {
    const folderId = body?.folderId?.trim();
    if (!folderId) {
      return new Response(JSON.stringify({ success: false, error: 'Vui lòng cung cấp Folder ID của Google Drive.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    driveState = {
      connected: true,
      folderId: folderId,
      lastConnectedAt: new Date().toISOString(),
      accountEmail: body?.accountEmail || 'khoaqtkd.hce@gmail.com'
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Kết nối Google Drive thành công. Sẵn sàng cho tác vụ quét và đồng bộ tài liệu.',
      data: driveState
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Hành động không hợp lệ.' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
};
