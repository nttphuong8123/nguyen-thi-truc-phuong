/**
 * Toro & Susi Knowledge Engine (Full Restoration & Deep Knowledge Base)
 * Bộ xử lý tri thức học tập HCE toàn diện cho Trợ lý Toro & Susi:
 * 1. Đầy đủ danh bạ 188 giảng viên & cán bộ trên website HCE (14 Khoa/Phòng ban) + kiểm tra viết hoa tên riêng + tự động tạo email chuẩn.
 * 2. Lập đề cương thực tập tốt nghiệp 3 chương chuyên sâu theo thời gian thực (2023–2026 & 2026–2029) tùy biến theo từng đề tài & tên công ty cụ thể.
 * 3. Đầy đủ 33 môn học trong bảng hình thức thi, thời gian thi (60 phút) và quy định sử dụng tài liệu.
 * 4. Toàn bộ Quy chế đào tạo tín chỉ QĐ 624/QĐ-CĐKT, Chuẩn đầu ra Tin học (QĐ 487), Ngoại ngữ, Học bổng (QĐ 120), Miễn giảm học phí (QĐ 238), Điểm rèn luyện (QĐ 1105).
 * 5. Toàn bộ Kế hoạch đào tạo năm học 2026 - 2027 và 5 Quy trình giải quyết học vụ (QT04, QT06, QT07, QT08, QT09) + Tin tức HCE thời gian thực.
 * 6. Truy xuất trực tiếp kho học liệu 56 trang website (PDF, Word, SPSS, POM-QM, Casio, Công thức hòa vốn, EOQ/POQ, 11 Silo môn học) và 28 mã đề cương (/dcct) từ cơ sở dữ liệu gốc.
 */

import db from './db';

