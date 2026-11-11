export interface SubjectLink {
  label: string;
  href: string;
  tag: string;
  highlight?: boolean;
}

export interface StudySubject {
  icon: string;
  title: string;
  subtitle: string;
  category: 'Marketing' | 'Kinh tế & Khởi nghiệp' | 'Quản trị';
  description: string;
  mainHref: string;
  links: SubjectLink[];
}

export const STUDY_SUBJECTS: StudySubject[] = [
  {
    icon: '🎯',
    title: '1. Marketing căn bản',
    subtitle: 'Principles of Marketing',
    category: 'Marketing',
    description: 'Hệ thống Marketing-mix 4P/7P, phân đoạn thị trường, chọn thị trường mục tiêu và thấu hiểu hành vi khách hàng.',
    mainHref: '/study-corner/principles-of-marketing',
    links: [
      { label: 'Giáo trình Marketing căn bản', href: '/study-corner/principles-of-marketing', tag: 'Bài giảng' },
      { label: 'Đề thi thử trắc nghiệm Marketing căn bản', href: '/study-corner/principles-of-marketing/test', tag: 'Đề thi thử', highlight: true },
    ],
  },
  {
    icon: '📊',
    title: '2. Kinh tế vi mô',
    subtitle: 'Microeconomics',
    category: 'Kinh tế & Khởi nghiệp',
    description: 'Quy luật Cung - Cầu, độ co giãn, lý thuyết hành vi người tiêu dùng, chi phí sản xuất và các cấu trúc thị trường.',
    mainHref: '/study-corner/microeconomics',
    links: [
      { label: 'Giáo trình Kinh tế vi mô', href: '/study-corner/microeconomics', tag: 'Bài giảng' },
      { label: 'Đề thi thử trắc nghiệm Kinh tế vi mô', href: '/study-corner/microeconomics/microeconomics-test', tag: 'Đề thi thử', highlight: true },
    ],
  },
  {
    icon: '🎓',
    title: '3. Hướng dẫn thực tập tốt nghiệp',
    subtitle: 'Graduation Internship Guide & Templates',
    category: 'Quản trị',
    description: 'Quy chuẩn đề cương chi tiết, phương pháp nghiên cứu, 19 báo cáo thực tập mẫu và biểu mẫu chuẩn.',
    mainHref: '/study-corner/internships',
    links: [
      { label: 'Bài giảng & Quy trình viết báo cáo thực tập', href: '/study-corner/internships', tag: 'Bài giảng' },
      { label: 'Biểu mẫu & Đề cương chi tiết', href: '/study-corner/internships/hcehdtt', tag: 'Biểu mẫu' },
      { label: 'Biểu mẫu trình bày báo cáo HCE & CTIM', href: '/study-corner/internships/huong-dan-bao-cao-hce', tag: 'Biểu mẫu' },
      { label: 'Kho 19 Mẫu báo cáo thực tập hoàn chỉnh', href: '/study-corner/internships/sample', tag: 'Mẫu BC' },
    ],
  },
  {
    icon: '🚀',
    title: '4. Khởi nghiệp',
    subtitle: 'Entrepreneurship & Startup',
    category: 'Kinh tế & Khởi nghiệp',
    description: 'Xây dựng mô hình kinh doanh Canvas, thẩm định dự án khởi nghiệp, mô hình PEST và rèn luyện kỹ năng doanh nhân.',
    mainHref: '/study-corner/entrepreneurship',
    links: [
      { label: 'Bài giảng Khởi nghiệp', href: '/study-corner/entrepreneurship', tag: 'Bài giảng' },
      { label: 'Cấu trúc thuyết minh Dự án mẫu', href: '/study-corner/entrepreneurship/cau-truc-du-an-mau', tag: 'Dự án mẫu' },
      { label: 'Mô hình PEST & Đánh giá năng lực PEC', href: '/study-corner/entrepreneurship/pest', tag: 'PEST', highlight: true },
      { label: 'Phân tích Hành vi người tiêu dùng', href: '/study-corner/entrepreneurship/hanh-vi-nguoi-tieu-dung', tag: 'Chuyên đề' },
    ],
  },
  {
    icon: '📋',
    title: '5. Quản trị dự án',
    subtitle: 'Project Management (MH38)',
    category: 'Quản trị',
    description: 'Chủ biên: ThS. Nguyễn Thị Trúc Phương. Thẩm định lựa chọn (NPV, IRR, PP, PI), cấu trúc WBS, tiến độ Gantt/CPM/PERT, cân bằng nguồn lực và phân tích EVM.',
    mainHref: '/study-corner/project-management',
    links: [
      { label: 'Giáo trình Quản trị dự án (8 chương)', href: '/study-corner/project-management', tag: 'Giáo trình', highlight: true },
      { label: 'Đề cương chi tiết & Giới thiệu học phần', href: '/study-corner/project-management/intro', tag: 'Đề cương' },
    ],
  },
  {
    icon: '📈',
    title: '6. Quản trị tài chính',
    subtitle: 'Financial Management (MH21)',
    category: 'Quản trị',
    description: 'Chủ biên: ThS. Nguyễn Thị Trúc Phương. Phân tích BCTC & mô hình DuPont, điểm hòa vốn, đòn bẩy DOL/DFL/DCL, vốn lưu động EOQ, định giá chứng khoán & WACC, cơ cấu vốn.',
    mainHref: '/study-corner/financial-management',
    links: [
      { label: 'Giáo trình Quản trị tài chính (8 chương)', href: '/study-corner/financial-management', tag: 'Giáo trình', highlight: true },
      { label: 'Đề cương chi tiết & Giới thiệu học phần', href: '/study-corner/financial-management/intro', tag: 'Đề cương' },
    ],
  },
  {
    icon: '🛡️',
    title: '7. Quản trị rủi ro',
    subtitle: 'Risk Management (MH24)',
    category: 'Quản trị',
    description: 'Đồng tác giả: ThS. Nguyễn Thị Trúc Phương. Quy trình 5 bước QTRR, nhận dạng rủi ro, đo lường thống kê (kỳ vọng, độ lệch chuẩn, Ma trận 5x5), kiểm soát và tài trợ rủi ro.',
    mainHref: '/study-corner/risk-management',
    links: [
      { label: 'Giáo trình Quản trị rủi ro (5 chương)', href: '/study-corner/risk-management', tag: 'Giáo trình', highlight: true },
      { label: 'Đề cương chi tiết & Giới thiệu học phần', href: '/study-corner/risk-management/intro', tag: 'Đề cương' },
    ],
  },
  {
    icon: '♟️',
    title: '8. Quản trị chiến lược',
    subtitle: 'Strategic Management (MH17)',
    category: 'Quản trị',
    description: 'Khoa QTKD HCE. Phân tích môi trường PESTEL & 5 lực lượng Porter, sứ mạng SMART, chiến lược cạnh tranh, ma trận SWOT, BCG, QSPM và Thẻ điểm cân bằng (BSC).',
    mainHref: '/study-corner/strategic-management',
    links: [
      { label: 'Giáo trình Quản trị chiến lược (6 chương)', href: '/study-corner/strategic-management', tag: 'Giáo trình', highlight: true },
      { label: 'Đề cương chi tiết & Giới thiệu học phần', href: '/study-corner/strategic-management/intro', tag: 'Đề cương' },
    ],
  },
];
