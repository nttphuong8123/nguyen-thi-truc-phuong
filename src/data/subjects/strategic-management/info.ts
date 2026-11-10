export interface ChapterMeta {
  id: string;
  number: number;
  title: string;
  slug: string;
  description: string;
  estimatedReadingMinutes: number;
}

export interface SubjectInfo {
  id: string;
  code: string;
  title: string;
  englishTitle: string;
  credits: number;
  category: 'Quản trị';
  lecturer: string;
  academicTitle: string;
  institution: string;
  department: string;
  targetAudience: string;
  prerequisites: string;
  description: string;
  objectives: {
    knowledge: string[];
    skills: string[];
    autonomy: string[];
  };
  chapters: ChapterMeta[];
  references: string[];
}

export const strategicManagementInfo: SubjectInfo = {
  id: 'strategic-management',
  code: 'MH17',
  title: 'QUẢN TRỊ CHIẾN LƯỢC',
  englishTitle: 'Strategic Management',
  credits: 3,
  category: 'Quản trị',
  lecturer: 'Khoa Quản trị Kinh doanh — HCE',
  academicTitle: 'Ban Giảng viên Quản trị Chiến lược — ThS. Lê Thị Hồng Hà (Chủ biên) & Giảng viên Khoa QTKD',
  institution: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE)',
  department: 'Khoa Quản trị Kinh doanh',
  targetAudience: 'Sinh viên Cao đẳng & Đại học ngành Quản trị kinh doanh, Marketing, Ngoại thương, Quản trị chuỗi cung ứng',
  prerequisites: 'Quản trị kinh doanh đại cương, Marketing căn bản, Quản trị tài chính, Kinh tế vi mô',
  description: 'Giáo trình Quản trị chiến lược trang bị cho sinh viên tư duy định hướng dài hạn và khung năng lực hoạch định, thực thi, đánh giá chiến lược kinh doanh toàn diện: từ nghiên cứu môi trường vĩ mô (PESTEL) và vi mô (5 áp lực cạnh tranh Porter, chuỗi giá trị nội bộ, ma trận EFE, IFE, CPM); thiết lập sứ mạng (Mission), tầm nhìn (Vision) và mục tiêu SMART; các chiến lược cấp công ty, SBU và chức năng; công cụ ra quyết định chiến lược (SWOT, SPACE, BCG, IE, QSPM) đến thực thi chiến lược và kiểm tra đánh giá qua Thẻ điểm cân bằng (Balanced Scorecard - BSC).',
  objectives: {
    knowledge: [
      'Nắm vững khái niệm chiến lược kinh doanh, 3 cấp chiến lược (công ty, đơn vị kinh doanh SBU, chức năng) và tiến trình quản trị chiến lược 3 giai đoạn.',
      'Phân tích sâu sắc môi trường kinh doanh vĩ mô qua mô hình PESTEL và vi mô ngành qua mô hình 5 áp lực của Michael Porter.',
      'Xây dựng thành thạo ma trận đánh giá các yếu tố ngoại vi (EFE), nội vi (IFE) và ma trận hình ảnh cạnh tranh (CPM).',
      'Nắm vững phương pháp thiết lập Tuyên bố sứ mạng (Mission Statement) chuẩn mực 9 yếu tố và hệ thống mục tiêu theo nguyên tắc SMART.',
      'Hiểu rõ bản chất, điều kiện áp dụng các chiến lược tăng trưởng tập trung, hội nhập, đa dạng hóa và 3 chiến lược cạnh tranh tổng quát Porter.',
      'Thành thạo ứng dụng bộ công cụ ma trận ra quyết định: SWOT, SPACE, BCG, IE và ma trận lượng hóa QSPM.',
      'Nắm vững phương pháp chuyển hóa chiến lược thành mục tiêu thường niên, xây dựng chính sách, phân bổ nguồn lực và điều chỉnh cơ cấu tổ chức.',
      'Áp dụng quy trình kiểm tra đánh giá chiến lược 3 bước và hệ thống Thẻ điểm cân bằng (Balanced Scorecard - BSC).'
    ],
    skills: [
      'Kỹ năng thu thập, xử lý thông tin thị trường và chấm điểm trọng số cho các ma trận EFE, IFE, CPM.',
      'Kỹ năng phối hợp các yếu tố S-W-O-T để sáng tạo các phương án chiến lược khả thi.',
      'Kỹ năng phân bổ và cân bằng danh mục sản phẩm/đơn vị kinh doanh trên ma trận BCG và Ma trận vị thế chiến lược SPACE.',
      'Kỹ năng thiết lập các chỉ số đo lường hiệu năng cốt lõi (KPI) gắn liền 4 khía cạnh của Balanced Scorecard.',
      'Kỹ năng thuyết trình, bảo vệ đề án chiến lược và quản trị sự thay đổi trong tổ chức.'
    ],
    autonomy: [
      'Rèn luyện tầm nhìn chiến lược, tư duy phản biện và khả năng thích ứng linh hoạt trước biến động của môi trường kinh doanh.',
      'Thể hiện tinh thần trách nhiệm, bản lĩnh lãnh đạo và đạo đức nghề nghiệp trong việc định hình hướng đi tương lai của tổ chức.'
    ]
  },
  chapters: [
    {
      id: 'chuong1',
      number: 1,
      title: 'Nhập môn quản trị chiến lược',
      slug: 'nhap-mon-quan-tri-chien-luoc',
      description: 'Khái niệm chiến lược kinh doanh, vai trò, 3 cấp chiến lược (công ty, SBU, chức năng) và tiến trình 3 giai đoạn quản trị chiến lược toàn diện.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong2',
      number: 2,
      title: 'Nghiên cứu các yếu tố môi trường kinh doanh',
      slug: 'nghien-cuu-cac-yeu-to-moi-truong-kinh-doanh',
      description: 'Môi trường vĩ mô PESTEL, môi trường ngành mô hình 5 áp lực cạnh tranh của Porter, chuỗi giá trị nội bộ, ma trận EFE, IFE và ma trận CPM.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong3',
      number: 3,
      title: 'Xác định nhiệm vụ và mục tiêu',
      slug: 'xac-dinh-nhiem-vu-va-muc-tieu',
      description: 'Tuyên bố sứ mạng (Mission Statement) 9 thành phần, tầm nhìn chiến lược (Vision), mục tiêu chiến lược theo chuẩn SMART và các mục tiêu tăng trưởng.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong4',
      number: 4,
      title: 'Lựa chọn và xây dựng chiến lược',
      slug: 'lua-chon-va-xay-dung-chien-luoc',
      description: 'Chiến lược cấp công ty (tập trung, hội nhập, đa dạng hóa), chiến lược cạnh tranh Porter, và bộ công cụ ma trận quyết định SWOT, SPACE, BCG, IE, QSPM.',
      estimatedReadingMinutes: 35
    },
    {
      id: 'chuong5',
      number: 5,
      title: 'Thực hiện chiến lược',
      slug: 'thuc-hien-chien-luoc',
      description: 'Thiết lập mục tiêu hàng năm, xây dựng chính sách hỗ trợ, phân bổ nguồn lực, điều chỉnh cơ cấu tổ chức và giải quyết các vấn đề Marketing, Tài chính, R&D.',
      estimatedReadingMinutes: 28
    },
    {
      id: 'chuong6',
      number: 6,
      title: 'Kiểm tra và đánh giá chiến lược',
      slug: 'kiem-tra-danh-gia-chien-luoc',
      description: 'Tiến trình kiểm tra đánh giá chiến lược 3 bước, thiết lập chuẩn đánh giá, đo lường thành quả và quản trị hiệu suất với Thẻ điểm cân bằng (Balanced Scorecard).',
      estimatedReadingMinutes: 25
    }
  ],
  references: [
    'Lê Thị Hồng Hà (Chủ biên), Nguyễn Thị Hiền Lương, Nguyễn Vĩnh Phước, Lê Đức Thọ (2021), Giáo trình Quản trị chiến lược, Trường Cao đẳng Kinh tế TP. Hồ Chí Minh.',
    'Fred R. David, Forest R. David (2017), Strategic Management: A Competitive Advantage Approach, Concepts and Cases, 16th Edition, Pearson.',
    'Michael E. Porter (2008), On Competition, Harvard Business Review Press.',
    'Nguyễn Thị Liên Diệp (2018), Quản trị chiến lược, NXB Thống Kê.',
    'Robert S. Kaplan, David P. Norton (1996), The Balanced Scorecard: Translating Strategy into Action, Harvard Business School Press.'
  ]
};
