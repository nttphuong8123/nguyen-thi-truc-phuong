// src/pages/api/admin/departments.ts
import type { APIRoute } from 'astro';
import { verifyAdminToken } from '../../../lib/admin-auth';

export const prerender = false;

// Theo Phần H: Hiện chưa có danh bạ chính thức, trạng thái xác minh is_verified = 0
const initialDepartments = [
  {
    id: 'dept_qtkd',
    name: 'Khoa Quản trị - Kinh doanh',
    code: 'QTKD',
    function_desc: 'Quản lý đào tạo chuyên ngành Quản trị kinh doanh, cố vấn học tập, thực tập tốt nghiệp',
    email: '',
    phone: '',
    location: '',
    is_verified: 0
  },
  {
    id: 'dept_pdt',
    name: 'Phòng Đào tạo',
    code: 'PDT',
    function_desc: 'Tổ chức kế hoạch đào tạo, thời khóa biểu, đăng ký học phần, xét tốt nghiệp, cấp bằng',
    email: '',
    phone: '',
    location: '',
    is_verified: 0
  },
  {
    id: 'dept_pctsv',
    name: 'Phòng Công tác Chính trị và Quản lý HSSV',
    code: 'PCTSV',
    function_desc: 'Chế độ chính sách, miễn giảm học phí, học bổng khuyến khích, điểm rèn luyện, ký túc xá',
    email: '',
    phone: '',
    location: '',
    is_verified: 0
  },
  {
    id: 'dept_pkt',
    name: 'Phòng Khảo thí và Đảm bảo chất lượng',
    code: 'PKT',
    function_desc: 'Lịch thi kết thúc học phần, ngân hàng đề thi, phúc khảo điểm thi, chấm thi',
    email: '',
    phone: '',
    location: '',
    is_verified: 0
  }
];

export const GET: APIRoute = async ({ request, locals }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : '';
  const admin = verifyAdminToken(token);

  if (!admin) {
    return new Response(JSON.stringify({ success: false, error: 'Yêu cầu đăng nhập quản trị.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      const { results: depts } = await db.prepare(`SELECT * FROM departments ORDER BY name ASC`).all();
      return new Response(JSON.stringify({ success: true, data: depts }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {
      console.warn('Lỗi query D1 departments:', e);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    data: initialDepartments
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/admin_session=([^;]+)/);
  const token = match ? match[1] : '';
  const admin = verifyAdminToken(token);

  if (!admin || admin.role !== 'super_admin') {
    return new Response(JSON.stringify({ success: false, error: 'Chỉ Super Admin mới có quyền cập nhật danh bạ phòng ban.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.id) {
    return new Response(JSON.stringify({ success: false, error: 'Thiếu thông tin phòng ban.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const db = (locals as any)?.runtime?.env?.DB;
  if (db) {
    try {
      await db.prepare(`
        UPDATE departments 
        SET email = ?, phone = ?, location = ?, is_verified = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        body.email || '',
        body.phone || '',
        body.location || '',
        body.is_verified ? 1 : 0,
        admin.username,
        body.id
      ).run();
    } catch (e) {
      console.warn('Lỗi update D1 departments:', e);
    }
  }

  return new Response(JSON.stringify({
    success: true,
    message: 'Cập nhật danh bạ phòng ban thành công.'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
