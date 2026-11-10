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

export const projectManagementInfo: SubjectInfo = {
  id: 'project-management',
  code: 'MH38',
  title: 'QUẢN TRỊ DỰ ÁN',
  englishTitle: 'Project Management',
  credits: 3,
  category: 'Quản trị',
  lecturer: 'ThS. Nguyễn Thị Trúc Phương',
  academicTitle: 'Chủ biên — Thạc sĩ Quản trị Kinh doanh',
  institution: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE)',
  department: 'Khoa Quản trị Kinh doanh',
  targetAudience: 'Sinh viên bậc Cao đẳng & Đại học khối ngành Kinh tế, Quản trị kinh doanh, Kinh doanh quốc tế',
  prerequisites: 'Quản trị học đại cương, Nguyên lý kế toán, Thống kê kinh doanh',
  description: 'Học phần Quản trị dự án trang bị cho sinh viên hệ thống lý thuyết chuẩn mực và công cụ thực hành quản trị dự án hiện đại từ khâu hình thành ý tưởng, thẩm định lựa chọn dự án (NPV, IRR, PP, PI), thiết lập cơ cấu tổ chức, lập kế hoạch và phân rã công việc (WBS), lập tiến độ (Gantt, CPM, PERT), phân bổ và cân bằng nguồn lực đến kỹ thuật kiểm soát giá trị thu được (EVM) và quy trình nghiệm thu, kết thúc dự án.',
  objectives: {
    knowledge: [
      'Nắm vững bản chất của đầu tư, chu kỳ sống của dự án và các phương thức tài trợ dự án.',
      'Thành thạo phương pháp thẩm định tài chính dự án qua các chỉ tiêu định lượng: NPV, IRR, thời gian hoàn vốn (PP), chỉ số sinh lời (PI).',
      'Phân tích ưu nhược điểm của 3 mô hình tổ chức dự án: chức năng, chuyên trách dự án và ma trận.',
      'Hiểu rõ phương pháp lập kế hoạch tổng thể, xây dựng cơ cấu phân rã công việc WBS và ước tính ngân sách theo các kỹ thuật chuẩn.',
      'Nắm vững phương pháp lập tiến độ dự án bằng sơ đồ thanh Gantt, sơ đồ mạng AOA/AON và kỹ thuật đường găng CPM/PERT.',
      'Vận dụng hệ thống phân tích giá trị thu được (Earned Value Management - EVM) để giám sát chi phí và tiến độ dự án.',
      'Thực hiện chuẩn mực quy trình đánh giá, kiểm toán và kết thúc bàn giao dự án.'
    ],
    skills: [
      'Kỹ năng tính toán dòng tiền, chiết khấu và đánh giá dự án trên phần mềm bảng tính và máy tính tài chính.',
      'Kỹ năng phân rã mục tiêu dự án thành các gói công việc cụ thể WBS.',
      'Kỹ năng xác định đường găng (Critical Path) và các khoảng thời gian dự trữ (Float/Slack).',
      'Kỹ năng giải quyết xung đột tài nguyên và điều hòa nguồn lực trong điều kiện thời gian và ngân sách giới hạn.',
      'Kỹ năng tính toán và diễn giải các chỉ số biến sai CV, SV và hiệu năng CPI, SPI trong quản trị thực tế.',
      'Kỹ năng soạn thảo báo cáo tổng kết dự án và lập biên bản nghiệm thu chuyển giao.'
    ],
    autonomy: [
      'Rèn luyện tư duy hệ thống, khả năng lập kế hoạch có kỷ luật và định hướng mục tiêu.',
      'Nâng cao tinh thần trách nhiệm trong quản lý ngân sách, cam kết thời hạn và phối hợp nhóm đa chức năng.',
      'Tuân thủ đạo đức nghề nghiệp và trách nhiệm xã hội trong quyết định đầu tư và vận hành dự án.'
    ]
  },
  chapters: [
    {
      id: 'chuong1',
      number: 1,
      title: 'Tổng quan về quản trị dự án',
      slug: 'tong-quan-ve-quan-tri-du-an',
      description: 'Bản chất của đầu tư, phân loại dự án đầu tư, chu kỳ sống của dự án, các yếu tố ảnh hưởng đến dòng ngân lưu và khung quản trị dự án.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong2',
      number: 2,
      title: 'Lựa chọn dự án',
      slug: 'lua-chon-du-an',
      description: 'Tiêu chí đánh giá định lượng (PP, NPV, IRR, PI) và tiêu chí định tính (Checklist, Ma trận cho điểm Scoring Model).',
      estimatedReadingMinutes: 28
    },
    {
      id: 'chuong3',
      number: 3,
      title: 'Tổ chức dự án',
      slug: 'to-chuc-du-an',
      description: 'Ba mô hình cơ cấu tổ chức dự án (Chức năng, Chuyên trách, Ma trận) và kỹ năng xây dựng, lãnh đạo đội ngũ dự án.',
      estimatedReadingMinutes: 20
    },
    {
      id: 'chuong4',
      number: 4,
      title: 'Lập kế hoạch và ngân sách dự án',
      slug: 'lap-ke-hoach-va-ngan-sach-du-an',
      description: 'Quy trình lập kế hoạch dự án, cấu trúc phân chia công việc WBS, kỹ thuật ước lượng chi phí Top-down và Bottom-up.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong5',
      number: 5,
      title: 'Lập tiến độ dự án',
      slug: 'lap-tien-do-du-an',
      description: 'Sơ đồ Gantt, Sơ đồ mạng AOA/AON, phương pháp đường găng CPM, kỹ thuật ước lượng 3 mốc thời gian PERT và thời gian dự trữ.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong6',
      number: 6,
      title: 'Phân bổ nguồn lực',
      slug: 'phan-bo-nguon-luc',
      description: 'Quy tắc phân bổ nguồn lực, giải quyết nút thắt tài nguyên, kỹ thuật san bằng tài nguyên (Resource Leveling) và tối ưu hóa thời gian - chi phí.',
      estimatedReadingMinutes: 20
    },
    {
      id: 'chuong7',
      number: 7,
      title: 'Kiểm soát dự án',
      slug: 'kiem-soat-du-an',
      description: 'Tiến trình kiểm soát, phân tích biến sai và phương pháp quản trị giá trị thu được Earned Value Management (EVM: PV, EV, AC, CPI, SPI).',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong8',
      number: 8,
      title: 'Đánh giá và kết thúc dự án',
      slug: 'danh-gia-va-ket-thuc-du-an',
      description: 'Tiêu chuẩn đánh giá, kiểm toán dự án, 4 hình thức kết thúc dự án, quy trình bàn giao nghiệm thu và báo cáo tổng kết.',
      estimatedReadingMinutes: 20
    }
  ],
  references: [
    'Nguyễn Thị Trúc Phương (Chủ biên) (2021), Giáo trình Quản trị dự án, Trường Cao đẳng Kinh tế TP. Hồ Chí Minh.',
    'Project Management Institute - PMI (2021), A Guide to the Project Management Body of Knowledge (PMBOK Guide), 7th Edition.',
    'Trần Ngọc Thơ (2018), Quản trị tài chính doanh nghiệp, NXB Tài Chính.',
    'Jack R. Meredith, Samuel J. Mantel Jr. (2017), Project Management: A Managerial Approach, John Wiley & Sons.',
    'Kerzner, H. (2017), Project Management: A Systems Approach to Planning, Scheduling, and Controlling, Wiley.'
  ]
};
