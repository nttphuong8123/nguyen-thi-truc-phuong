// Module Quản Lý & Phân Phối Lời Chúc Mừng Sinh Nhật Chuẩn Xác & Chống Trùng Lặp Tuyệt Đối
// Thiết kế dành riêng cho nguyenthitrucphuong

export interface BirthdayTemplate {
  id: number;
  content: string;
  category: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface BirthdayAssignment {
  id: number;
  year: number;
  month: number;
  person_id: number;
  template_id: number;
  wish_content: string;
  assigned_at: string;
}

export interface BirthdayRecipientDetail {
  person_id: number;
  full_name: string;
  role_or_class: string;
  birth_day: number;
  birth_month: number;
  avatar_emoji: string;
  template_id: number | null;
  wish_content: string;
  assigned_at: string | null;
  is_assigned: boolean;
}

export interface BirthdayStats {
  totalTemplates: number;
  activeTemplates: number;
  usedThisMonth: number;
  remainingThisMonth: number;
  monthPersonsCount: number;
  assignedPersonsCount: number;
  unassignedPersonsCount: number;
  isSufficient: boolean;
  missingCount: number;
  currentMonth: number;
  currentYear: number;
}

/**
 * Lấy ngày, tháng, năm chuẩn theo múi giờ Việt Nam (Asia/Ho_Chi_Minh - UTC+7)
 */
export function getVietnamDate(date = new Date()): { year: number; month: number; day: number } {
  const vnString = date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
  const vn = new Date(vnString);
  return {
    year: vn.getFullYear(),
    month: vn.getMonth() + 1,
    day: vn.getDate(),
  };
}

/**
 * Thuật toán xáo trộn ngẫu nhiên Fisher-Yates (đảm bảo tính ngẫu nhiên chuẩn toán học, không tuần tự)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
