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

export const financialManagementInfo: SubjectInfo = {
  id: 'financial-management',
  code: 'MH21',
  title: 'QUẢN TRỊ TÀI CHÍNH',
  englishTitle: 'Financial Management',
  credits: 3,
  category: 'Quản trị',
  lecturer: 'ThS. Nguyễn Thị Trúc Phương',
  academicTitle: 'Chủ biên — Thạc sĩ Quản trị Kinh doanh',
  institution: 'Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (HCE)',
  department: 'Khoa Quản trị Kinh doanh',
  targetAudience: 'Sinh viên Cao đẳng & Đại học ngành Quản trị kinh doanh, Tài chính - Ngân hàng, Kế toán, Kinh doanh quốc tế',
  prerequisites: 'Nguyên lý kế toán, Kinh tế vi mô, Thống kê kinh doanh',
  description: 'Giáo trình Quản trị tài chính cung cấp hệ thống kiến thức toàn diện và nền tảng thực hành tài chính doanh nghiệp: từ phân tích báo cáo tài chính (hệ thống tỷ số & mô hình DuPont), hoạch định lợi nhuận và đòn bẩy kinh doanh/tài chính (BEP, DOL, DFL, DCL), quản trị vốn lưu động (tiền mặt, khoản phải thu, hàng tồn kho EOQ), các nguồn tài trợ ngắn/dài hạn, giá trị tiền tệ theo thời gian (FV, PV, Niên kim), định giá chứng khoán & chi phí sử dụng vốn (WACC, CAPM) đến quyết định cơ cấu vốn tối ưu (EBIT-EPS).',
  objectives: {
    knowledge: [
      'Nắm vững bản chất của quản trị tài chính, các quan hệ tài chính và 3 nhóm quyết định tài chính cốt lõi của doanh nghiệp.',
      'Đọc, hiểu và phân tích chuyên sâu báo cáo tài chính qua hệ thống 4 nhóm chỉ số: thanh toán, hoạt động, đòn bẩy và khả năng sinh lời.',
      'Vận dụng mô hình phân tích DuPont để nhận diện động lực tạo ra lợi nhuận trên vốn chủ sở hữu (ROE).',
      'Xác định điểm hòa vốn kinh tế, hiểu rõ cơ chế khuếch đại rủi ro và lợi nhuận qua các đòn bẩy DOL, DFL, DCL.',
      'Nắm vững kỹ thuật quản trị vốn lưu động: mô hình tồn kho EOQ, mô hình tiền mặt Baumol/Miller-Orr và chính sách bán chịu.',
      'Sử dụng thành thạo các công thức giá trị tiền tệ theo thời gian (FV, PV, Annuity, Perpetuity) trong phân tích tài chính.',
      'Định giá trái phiếu, cổ phiếu thường, cổ phiếu ưu đãi và tính toán chi phí vốn bình quân WACC.',
      'Đánh giá tác động của cơ cấu vốn đến thu nhập trên một cổ phiếu qua phân tích điểm bàng quan EBIT-EPS.'
    ],
    skills: [
      'Kỹ năng tính toán các chỉ số tài chính, vẽ đồ thị hòa vốn và biểu đồ đòn bẩy trên bảng tính.',
      'Kỹ năng chiết khấu dòng tiền, lập kế hoạch ngân quỹ và tối ưu hóa lượng dự trữ tiền mặt, tồn kho.',
      'Kỹ năng phân tích rủi ro tài chính và đánh giá sự đánh đổi giữa lợi nhuận và an toàn thanh khoản.',
      'Kỹ năng tư vấn lựa chọn phương án huy động vốn nợ hay vốn cổ phần trong các kịch bản kinh doanh thực tế.'
    ],
    autonomy: [
      'Hình thành tư duy cẩn trọng, chính xác và có trách nhiệm cao đối với các quyết định liên quan đến tiền bạc và vốn đầu tư.',
      'Tuân thủ chuẩn mực kế toán, pháp luật tài chính và nguyên tắc đạo đức trong kinh doanh.'
    ]
  },
  chapters: [
    {
      id: 'chuong1',
      number: 1,
      title: 'Tổng quan về quản trị tài chính',
      slug: 'tong-quan-ve-quan-tri-tai-chinh',
      description: 'Khái niệm, các mối quan hệ tài chính, 3 quyết định tài chính doanh nghiệp, mục tiêu tối đa hóa giá trị doanh nghiệp và vai trò giám đốc tài chính CFO.',
      estimatedReadingMinutes: 25
    },
    {
      id: 'chuong2',
      number: 2,
      title: 'Phân tích tài chính',
      slug: 'phan-tich-tai-chinh',
      description: 'Hệ thống báo cáo tài chính, 4 nhóm tỷ số tài chính then chốt (Thanh toán, Hoạt động, Đòn bẩy, Sinh lời) và phương pháp phân tích mở rộng DuPont.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong3',
      number: 3,
      title: 'Hoạch định lợi nhuận',
      slug: 'hoach-dinh-loi-nhuan',
      description: 'Phân loại chi phí (định phí, biến phí), xác định điểm hòa vốn kinh tế (sản lượng, doanh thu), đòn bẩy kinh doanh DOL, đòn bẩy tài chính DFL và đòn bẩy tổng hợp DCL.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong4',
      number: 4,
      title: 'Quản trị vốn lưu động',
      slug: 'quan-tri-von-luu-dong',
      description: 'Bản chất vốn lưu động ròng NWC, quản trị tiền mặt (mô hình Baumol, Miller-Orr), quản trị khoản phải thu & chính sách 5C, quản trị hàng tồn kho mô hình EOQ.',
      estimatedReadingMinutes: 28
    },
    {
      id: 'chuong5',
      number: 5,
      title: 'Các nguồn tài trợ của doanh nghiệp',
      slug: 'cac-nguon-tai-tro-cua-doanh-nghiep',
      description: 'Nguồn tài trợ ngắn hạn (tín dụng thương mại, vay ngân hàng ngắn hạn) và nguồn tài trợ dài hạn (trái phiếu, cổ phiếu ưu đãi, cổ phiếu thường, thuê tài chính Leasing).',
      estimatedReadingMinutes: 26
    },
    {
      id: 'chuong6',
      number: 6,
      title: 'Giá trị tiền tệ theo thời gian',
      slug: 'gia-tri-tien-te-theo-thoi-gian',
      description: 'Lãi đơn & lãi kép, giá trị tương lai FV, giá trị hiện tại PV, dòng tiền đều (Ordinary Annuity & Annuity Due), dòng tiền vô hạn và lãi suất thực tế EAR.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong7',
      number: 7,
      title: 'Định giá chứng khoán – Chi phí sử dụng vốn',
      slug: 'dinh-gia-chung-khoan-chi-phi-su-dung-von',
      description: 'Định giá trái phiếu, định giá cổ phiếu thường (mô hình Gordon), xác định chi phí nợ sau thuế, chi phí vốn chủ sở hữu theo CAPM và chi phí vốn bình quân WACC.',
      estimatedReadingMinutes: 30
    },
    {
      id: 'chuong8',
      number: 8,
      title: 'Cơ cấu vốn của doanh nghiệp',
      slug: 'co-cau-von-cua-doanh-nghiep',
      description: 'Khái niệm cơ cấu vốn tối ưu, các lý thuyết cơ cấu vốn Modigliani-Miller (MM) và lý thuyết đánh đổi Trade-off, phân tích điểm bàng quan EBIT-EPS.',
      estimatedReadingMinutes: 25
    }
  ],
  references: [
    'Nguyễn Thị Trúc Phương (Chủ biên), Lê Thị Hồng Hà, Huỳnh Thị Quỳnh Tuyên (2021), Giáo trình Quản trị tài chính, Trường Cao đẳng Kinh tế TP. Hồ Chí Minh.',
    'Trần Ngọc Thơ (2020), Tài chính doanh nghiệp hiện đại, NXB Kinh Tế TP. Hồ Chí Minh.',
    'Nguyễn Minh Kiều (2019), Quản trị tài chính doanh nghiệp, NXB Tài Chính.',
    'Brigham, E. F., & Ehrhardt, M. C. (2020), Financial Management: Theory & Practice, Cengage Learning.',
    'Brealey, R. A., Myers, S. C., & Allen, F. (2020), Principles of Corporate Finance, McGraw-Hill Education.'
  ]
};
