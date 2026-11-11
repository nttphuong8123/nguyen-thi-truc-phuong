// src/pages/api/student/grades.ts
import type { APIRoute } from 'astro';

export const prerender = false;

// Trạng thái hệ thống SIS theo Phần F: SIS_ENABLED = false
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    sis_enabled: false,
    code: 'SIS_NOT_ENABLED',
    message: 'Chức năng tra cứu điểm trực tuyến hiện chưa được kích hoạt. Nhà trường chưa cấp quyền kết nối phần mềm quản lý đào tạo chính thức.',
    notice: 'Em vui lòng tra cứu điểm tại cổng thông tin sinh viên chính thức của Trường hoặc liên hệ Phòng Đào tạo / Cố vấn học tập.'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    sis_enabled: false,
    code: 'SIS_NOT_ENABLED',
    message: 'Chức năng tra cứu điểm trực tuyến hiện chưa được kích hoạt. Tuyệt đối không nhập mã số sinh viên hoặc dữ liệu cá nhân tại đây.'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
};
