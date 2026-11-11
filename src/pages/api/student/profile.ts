// src/pages/api/student/profile.ts
import type { APIRoute } from 'astro';

export const prerender = false;

// Trạng thái hệ thống SIS theo Phần F: SIS_ENABLED = false
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    sis_enabled: false,
    code: 'SIS_NOT_ENABLED',
    message: 'Chức năng hồ sơ sinh viên trực tuyến hiện chưa được kích hoạt.',
    notice: 'Em vui lòng sử dụng tài khoản cổng sinh viên chính thức do nhà trường cấp.'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
};
