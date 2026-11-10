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

export const riskManagementInfo: SubjectInfo = {
  id: 'risk-management',
  code: 'MH24',
  title: 'QUẢN TRỊ RỦI RO',
  englishTitle: 'Risk Management',
  credits: 3,
  category: 'Quản trị',
  lecturer: 'ThS. Nguyễn Thị Trúc Phương (Đồng tác giả)',
  academicTitle: 'Thạc sĩ Quản trị Kinh doanh — Khoa Quản trị Kinh doanh',
  institution: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE)',
  department: 'Khoa Quản trị Kinh doanh',
  targetAudience: 'Sinh viên Cao đẳng & Đại học ngành Quản trị kinh doanh, Tài chính, Bảo hiểm, Ngoại thương',
  prerequisites: 'Quản trị kinh doanh đại cương, Xác suất thống kê, Kinh tế vi mô',
  description: 'Giáo trình Quản trị rủi ro trang bị cho sinh viên năng lực nhận dạng, đo lường lượng hóa và xử lý rủi ro trong hoạt động kinh doanh: từ quy trình 5 bước QTRR chuẩn mực, các công cụ nhận dạng rủi ro (lưu đồ, kiểm toán BCTC, bảng hỏi), kỹ thuật đo lường rủi ro định lượng (xác suất, kỳ vọng tổn thất, độ lệch chuẩn, ma trận rủi ro 5x5) đến các chiến lược kiểm soát rủi ro (né tránh, ngăn ngừa, giảm thiểu, chuyển giao) và kỹ thuật tài trợ rủi ro (tự bảo hiểm, quỹ dự phòng, bảo hiểm thương mại).',
  objectives: {
    knowledge: [
      'Phân biệt rõ ràng khái niệm rủi ro, nguy cơ rủi ro (Peril), mối hiểm họa (Hazard) và tổn thất (Loss).',
      'Phân loại chính xác các nhóm rủi ro: thuần túy vs suy đoán, tĩnh vs động, đặc thù vs hệ thống.',
      'Hiểu rõ quy trình 5 bước quản trị rủi ro chuẩn mực của doanh nghiệp.',
      'Thành thạo các phương pháp nhận dạng rủi ro: bảng câu hỏi, phân tích BCTC, thanh tra hiện trường, sơ đồ lưu trình và kỹ thuật Delphi.',
      'Vận dụng các công cụ thống kê để lượng hóa rủi ro: xác suất p, tổn thất kỳ vọng E(X), phương sai, độ lệch chuẩn và hệ số biến thiên CV.',
      'Xây dựng và ứng dụng Ma trận đánh giá rủi ro (Risk Matrix) kết hợp giữa tần suất và mức độ nghiêm trọng.',
      'Hiểu bản chất và điều kiện vận dụng 5 biện pháp kiểm soát rủi ro: né tránh, ngăn ngừa, giảm thiểu, đa dạng hóa và chuyển giao phi bảo hiểm.',
      'Nắm vững các phương thức tài trợ rủi ro: tự bảo hiểm, quỹ dự phòng và các nguyên tắc pháp lý bảo hiểm thương mại.'
    ],
    skills: [
      'Kỹ năng lập Sổ đăng ký rủi ro (Risk Register) và phân loại ưu tiên xử lý rủi ro.',
      'Kỹ năng tính toán tổn thất kỳ vọng và độ lệch chuẩn của danh mục tài sản/dự án đầu tư.',
      'Kỹ năng thiết kế các giải pháp phòng ngừa, kế hoạch ứng phó khẩn cấp và phục hồi hoạt động sau thảm họa.',
      'Kỹ năng đàm phán hợp đồng bảo hiểm và lập hồ sơ khiếu nại bồi thường bảo hiểm thương mại.'
    ],
    autonomy: [
      'Phát triển thái độ chủ động, cảnh giác và tư duy phòng ngừa rủi ro từ sớm trong mọi quyết định quản trị.',
      'Ý thức sâu sắc về an toàn lao động, trách nhiệm bảo vệ tài sản doanh nghiệp và tuân thủ các quy định an toàn pháp lý.'
    ]
  },
  chapters: [
    {
      id: 'chuong1',
      number: 1,
      title: 'Tổng quan về quản trị rủi ro',
      slug: 'tong-quan-ve-quan-tri-rui-ro',
      description: 'Định nghĩa rủi ro, hiểm họa, tổn thất, phân loại rủi ro, quy trình 5 bước quản trị rủi ro doanh nghiệp và vai trò của giám đốc rủi ro CRO.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong2',
      number: 2,
      title: 'Nhận dạng rủi ro',
      slug: 'nhan-dang-rui-ro',
      description: 'Phương pháp bảng câu hỏi, phân tích báo cáo tài chính, sơ đồ lưu trình nghiệp vụ, thanh tra hiện trường, phương pháp Delphi và lập sổ rủi ro.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong3',
      number: 3,
      title: 'Đo lường rủi ro',
      slug: 'do-luong-rui-ro',
      description: 'Đo lường xác suất, kỳ vọng tổn thất E(X), phương sai, độ lệch chuẩn, hệ số biến thiên CV, Ma trận đánh giá rủi ro 5x5 và ứng dụng ra quyết định đầu tư.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong4',
      number: 4,
      title: 'Kiểm soát rủi ro',
      slug: 'kiem-soat-rui-ro',
      description: 'Chiến lược né tránh rủi ro, ngăn ngừa tổn thất, giảm thiểu tổn thất, đa dạng hóa rủi ro và chuyển giao rủi ro phi bảo hiểm qua hợp đồng.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong5',
      number: 5,
      title: 'Tài trợ rủi ro',
      slug: 'tai-tro-rui-ro',
      description: 'Tự tài trợ rủi ro (quỹ dự phòng, công ty bảo hiểm nội bộ captive), chuyển giao qua bảo hiểm thương mại và 4 nguyên tắc pháp lý bảo hiểm cơ bản.',
      estimatedReadingMinutes: 25
    }
  ],
  references: [
    'Nguyễn Ngọc Thuận (Chủ biên), Nguyễn Thị Trúc Phương, Lê Thị Hồng Hà, Huỳnh Thị Quỳnh Tuyên, Trương Thị Hoài Phương (2021), Giáo trình Quản trị rủi ro, Trường Cao đẳng Kinh tế TP. Hồ Chí Minh.',
    'Đoàn Thị Hồng Vân (2018), Quản trị rủi ro và bảo hiểm trong kinh doanh, NXB Lao Động Xã Hội.',
    'George E. Rejda, Michael J. McNamara (2020), Principles of Risk Management and Insurance, Pearson.',
    'ISO 31000:2018 - Risk management — Guidelines, International Organization for Standardization.'
  ]
};