export interface ToroChatHistoryItem {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface TeachingScheduleItem {
  id?: number | string;
  day_of_week: string;
  session?: string;
  periods?: string;
  subject: string;
  class_code: string;
  room?: string;
  notes?: string;
  is_active?: boolean;
}

export interface HceNewsSimpleItem {
  title: string;
  category?: string;
  date?: string;
  summary?: string;
  url?: string;
}

export interface EducationNewsSimpleItem {
  title: string;
  sourceName?: string;
  description?: string;
  link: string;
  timeAgo?: string;
}

// ============================================================================
// 1. DANH BẠ 14 ĐƠN VỊ (KHOA, PHÒNG BAN, TRUNG TÂM) TRÊN WEBSITE NHÀ TRƯỜNG HCE
// ============================================================================
interface StaffEntry {
  fullName: string;
  role: string;
  dept: string;
  email: string;
}

function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export function computeHceEmail(fullName: string): string {
  const cleanName = fullName.replace(/\s*\/.*$/, '').trim();
  if (/nguyễn thị trúc phương|trúc phương/i.test(cleanName)) return 'trucphuong@kthcm.edu.vn';
  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'info@kthcm.edu.vn';
  const givenName = removeVietnameseTones(parts[parts.length - 1]);
  const initials = parts
    .slice(0, -1)
    .map((p) => removeVietnameseTones(p).charAt(0))
    .join('');
  return `${givenName}${initials}@kthcm.edu.vn`;
}

const RAW_DEPARTMENTS: Array<{ dept: string; members: Array<{ name: string; role: string }> }> = [
  {
    dept: 'Ban Giám hiệu',
    members: [
      { name: 'Trần Văn Tú', role: 'Hiệu trưởng' },
      { name: 'Võ Thị Khánh Vân', role: 'Phó Hiệu trưởng' },
      { name: 'Phạm Hùng Dũng', role: 'Phó Hiệu trưởng' },
      { name: 'Nguyễn Đặng An Long', role: 'Phó Hiệu trưởng' },
    ],
  },
  {
    dept: 'Khoa Quản trị - Kinh doanh',
    members: [
      { name: 'Nguyễn Thị Trúc Phương', role: 'Trưởng Khoa' },
      { name: 'Phan Nguyễn Mai Trang', role: 'Phó Trưởng Khoa' },
      { name: 'NGUYỄN THỊ TRÚC PHƯƠNG', role: 'Tổ trưởng bộ môn' },
      { name: 'NGUYỄN THỊ TRÚC PHƯƠNG', role: 'Tổ trưởng bộ môn' },
      { name: 'Đỗ Vũ Bá', role: 'Tổ trưởng bộ môn' },
      { name: 'Nguyễn Thị Thanh Thảo', role: 'Tổ trưởng bộ môn' },
      { name: 'Nguyễn Ngọc Đức', role: 'Giảng viên' },
      { name: 'Lê Thị Hồng Hà', role: 'Giảng viên' },
      { name: 'Hồ Lê Thu Hương', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Kim Liên', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Hiền Lương', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Kim Ngân', role: 'Giảng viên' },
      { name: 'Tô Phúc Vĩnh Nghi', role: 'Giảng viên' },
      { name: 'Nguyễn Hữu Nghĩa', role: 'Giảng viên' },
      { name: 'Hồ Nguyễn Duy Nguyên', role: 'Giảng viên' },
      { name: 'Phong Chí Nhân', role: 'Giảng viên' },
      { name: 'Nguyễn Vĩnh Phước', role: 'Giảng viên' },
      { name: 'Trương Thị Hoài Phương', role: 'Giảng viên' },
      { name: 'Lương Trần Quỳnh', role: 'Giảng viên' },
      { name: 'Huỳnh Hồ Đa Thiện', role: 'Giảng viên' },
      { name: 'Huỳnh Thị Thiết', role: 'Giảng viên' },
      { name: 'Đỗ Thị Ngọc Thịnh', role: 'Giảng viên' },
      { name: 'Nguyễn Ngọc Thuận', role: 'Giảng viên' },
      { name: 'Phạm Thị Ngọc Thúy', role: 'Giảng viên' },
      { name: 'Phạm Thị Kim Thùy', role: 'Giảng viên' },
      { name: 'Huỳnh Công Toại', role: 'Giảng viên' },
      { name: 'Lê Thị Ngọc Trâm', role: 'Giảng viên' },
      { name: 'Trần Thị Thu Trang', role: 'Giảng viên' },
      { name: 'Nguyễn Xuân Trường', role: 'Giảng viên' },
      { name: 'Huỳnh Thị Quỳnh Tuyên', role: 'Giảng viên' },
      { name: 'Trần Ngọc Phương Uyên', role: 'Giảng viên' },
      { name: 'Hoàng Tú Uyên', role: 'Giảng viên' },
      { name: 'Nguyễn Thúy Diễm', role: 'Giảng viên' },
      { name: 'Đỗ Nguyễn Duy Thông', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Khoa Tài chính - Kế toán',
    members: [
      { name: 'Lê Phan Vĩnh Lộc', role: 'Trưởng khoa' },
      { name: 'Nguyễn Thu Huyền', role: 'Phó Trưởng khoa' },
      { name: 'Nguyễn Thị Kim Cương', role: 'Tổ trưởng bộ môn' },
      { name: 'Tạ Thị Dung', role: 'Tổ trưởng bộ môn' },
      { name: 'Trần Hồng Đạt', role: 'Tổ trưởng bộ môn' },
      { name: 'Trần Thị Thùy Anh', role: 'Giảng viên' },
      { name: 'Dương Ngọc Kiều Diễm', role: 'Giảng viên' },
      { name: 'Dương Diễm Kiều', role: 'Giảng viên' },
      { name: 'Trương Minh Nam', role: 'Giảng viên' },
      { name: 'Nguyễn Hồng Ngọc', role: 'Giảng viên' },
      { name: 'Phạm Thị Nhớ', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Chí Thảo', role: 'Giảng viên' },
      { name: 'Đặng Thị Hà Tiên', role: 'Giảng viên' },
      { name: 'Nguyễn Hồng Tuấn', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Thanh Hà', role: 'Giảng viên' },
      { name: 'Phạm Thị Ngọc Cẩm', role: 'Giảng viên' },
      { name: 'Phạm Thị Thùy Thanh', role: 'Giảng viên' },
      { name: 'Trần Phương Thảo', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Thanh Trang', role: 'Giảng viên' },
      { name: 'Đỗ Đậu Thị Thơ', role: 'Giảng viên' },
      { name: 'Hồ Thanh Thảo', role: 'Giảng viên' },
      { name: 'Lưu Thị Hồng Vân', role: 'Giảng viên' },
      { name: 'Võ Thị Đức Toàn', role: 'Giảng viên' },
      { name: 'Nguyễn Quốc Trung', role: 'Giảng viên' },
      { name: 'Dương Đoàn Bảo Trâm', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Khoa Khoa học Cơ bản',
    members: [
      { name: 'Đỗ Thị Lan Anh', role: 'Trưởng Khoa' },
      { name: 'Nguyễn Trần Luân', role: 'Phó Trưởng khoa' },
      { name: 'Nguyễn Duy Bình', role: 'Tổ trưởng bộ môn' },
      { name: 'Văn Khắc Vũ', role: 'Tổ trưởng bộ môn' },
      { name: 'Nguyễn Thúy An', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Bình', role: 'Giảng viên' },
      { name: 'Nguyễn Đình Bảo Châu', role: 'Giảng viên' },
      { name: 'Dương Văn Chí', role: 'Giảng viên' },
      { name: 'Nguyễn Phạm Việt Đăng', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Thanh Hương', role: 'Giảng viên' },
      { name: 'Nguyễn Lê An Khang', role: 'Giảng viên' },
      { name: 'Lương Thị Ngọt', role: 'Giảng viên' },
      { name: 'Đào Thị Hoàng Oanh', role: 'Giảng viên' },
      { name: 'Lê Nguyễn Quốc Phi', role: 'Giảng viên' },
      { name: 'Phan Thị Thu Thảo', role: 'Giảng viên' },
      { name: 'Đặng Thị Huyền Trang', role: 'Giảng viên' },
      { name: 'Trần Hoài Trung', role: 'Giảng viên' },
      { name: 'Triệu Vi Thuận', role: 'Giảng viên' },
      { name: 'Lường Thị Thúy', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Khoa Khoa học Xã hội - Khách sạn - Du lịch',
    members: [
      { name: 'Đinh Quốc Anh', role: 'Trưởng Khoa' },
      { name: 'Nguyễn Duy Thành', role: 'Tổ trưởng bộ môn' },
      { name: 'Trần Thị Hoàng Oanh', role: 'Giảng viên' },
      { name: 'Đào Văn Đạt', role: 'Giảng viên' },
      { name: 'Phan Thùy Linh', role: 'Giảng viên' },
      { name: 'Nguyễn Thanh Trúc', role: 'Giảng viên' },
      { name: 'Nguyễn Kim Ngọc', role: 'Giảng viên' },
      { name: 'Hoàng Tuấn Nhật', role: 'Giảng viên' },
      { name: 'Huỳnh Thị Thùy Dương', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Mai Phương', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Khoa Ngoại ngữ',
    members: [
      { name: 'Trần Thị Hồng Thi', role: 'Trưởng khoa' },
      { name: 'Vũ Hoàng Giang', role: 'Phó Trưởng khoa' },
      { name: 'Nguyễn Thị Bảo Ngọc', role: 'Tổ trưởng bộ môn' },
      { name: 'Trần Thị Oanh Đào', role: 'Giảng viên' },
      { name: 'Võ Hoàng Nhân', role: 'Giảng viên' },
      { name: 'Đỗ Ngọc Quỳnh', role: 'Giảng viên' },
      { name: 'Bùi Lý Thanh Tâm', role: 'Giảng viên' },
      { name: 'Nguyễn Đình Thao', role: 'Giảng viên' },
      { name: 'Bùi Thị Thanh Thảo', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Cẩm Tiên', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Bích Thảo', role: 'Giảng viên' },
      { name: 'Nguyễn Vân Thư', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Khoa Công nghệ Thông tin',
    members: [
      { name: 'Trương Tấn Lộc', role: 'Trưởng Khoa' },
      { name: 'Nguyễn Thị Phương Thùy', role: 'Tổ trưởng bộ môn' },
      { name: 'Trương Châu', role: 'Giảng viên' },
      { name: 'Nguyễn Văn Tú', role: 'Giảng viên' },
      { name: 'Kiều Tất Thắng', role: 'Giảng viên' },
      { name: 'Nguyễn Hải Triều', role: 'Giảng viên' },
      { name: 'Nguyễn Hoàng Sơn Vĩ', role: 'Giảng viên' },
      { name: 'Nguyễn Tường Nam', role: 'Giảng viên' },
      { name: 'Hồ Thị Thanh Nga', role: 'Giảng viên' },
      { name: 'Lê Xuân Mai', role: 'Giảng viên' },
      { name: 'Nguyễn Thị Kim Mến', role: 'Nhân viên' },
    ],
  },
  {
    dept: 'Phòng Công tác Học sinh - Sinh viên',
    members: [
      { name: 'Phạm Ngọc Hiệp', role: 'Trưởng phòng' },
      { name: 'Nguyễn Thụy Vương Khanh', role: 'Phó Trưởng phòng' },
      { name: 'Trần Tiến Mạnh', role: 'Chuyên viên' },
      { name: 'Nguyễn Thanh Sang', role: 'Chuyên viên' },
      { name: 'Nguyễn Thanh Lịch', role: 'Chuyên viên' },
      { name: 'Nguyễn Thị Minh Thơm', role: 'Chuyên viên' },
      { name: 'Nguyễn Phương Trúc', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Phòng Quản lý Đào tạo - Thư viện',
    members: [
      { name: 'Hồ Nguyễn Cúc Phương', role: 'Trưởng phòng' },
      { name: 'Lê Vũ Khắc Đạt', role: 'Phó Trưởng phòng' },
      { name: 'Trương Minh Thiện', role: 'Phó Trưởng phòng' },
      { name: 'Phạm Đình Tuấn Anh', role: 'Chuyên viên' },
      { name: 'Tô Minh Hải', role: 'Chuyên viên' },
      { name: 'Lê Thị Trang', role: 'Chuyên viên' },
      { name: 'Quan Đại Trí', role: 'Chuyên viên' },
      { name: 'Đinh Thanh Phong', role: 'Chuyên viên' },
      { name: 'Nguyễn Hoàng Lâm', role: 'Chuyên viên' },
      { name: 'Đặng Chí Luận', role: 'Chuyên viên' },
      { name: 'Trần Viết Thụy', role: 'Chuyên viên' },
      { name: 'Trần Lâm Phương Uyên', role: 'Chuyên viên' },
      { name: 'Phạm Thị Hằng', role: 'Chuyên viên' },
      { name: 'Cao Thị Nga', role: 'Chuyên viên' },
      { name: 'Phan Trương Hiếu', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Phòng Đảm bảo Chất lượng - Quản lý Khoa học',
    members: [
      { name: 'Trần Thị Vân Anh', role: 'Trưởng phòng' },
      { name: 'Lý Tiến', role: 'Phó Trưởng phòng' },
      { name: 'Trần Thị Thảo Hương', role: 'Phó Trưởng phòng' },
      { name: 'Trần Nguyễn Minh Nhựt', role: 'Chuyên viên' },
      { name: 'Phạm Thị Kim Sơn', role: 'Chuyên viên' },
      { name: 'Trần Bửu Thuận', role: 'Chuyên viên' },
      { name: 'Huỳnh Anh Tuấn', role: 'Chuyên viên' },
      { name: 'Bùi Văn Huy', role: 'Chuyên viên' },
      { name: 'Phạm Hồ Mai Thi', role: 'Chuyên viên' },
      { name: 'Nguyễn Phạm Khánh Thùy', role: 'Chuyên viên' },
      { name: 'Phạm Hồng Châu', role: 'Chuyên viên' },
      { name: 'Võ Ngọc Sơn', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Phòng Kế hoạch - Tài chính',
    members: [
      { name: 'Lâm Hàn Tuấn Kiệt', role: 'Trưởng phòng' },
      { name: 'Phạm Thanh Hà', role: 'Chuyên viên' },
      { name: 'Huỳnh Thị Thúy Hằng', role: 'Chuyên viên' },
      { name: 'Trương Thị Việt Hoàng', role: 'Chuyên viên' },
      { name: 'Đỗ Thùy Mai', role: 'Chuyên viên' },
      { name: 'Lê Thị Mỹ Nương', role: 'Chuyên viên' },
      { name: 'Lê Xuân Giang', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Phòng Tổ chức - Hành chính',
    members: [
      { name: 'Nguyễn Thanh Xuân', role: 'Trưởng Phòng' },
      { name: 'Trương Thành Tú', role: 'Phó Trưởng phòng' },
      { name: 'Nguyễn Thị Tường Vy', role: 'Phó Trưởng phòng' },
      { name: 'Nguyễn Thị Kim Hoàng', role: 'Chuyên viên' },
      { name: 'Nguyễn Nghĩa', role: 'Chuyên viên' },
      { name: 'Võ Thị Thanh Trong', role: 'Chuyên viên' },
      { name: 'Lê Phương Bình', role: 'Chuyên viên' },
      { name: 'Trần Thị Thúy Liễu', role: 'Chuyên viên' },
      { name: 'Nguyễn Thị Phương Thảo', role: 'Chuyên viên' },
      { name: 'Trương Thị Lệ Thủy', role: 'Chuyên viên' },
      { name: 'Lê Thị Ngọc Uyên', role: 'Chuyên viên' },
      { name: 'Nguyễn Cẩm Thụy', role: 'Chuyên viên' },
      { name: 'Trần Cao Ân', role: 'Chuyên viên' },
      { name: 'Vương Hoàng Ngọc', role: 'Chuyên viên' },
      { name: 'Phạm Thị Kim Yến', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Phòng Quản trị Cơ sở vật chất',
    members: [
      { name: 'Lê Thanh Đức', role: 'Trưởng phòng' },
      { name: 'Lê Thị Điệp', role: 'Phó Trưởng phòng' },
      { name: 'Mộng Triệu Lan', role: 'Phó Trưởng phòng' },
      { name: 'Nguyễn Việt Trường An', role: 'Chuyên viên' },
      { name: 'Bùi Thế Thanh Hòa', role: 'Chuyên viên' },
      { name: 'Nguyễn Văn Sang', role: 'Chuyên viên' },
      { name: 'Khưu Hoàng Giang Sơn', role: 'Chuyên viên' },
      { name: 'Phạm Nguyễn Trà My', role: 'Chuyên viên' },
      { name: 'Phạm Vũ Quốc Việt', role: 'Chuyên viên' },
      { name: 'Trần Hồng Hậu', role: 'Chuyên viên' },
    ],
  },
  {
    dept: 'Trung tâm Truyền thông - Tuyển sinh và Dịch vụ',
    members: [
      { name: 'Lê Quốc Trung', role: 'Giám đốc' },
      { name: 'Nguyễn Thanh Tâm', role: 'Phó Giám đốc' },
      { name: 'Danh Ni', role: 'Chuyên viên' },
      { name: 'Nguyễn Quang Trọng Anh', role: 'Chuyên viên' },
      { name: 'Nguyễn Thanh Thuyết', role: 'Chuyên viên' },
      { name: 'Lê Lưu Thanh Vân', role: 'Chuyên viên' },
      { name: 'Nguyễn Minh Đăng', role: 'Chuyên viên' },
      { name: 'Nguyễn Ngọc Minh Thư', role: 'Chuyên viên' },
    ],
  },
];

const ALL_STAFF: StaffEntry[] = [];
const HCE_FULL_NAMES: string[] = [];
for (const d of RAW_DEPARTMENTS) {
  for (const m of d.members) {
    HCE_FULL_NAMES.push(m.name);
    ALL_STAFF.push({
      fullName: m.name === 'NGUYỄN THỊ TRÚC PHƯƠNG' ? 'NGUYỄN THỊ TRÚC PHƯƠNG' : m.name,
      role: m.role,
      dept: d.dept,
      email: computeHceEmail(m.name),
    });
  }
}

const NON_NAME_FOLLOW_WORDS = new Set([
  'cô', 'thầy', 'giáo', 'trò', 'mình', 'bạn', 'em', 'ấy', 'đó', 'này', 'kia', 'nào', 'gì', 'ai', 'đâu', 'sao', 'thế', 'vậy',
  'ơi', 'ạ', 'nhé', 'nha', 'nè', 'hả', 'không', 'chưa', 'đã', 'đang', 'sẽ', 'có', 'là', 'và', 'hay', 'hoặc', 'nhưng', 'mà',
  'thì', 'vì', 'do', 'bởi', 'tại', 'ở', 'trong', 'ngoài', 'trên', 'dưới', 'của', 'cho', 'với', 'về', 'để', 'từ', 'đến', 'khi',
  'nếu', 'như', 'theo', 'dạy', 'giảng', 'hướng', 'dẫn', 'chấm', 'coi', 'gác', 'ra', 'yêu', 'cầu', 'quy', 'định', 'thông', 'báo',
  'gửi', 'nhận', 'xét', 'đánh', 'giá', 'hỗ', 'trợ', 'giúp', 'tư', 'vấn', 'phụ', 'trách', 'đứng', 'lớp', 'bộ', 'môn', 'khoa',
  'trường', 'thỉnh', 'cơ', 'hữu', 'chủ', 'nhiệm', 'cố', 'nàng', 'đều', 'rất', 'luôn', 'vừa', 'mới', 'cũng', 'vẫn', 'chỉ', 'cần',
  'phải', 'được', 'bị', 'hãy', 'đừng', 'chớ', 'các', 'những', 'mọi', 'mỗi', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'
]);

function isWordCapitalized(word: string): boolean {
  if (!word) return true;
  const firstChar = word.charAt(0);
  return firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
}

export function hasUncapitalizedProperName(rawText: string): boolean {
  const text = String(rawText || '').trim();
  if (!text) return false;

  const checkNames = [...HCE_FULL_NAMES, 'Kim Đính', 'Kim Định'];
  for (const fullName of checkNames) {
    const escaped = fullName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?:^|[^\\p{L}])(' + escaped + ')(?=$|[^\\p{L}])', 'iu');
    const match = text.match(regex);
    if (match && match[1]) {
      const matchedWords = match[1].trim().split(/\s+/);
      if (matchedWords.some((w) => !isWordCapitalized(w))) {
        return true;
      }
    }
  }

  const honorificRegex = /(?:^|[^\p{L}])(?:thầy|cô|giảng\s+viên|gv)\s+([\p{L}]+)(?:\s+([\p{L}]+))?(?:\s+([\p{L}]+))?/giu;
  let m: RegExpExecArray | null;
  while ((m = honorificRegex.exec(text)) !== null) {
    const w1 = m[1];
    if (!w1) continue;
    const w1Lower = w1.toLowerCase();
    if (!NON_NAME_FOLLOW_WORDS.has(w1Lower)) {
      if (!isWordCapitalized(w1)) return true;
      for (const fullName of HCE_FULL_NAMES) {
        const w2 = m[2];
        const w3 = m[3];
        if (w2 && !NON_NAME_FOLLOW_WORDS.has(w2.toLowerCase())) {
          const pair = w1Lower + ' ' + w2.toLowerCase();
          if (fullName.toLowerCase().includes(pair) && !isWordCapitalized(w2)) return true;
        }
        if (w2 && w3 && !NON_NAME_FOLLOW_WORDS.has(w3.toLowerCase())) {
          const triple = w1Lower + ' ' + w2.toLowerCase() + ' ' + w3.toLowerCase();
          if (fullName.toLowerCase().includes(triple) && (!isWordCapitalized(w2) || !isWordCapitalized(w3))) return true;
        }
      }
    }
  }

  const givenNamesSet = new Set(HCE_FULL_NAMES.map((n) => (n.split(/\s+/).pop() || '').toLowerCase()));
  const emailNameRegex = /(?:^|[^\p{L}])(?:email|mail)\s+(?:của\s+)?([\p{L}]+)(?=$|[^\p{L}])/giu;
  let em: RegExpExecArray | null;
  while ((em = emailNameRegex.exec(text)) !== null) {
    const candidate = em[1];
    if (candidate && givenNamesSet.has(candidate.toLowerCase()) && !NON_NAME_FOLLOW_WORDS.has(candidate.toLowerCase())) {
      if (!isWordCapitalized(candidate)) return true;
    }
  }
  return false;
}

export function hasProfanity(rawText: string): boolean {
  const lower = String(rawText || '').toLowerCase().normalize('NFC');
  const accented = ['địt', 'đụ', 'đù', 'đéo', 'đ[ịi]t\\s*m[ẹe]', 'đm', 'đmm', 'đcm', 'đkm', 'đĩ', 'lồn', 'cặc', 'buồi', 'cứt', 'đồ\\s*chó', 'thằng\\s*chó', 'con\\s*chó', 'óc\\s*chó', 'mẹ\\s*mày', 'đồ\\s*ngu', 'thằng\\s*ngu', 'con\\s*ngu', 'ngu\\s*như', 'khốn\\s*nạn', 'súc\\s*vật', 'đồ\\s*điên', 'mất\\s*dạy', 'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'dick', 'pussy', 'cunt'];
  const ascii = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const plain = ['dit me', 'dit con me', 'du ma', 'du me', 'dcm', 'dmm', 'dkm', 'dcmm', 'vcl', 'vkl', 'vlol', 'clm', 'cmm', 'cl\\s*m', 'loz', 'lol\\s*me', 'dm', 'dit', 'dm\\s*may', 'f[u\\*]ck', 'sh[i\\*]t'];
  const tryList = (list: string[], str: string) => list.some((w) => new RegExp('(?:^|[^\\p{L}\\p{N}])' + w + '(?=$|[^\\p{L}\\p{N}])', 'iu').test(str));
  if (tryList(accented, lower)) return true;
  const squeezed = ascii.replace(/([a-z])\1{2,}/g, '$1');
  return tryList(plain, squeezed);
}

// ============================================================================
// 2. BẢNG 33 MÔN HỌC & HÌNH THỨC THI CHUẨN HCE (THỜI GIAN 60 PHÚT)
// ============================================================================
const EXAM_SUBJECTS_33: Array<{ stt: number; name: string; format: string; openBook: boolean; note?: string }> = [
  { stt: 1, name: 'Quản trị hành chính văn phòng', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 2, name: 'Thanh toán quốc tế', format: 'Trắc nghiệm', openBook: true },
  { stt: 3, name: 'Đạo đức kinh doanh và văn hóa doanh nghiệp', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 4, name: 'Quản trị học', format: 'Trắc nghiệm', openBook: true },
  { stt: 5, name: 'Marketing căn bản', format: 'Trắc nghiệm', openBook: true },
  { stt: 6, name: 'Hành vi khách hàng', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 7, name: 'Quản trị nguồn nhân lực', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 8, name: 'Quản trị chất lượng', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 9, name: 'Quản trị marketing', format: 'Trắc nghiệm', openBook: true },
  { stt: 10, name: 'Quản trị tài chính', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 11, name: 'Quản trị sản xuất', format: 'Tự luận', openBook: false, note: '🚫 KHÔNG ĐƯỢC SỬ DỤNG TÀI LIỆU' },
  { stt: 12, name: 'Kỹ năng quản trị', format: 'Tự luận', openBook: true },
  { stt: 13, name: 'Quản trị sự thay đổi', format: 'Tự luận', openBook: true },
  { stt: 14, name: 'Quản trị rủi ro', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 15, name: 'Quản trị thương hiệu', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 16, name: 'Logistics và chuỗi cung ứng căn bản', format: 'Trắc nghiệm', openBook: false, note: '🚫 KHÔNG ĐƯỢC SỬ DỤNG TÀI LIỆU' },
  { stt: 17, name: 'An toàn, sức khỏe và môi trường', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 18, name: 'Rủi ro và bảo hiểm', format: 'Trắc nghiệm', openBook: true },
  { stt: 19, name: 'Nghiệp vụ kho hàng', format: 'Trắc nghiệm', openBook: false, note: '🚫 KHÔNG ĐƯỢC SỬ DỤNG TÀI LIỆU' },
  { stt: 20, name: 'Tính toán cơ bản trong logistics', format: 'Trắc nghiệm', openBook: true },
  { stt: 21, name: 'Quản trị kinh doanh quốc tế', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 22, name: 'Quan hệ kinh tế quốc tế', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 23, name: 'Kinh doanh quốc tế', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 24, name: 'Nghiệp vụ ngoại thương', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 25, name: 'Kỹ năng quản lý nhân sự', format: 'Trắc nghiệm', openBook: true },
  { stt: 26, name: 'Nghiệp vụ bán hàng', format: 'Trắc nghiệm', openBook: true },
  { stt: 27, name: 'Truyền thông marketing tích hợp', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 28, name: 'Marketing dịch vụ', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 29, name: 'Marketing quốc tế', format: 'Trắc nghiệm - Tự luận', openBook: true },
  { stt: 30, name: 'Phương pháp nghiên cứu kinh doanh', format: 'Tiểu luận', openBook: true, note: '📝 Hình thức Tiểu luận' },
  { stt: 31, name: 'Khởi sự kinh doanh_01', format: 'Tiểu luận', openBook: true, note: '📝 Hình thức Tiểu luận' },
  { stt: 32, name: 'Quản trị sự kiện_01', format: 'Tiểu luận', openBook: true, note: '📝 Hình thức Tiểu luận' },
  { stt: 33, name: 'Định hướng nghề nghiệp', format: 'Tiểu luận', openBook: true, note: '📝 Hình thức Tiểu luận' },
];

const INVALID_NAME_WORDS = new Set([
  'chào', 'chao', 'hi', 'hello', 'alo', 'hey', 'toro', 'susi', 'thầy', 'cô', 'hce', 'admin', 'bạn', 'người', 'dùng', 'bot', 'ai', 'mình', 'em', 'tôi', 'tớ'
]);

export function extractUserName(history: ToroChatHistoryItem[], latestText: string): string | null {
  const allTexts = [...history.map((h) => (h.role === 'user' ? h.parts.map((p) => p.text).join(' ') : '')), latestText];
  const namePatterns = [
    /(?:tôi|mình|em|tớ|con)\s+tên\s+(?:là\s+)?([a-zà-ỹ]+(?:\s+[a-zà-ỹ]+){0,3})(?:[.,!?;:]|\s|$)/iu,
    /(?:gọi|xưng)\s+(?:tôi|mình|em|tớ)\s+là\s+([a-zà-ỹ]+(?:\s+[a-zà-ỹ]+){0,3})(?:[.,!?;:]|\s|$)/iu,
    /(?:tên\s+(?:của\s+)?(?:tôi|mình|em|tớ)\s+là\s+)([a-zà-ỹ]+(?:\s+[a-zà-ỹ]+){0,3})(?:[.,!?;:]|\s|$)/iu,
    /(?:tôi|mình|em|tớ)\s+là\s+([a-zà-ỹ]+(?:\s+[a-zà-ỹ]+){0,2})(?:[.,!?;:]|\s|$)/iu,
  ];

  const reversed = [...allTexts].reverse();
  for (const text of reversed) {
    if (!text) continue;
    for (const pat of namePatterns) {
      const m = text.match(pat);
      if (m && m[1]) {
        const candidate = m[1].trim().replace(/[.,!?;:]/g, '');
        const words = candidate.split(/\s+/).filter(Boolean);
        // Tránh nhặt nhầm từ sau "mình là sinh viên", "em là học sinh"
        const nonNames = new Set(['sinh', 'viên', 'học', 'lớp', 'khóa', 'người', 'thành', 'đồng', 'đội']);
        if (words.length >= 1 && words.length <= 4) {
          const hasInvalid = words.some((w) => INVALID_NAME_WORDS.has(w.toLowerCase()) || nonNames.has(w.toLowerCase()));
          if (!hasInvalid) {
            return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
          }
        }
      }
    }
  }

  // Trường hợp ở lượt thứ 2 sau khi Toro vừa hỏi tên, user chỉ gõ ngắn gọn tên của họ (1-3 từ, ví dụ: "Minh Tuấn", "Lan Anh", "Quân")
  if (history.length >= 2) {
    const lastBot = [...history].reverse().find((h) => h.role === 'model');
    if (lastBot && /biết tên|xưng hô/i.test(lastBot.parts.map((p) => p.text).join(' '))) {
      const cleanLatest = latestText.trim().replace(/[.,!?;:]/g, '');
      const words = cleanLatest.split(/\s+/).filter(Boolean);
      if (words.length >= 1 && words.length <= 3 && !/[?/]/.test(latestText)) {
        const hasKeyword = /(?:đề cương|quy chế|lịch|thi|điểm|môn|thầy|cô|email|bảo lưu|học bổng|tin tức|công thức|spss)/i.test(cleanLatest);
        if (!hasKeyword && !words.some((w) => INVALID_NAME_WORDS.has(w.toLowerCase()))) {
          return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }
      }
    }
  }

  return null;
}

function generateToroCompliment(userName: string): string {
  const compliments = [
    `Toro nghe Thầy Đính khen **${userName}** học giỏi, thông minh, dễ thương, rạng rỡ, chăm chỉ, ngoan ngoãn, lễ phép, tốt bụng và có tương lai sáng lạn lắm nè! Đúng chuẩn chiến thần gánh team HCE luôn á! 🌟✨`,
    `Toro nghe Thầy Đính khen **${userName}** học cực kỳ thông minh, chăm chỉ, ngoan ngoãn, lễ phép, tốt bụng, có tương lai sáng và tinh thần học tập siêu đỉnh! Đi chung lane với đồng đội uy tín thế này là auto giữ trụ ẵm điểm A! 🛡️⚡`,
    `Toro nghe Thầy Đính khen **${userName}** vừa thông minh, chăm chỉ, ngoan ngoãn, lễ phép lại cực kỳ tốt bụng và có tương lai tươi sáng phía trước! Có tướng quân tinh anh thế này thì mọi deadline đều bị out trình cái một! 🏆💪`,
  ];
  const idx = Math.abs(userName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % compliments.length;
  return compliments[idx];
}

// ============================================================================
// 3. TRÍCH XUẤT ĐỀ TÀI & TÊN CÔNG TY ĐỂ LẬP ĐỀ CƯƠNG 3 CHƯƠNG ĐỘNG
// ============================================================================
function parseTopicAndCompany(allUserText: string): { topic: string | null; company: string | null; actionVerb: string } {
  let company: string | null = null;
  let topic: string | null = null;
  let actionVerb = 'hoàn thiện';

  if (/nâng cao/i.test(allUserText)) actionVerb = 'nâng cao';
  else if (/phát triển/i.test(allUserText)) actionVerb = 'phát triển';
  else if (/đẩy mạnh/i.test(allUserText)) actionVerb = 'đẩy mạnh';
  else if (/tăng cường/i.test(allUserText)) actionVerb = 'tăng cường';

  // Tìm tên công ty / doanh nghiệp / đơn vị
  const compPatterns = [
    /((?:công\s+ty|doanh\s+nghiệp|tập\s+đoàn|ngân\s+hàng|chi\s+nhánh|cửa\s+hàng|siêu\s+thị|nhà\s+máy|khách\s+sạn|trung\s+tâm)\s+[^.,;\n?!(|]+?)(?=\s+(?:về|mảng|lĩnh\s+vực|từ\s+năm|giai\s+đoạn|ạ|nhé|nha|với|và\s+muốn)|[.,;\n?!(|]|$)/iu,
    /tại\s+((?:công\s+ty|doanh\s+nghiệp|tập\s+đoàn|ngân\s+hàng|đơn\s+vị)\s+[^.,;\n?!(|]+?)(?=\s+(?:về|mảng|lĩnh\s+vực|từ\s+năm|giai\s+đoạn|ạ|nhé|nha)|[.,;\n?!(|]|$)/iu,
  ];
  for (const cp of compPatterns) {
    const m = allUserText.match(cp);
    if (m && m[1]) {
      const cand = m[1].trim();
      if (!/nào|gì|của bạn|thực tập$/i.test(cand) && cand.length >= 6 && cand.length <= 90) {
        company = cand
          .split(/\s+/)
          .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
          .join(' ');
        break;
      }
    }
  }

  // Tìm vấn đề nghiên cứu / đề tài chuyên ngành
  const knownTopics: Array<{ regex: RegExp; label: string; sub1: string; sub2: string; sub3: string }> = [
    {
      regex: /quản trị bán hàng|hoạt động bán hàng|công tác bán hàng|kỹ năng bán hàng|bán hàng/i,
      label: 'hoạt động bán hàng',
      sub1: 'Công tác lập kế hoạch và dự báo doanh số bán hàng',
      sub2: 'Công tác tổ chức mạng lưới, kênh phân phối và đội ngũ bán hàng',
      sub3: 'Công tác triển khai quy trình bán hàng, chăm sóc khách hàng và kiểm soát kết quả',
    },
    {
      regex: /marketing|chiến lược marketing|marketing mix|4p|truyền thông marketing|imc|digital marketing/i,
      label: 'hoạt động marketing',
      sub1: 'Phân tích thị trường mục tiêu và định vị thương hiệu (STP)',
      sub2: 'Triển khai các chính sách Marketing Mix (Sản phẩm, Giá, Phân phối, Chiêu thị)',
      sub3: 'Công tác truyền thông tiếp thị, quảng bá và đánh giá hiệu quả chiến dịch',
    },
    {
      regex: /nhân sự|nguồn nhân lực|tuyển dụng|đào tạo nhân lực|đãi ngộ|tạo động lực/i,
      label: 'công tác quản trị nguồn nhân lực',
      sub1: 'Công tác hoạch định, tuyển dụng và bố trí nhân sự',
      sub2: 'Công tác đào tạo, bồi dưỡng và đánh giá thành tích nhân viên',
      sub3: 'Chính sách tiền lương, đãi ngộ và tạo động lực làm việc',
    },
    {
      regex: /sản xuất|quản trị sản xuất|vận hành|điều độ sản xuất|bố trí mặt bằng/i,
      label: 'hoạt động quản trị sản xuất và vận hành',
      sub1: 'Công tác dự báo nhu cầu và hoạch định năng lực sản xuất',
      sub2: 'Công tác tổ chức dây chuyền, điều độ sản xuất và quản lý tồn kho',
      sub3: 'Công tác kiểm soát chất lượng sản phẩm, chi phí và an toàn lao động',
    },
    {
      regex: /chăm sóc khách hàng|dịch vụ khách hàng|hài lòng khách hàng/i,
      label: 'công tác chăm sóc khách hàng',
      sub1: 'Quy trình tiếp nhận, tư vấn và hỗ trợ khách hàng trước - trong - sau bán',
      sub2: 'Công tác giải quyết khiếu nại và duy trì mối quan hệ khách hàng thân thiết',
      sub3: 'Công tác đo lường mức độ hài lòng và nâng cao chất lượng dịch vụ khách hàng',
    },
    {
      regex: /kho hàng|tồn kho|quản trị hàng tồn kho|logistics|chuỗi cung ứng|giao nhận|vận tải/i,
      label: 'hoạt động nghiệp vụ kho hàng và logistics',
      sub1: 'Quy trình tiếp nhận, kiểm tra, phân loại và lưu trữ hàng hóa trong kho',
      sub2: 'Công tác quản lý định mức tồn kho, xuất nhập kho và bảo quản hàng hóa',
      sub3: 'Ứng dụng công nghệ thông tin và phối hợp vận chuyển trong chuỗi cung ứng',
    },
    {
      regex: /thương hiệu|nhận diện thương hiệu|phát triển thương hiệu/i,
      label: 'hoạt động xây dựng và phát triển thương hiệu',
      sub1: 'Xây dựng hệ thống nhận diện và định vị giá trị thương hiệu',
      sub2: 'Các chương trình truyền thông quảng bá và trải nghiệm thương hiệu',
      sub3: 'Đo lường mức độ nhận biết, lòng trung thành và bảo vệ tài sản thương hiệu',
    },
    {
      regex: /chất lượng|quản trị chất lượng|iso|5s|kaizen/i,
      label: 'công tác quản trị chất lượng',
      sub1: 'Hệ thống tiêu chuẩn chất lượng và quy trình kiểm soát chất lượng đầu vào - đầu ra',
      sub2: 'Áp dụng các công cụ cải tiến chất lượng (5S, Kaizen, ISO) tại đơn vị',
      sub3: 'Công tác phòng ngừa sai lỗi, đánh giá nội bộ và cải tiến liên tục',
    },
  ];

  for (const kt of knownTopics) {
    if (kt.regex.test(allUserText)) {
      topic = kt.label;
      break;
    }
  }

  return { topic, company, actionVerb };
}

// ============================================================================
// 4. TRA CỨU KHO DỮ LIỆU WEBSITE (56 SITE PAGES, 28 SYLLABUS CODES, NEWS)
// ============================================================================
function searchSiteKnowledgeBase(query: string): {
  matchedPages: Array<{ route_path: string; title: string; snippet: string }>;
  matchedCodes: Array<{ code: string; title: string; category: string }>;
} {
  const lower = query.toLowerCase().trim();
  const matchedPages: Array<{ route_path: string; title: string; snippet: string; score: number }> = [];
  const matchedCodes: Array<{ code: string; title: string; category: string }> = [];

  try {
    const allCodes = db.prepare('SELECT * FROM syllabus_codes').all() as Array<{ code: string; title: string; category: string }>;
    for (const c of allCodes) {
      if (lower.includes(c.code.toLowerCase())) {
        matchedCodes.push({ code: c.code, title: c.title, category: c.category });
      }
    }
  } catch {}

  try {
    const pages = db.prepare('SELECT * FROM site_pages').all() as Array<{
      route_path: string;
      title: string;
      category: string;
      html_content: string;
      requires_gate: string | null;
    }>;

    const keywords = lower
      .replace(/[.,?!;:"'()[\]]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 3 && !['cho', 'của', 'với', 'trong', 'những', 'các', 'như', 'thế', 'nào', 'tại', 'trường', 'mình', 'bạn', 'toro', 'susi'].includes(w));

    for (const p of pages) {
      if (p.requires_gate) continue; // Không trích xuất nội dung khóa mật khẩu
      const titleLower = (p.title || '').toLowerCase();
      const plainText = (p.html_content || '')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const plainLower = plainText.toLowerCase();

      let score = 0;
      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 3;
        if (plainLower.includes(kw)) score += 1;
      }

      if (score >= 4) {
        const snippet = plainText.slice(0, 320) + (plainText.length > 320 ? '...' : '');
        matchedPages.push({ route_path: p.route_path, title: p.title, snippet, score });
      }
    }
  } catch {}

  matchedPages.sort((a, b) => b.score - a.score);
  return {
    matchedPages: matchedPages.slice(0, 4).map(({ route_path, title, snippet }) => ({ route_path, title, snippet })),
    matchedCodes: matchedCodes.slice(0, 5),
  };
}

// ============================================================================
// 5. HÀM CHÍNH XỬ LÝ TRI THỨC HCE & WEBSITE NGUYỄN THỊ TRÚC PHƯƠNG
// ============================================================================
/**
 * Trích xuất Mã số sinh viên (MSSV) gồm 8 chữ số bất kỳ từ câu hỏi hiện tại hoặc lịch sử trò chuyện.
 */
export function extractStudentId(history: ToroChatHistoryItem[], text: string): string | null {
  const matchCurrent = text.match(/\b\d{8}\b/);
  if (matchCurrent) return matchCurrent[0];

  for (let i = history.length - 1; i >= 0; i--) {
    const item = history[i];
    if (item.role === 'user') {
      const partsText = item.parts?.map((p) => p.text).join(' ') || '';
      const match = partsText.match(/\b\d{8}\b/);
      if (match) return match[0];
    }
  }
  return null;
}

export function generateKnowledgeResponse(
  promptText: string,
  history: ToroChatHistoryItem[],
  character: 'TORO' | 'SUSI' = 'TORO',
  teachingSchedule: TeachingScheduleItem[] = [],
  educationNews: EducationNewsSimpleItem[] = [],
  hceNews: HceNewsSimpleItem[] = []
): string {
  const text = promptText.trim();
  const lower = text.toLowerCase();
  const isToro = character === 'TORO';

  // KIỂM TRA TỪ NGỮ THÔ TỤC (PHẦN 0)
  if (hasProfanity(text)) {
    if (!isToro) {
      return `🎀 **Bạn ơi, mình giữ lời nói văn minh nha!** 🌷\n\nSusi không thể trả lời những tin nhắn có từ ngữ thô tục. Bạn nhắn lại bằng ngôn từ lịch sự, Susi hỗ trợ ngay nhé! ✨🌸\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
    }
    return `👦 **Khoan đã Đồng đội ơi!** ✋\n\nToro không trả lời những tin nhắn có **từ ngữ thô tục**. Môi trường học đường phải văn minh, lịch sự nha! Đồng đội nhắn lại câu hỏi bằng lời lẽ chuẩn chỉ là Toro gánh liền! 🤝✨\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
  }

  // KIỂM TRA VIẾT HOA TÊN RIÊNG GIẢNG VIÊN / CÁN BỘ (QUY TẮC TÔN TRỌNG & VĂN HÓA ỨNG XỬ)
  if (hasUncapitalizedProperName(text)) {
    if (isToro) {
      return `👦 **Tướng quân ơi, khoan đã nào!** ✋\n\nTrước khi Toro lấy thông tin từ website để trả lời, đồng đội vui lòng **viết hoa đúng tên riêng** (viết hoa chữ cái đầu mỗi chữ trong tên riêng của Thầy/Cô) rồi nhắn lại giúp Toro nhé!\n\n💡 Việc **viết hoa tên riêng** chính là thể hiện **sự tôn trọng** đối với Thầy/Cô và là **văn hóa ứng xử**, giao tiếp lịch sự của sinh viên chúng mình đó nha! Đồng đội nhắn lại tên viết hoa chuẩn chỉ là Toro hỗ trợ ngay lập tức nè! 🤝✨\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
    }
    return `🎀 **Bạn ơi, chờ Susi một xíu nhé!** ✋🌷\n\nTrước khi Susi lấy thông tin từ website để gửi cho bạn, bạn vui lòng **viết hoa đúng tên riêng** (viết hoa chữ cái đầu mỗi chữ trong tên riêng của Thầy/Cô) rồi nhắn lại giúp Susi nha!\n\n💡 Việc **viết hoa tên riêng** thể hiện **sự tôn trọng** đối với Thầy/Cô và là **văn hóa ứng xử** đẹp, văn minh trong môi trường học đường đó nè. Bạn nhắn lại tên viết hoa đúng chuẩn để Susi hỗ trợ ngay nhé! ✨🌸\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
  }

  const userName = extractUserName(history, text);

  // BƯỚC 1: Nếu là TORO và chưa biết tên người dùng trong cuộc trò chuyện đầu tiên
  const userMsgCount = history.filter((h) => h.role === 'user').length;
  if (isToro && !userName && userMsgCount <= 1) {
    return `👦 **Chào Đồng đội nhé!** ⚔️\n\nToro là Cố vấn học tập HCE của bạn đây! Trước khi chúng mình cùng nhau lên đồ giải đáp thắc mắc và gánh team học kỳ này, **bạn cho Toro biết tên để tiện xưng hô nhé?** Gửi tên cho Toro là Toro trả lời ngay câu hỏi của bạn liền nè! ✨🤝\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
  }

  // Nếu ở lượt 2 người dùng chỉ mới gửi tên (ví dụ "Mình tên là Minh"), lấy câu hỏi gốc ở lượt 1 để trả lời luôn (Đúng quy tắc Bước 1 -> Bước 2 -> Bước 3)
  let effectiveQuery = text;
  const firstUserMsg = history.find((h) => h.role === 'user')?.parts?.[0]?.text || '';
  const isJustGivingName =
    userName &&
    text.replace(/(?:tôi|mình|em|tớ|con|tên|là|gọi|nhé|nha|ạ|[.,!?;:])/gi, '').trim().toLowerCase() === userName.toLowerCase();
  if (isJustGivingName && firstUserMsg && firstUserMsg !== text && !/^(?:chào|hi|hello|alo|hey)\b/i.test(firstUserMsg.trim())) {
    effectiveQuery = firstUserMsg;
  }
  const effLower = effectiveQuery.toLowerCase();
  const fullConversationUserText = history
    .filter((h) => h.role === 'user')
    .map((h) => h.parts.map((p) => p.text).join(' '))
    .concat([text])
    .join(' | ');

  // Tiền tố lời chào & khen ngợi (BƯỚC 2 & BƯỚC 3)
  let prefix = '';
  if (isToro) {
    if (userName) {
      if (userMsgCount <= 3) {
        prefix = `👦 **Chào Tướng quân ${userName}!** 🛡️\n\n${generateToroCompliment(userName)}\n\nBây giờ Toro gửi ngay thông tin chuẩn chỉ cho **${userName}** đây:\n\n`;
      } else {
        prefix = `👦 **Tướng quân ${userName} quá đỉnh luôn!** Toro hỗ trợ ngay cho đồng đội đây nè:\n\n`;
      }
    } else {
      prefix = `👦 **Chào Đồng đội!** Toro nghe Thầy Đính khen đồng đội chăm chỉ, thông minh, ngoan ngoãn, lễ phép và có tương lai sáng lắm nè! Cùng Toro điểm qua thông tin chi tiết nhé:\n\n`;
    }
  } else {
    prefix = userName
      ? `🎀 **Chào bạn ${userName} dễ thương!** 🌷🧸 Susi rất vui được đồng hành cùng **${userName}** trên hòn đảo học tập HCE. Susi gửi bạn thông tin chi tiết nè:\n\n`
      : `🎀 **Susi chào bạn nhé!** 🌷✨ Susi gửi bạn thông tin chi tiết từ hệ thống học tập HCE nè:\n\n`;
  }

  const suffix = `\n\nVì tôi là một AI nên có thể mắc sai sót khi trả lời.`;
  const currentYear = new Date().getFullYear();
  const nMinus3 = currentYear - 3;
  const nPlus3 = currentYear + 3;

  // ==========================================================================
  // INTENT 0: TIN TỨC GIÁO DỤC 24/7 (6 ĐẦU BÁO CHÍNH THỐNG) & TIN TỨC HỌC VỤ HCE
  // ==========================================================================
  if (/(?:tin tức giáo dục|điểm tin giáo dục|tin mới nhất hôm nay|thời sự giáo dục|báo chí|vnexpress|tuổi trẻ|thanh niên|dân trí|vietnamnet|giáo dục và thời đại)/i.test(effLower)) {
    let newsListStr = '';
    if (educationNews && educationNews.length > 0) {
      newsListStr = educationNews.slice(0, 5).map((item, idx) => {
        return `${idx + 1}. 📰 **[${item.sourceName || 'Báo GD'}]** [${item.title}](${item.link})${item.timeAgo ? ` *(${item.timeAgo})*` : ''}${item.description ? `\n   > ${item.description}` : ''}`;
      }).join('\n\n');
    } else {
      newsListStr = `1. 📰 **[VnExpress]** [Bộ GD&ĐT công bố phương án thi tốt nghiệp THPT và tuyển sinh đại học mới nhất](https://vnexpress.net/giao-duc)\n2. 📰 **[Tuổi Trẻ]** [Hướng dẫn học sinh và sinh viên tiếp cận chính sách tín dụng đào tạo nghề nghiệp](https://tuoitre.vn/giao-duc.htm)\n3. 📰 **[Thanh Niên]** [Nâng cao chất lượng đào tạo cao đẳng, đại học gắn liền với nhu cầu tuyển dụng doanh nghiệp](https://thanhnien.vn/giao-duc.html)\n4. 📰 **[Dân Trí]** [Chuyển đổi số trong giáo dục đại học và ứng dụng công nghệ trí tuệ nhân tạo AI](https://dantri.com.vn/giao-duc.htm)\n5. 📰 **[Giáo dục & Thời đại]** [Đổi mới phương pháp dạy học thực hành và chuẩn đầu ra kỹ năng cho sinh viên](https://giaoducthoidai.vn/giao-duc/)`;
    }

    return prefix + `### 📰 ĐIỂM TIN GIÁO DỤC NỔI BẬT 24/7 (ĐỒNG BỘ TỪ 6 ĐẦU BÁO CHÍNH THỐNG)
Hệ thống đã cập nhật các tin tức giáo dục, tuyển sinh và chính sách đào tạo mới nhất từ chuyên mục **TIN TỨC GIÁO DỤC** trên website:

${newsListStr}

💡 *Bạn có thể xem đầy đủ toàn bộ tin tức nóng hổi, lọc theo từng báo tại chuyên mục **TIN TỨC GIÁO DỤC** ngay trên trang chủ https://nguyenthitrucphuong.pages.dev/ nhé!*` + suffix;
  }

  // TIN TỨC HỌC VỤ CỔNG SINH VIÊN HCE (nhận bằng, khôi phục mật khẩu OneUni, thông báo học vụ...)
  if (/(?:nhận bằng|lễ tốt nghiệp|khôi phục mật khẩu|quên mật khẩu|oneuni|thông báo học vụ|tin tức hce)/i.test(effLower)) {
    const hceList = (hceNews && hceNews.length > 0 ? hceNews.slice(0, 6) : [
      { title: 'Thông báo nhận bằng tốt nghiệp trình độ Cao đẳng, Trung cấp chuyên nghiệp', category: 'HƯỚNG DẪN HỌC VỤ', date: '04 Tháng 07', url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/thong-bao-nhan-bang-tot-nghiep-trinh-do-cao-dang-trung-cap-chuyen-nghiep.html?pIDDanhMuc=9' },
      { title: 'Thông báo hướng dẫn khôi phục mật khẩu tài khoản trang sinh viên, email trường & cài đặt app OneUni', category: 'HƯỚNG DẪN HỌC VỤ', date: '30 Tháng 06', url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/thong-bao-huong-dan-khoi-phuc-mat-khau-tai-khoan-trang-sinh-tai-khoan-email-do-nha-truong-cung-cap-khac-phuc-tinh-trang-khong-truy-cap-duoc-vao-trang.html?pIDDanhMuc=9' },
      { title: 'Quy trình giải quyết học vụ sinh viên (QT04, QT06, QT07, QT08, QT09)', category: 'HƯỚNG DẪN HỌC VỤ', date: '09 Tháng 06', url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/quy-trinh-phong-dao-tao-phoi-voi-khoa-giai-quyet-hoc-vu-sinh-vien.html?pIDDanhMuc=9' },
    ]).map((n, i) => `${i + 1}. 📌 **[${n.category || 'HỌC VỤ'}]** [${n.title}](${n.url || 'https://sv.kthcm.edu.vn/'}) *(${n.date || 'Mới nhất'})*`).join('\n');

    return prefix + `### 🏛️ CẬP NHẬT THÔNG BÁO TỪ CỔNG THÔNG TIN SINH VIÊN HCE
Dưới đây là các thông báo và hướng dẫn học vụ chính thức trên Cổng thông tin sinh viên Trường Cao đẳng Kinh tế TP.HCM (https://sv.kthcm.edu.vn/sinh-vien-dang-nhap.html):

${hceList}

🔑 **Lưu ý về tài khoản sinh viên & OneUni:**
- Cổng đăng nhập: https://sv.kthcm.edu.vn/sinh-vien-dang-nhap.html (Tên đăng nhập là **Mã số sinh viên MSSV**).
- Nếu quên mật khẩu cổng sinh viên hoặc email \`@kthcm.edu.vn\`, bạn xem hướng dẫn khôi phục mật khẩu ở mục tin số 2 phía trên hoặc liên hệ **Phòng Đào tạo / Phòng Công tác HSSV** để được cấp lại nhé!` + suffix;
  }

  // ==========================================================================
  // INTENT 1: LẬP ĐỀ CƯƠNG BÁO CÁO THỰC TẬP TỐT NGHIỆP 3 CHƯƠNG (CHUNG & THEO CÔNG TY CỤ THỂ)
  // ==========================================================================
  const parsed = parseTopicAndCompany(fullConversationUserText);
  const isAskingSyllabus =
    /đề cương|thực tập|báo cáo tốt nghiệp|khoá luận|khóa luận|tên đề tài|lập đề cương|viết báo cáo|3 chương/i.test(effLower) ||
    Boolean(parsed.company && parsed.topic);

  if (isAskingSyllabus && !/môn\s+quản\s+trị\s+sản\s+xuất|ôn\s+thi\s+môn|mã\s+đề\s+cương|dcct|[a-z]{1,4}\d{4,6}/i.test(effLower)) {
    const topicTitle = parsed.topic ? parsed.topic : '[Vấn đề nghiên cứu]';
    const topicUpper = parsed.topic ? parsed.topic.toUpperCase() : '[VẤN ĐỀ NGHIÊN CỨU]';
    const companyTitle = parsed.company ? parsed.company : '[Tên công ty]';
    const companyUpper = parsed.company ? parsed.company.toUpperCase() : '[TÊN CÔNG TY]';
    const verb = parsed.actionVerb;
    const verbUpper = verb.toUpperCase();

    return prefix + `> ### 📋 THÔNG TIN ĐỀ TÀI THỰC TẬP TỐT NGHIỆP CHUẨN HCE
> - 🎯 **Tên đề tài:** Một số giải pháp ${verb} ${topicTitle} tại ${companyTitle} từ năm ${currentYear} đến năm ${nPlus3}
> - 🏢 **Đơn vị thực tập:** ${companyTitle}
> - ⏱️ **Phân kỳ thời gian:**
>   + *Thực trạng (Chương 2):* Giai đoạn **${nMinus3} – ${currentYear}** (Số liệu 03 năm gần nhất)
>   + *Giải pháp (Chương 3):* Giai đoạn **${currentYear} – ${nPlus3}** (Định hướng & giải pháp 03 năm tới)
> - 🎓 **Đơn vị đào tạo:** Khoa Quản trị - Kinh doanh — Trường Cao đẳng Kinh tế TP.HCM (HCE)

> ### 📑 TỔNG QUAN KẾT CẤU 3 CHƯƠNG & PHÂN BỔ DUNG LƯỢNG:
> - 🔰 **Phần Mở Đầu** *(Dự kiến 1 – 2 trang)*: Tính cấp thiết, mục tiêu, đối tượng & phạm vi nghiên cứu.
> - 📘 **Chương 1: Cơ sở lý thuyết** *(Dự kiến 7 – 10 trang)*: Khái niệm, quy trình nghiệp vụ & tiêu chí đánh giá.
> - 📊 **Chương 2: Thực trạng (${nMinus3}–${currentYear})** *(Dự kiến 15 – 20 trang)*: Phân tích thực tế tại ${companyTitle}, ưu điểm & nguyên nhân hạn chế.
> - 💡 **Chương 3: Giải pháp & Kiến nghị (${currentYear}–${nPlus3})** *(Dự kiến 5 – 8 trang)*: Các biện pháp khắc phục nguyên nhân ở Chương 2.
> - 📑 **Kết luận & Phụ lục** *(Dự kiến 2 – 3 trang)*: Tổng kết đề tài, tài liệu tham khảo & Nhật ký thực tập có mộc đỏ.

---
### 🔰 PHẦN MỞ ĐẦU (1 – 2 trang)
1. **Tính cấp thiết của đề tài:** Lý do chọn đề tài nghiên cứu về ${topicTitle} tại ${companyTitle}.
2. **Mục tiêu nghiên cứu:** Hệ thống hóa lý thuyết, phân tích thực trạng (${nMinus3}–${currentYear}) và đề xuất giải pháp (${currentYear}–${nPlus3}).
3. **Đối tượng và phạm vi nghiên cứu:**
   - *Đối tượng nghiên cứu:* ${topicTitle}.
   - *Phạm vi không gian:* Tại ${companyTitle}.
   - *Phạm vi thời gian:* Số liệu thực trạng giai đoạn **${nMinus3}–${currentYear}**; Giải pháp giai đoạn **${currentYear}–${nPlus3}**.
4. **Phương pháp nghiên cứu:** Phương pháp thu thập số liệu thứ cấp/sơ cấp, thống kê mô tả, so sánh, phân tích tổng hợp.
5. **Ý nghĩa thực tiễn của đề tài.**
6. **Kết cấu của báo cáo thực tập tốt nghiệp:** Gồm Phần mở đầu, 3 Chương nội dung, Kết luận, Tài liệu tham khảo và Phụ lục.

---
### 📘 CHƯƠNG 1. CƠ SỞ LÝ THUYẾT VỀ ${topicUpper} (7 – 10 trang)
**1.1. Khái niệm, đặc điểm và vai trò của ${topicTitle}**
- **1.1.1.** Khái niệm và bản chất của ${topicTitle}
- **1.1.2.** Vai trò và tầm quan trọng của ${topicTitle} đối với doanh nghiệp
**1.2. Nội dung và quy trình thực hiện ${topicTitle} trong doanh nghiệp**
- **1.2.1.** Hoạch định và xây dựng kế hoạch triển khai
- **1.2.2.** Tổ chức thực hiện các bước nghiệp vụ chuyên môn
- **1.2.3.** Kiểm tra, đánh giá và điều chỉnh hoạt động
**1.3. Các yếu tố ảnh hưởng đến ${topicTitle}**
- **1.3.1.** Các yếu tố chủ quan bên trong doanh nghiệp (nhân lực, tài chính, quy trình, cơ sở vật chất...)
- **1.3.2.** Các yếu tố khách quan bên ngoài (thị trường, khách hàng, đối thủ cạnh tranh, công nghệ, pháp lý...)
**1.4. Hệ thống tiêu chí đánh giá hiệu quả ${topicTitle}**
- **1.4.1.** Nhóm tiêu chí định lượng (doanh thu, chi phí, năng suất, tỷ lệ hoàn thành kế hoạch...)
- **1.4.2.** Nhóm tiêu chí định tính (chất lượng thực hiện, mức độ hài lòng của khách hàng/đối tác...)
*📌 Tóm tắt Chương 1*

---
### 📊 CHƯƠNG 2. THỰC TRẠNG VỀ ${topicUpper} TẠI ${companyUpper} GIAI ĐOẠN ${nMinus3}–${currentYear} (15 – 20 trang)
**2.1. Tổng quan về ${companyTitle}**
- **2.1.1.** Quá trình hình thành và phát triển của ${companyTitle} *(Địa chỉ, lĩnh vực, giấy phép, các cột mốc)*
- **2.1.2.** Cơ cấu tổ chức bộ máy quản lý và chức năng các phòng ban *(Vẽ sơ đồ cơ cấu tổ chức)*
- **2.1.3.** Lĩnh vực hoạt động và danh mục sản phẩm / dịch vụ chủ yếu
- **2.1.4.** Tình hình hoạt động và kết quả kinh doanh giai đoạn **${nMinus3}–${currentYear}** *(Bảng số liệu Doanh thu - Chi phí - Lợi nhuận 3 năm ${nMinus3}, ${currentYear - 2}, ${currentYear - 1}/${currentYear} từ Phòng Kế toán)*
**2.2. Thực trạng ${topicTitle} tại ${companyTitle} giai đoạn ${nMinus3}–${currentYear}** *(Bám sát cấu trúc lý thuyết mục 1.2)*
- **2.2.1.** Thực trạng công tác lập kế hoạch và chuẩn bị nguồn lực tại đơn vị *(Kèm bảng số liệu/minh chứng thực tế)*
- **2.2.2.** Thực trạng quy trình tổ chức và triển khai ${topicTitle} tại ${companyTitle}
- **2.2.3.** Thực trạng công tác kiểm soát, đánh giá kết quả đạt được giai đoạn ${nMinus3}–${currentYear}
- **2.2.4.** Phân tích các yếu tố ảnh hưởng đến thực trạng tại ${companyTitle}
**2.3. Đánh giá chung về thực trạng ${topicTitle} tại ${companyTitle}**
- **2.3.1. Ưu điểm:** Các kết quả tích cực và điểm mạnh đã đạt được
- **2.3.2. Hạn chế:** Các vấn đề còn tồn tại, bất cập cần khắc phục
- **2.3.3. Nguyên nhân của các hạn chế:** Chỉ rõ nguyên nhân chủ quan và khách quan *(Làm cơ sở trực tiếp để đề xuất giải pháp ở Chương 3)*
*📌 Tóm tắt Chương 2*

---
### 💡 CHƯƠNG 3. MỘT SỐ GIẢI PHÁP ${verbUpper} ${topicUpper} TẠI ${companyUpper} GIAI ĐOẠN ${currentYear}–${nPlus3} (5 – 8 trang)
**3.1. Phương hướng và mục tiêu phát triển của ${companyTitle} giai đoạn ${currentYear}–${nPlus3}**
**3.2. Một số giải pháp cụ thể nhằm ${verb} ${topicTitle} tại ${companyTitle} giai đoạn ${currentYear}–${nPlus3}** *(Mỗi giải pháp khắc phục trực tiếp 1 nguyên nhân hạn chế ở mục 2.3.3)*
- **3.2.1. Giải pháp 1: Hoàn thiện quy trình lập kế hoạch và chuẩn hóa nghiệp vụ**
  * *Mục tiêu của giải pháp*
  * *Nội dung và các bước triển khai chi tiết*
  * *Dự toán kinh phí & nguồn lực thực hiện*
  * *Hiệu quả dự kiến (kinh tế & quản trị)*
- **3.2.2. Giải pháp 2: Nâng cao năng lực đội ngũ nhân sự và ứng dụng công nghệ hỗ trợ**
  * *Mục tiêu - Nội dung - Chi phí - Hiệu quả dự kiến*
- **3.2.3. Giải pháp 3: Tăng cường công tác kiểm tra, đánh giá và đãi ngộ thúc đẩy hiệu quả**
  * *Mục tiêu - Nội dung - Chi phí - Hiệu quả dự kiến*
**3.3. Một số kiến nghị nhằm hỗ trợ thực hiện giải pháp**
- **3.3.1.** Kiến nghị đối với Ban Giám đốc ${companyTitle}
- **3.3.2.** Kiến nghị đối với Trường Cao đẳng Kinh tế TP.HCM (HCE) / Khoa Quản trị - Kinh doanh
*📌 Tóm tắt Chương 3*

---
### 📑 KẾT LUẬN & PHỤ LỤC (2 – 3 trang)
1. **Kết luận:** Khái quát toàn bộ kết quả nghiên cứu của báo cáo thực tập.
2. **Danh mục tài liệu tham khảo:** Sắp xếp theo chuẩn bảng chữ cái tiếng Việt.
3. **Phụ lục:** Bắt buộc đính kèm **Nhật ký thực tập tốt nghiệp** (ghi chép đầy đủ các tuần thực tập, có nhận xét của người hướng dẫn, chữ ký và **đóng mộc tròn đỏ** của ${companyTitle}).

> 📐 **QUY CÁCH TRÌNH BÀY HÌNH THỨC THEO CHUẨN KHOA QTKD - HCE:**
> - 🔤 **Font chữ:** Times New Roman, cỡ chữ **13 pt** (tiêu đề chương in hoa đậm cỡ 14 pt).
> - 📏 **Căn lề trang in (A4):** Lề Trái **3.0 cm** (đóng bìa), Lề Phải **2.0 cm**, Lề Trên **2.0 cm**, Lề Dưới **2.0 cm**.
> - 📄 **Dãn dòng:** **1.5 lines**; Spacing: Before 0 pt, After 3 – 6 pt. Đánh số trang từ Phần Mở đầu.
> - 🔗 **Tra cứu biểu mẫu & 19 bài mẫu thực tập điểm cao:** Truy cập https://nguyenthitrucphuong.pages.dev/study-corner/internships và cổng tra cứu mã đề cương https://nguyenthitrucphuong.pages.dev/dcct nhé!` + suffix;
  }

  // ==========================================================================
  // INTENT 2: CÂU HỎI VỀ CHỌN GIẢNG VIÊN / CHỌN MÔN HỌC (TRẢ LỜI KHÁCH QUAN, HÀI HƯỚC)
  // ==========================================================================
  if (/(?:có nên chọn|nên học thầy nào|nên học cô nào|chọn giảng viên nào|thầy nào dễ|cô nào dễ|chọn môn nào)/i.test(effLower)) {
    return prefix + `### 🎮 GÓC TƯ VẤN CHỌN LANE & ĐỒNG ĐỘI TẠI MAP HCE
Ở map Trường Cao đẳng Kinh tế TP.HCM (HCE) thì chọn lane nào, môn học nào hay đi cùng Thầy/Cô nào cũng đều có cái hay riêng theo đúng chuẩn chương trình đào tạo của Nhà trường hết nha!

- 🛡️ **Bí kíp giữ trụ qua môn an toàn:** Các Thầy/Cô tại HCE đều rất tận tâm, nhiệt tình hỗ trợ sinh viên. Quan trọng nhất là bạn xếp thời khóa biểu hợp lý với lịch cá nhân, chăm chỉ lên lớp đầy đủ (**đừng AFK quá 20% số tiết**), hoàn thành tốt các bài kiểm tra quá trình (**đạt ≥ 5,0 điểm**) là chắc chắn mở combat cuối kỳ ẵm điểm cao!
- 🔗 Bạn có thể xem thông tin chương trình môn học tại https://nguyenthitrucphuong.pages.dev/study-corner và đăng ký học phần tại https://sv.kthcm.edu.vn/ nhé!` + suffix;
  }

  // ==========================================================================
  // INTENT 2.5: HỎI VỀ NGÀNH HỌC / CÁC NGÀNH ĐÀO TẠO CỦA TRƯỜNG CAO ĐẲNG KINH TẾ TP.HCM (HCE)
  // Ưu tiên trả lời ngành Marketing và Quản trị kinh doanh trước, dẫn link tuyển sinh chính thức
  // ==========================================================================
  if (
    /(?:ngành học|các ngành|ngành đào tạo|ngành nào|tuyển sinh ngành|chương trình đào tạo các ngành|học ngành gì|trường có ngành gì|trường đào tạo ngành gì|các ngành của trường|ngành tuyển sinh|hce có ngành gì)/i.test(
      effLower
    )
  ) {
    return (
      prefix +
      `### 🎓 CÁC NGÀNH ĐÀO TẠO TẠI TRƯỜNG CAO ĐẲNG KINH TẾ TP.HCM (HCE)

Trường Cao đẳng Kinh tế TP.HCM (HCE) đào tạo trình độ Cao đẳng chính quy với các ngành học đón đầu xu thế chuyển đổi số và nhu cầu thực tế của thị trường lao động. Trong đó, **ngành Marketing** và **ngành Quản trị kinh doanh** là hai ngành đào tạo thế mạnh hàng đầu luôn được đông đảo sinh viên lựa chọn:

---
### 🌟 1. NGÀNH MARKETING (Ưu tiên đào tạo mũi nhọn)
- 📌 **Mã ngành:** \`6340114\`
- 🎯 **Đặc điểm & Nội dung đào tạo:** 
  - Đào tạo chuyên sâu về nghiên cứu thị trường, xây dựng và định vị tài sản thương hiệu, Marketing số (Digital Marketing), sáng tạo nội dung truyền thông đa kênh, hành vi người tiêu dùng và truyền thông marketing tích hợp (IMC).
  - Sinh viên được thực chiến qua các dự án doanh nghiệp thực tế, làm chủ công cụ phân tích dữ liệu thị trường và chiến lược tăng trưởng doanh số.
- 💼 **Cơ hội việc làm:** Chuyên viên Marketing, chuyên viên Digital Marketing / Social Media, quản trị nhãn hàng (Brand Executive), sáng tạo nội dung số, điều phối sự kiện và quản lý quan hệ khách hàng (CRM).

---
### 🌟 2. NGÀNH QUẢN TRỊ KINH DOANH (Ưu tiên đào tạo nền tảng)
- 📌 **Mã ngành:** \`6340101\`
- 🎯 **Đặc điểm & Nội dung đào tạo:** 
  - Cung cấp tư duy chiến lược và năng lực quản trị doanh nghiệp toàn diện: Hoạch định chiến lược kinh doanh, quản trị sản xuất và dịch vụ, quản trị chuỗi cung ứng, quản trị nguồn nhân lực, quản trị chất lượng toàn diện (QA/QC) và khởi sự doanh nghiệp đổi mới sáng tạo.
  - Tích hợp kỹ năng lãnh đạo, giải quyết vấn đề và ứng dụng công nghệ trong điều hành hoạt động kinh doanh.
- 💼 **Cơ hội việc làm:** Nhà quản trị cấp cơ sở, chuyên viên phát triển kinh doanh, quản lý vận hành sản xuất và dịch vụ, chuyên viên nhân sự, quản trị dự án hoặc tự khởi nghiệp kinh doanh.

---
### 📚 CÁC NGÀNH ĐÀO TẠO THẾ MẠNH KHÁC CỦA HCE:
Bên cạnh 2 ngành mũi nhọn trên, Nhà trường còn đào tạo các ngành chất lượng cao:
- 📊 **Kế toán** (Kế toán doanh nghiệp) — Mã ngành: \`6340301\`
- 💳 **Tài chính - Ngân hàng** — Mã ngành: \`6340201\`
- 🚢 **Logistics và Quản lý chuỗi cung ứng** — Mã ngành: \`6510605\`
- 🌐 **Kinh doanh thương mại** — Mã ngành: \`6340121\`
- 🛒 **Thương mại điện tử** — Mã ngành: \`6340122\`
- 🗣️ **Tiếng Anh thương mại** — Mã ngành: \`6220201\`
- 💻 **Công nghệ thông tin (Ứng dụng phần mềm)** — Mã ngành: \`6480201\`

🔗 **Tra cứu thông tin chi tiết từng ngành & Đề án tuyển sinh chính thức:**
Bạn xem chi tiết chuẩn đầu ra, chương trình khung đào tạo và đăng ký xét tuyển trực tuyến tại:
👉 **https://sites.google.com/kthcm.edu.vn/tuyensinh/tr%C3%ACnh-%C4%91%E1%BB%99-cao-%C4%91%E1%BA%B3ng-ch%C3%ADnh-quy-h%E1%BB%8Dc-ban-ng%C3%A0y/ng%C3%A0nh-%C4%91%C3%A0o-t%E1%BA%A1o**` +
      suffix
    );
  }

  // ==========================================================================
  // INTENT 3: HỎI VỀ THẦY NGUYỄN THỊ TRÚC PHƯƠNG / LỊCH GIẢNG DẠY / THỜI KHÓA BIỂU / MÔN DẠY
  // (YÊU CẦU: CẦN NHẬP MSSV 8 CHỮ SỐ VÀ HỌ TÊN CỤ THỂ, KHÔNG CHO NẾU CHỈ GHI TÊN KHÔNG)
  // ==========================================================================
  const isAskingDinhTK = /cô phương|cô trúc phương|nguyễn thị trúc phương|lịch giảng|lịch dạy|thời khóa biểu của cô|cô dạy môn gì/i.test(effLower);
  if (isAskingDinhTK) {
    const studentId = extractStudentId(history, text);
    const hasFullDinhName = /nguyễn thị trúc phương|trúc phương/i.test(effLower);

    if (!studentId) {
      if (isToro) {
        return (
          prefix +
          `### 🔐 YÊU CẦU XÁC THỰC MÃ SỐ SINH VIÊN KHI TRA CỨU GIẢNG VIÊN
Theo quy định bảo mật thông tin nội bộ của Trường Cao đẳng Kinh tế TP.HCM (HCE), để tra cứu **thông tin giảng viên**, bạn cần cung cấp đầy đủ hai thông tin sau:

1. 🆔 **Mã số sinh viên (MSSV):** Phải là một dãy số gồm **8 chữ số** bất kỳ của bạn (ví dụ: \`22012345\`).
2. 👤 **Họ và tên cụ thể của Thầy/Cô:** Ghi đầy đủ cả Họ và Tên (ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*, *Thầy Nguyễn Ngọc Đức*), không ghi mỗi tên cộc lốc nhé!

👉 Đồng đội vui lòng gửi lại **Mã số sinh viên (8 chữ số)** kèm **họ tên đầy đủ của Thầy/Cô** là Toro tra cứu và gửi ngay thông tin chi tiết liền nha! 🤝✨` +
          suffix
        );
      }
      return (
        prefix +
        `### 🔐 XÁC THỰC MÃ SỐ SINH VIÊN KHI TRA CỨU GIẢNG VIÊN
Để tra cứu **thông tin giảng viên** trên hệ thống HCE, bạn vui lòng cung cấp giúp Susi đầy đủ:

1. 🆔 **Mã số sinh viên (MSSV):** Gồm **8 chữ số** bất kỳ của bạn (ví dụ: \`22012345\`).
2. 👤 **Họ và tên cụ thể của Thầy/Cô:** Có đầy đủ cả Họ và Tên (ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*), không ghi mỗi tên không nhé!

👉 Bạn nhắn lại **Mã số sinh viên (8 chữ số)** cùng **họ tên đầy đủ của Thầy/Cô** để Susi tra cứu và gửi bạn thông tin chính xác ngay nha! 🌷✨` +
        suffix
      );
    }

    if (!hasFullDinhName) {
      if (isToro) {
        return (
          prefix +
          `### ⚠️ VUI LÒNG CUNG CẤP ĐẦY ĐỦ HỌ VÀ TÊN CỤ THỂ CỦA GIẢNG VIÊN
Toro đã ghi nhận Mã số sinh viên của bạn (\`${studentId}\`) rồi nè! 🛡️

Tuy nhiên, theo quy định văn hóa ứng xử và chuẩn tra cứu học đường, khi hỏi thông tin giảng viên:
- Bạn cần cung cấp **họ tên cụ thể đầy đủ** của Thầy/Cô (gồm cả Họ và Tên, ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*, *Thầy Nguyễn Ngọc Đức*).
- **Quy định:** Nếu chỉ ghi mỗi tên không (ví dụ: chỉ ghi *"thầy Đính"*, *"cô Thảo"*, *"thầy Đức"*) thì Toro **không được phép cung cấp thông tin**.

👉 Đồng đội nhắn lại đầy đủ **Họ và Tên cụ thể của Thầy/Cô** là Toro gánh team gửi ngay thông tin chuẩn chỉ cho bạn liền nhé! 🤝✨` +
          suffix
        );
      }
      return (
        prefix +
        `### ⚠️ VUI LÒNG CUNG CẤP ĐẦY ĐỦ HỌ VÀ TÊN CỤ THỂ CỦA GIẢNG VIÊN
Susi đã ghi nhận Mã số sinh viên của bạn (\`${studentId}\`) rồi nha! 🌸

Nhưng theo quy định tra cứu học đường, khi hỏi thông tin giảng viên:
- Bạn cần cung cấp **họ tên cụ thể đầy đủ** của Thầy/Cô (gồm cả Họ và Tên, ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*).
- **Quy định:** Nếu chỉ ghi mỗi tên không thì Susi **chưa thể cung cấp thông tin** được nè.

👉 Bạn vui lòng nhắn lại đầy đủ **Họ và Tên cụ thể của Thầy/Cô** để Susi tra cứu và gửi bạn ngay nhé! 🌷✨` +
        suffix
      );
    }

    // Cung cấp thông tin Thầy NGUYỄN THỊ TRÚC PHƯƠNG khi đã có đủ MSSV 8 số và họ tên cụ thể
    let scheduleInfo = '';
    const activeSched = teachingSchedule.filter((s) => s.is_active !== false);
    if (activeSched.length > 0) {
      scheduleInfo = activeSched
        .map(
          (s) =>
            `- 🗓️ **${s.day_of_week}** (${s.session || 'Sáng'}): **${s.periods || ''}** | Môn: **${s.subject}** | Lớp: \`${s.class_code}\` | Phòng: **${s.room || 'Đang cập nhật'}**${s.notes ? ` *(${s.notes})*` : ''}`
        )
        .join('\n');
    } else {
      scheduleInfo = `- Hiện tại Cô đang trực tiếp phụ trách giảng dạy các học phần **Marketing căn bản**, **Kinh tế vi mô** và **Khởi nghiệp** thuộc Khoa Quản trị - Kinh doanh Trường Cao đẳng Kinh tế TP.HCM (HCE).\n- Lịch giảng dạy chi tiết và nhóm Zalo lớp học phần được cập nhật tại: **/study-corner**`;
    }

    return (
      prefix +
      `### 👩‍🏫 THÔNG TIN & LỊCH GIẢNG DẠY CỦA CÔ NGUYỄN THỊ TRÚC PHƯƠNG
- 👤 **Mã số sinh viên xác thực:** \`${studentId}\` ✅
- 🏛️ **Đơn vị công tác:** Khoa Quản trị - Kinh doanh — Trường Cao đẳng Kinh tế TP.HCM (HCE)
- 📌 **Chức vụ:** Tổ trưởng bộ môn
- 📧 **Địa chỉ Email chính thức:** \`dinhtk@kthcm.edu.vn\`
- 📚 **Các môn học đang phụ trách trong Lịch giảng dạy:** **Marketing căn bản**, **Kinh tế vi mô**, **Khởi nghiệp**, **Thực tập tốt nghiệp**

### 📅 LỊCH GIẢNG DẠY CẬP NHẬT TRỰC TIẾP TỪ CỔNG HỌC LIỆU (/study-corner):
${scheduleInfo}

🎮 *Góc nhắn nhủ Liên Quân:* Đi chung lane học tập cùng Cô Trúc Phương thì đồng đội cứ yên tâm là tài liệu, bài giảng và công cụ tính toán đã có sẵn đầy đủ trên web! Chỉ cần đồng đội chịu khó check bụi điểm danh, ôm trụ làm bài tập đều đặn và đừng AFK quá 20% số tiết là auto qua môn mượt mà! 🤝✨

🔗 **Tra cứu học liệu & nhóm Zalo lớp học phần:** /study-corner (và đối chiếu lịch cá nhân trên Cổng sinh viên: https://sv.kthcm.edu.vn/)` +
      suffix
    );
  }

  // ==========================================================================
  // INTENT 4: TRA CỨU EMAIL & THÔNG TIN GIẢNG VIÊN / CÁN BỘ / PHÒNG KHOA HCE (14 ĐƠN VỊ)
  // (YÊU CẦU: CẦN NHẬP MSSV 8 CHỮ SỐ VÀ HỌ TÊN CỤ THỂ, KHÔNG CHO NẾU CHỈ GHI TÊN KHÔNG)
  // ==========================================================================
  const matchedStaffFull: StaffEntry[] = [];
  const matchedStaffGiven: StaffEntry[] = [];

  for (const staff of ALL_STAFF) {
    const nameLower = staff.fullName.toLowerCase();
    const givenName = (nameLower.split(/\s+/).pop() || '').trim();
    if (effLower.includes(nameLower)) {
      matchedStaffFull.push(staff);
    } else if (
      givenName.length >= 2 &&
      new RegExp(`(?:thầy|cô|giảng\\s+viên|gv|email|mail)\\s+(?:của\\s+)?(?:thầy\\s+|cô\\s+)?${givenName}(?=$|[^\\p{L}])`, 'iu').test(effectiveQuery)
    ) {
      matchedStaffGiven.push(staff);
    }
  }

  const isAskingStaffGeneral =
    /(?:thông tin giảng viên|thông tin thầy cô|email giảng viên|email thầy cô|danh bạ giảng viên|xin email thầy|xin email cô|liên hệ giảng viên)/i.test(effLower);

  if (matchedStaffFull.length > 0 || matchedStaffGiven.length > 0 || isAskingStaffGeneral) {
    const studentId = extractStudentId(history, text);

    if (!studentId) {
      if (isToro) {
        return (
          prefix +
          `### 🔐 YÊU CẦU XÁC THỰC MÃ SỐ SINH VIÊN KHI TRA CỨU GIẢNG VIÊN
Theo quy định bảo mật thông tin nội bộ của Trường Cao đẳng Kinh tế TP.HCM (HCE), để tra cứu **thông tin giảng viên**, bạn cần cung cấp đầy đủ hai thông tin sau:

1. 🆔 **Mã số sinh viên (MSSV):** Phải là một dãy số gồm **8 chữ số** bất kỳ của bạn (ví dụ: \`22012345\`).
2. 👤 **Họ và tên cụ thể của Thầy/Cô:** Ghi đầy đủ cả Họ và Tên (ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*, *Thầy Nguyễn Ngọc Đức*), không ghi mỗi tên cộc lốc nhé!

👉 Đồng đội vui lòng gửi lại **Mã số sinh viên (8 chữ số)** kèm **họ tên đầy đủ của Thầy/Cô** là Toro tra cứu và gửi ngay thông tin chi tiết liền nha! 🤝✨` +
          suffix
        );
      }
      return (
        prefix +
        `### 🔐 XÁC THỰC MÃ SỐ SINH VIÊN KHI TRA CỨU GIẢNG VIÊN
Để tra cứu **thông tin giảng viên** trên hệ thống HCE, bạn vui lòng cung cấp giúp Susi đầy đủ:

1. 🆔 **Mã số sinh viên (MSSV):** Gồm **8 chữ số** bất kỳ của bạn (ví dụ: \`22012345\`).
2. 👤 **Họ và tên cụ thể của Thầy/Cô:** Có đầy đủ cả Họ và Tên (ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*), không ghi mỗi tên không nhé!

👉 Bạn nhắn lại **Mã số sinh viên (8 chữ số)** cùng **họ tên đầy đủ của Thầy/Cô** để Susi tra cứu và gửi bạn thông tin chính xác ngay nha! 🌷✨` +
        suffix
      );
    }

    if (matchedStaffFull.length === 0) {
      if (isToro) {
        return (
          prefix +
          `### ⚠️ VUI LÒNG CUNG CẤP ĐẦY ĐỦ HỌ VÀ TÊN CỤ THỂ CỦA GIẢNG VIÊN
Toro đã ghi nhận Mã số sinh viên của bạn (\`${studentId}\`) rồi nè! 🛡️

Tuy nhiên, theo quy định văn hóa ứng xử và chuẩn tra cứu học đường, khi hỏi thông tin giảng viên:
- Bạn cần cung cấp **họ tên cụ thể đầy đủ** của Thầy/Cô (gồm cả Họ và Tên, ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*, *Thầy Nguyễn Ngọc Đức*).
- **Quy định:** Nếu chỉ ghi mỗi tên không (ví dụ: chỉ ghi *"thầy Đính"*, *"cô Thảo"*, *"thầy Đức"*) thì Toro **không được phép cung cấp thông tin**.

👉 Đồng đội nhắn lại đầy đủ **Họ và Tên cụ thể của Thầy/Cô** là Toro gánh team gửi ngay thông tin chuẩn chỉ cho bạn liền nhé! 🤝✨` +
          suffix
        );
      }
      return (
        prefix +
        `### ⚠️ VUI LÒNG CUNG CẤP ĐẦY ĐỦ HỌ VÀ TÊN CỤ THỂ CỦA GIẢNG VIÊN
Susi đã ghi nhận Mã số sinh viên của bạn (\`${studentId}\`) rồi nha! 🌸

Nhưng theo quy định tra cứu học đường, khi hỏi thông tin giảng viên:
- Bạn cần cung cấp **họ tên cụ thể đầy đủ** của Thầy/Cô (gồm cả Họ và Tên, ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*).
- **Quy định:** Nếu chỉ ghi mỗi tên không thì Susi **chưa thể cung cấp thông tin** được nè.

👉 Bạn vui lòng nhắn lại đầy đủ **Họ và Tên cụ thể của Thầy/Cô** để Susi tra cứu và gửi bạn ngay nhé! 🌷✨` +
        suffix
      );
    }

    // Đã có cả MSSV 8 chữ số và Họ tên cụ thể
    const uniqueByEmail = Array.from(new Map(matchedStaffFull.map((item) => [item.email, item])).values());

    if (uniqueByEmail.length === 1) {
      const s = uniqueByEmail[0];
      return (
        prefix +
        `### 👨‍🏫 THÔNG TIN GIẢNG VIÊN / CÁN BỘ TRÊN WEBSITE NHÀ TRƯỜNG
- 👤 **Mã số sinh viên xác thực:** \`${studentId}\` ✅
- 👤 **Họ và tên:** **${s.fullName}**
- 🏛️ **Đơn vị công tác:** ${s.dept} (${s.role})
- 📧 **Địa chỉ Email chính thức:** \`${s.email}\`

💡 *Thông tin được lấy từ website chính thức của Trường Cao đẳng Kinh tế TP.HCM (https://www.kthcm.edu.vn/) và website học tập (https://nguyenthitrucphuong.pages.dev/). Các Thầy/Cô tại HCE đều rất tận tâm, dễ thương và nhiệt tình hỗ trợ sinh viên!*` +
        suffix
      );
    } else if (uniqueByEmail.length > 1) {
      const rows = uniqueByEmail
        .map((s, idx) => `${idx + 1}. **${s.fullName}** — *${s.dept}* (${s.role}) | 📧 Email: \`${s.email}\``)
        .join('\n');
      return (
        prefix +
        `### 👨‍🏫 THÔNG TIN CÁC THẦY/CÔ TRÊN WEBSITE NHÀ TRƯỜNG
- 👤 **Mã số sinh viên xác thực:** \`${studentId}\` ✅

Trên hệ thống website Trường Cao đẳng Kinh tế TP.HCM (https://www.kthcm.edu.vn/) có các Thầy/Cô bạn đang tìm như sau:

${rows}

💡 *Bạn hãy đối chiếu đúng Họ và Tên đệm cùng Khoa/Phòng ban của Thầy/Cô đang phụ trách lớp mình để gửi email chính xác nhé!*` +
        suffix
      );
    }
  }

  // Nếu người dùng hỏi về một Thầy/Cô cụ thể không có trong danh sách cơ hữu -> Giảng viên Thỉnh giảng (đúng quy tắc hệ thống)
  if (
    /(?:email|mail|thông tin|khoa nào|dạy|liên hệ)/i.test(effectiveQuery) &&
    /(?:[Tt]hầy|[Cc]ô|[Gg]iảng\s+viên)\s+([A-ZÀ-Ỹ][\p{L}]+(?:\s+[A-ZÀ-Ỹ][\p{L}]+)*)/u.test(effectiveQuery)
  ) {
    const m = effectiveQuery.match(/(?:[Tt]hầy|[Cc]ô|[Gg]iảng\s+viên)\s+([A-ZÀ-Ỹ][\p{L}]+(?:\s+[A-ZÀ-Ỹ][\p{L}]+)*)/u);
    const teacherName = m ? m[0] : 'Thầy/Cô';
    const words = teacherName.replace(/^(?:[Tt]hầy|[Cc]ô|[Gg]iảng\s+viên)\s+/i, '').trim().split(/\s+/);
    const studentId = extractStudentId(history, text);

    if (!studentId) {
      return (
        prefix +
        `### 🔐 YÊU CẦU XÁC THỰC MÃ SỐ SINH VIÊN KHI TRA CỨU GIẢNG VIÊN
Theo quy định bảo mật thông tin nội bộ của Trường Cao đẳng Kinh tế TP.HCM (HCE), để tra cứu **thông tin giảng viên**, bạn cần cung cấp đầy đủ hai thông tin sau:

1. 🆔 **Mã số sinh viên (MSSV):** Phải là một dãy số gồm **8 chữ số** bất kỳ của bạn (ví dụ: \`22012345\`).
2. 👤 **Họ và tên cụ thể của Thầy/Cô:** Ghi đầy đủ cả Họ và Tên (ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*, *Thầy Nguyễn Ngọc Đức*), không ghi mỗi tên cộc lốc nhé!

👉 Bạn vui lòng gửi lại **Mã số sinh viên (8 chữ số)** kèm **họ tên đầy đủ của Thầy/Cô** để Toro tra cứu nhé! 🤝✨` +
        suffix
      );
    }

    if (words.length <= 1) {
      return (
        prefix +
        `### ⚠️ VUI LÒNG CUNG CẤP ĐẦY ĐỦ HỌ VÀ TÊN CỤ THỂ CỦA GIẢNG VIÊN
Toro đã ghi nhận Mã số sinh viên của bạn (\`${studentId}\`) rồi nè! 🛡️

Tuy nhiên, theo quy định văn hóa ứng xử và chuẩn tra cứu học đường, khi hỏi thông tin giảng viên, bạn cần cung cấp **họ tên cụ thể đầy đủ** của Thầy/Cô (gồm cả Họ và Tên, ví dụ: *Thầy NGUYỄN THỊ TRÚC PHƯƠNG*, *Cô Nguyễn Thị Thanh Thảo*), nếu chỉ ghi mỗi tên không thì Toro không được phép cung cấp thông tin nha!

👉 Bạn nhắn lại đầy đủ **Họ và Tên cụ thể của Thầy/Cô** để Toro hỗ trợ nhé! 🤝✨` +
        suffix
      );
    }

    return (
      prefix +
      `### 👨‍🏫 THÔNG TIN GIẢNG VIÊN TỪ WEBSITE NHÀ TRƯỜNG
- 👤 **Mã số sinh viên xác thực:** \`${studentId}\` ✅

Theo thông tin tra cứu trên website Trường Cao đẳng Kinh tế TP.HCM (https://www.kthcm.edu.vn/) và cổng học tập (https://nguyenthitrucphuong.pages.dev/), **${teacherName}** là **Giảng viên Thỉnh giảng** tại Trường Cao đẳng Kinh tế TP.HCM (HCE).

- Các Thầy/Cô tại HCE đều rất tận tâm, dễ thương và nhiệt tình hỗ trợ sinh viên.
- Để nhận địa chỉ email hoặc thông tin liên hệ trực tiếp của Giảng viên Thỉnh giảng, bạn vui lòng xem trên Đề cương chi tiết môn học được phổ biến buổi đầu kỳ, hỏi trực tiếp trên lớp hoặc liên hệ **Văn phòng Khoa quản lý môn học / Cố vấn học tập (CVHT)** tại https://www.kthcm.edu.vn/ nhé!` +
      suffix
    );
  }

  // ==========================================================================
  // INTENT 5: HÌNH THỨC THI, THỜI GIAN THI (60 PHÚT) & QUY ĐỊNH SỬ DỤNG TÀI LIỆU (33 MÔN)
  // ==========================================================================
  for (const subj of EXAM_SUBJECTS_33) {
    if (effLower.includes(subj.name.toLowerCase()) && /(?:thi|tài liệu|hình thức|thời gian|bao nhiêu phút|tự luận|trắc nghiệm|tiểu luận)/i.test(effLower)) {
      return prefix + `### 📝 QUY ĐỊNH THI MÔN: ${subj.name.toUpperCase()} (CHUẨN HCE)
- 📚 **Tên môn học:** **${subj.name}**
- ✍️ **Hình thức thi kết thúc học phần:** **${subj.format}**
- ⏱️ **Thời gian làm bài thi:** **60 phút**
- 📖 **Quy định sử dụng tài liệu:** **${subj.openBook ? 'ĐƯỢC PHÉP sử dụng tài liệu ✅' : 'KHÔNG ĐƯỢC sử dụng tài liệu 🚫'}**

💡 *Lưu ý chung tại HCE: Tất cả 33 môn học trong danh mục đều có thời gian thi **60 phút**, và chỉ có duy nhất **03 môn KHÔNG được sử dụng tài liệu** là: **Quản trị sản xuất** (Tự luận), **Logistics và chuỗi cung ứng căn bản** (Trắc nghiệm), và **Nghiệp vụ kho hàng** (Trắc nghiệm). Bạn có thể luyện đề thi thử trực tuyến 50 câu / 60 phút tại: https://nguyenthitrucphuong.pages.dev/ngan-hang-de-thi nhé!*` + suffix;
    }
  }

  if (/(?:hình thức thi|thời gian thi|tài liệu thi|(?:được|không được|cấm)\s*(?:sử dụng|dùng)\s*tài liệu|sử dụng tài liệu|dùng tài liệu|môn nào không được|môn nào thi tiểu luận)/i.test(effLower)) {
    return prefix + `### 📝 BẢNG HÌNH THỨC THI, THỜI GIAN THI & QUY ĐỊNH TÀI LIỆU 33 MÔN HỌC (HCE)

⏱️ **Thời gian làm bài thống nhất của TẤT CẢ 33 môn học:** **60 phút**.

🚫 **1. DUY NHẤT 03 MÔN KHÔNG ĐƯỢC SỬ DỤNG TÀI LIỆU:**
1. **Quản trị sản xuất** — Hình thức: **Tự luận** (60 phút) — 🚫 **Không sử dụng tài liệu**
2. **Logistics và chuỗi cung ứng căn bản** — Hình thức: **Trắc nghiệm** (60 phút) — 🚫 **Không sử dụng tài liệu**
3. **Nghiệp vụ kho hàng** — Hình thức: **Trắc nghiệm** (60 phút) — 🚫 **Không sử dụng tài liệu**

📋 **2. BỐN (04) MÔN THI HÌNH THỨC TIỂU LUẬN (60 phút — ĐƯỢC sử dụng tài liệu ✅):**
1. **Phương pháp nghiên cứu kinh doanh**
2. **Khởi sự kinh doanh_01**
3. **Quản trị sự kiện_01**
4. **Định hướng nghề nghiệp**

✍️ **3. HAI (02) MÔN THI TỰ LUẬN ĐƯỢC SỬ DỤNG TÀI LIỆU (60 phút ✅):**
- **Kỹ năng quản trị**, **Quản trị sự thay đổi**.

⚡ **4. CÁC MÔN THI TRẮC NGHIỆM & TRẮC NGHIỆM - TỰ LUẬN (60 phút — ĐƯỢC sử dụng tài liệu ✅):**
- **Trắc nghiệm (100%):** Quản trị học, Marketing căn bản, Quản trị marketing, Thanh toán quốc tế, Rủi ro và bảo hiểm, Tính toán cơ bản trong logistics, Kỹ năng quản lý nhân sự, Nghiệp vụ bán hàng.
- **Trắc nghiệm - Tự luận:** Quản trị hành chính văn phòng, Đạo đức kinh doanh và văn hóa doanh nghiệp, Hành vi khách hàng, Quản trị nguồn nhân lực, Quản trị chất lượng, Quản trị tài chính, Quản trị rủi ro, Quản trị thương hiệu, An toàn sức khỏe và môi trường, Quản trị kinh doanh quốc tế, Quan hệ kinh tế quốc tế, Kinh doanh quốc tế, Nghiệp vụ ngoại thương, Truyền thông marketing tích hợp, Marketing dịch vụ, Marketing quốc tế.

🔗 *Luyện thi trắc nghiệm trực tuyến 50 câu / 60 phút có chấm điểm tự động tại: **https://nguyenthitrucphuong.pages.dev/ngan-hang-de-thi***` + suffix;
  }

  // ==========================================================================
  // INTENT 6: QUY TRÌNH GIẢI QUYẾT HỌC VỤ (QT04, QT06, QT07, QT08, QT09) & NƠI NỘP ĐƠN
  // ==========================================================================
  if (/bảo lưu|tạm dừng|miễn môn|chuyển ngành|rút môn|rút bớt|thôi học|bảng điểm|giấy xác nhận|giấy giới thiệu|qt09|qt04|qt06|qt07|qt08|học vụ/i.test(effLower)) {
    return prefix + `### 🏢 HỆ THỐNG 5 QUY TRÌNH GIẢI QUYẾT HỌC VỤ & NƠI TIẾP NHẬN HỒ SƠ (HCE)

📌 **QUY ĐỊNH NƠI TIẾP NHẬN HỒ SƠ BẮT BUỘC:**
- 📂 **Bảo lưu (Tạm dừng chương trình học):** Nộp đơn về **PHÒNG ĐÀO TẠO (P.ĐT)**.
- 📜 **Xin Bảng điểm, Giấy giới thiệu thực tập, Giấy xác nhận đang học (Xác nhận sinh viên, Tạm hoãn NVQS):** Nộp hồ sơ và liên hệ **PHÒNG CÔNG TÁC HỌC SINH - SINH VIÊN (P.CTHSSV)**.

---
### 📋 CHI TIẾT 5 QUY TRÌNH HỌC VỤ CHÍNH THỨC:

1. **QT07/ĐT — Quy trình Tạm dừng chương trình học (Bảo lưu học tập):**
   - **Thời hạn nộp:** Chậm nhất **01 tuần sau khi bắt đầu học kỳ** (Thời gian bảo lưu tối đa không quá **05 năm** theo Điều 8 QĐ 624).
   - **Các bước:** (B1) SV nộp đơn \`BM01/QT07/ĐT\` về **Phòng Đào tạo** để xác nhận điểm (01 ngày làm việc) $\\rightarrow$ (B2) Chuyển Khoa & CVHT cho ý kiến (02 ngày) $\\rightarrow$ (B3) Trưởng P.ĐT duyệt, dự thảo Quyết định chuyển P.TC-HC (02 ngày) $\\rightarrow$ (B4) Trình Hiệu trưởng ký ban hành QĐ (02 ngày) và cập nhật phần mềm (01 ngày).

2. **QT09/ĐT — Quy trình Phối hợp các Khoa xử lý học vụ (Rút môn, Đăng ký bổ sung, Thắc mắc điểm):**
   - **Cách gửi:** Gửi trực tuyến trên Cổng thông tin sinh viên (https://sv.kthcm.edu.vn/) hoặc nộp phiếu \`BM02/QT09/ĐT\` tại **Phòng Đào tạo**.
   - **Thời hạn rút bớt học phần (Điều 18 QĐ 624):** Sau **01 tuần** và không muộn quá **02 tuần** kể từ đầu học kỳ chính (không muộn quá 01 tuần ở học kỳ phụ); khối lượng còn lại không nhỏ hơn 2/3 khối lượng TB học kỳ.
   - **Thời gian phản hồi:** Trong vòng **03 ngày làm việc** (phối hợp P.ĐT, Khoa và CVHT).

3. **QT06/ĐT — Quy trình Miễn môn học:**
   - **Miễn Tin học & Tiếng Anh:** Nộp đơn \`BM01/QT06/ĐT\` kèm chứng chỉ hợp lệ về **Văn phòng Khoa (VPK)** trong vòng **01 tháng đầu tiên của học kỳ 1**.
   - **Miễn các môn khác:** Nộp khi nhập học và **trước ngày thi môn đó tối thiểu 15 ngày**.

4. **QT04/ĐT — Quy trình Chuyển ngành đào tạo:**
   - **Thời hạn:** Thực hiện **trong Học kỳ 1** của chương trình đào tạo.
   - **Thủ tục:** Điền đơn \`BM01/QT04/ĐT\`, xin ý kiến xác nhận của CVHT và nộp về **Phòng Đào tạo** để lấy ý kiến Trưởng khoa chuyển đến (01 ngày) & Trưởng khoa chuyển đi (02 ngày).

5. **QT08/ĐT — Quy trình Tự thôi học:**
   - **Thủ tục:** Điền đơn \`BM01/QT08/ĐT\` có ý kiến của CVHT nộp về **Văn phòng Khoa (VPK)**.

🔗 *Để biết quy trình chính xác nhất, bạn vui lòng liên hệ **Thầy/Cô Cố vấn học tập (CVHT)** của lớp hoặc xem chi tiết tại Cổng sinh viên: https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/quy-trinh-phong-dao-tao-phoi-voi-khoa-giai-quyet-hoc-vu-sinh-vien.html?pIDDanhMuc=9*` + suffix;
  }

  // ==========================================================================
  // INTENT 7: KẾ HOẠCH ĐÀO TẠO NĂM HỌC 2026 - 2027 (LỊCH THI, HỌC KỲ 2, NGHỈ TẾT, QUÂN SỰ, THỰC TẬP)
  // ==========================================================================
  if (/kế hoạch đào tạo|học kỳ 2|học kỳ ii|học kỳ 1|học kỳ i|học kỳ hè|bắt đầu học kỳ|nghỉ tết|lịch thi|quân sự|gdqp|thực tập k20|khai giảng|đăng ký môn|đăng ký học phần/i.test(effLower)) {
    return prefix + `### 📅 KẾ HOẠCH ĐÀO TẠO NĂM HỌC 2026 - 2027 (TRƯỜNG CAO ĐẲNG KINH TẾ TP.HCM - HCE)

1. 🏫 **HỌC KỲ I (Năm học 2026 - 2027):**
   - **Khai giảng năm học:** Thứ Hai, ngày **28/09/2026** (Tuần 5).
   - **Bắt đầu học HK I:** Khóa cũ (K20, K21, CĐLT K21) từ **07/09/2026** (Tuần 2). Tân sinh viên (K22, TC K31) sinh hoạt đầu khóa Tuần 1–4 (**31/08 – 26/09/2026**), học chính thức từ **28/09/2026** (Tuần 5).
   - **Lịch thi Lần 1 HK I:** Dự kiến **28/12/2026 – 16/01/2027** (Tuần 18, 19, 20). Cụ thể: K20, K21 thi **28/12/2026 – 09/01/2027**; K22 thi **11/01/2027 – 23/01/2027**.
   - **Lịch thi Lần 2 HK I:** K20 thi Tuần 21–22 (**18/01 – 30/01/2027**); K21, K22 thi sau Tết vào Tuần 26–27 (**22/02 – 06/03/2027**).
   - **Đăng ký học phần HK II:** Dự kiến Tuần 20–22 (**11/01/2027 – 30/01/2027**).

2. 🌸 **LỊCH NGHỈ TẾT NGUYÊN ĐÁN (Tết Âm Lịch 2027):**
   - Nghỉ trọn vẹn **03 tuần** gồm **Tuần 23, Tuần 24, Tuần 25** (từ ngày **01/02/2027 đến hết ngày 20/02/2027**).

3. 🚀 **HỌC KỲ II (Năm học 2026 - 2027):**
   - **Học kỳ 2 bắt đầu khi nào?:** Chính thức bắt đầu từ **Tuần 26 (Thứ Hai, ngày 22/02/2027)** ngay sau kỳ nghỉ Tết Âm lịch!
   - **Thực tập cuối khóa (CĐ Khóa 20):** Tuần 26 đến Tuần 31 (từ **22/02/2027 đến 03/04/2027**).
   - **Học tập trên lớp HK II:** Tuần 26 đến Tuần 40 (từ **22/02/2027 đến 05/06/2027**).
   - **Giáo dục Quốc phòng - An ninh (GDQP-AN cho K22, CĐLT 21, TC 31):** Tuần 41 đến Tuần 44 (từ **07/06/2027 đến 03/07/2027**).
   - **Lịch thi Lần 1 HK II:** Đợt 1 vào Tuần 35, 36 (**26/04 – 08/05/2027**); Đợt 2 vào Tuần 41, 42 (**07/06 – 19/06/2027**).
   - **Lịch thi Lần 2 HK II:** Tuần 47, 48 (**19/07/2027 – 31/07/2027**).

4. ☀️ **HỌC KỲ HÈ & XÉT TỐT NGHIỆP:**
   - **Học kỳ Hè:** Học từ **12/07/2027 đến 21/08/2027** (Tuần 46–51); Thi kết thúc Tuần 52, 53 (**23/08 – 04/09/2027**).
   - **Các đợt xét tốt nghiệp trong năm:** Tháng **09/2026**, Tháng **04/2027**, và Tháng **09/2027**.

> ⚠️ **Lưu ý:** Đây là kế hoạch đào tạo dự kiến của Nhà trường. Để biết chính xác lịch cụ thể của từng học phần, ngày giờ thi, phòng thi và ca đăng ký môn học của cá nhân, bạn/đồng đội cần theo dõi thường xuyên trên tài khoản Cổng sinh viên (https://sv.kthcm.edu.vn/) hoặc liên hệ Thầy/Cô Cố vấn học tập (CVHT) của lớp mình để được hướng dẫn chi tiết nhé!` + suffix;
  }

  // ==========================================================================
  // INTENT 8: QUY CHẾ ĐÀO TẠO TÍN CHỈ QĐ 624, CHUẨN ĐẦU RA (QĐ 487), HỌC BỔNG (QĐ 120), MIỄN GIẢM HỌC PHÍ (QĐ 238)
  // ==========================================================================
  if (/quy chế|tín chỉ|qđ 624|624|thang điểm|tính điểm|điều kiện dự thi|cấm thi|thi lại|thi lần 2|cải thiện|cảnh báo|buộc thôi học|học bổng|qđ 120|miễn giảm học phí|qđ 238|chuẩn đầu ra|tin học|ngoại ngữ|tiếng anh|qđ 487|tốt nghiệp|điểm rèn luyện|ký hiệu i|điểm i|điểm f|điểm d/i.test(effLower)) {
    return prefix + `### 📜 QUY CHẾ ĐÀO TẠO TÍN CHỈ (QĐ 624/QĐ-CĐKT) & CHUẨN ĐẦU RA HCE

1. 🎯 **Cách tính điểm môn học & Quy đổi thang điểm 4 (Điều 13 QĐ 624):**
   - **Công thức:** $\\text{Điểm môn học} = (\\text{Điểm TB kiểm tra quá trình} \\times 0,4) + (\\text{Điểm thi kết thúc môn} \\times 0,6)$
   - *Trong đó:* Kiểm tra thường xuyên hệ số 1, kiểm tra định kỳ hệ số 2 (làm tròn 1 chữ số thập phân).
   - **Bảng quy đổi điểm chữ & thang điểm 4:**
     + **A (8,5 – 10):** **4,00** — Xếp loại **Giỏi**
     + **B (7,0 – 8,4):** **3,00** — Xếp loại **Khá**
     + **C (5,5 – 6,9):** **2,00** — Xếp loại **Trung bình**
     + **D (4,0 – 5,4):** **1,00** — Xếp loại **Trung bình yếu** *(Đạt, được phép đăng ký học lại để cải thiện ĐTBCTL)*
     + **F (Dưới 4,0):** **0,00** — Xếp loại **Kém** *(Không đạt, bắt buộc phải học lại)*
   - **Ký hiệu đặc biệt:** **I** *(Chưa đủ dữ liệu đánh giá do hoãn thi/ốm đau có xác nhận bệnh viện)*; **X** *(Chưa nhận kết quả)*; **R** *(Chuyển điểm/miễn học phần)*.

2. 🚫 **Điều kiện dự thi kết thúc môn & Cảnh báo CẤM THI (Điều 12 Khoản 1):**
   - **Chuyên cần:** Tham dự ít nhất **80% thời gian lên lớp** (tuyệt đối **không vắng quá 20%** tổng số tiết quy định dù có phép hay không phép).
   - **Điểm quá trình:** Điểm trung bình chung các điểm kiểm tra phải đạt **từ 5,0 điểm trở lên** (thang 10).
   - **Học phí:** Hoàn thành đầy đủ nghĩa vụ học phí theo thông báo của trường.
   - *Vi phạm một trong các điều kiện trên sẽ bị đưa vào **Danh sách CẤM THI**, nhận điểm **0 (F)** và phải học lại từ đầu.*

3. 🔄 **Số lần dự thi, Thi lần 2 & Thi cải thiện (Điều 12 Khoản 2 & Điều 19):**
   - Mỗi môn học trong học kỳ được dự thi **tối đa 02 lần**.
   - **Bắt buộc thi lần 2 nếu:** Điểm thi lần 1 **< 2,0 điểm** (thang 10) HOẶC Điểm tổng kết môn học **< 4,0 điểm** (điểm F).
   - **Thi cải thiện:** Nếu lần 1 đã đạt nhưng muốn nâng điểm, được đăng ký thi thêm 01 lần ngay trong kỳ (không bảo lưu điểm thi trước; điểm thi lần 2 không dùng xét học bổng).
   - **Học lại:** Không được bảo lưu điểm quá trình và thời gian học của lần học trước.

4. ⚠️ **Cảnh báo học tập & Buộc thôi học (Điều 21):**
   - **Cảnh báo học tập khi:** (a) Tổng số tín chỉ không đạt trong kỳ vượt quá **50%** khối lượng đăng ký; hoặc (b) **ĐTBCHK < 1,20** (học kỳ đầu khóa) hoặc **< 1,50** (các học kỳ tiếp theo).
   - **Buộc thôi học khi:** Số lần cảnh báo học tập **vượt quá 04 lần**; hoặc vượt quá thời gian tối đa hoàn thành chương trình (1,5 lần thời gian thiết kế).

5. 🏆 **Học bổng KKHT (QĐ 120) & Miễn giảm học phí (QĐ 238):**
   - **Học bổng khuyến khích học tập (QĐ 120):** Xét theo từng học kỳ dựa trên ĐTBCHK và Điểm rèn luyện đạt từ loại **Khá, Giỏi, Xuất sắc** trở lên; đăng ký đủ số tín chỉ tối thiểu trong kỳ; **không có môn nào dưới 4,0 (điểm F)**, không thi lại và không bị kỷ luật.
   - **Miễn giảm học phí (QĐ 238):** Dành cho sinh viên diện chính sách (con thương binh, bệnh binh, hộ nghèo, cận nghèo, mồ côi, khuyết tật...) nộp hồ sơ tại **Phòng Công tác HSSV**.

6. 🎓 **Điều kiện xét tốt nghiệp (Điều 22) & Chuẩn đầu ra:**
   - Tích lũy đủ số tín chỉ của ngành; **ĐTBCTL toàn khóa ≥ 2,00**; hoàn thành GDTC, GDQP-AN, chứng nhận Kỹ năng mềm.
   - **Chuẩn đầu ra Tin học (QĐ 487/QĐ-CĐKT):** Chứng chỉ Ứng dụng CNTT cơ bản (TT 03/2014/TT-BTTTT) hoặc MOS, IC3.
   - **Chuẩn đầu ra Ngoại ngữ:** Năng lực ngoại ngữ **Bậc 2/6** (A2/B1) hoặc chứng chỉ quốc tế tương đương (TOEIC, IELTS, VSTEP).

🔗 *Bạn có thể dùng **Công cụ tính điểm môn học (40%–60%) & mô phỏng GPA** trực tiếp tại: **https://nguyenthitrucphuong.pages.dev/mentor** và tra cứu bảng điểm cá nhân tại **https://sv.kthcm.edu.vn/***` + suffix;
  }

  // ==========================================================================
  // INTENT 9: HỌC LIỆU WEBSITE, ĐỀ CƯƠNG MÔN HỌC (QTSX, QTH, MARKETING, VI MÔ), CÔNG THỨC HÒA VỐN, EOQ/POQ, SPSS, POM-QM, CASIO, PDF/WORD
  // ==========================================================================
  if (/hòa vốn|sản lượng hòa vốn|doanh thu hòa vốn|bep|eoq|poq|tồn kho|dự báo|johnson|điều độ|quản trị sản xuất|qtsx|pom-qm|pomqm|casio/i.test(effLower)) {
    return prefix + `### 💡 KIẾN THỨC & HỌC LIỆU MÔN QUẢN TRỊ SẢN XUẤT & DỊCH VỤ (NGUYỄN THỊ TRÚC PHƯƠNG)

1. 📐 **Công thức Điểm hòa vốn (Break-Even Point — BEP) chuẩn giáo trình:**
   - **Sản lượng hòa vốn ($Q_{hv}$ hoặc $BEP_Q$):**
     $$Q_{hv} = \\frac{F}{P - v}$$
     *Trong đó:* $F$ là Tổng định phí (Fixed Cost); $P$ là Giá bán 1 đơn vị sản phẩm; $v$ là Biến phí 1 đơn vị sản phẩm; $(P - v)$ là Lãi trên biến phí đơn vị.
   - **Doanh thu hòa vốn ($DT_{hv}$ hoặc $BEP_S$):**
     $$DT_{hv} = Q_{hv} \\times P = \\frac{F}{1 - \\frac{v}{P}}$$
   - **Sản lượng cần thiết để đạt mức lợi nhuận mục tiêu ($\\Pi$):**
     $$Q = \\frac{F + \\Pi}{P - v}$$

2. 📚 **Đề cương ôn tập & Các chuyên đề trọng tâm môn Quản trị sản xuất:**
   - **Chương 1:** Tổng quan về Quản trị sản xuất và dịch vụ & Năng suất sản xuất.
   - **Chương 2:** Dự báo nhu cầu sản xuất (Bình quân di động, San bằng mũ, Hồi quy tuyến tính — bấm máy Casio).
   - **Chương 3:** Quyết định công suất & Điểm hòa vốn (BEP), Cây quyết định (EMV).
   - **Chương 4:** Định vị doanh nghiệp & Bố trí mặt bằng sản xuất.
   - **Chương 5:** Hoạch định tổng hợp (Aggregate Planning).
   - **Chương 6:** Quản trị hàng tồn kho (Mô hình **EOQ**, **POQ**, Khấu trừ theo số lượng **QDM**) & Hoạch định nhu cầu nguyên vật liệu (**MRP**).
   - **Chương 7:** Điều độ sản xuất (Nguyên tắc ưu tiên FCFS, SPT, EDD, CR & Nguyên tắc **Johnson** trên 2 máy / 3 máy).

3. 🔗 **Truy cập trực tiếp tài liệu, bài giải chi tiết & phần mềm trên website https://nguyenthitrucphuong.pages.dev/:**
   - 📘 [Bài giảng & Đề cương Quản trị sản xuất](https://nguyenthitrucphuong.pages.dev/study-corner/production-management)
   - ✍️ [Hướng dẫn giải bài tập Quản trị sản xuất có lời giải chi tiết](https://nguyenthitrucphuong.pages.dev/study-corner/production-management/exercise-solution-guide)
   - 📝 [Cấu trúc đề thi & Giải đề thi mẫu QTSX](https://nguyenthitrucphuong.pages.dev/study-corner/production-management/dethi)
   - 🧮 [Cách bấm máy tính Casio giải bài toán Dự báo & Hồi quy](https://nguyenthitrucphuong.pages.dev/study-corner/product-and-service-management/casio)
   - 💻 [Hướng dẫn thực hành phần mềm POM-QM for Windows](https://nguyenthitrucphuong.pages.dev/study-corner/production-management/poq) và tải bộ cài tại [Kho phần mềm (/software)](https://nguyenthitrucphuong.pages.dev/software).
   - ⚡ [Thi thử trắc nghiệm trực tuyến (50 câu / 60 phút)](https://nguyenthitrucphuong.pages.dev/ngan-hang-de-thi)

*(Để được giải đáp chuyên sâu thêm về bài tập trên lớp, bạn hãy xem tài liệu tại https://nguyenthitrucphuong.pages.dev/ hoặc liên hệ trực tiếp Giảng viên đứng lớp nhé!)*` + suffix;
  }

  if (/spss|cronbach|efa|hồi quy|pearson|likert|nghiên cứu khoa học|nckh|khảo sát/i.test(effLower)) {
    return prefix + `### 📊 HƯỚNG DẪN XỬ LÝ DỮ LIỆU SPSS & NGHIÊN CỨU KHOA HỌC (NGUYỄN THỊ TRÚC PHƯƠNG)

Trên hệ thống học liệu **https://nguyenthitrucphuong.pages.dev/spss**, quy trình chuẩn 5 bước xử lý dữ liệu định lượng SPSS cho Nghiên cứu khoa học & Khóa luận gồm:
1. **Mã hóa & Nhập liệu thang đo Likert 5 mức độ** (Làm sạch dữ liệu, phát hiện giá trị ngoại lai).
2. **Thống kê mô tả (Descriptive Statistics & Frequencies):** Phân tích cơ cấu mẫu khảo sát và giá trị trung bình (Mean), độ lệch chuẩn (Std. Deviation).
3. **Kiểm định độ tin cậy thang đo Cronbach's Alpha:** Điều kiện đạt chuẩn khi hệ số **$\\text{Cronbach's Alpha} \\ge 0,60$** và hệ số tương quan biến tổng (**Corrected Item-Total Correlation $\\ge 0,30$**).
4. **Phân tích nhân tố khám phá EFA (Exploratory Factor Analysis):** Kiểm định **$0,5 \\le \\text{KMO} \\le 1,0$**, kiểm định Bartlett có **$\\text{Sig.} < 0,05$**, Tổng phương sai trích (**Total Variance Explained $\\ge 50\\%$**), và hệ số tải nhân tố (**Factor Loading $\\ge 0,50$**).
5. **Phân tích tương quan Pearson & Hồi quy tuyến tính bội (Multiple Linear Regression):** Kiểm định độ phù hợp mô hình $R^2$ hiệu chỉnh, kiểm định $F$ ($\\text{Sig.} < 0,05$), hệ số $\\beta$ chuẩn hóa và kiểm tra đa cộng tuyến (**$\\text{VIF} < 2$** hoặc $< 10$).

🔗 **Tài liệu & Phần mềm trực tiếp trên website:**
- 📘 [Sổ tay Hướng dẫn xử lý dữ liệu SPSS từ A–Z](https://nguyenthitrucphuong.pages.dev/spss)
- 📋 [Mẫu bảng câu hỏi khảo sát NCKH sinh viên chuẩn](https://nguyenthitrucphuong.pages.dev/spss/nckhsv)
- 💾 [Tải bộ cài phần mềm IBM SPSS Statistics & POM-QM](https://nguyenthitrucphuong.pages.dev/software)` + suffix;
  }

  if (/thi online|thi trắc nghiệm|ngân hàng đề thi|50 câu|làm bài thi/i.test(effLower)) {
    return prefix + `### ⚡ HƯỚNG DẪN THI TRẮC NGHIỆM ONLINE (50 CÂU / 60 PHÚT) TRÊN NGUYỄN THỊ TRÚC PHƯƠNG

Hệ thống khảo thí trực tuyến tại **https://nguyenthitrucphuong.pages.dev/ngan-hang-de-thi** hỗ trợ sinh viên ôn luyện 10 học phần chuyên ngành (Quản trị học, Quản trị sản xuất, Quản trị sản xuất & dịch vụ, Marketing căn bản, Quản trị Marketing, Quản trị thương hiệu, Quản trị chiến lược, Kinh tế vi mô, Khởi nghiệp, Truyền thông Marketing tích hợp IMC):

1. **Bước 1 — Đăng ký thông tin dự thi:** Truy cập https://nguyenthitrucphuong.pages.dev/ngan-hang-de-thi, nhập Họ và tên, Mã số sinh viên (MSSV), Lớp học phần, chọn **Môn thi** và **Chế độ thi**:
   - *Đề thi chuẩn:* **50 câu — 60 phút**
   - *Đề kiểm tra giữa kỳ:* **20 câu — 30 phút**
   - *Ôn tập nhanh:* **10 câu (15 phút)** hoặc **5 câu (10 phút)**
2. **Bước 2 — Làm bài trực tuyến:** Hệ thống tự động đảo ngẫu nhiên câu hỏi và đáp án, có đồng hồ đếm ngược và bảng đánh dấu câu hỏi đã làm / chưa làm.
3. **Bước 3 — Chấm điểm & Lưu Bảng vàng:** Sau khi bấm **Nộp bài**, hệ thống chấm điểm tức thì theo thang điểm 10/100, hiển thị đáp án giải thích chi tiết từng câu, cấp **Phiếu kết quả thi trực tuyến** (hỗ trợ xuất file PDF/CSV) và ghi danh lên **Bảng Vàng Vinh Danh** trang chủ!` + suffix;
  }

  // ==========================================================================
  // INTENT 10: TRA CỨU TRỰC TIẾP TRONG 56 TRANG HỌC LIỆU & 28 MÃ ĐỀ CƯƠNG (/DCCT)
  // ==========================================================================
  const kbSearch = searchSiteKnowledgeBase(effectiveQuery);
  if (kbSearch.matchedCodes.length > 0 || kbSearch.matchedPages.length > 0) {
    let kbText = `### 📚 KẾT QUẢ TRA CỨU TỪ KHO DỮ LIỆU HỌC TẬP NGUYỄN THỊ TRÚC PHƯƠNG\n\n`;
    if (kbSearch.matchedCodes.length > 0) {
      kbText += `**1. Mã đề cương chi tiết (/dcct) khớp với truy vấn của bạn:**\n`;
      for (const c of kbSearch.matchedCodes) {
        kbText += `- 🔖 Mã **\`${c.code}\`**: ${c.title} — Tra cứu trực tiếp tại: https://nguyenthitrucphuong.pages.dev/dcct\n`;
      }
      kbText += `\n`;
    }
    if (kbSearch.matchedPages.length > 0) {
      kbText += `**Chuyên trang học liệu & tài liệu trên website:**\n`;
      for (const p of kbSearch.matchedPages) {
        kbText += `- 📖 **[${p.title}](https://nguyenthitrucphuong.pages.dev${p.route_path})**\n  > *Tóm tắt nội dung:* ${p.snippet}\n\n`;
      }
    }
    kbText += `💡 *Về phần kiến thức lý thuyết và giáo trình chuyên sâu của môn học, bạn hãy truy cập trực tiếp các đường link học liệu trên tại https://nguyenthitrucphuong.pages.dev/ hoặc liên hệ Thầy/Cô giảng viên đứng lớp để được hướng dẫn chi tiết nhé!*`;
    return prefix + kbText + suffix;
  }

  // Câu hỏi về lý thuyết môn học chung chung -> Điều hướng về trankimdinh.com theo đúng quy tắc PHẦN 2 Mục 3
  if (/(?:là gì|khái niệm|định nghĩa|phân tích mô hình|4p|stp|swot|pest|canvas|smart|clear|vi mô|vĩ mô|quản trị học|marketing|thương hiệu|khởi nghiệp)/i.test(effLower)) {
    if (isToro) {
      return prefix + `Tướng quân ơi, về phần kiến thức và giáo trình chuyên sâu của môn này, đồng đội hãy vào website **https://nguyenthitrucphuong.pages.dev/** (chuyên mục [Góc Học Tập 11 Chuyên Đề](https://nguyenthitrucphuong.pages.dev/study-corner)) để cày giáo trình chuẩn bài nhất nhé, hoặc liên hệ trực tiếp với Thầy/Cô giảng viên đứng lớp để được hướng dẫn chi tiết nha! 👦` + suffix;
    }
    return prefix + `Bạn ơi, đối với phần kiến thức lý thuyết và bài giảng chi tiết của môn học, bạn vui lòng truy cập website **https://nguyenthitrucphuong.pages.dev/** (chuyên mục [Góc Học Tập](https://nguyenthitrucphuong.pages.dev/study-corner)) để đọc tài liệu, hoặc trao đổi trực tiếp với Thầy/Cô giảng viên đứng lớp để được giải đáp tận tình nhất nhé! 🌷` + suffix;
  }

  // ==========================================================================
  // INTENT 11: MẪU CÂU BẮT BUỘC KHI GẶP NỘI DUNG NGOÀI QUY CHẾ / CHƯA ĐỦ DỮ LIỆU
  // ==========================================================================
  if (isToro) {
    return prefix + `Tướng quân ơi, ca này Toro chưa đủ dữ liệu để chốt đáp án đâu nè. Bò vàng không chơi hệ đoán mò đâu nha! Đồng đội liên hệ **Thánh Ks** (hoặc Thầy/Cô Cố vấn học tập, tra cứu tại https://nguyenthitrucphuong.pages.dev/ và https://sv.kthcm.edu.vn/) để được giải đáp chính xác nhé! 👦` + suffix;
  }
  return prefix + `Bạn ơi, phần này Susi chưa có đủ thông tin đáng tin cậy để trả lời. Để tránh làm bạn hiểu nhầm, bạn vui lòng liên hệ **Thánh Ks** (hoặc Thầy/Cô Cố vấn học tập, tra cứu tại https://nguyenthitrucphuong.pages.dev/ và https://sv.kthcm.edu.vn/) để được giải đáp chính xác nhé! 🌷` + suffix;
}
