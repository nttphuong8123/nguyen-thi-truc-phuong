export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: 'Trang chủ',
    href: '/',
    children: [
      { label: 'Giới thiệu Giảng viên', href: '/home/introduction' },
      { label: 'Hoạt động Giảng dạy', href: '/teaching' },
      { label: 'Cố vấn học tập (CVHT)', href: '/mentor' },
      { label: 'Góc chia sẻ - Tin tức', href: '/goc-chia-se' },
      { label: 'Kiến thức Marketing - AI', href: '/home/marketing' },
    ],
  },
  {
    label: 'Thi Online',
    href: '/ngan-hang-de-thi',
    badge: 'LIVE',
  },
  {
    label: 'Góc học tập',
    href: '/study-corner',
    children: [
      {
        label: '1. Marketing căn bản',
        href: '/study-corner/principles-of-marketing',
        children: [
          { label: 'Bài giảng Marketing căn bản', href: '/study-corner/principles-of-marketing' },
          { label: 'Đề thi thử Marketing căn bản', href: '/study-corner/principles-of-marketing/test' },
        ],
      },
      {
        label: '2. Kinh tế vi mô',
        href: '/study-corner/microeconomics',
        children: [
          { label: 'Bài giảng Kinh tế vi mô', href: '/study-corner/microeconomics' },
          { label: 'Đề thi thử Kinh tế vi mô', href: '/study-corner/microeconomics/microeconomics-test' },
        ],
      },
      {
        label: '3. Hướng dẫn thực tập',
        href: '/study-corner/internships',
        children: [
          { label: 'Quy trình & Hướng dẫn chung', href: '/study-corner/internships' },
          { label: 'Biểu mẫu & Đề cương HCE', href: '/study-corner/internships/hcehdtt' },
          { label: 'Hướng dẫn báo cáo HCE', href: '/study-corner/internships/huong-dan-bao-cao-hce' },
          { label: 'Hướng dẫn báo cáo CTIM', href: '/study-corner/internships/huong-dan-bao-cao-ctim' },
          { label: 'Kho 19 mẫu báo cáo thực tập', href: '/study-corner/internships/sample' },
          { label: 'Tra cứu đề cương chi tiết', href: '/dcct' },
          { label: 'Cách trích dẫn tài liệu tham khảo', href: '/study-corner/internships/tailieuthamkhao' },
        ],
      },
      {
        label: '4. Khởi nghiệp',
        href: '/study-corner/entrepreneurship',
        children: [
          { label: 'Bài giảng Khởi nghiệp', href: '/study-corner/entrepreneurship' },
          { label: 'Cấu trúc dự án mẫu', href: '/study-corner/entrepreneurship/cau-truc-du-an-mau' },
          { label: 'Mô hình PEST & Đánh giá PEC', href: '/study-corner/entrepreneurship/pest' },
          { label: 'Hành vi người tiêu dùng', href: '/study-corner/entrepreneurship/hanh-vi-nguoi-tieu-dung' },
        ],
      },
      {
        label: '5. Quản trị dự án',
        href: '/study-corner/project-management',
        children: [
          { label: 'Giáo trình Quản trị dự án (8 chương)', href: '/study-corner/project-management' },
          { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/project-management/intro' },
        ],
      },
      {
        label: '6. Quản trị tài chính',
        href: '/study-corner/financial-management',
        children: [
          { label: 'Giáo trình Quản trị tài chính (8 chương)', href: '/study-corner/financial-management' },
          { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/financial-management/intro' },
        ],
      },
      {
        label: '7. Quản trị rủi ro',
        href: '/study-corner/risk-management',
        children: [
          { label: 'Giáo trình Quản trị rủi ro (5 chương)', href: '/study-corner/risk-management' },
          { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/risk-management/intro' },
        ],
      },
      {
        label: '8. Quản trị chiến lược',
        href: '/study-corner/strategic-management',
        children: [
          { label: 'Giáo trình Quản trị chiến lược (6 chương)', href: '/study-corner/strategic-management' },
          { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/strategic-management/intro' },
        ],
      },
      {
        label: 'Chuyên đề IMC (Truyền thông)',
        href: '/study-corner/imc',
      },
    ],
  },
  {
    label: 'SPSS - Phần mềm',
    href: '/spss',
    children: [
      { label: 'Hướng dẫn xử lý dữ liệu SPSS', href: '/spss' },
      { label: 'Khảo sát NCKH Sinh viên', href: '/spss/nckhsv' },
      { label: 'Kho Phần mềm (SPSS, POM-QM)', href: '/software' },
    ],
  },
  {
    label: 'Liên hệ',
    href: '/contact',
    children: [
      { label: 'Thông tin Liên hệ - Góp ý', href: '/contact' },
      { label: 'Phiếu Đánh giá Giảng viên', href: '/danh-gia-giang-vien' },
      { label: '🤖 Trợ lý AI Toro với Susi', href: '/tro-ly-toro' },
    ],
  },
];
