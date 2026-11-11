export interface SiloTabLink {
  label: string;
  href: string;
  icon: string;
  titleAttr: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageSeoConfig {
  title: string;
  description: string;
  breadcrumbLabel: string;
  parentPath?: string;
  siloKey?: string;
  schemaType?: 'Course' | 'Quiz' | 'LearningResource' | 'WebPage' | 'ProfilePage' | 'ContactPage';
  courseCode?: string;
  studyGuideTitle?: string;
  studyGuidePoints?: { heading: string; content: string }[];
  faqs?: FaqItem[];
}

export interface SiloGroup {
  key: string;
  name: string;
  badge: string;
  hubHref: string;
  description: string;
  tabs: SiloTabLink[];
  defaultFaqs: FaqItem[];
}

export const SILO_GROUPS: Record<string, SiloGroup> = {
  'project-management': {
    key: 'project-management',
    name: 'Quản Trị Dự Án',
    badge: 'Học phần chuyên ngành • Project Management (MH38)',
    hubHref: '/study-corner/project-management',
    description: 'Giáo trình Quản trị dự án (MH38) - Chủ biên: ThS. Nguyễn Thị Trúc Phương. Thẩm định NPV, IRR, PP, PI; cấu trúc WBS; tiến độ Gantt, CPM, PERT và kiểm soát giá trị thu được (EVM).',
    tabs: [
      { label: 'Giáo trình toàn tập (8 chương)', href: '/study-corner/project-management', icon: '📘', titleAttr: 'Giáo trình toàn tập Quản trị dự án' },
      { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/project-management/intro', icon: '📋', titleAttr: 'Đề cương chi tiết học phần Quản trị dự án' },
      { label: 'Về Góc học tập', href: '/study-corner', icon: '📚', titleAttr: 'Về mục Góc học tập' },
    ],
    defaultFaqs: [
      {
        question: 'Tam giác kiềm tỏa (Iron Triangle) trong quản trị dự án là gì?',
        answer: 'Tam giác kiềm tỏa biểu thị 3 ràng buộc cốt lõi mà Giám đốc dự án phải liên tục cân bằng: Thời gian (Time) - hoàn thành đúng hạn; Chi phí (Cost) - nằm trong ngân sách; và Chất lượng/Phạm vi (Quality & Scope) - đạt yêu cầu kỹ thuật.'
      },
      {
        question: 'Phương pháp phân tích giá trị thu được (EVM) theo dõi dự án như thế nào?',
        answer: 'EVM tích hợp 3 chỉ số then chốt: Giá trị kế hoạch (PV), Giá trị thu được thực tế (EV) và Chi phí thực tế (AC). Từ đó tính Biến sai chi phí CV = EV - AC, Biến sai tiến độ SV = EV - PV, Chỉ số chi phí CPI = EV/AC và Chỉ số tiến độ SPI = EV/PV.'
      }
    ]
  },
  'financial-management': {
    key: 'financial-management',
    name: 'Quản Trị Tài Chính',
    badge: 'Học phần chuyên ngành • Financial Management (MH21)',
    hubHref: '/study-corner/financial-management',
    description: 'Giáo trình Quản trị tài chính (MH21) - Chủ biên: ThS. Nguyễn Thị Trúc Phương. Phân tích BCTC, mô hình DuPont, điểm hòa vốn BEP, đòn bẩy DOL/DFL/DCL, vốn lưu động EOQ, định giá chứng khoán, WACC và cơ cấu vốn.',
    tabs: [
      { label: 'Giáo trình toàn tập (8 chương)', href: '/study-corner/financial-management', icon: '📈', titleAttr: 'Giáo trình toàn tập Quản trị tài chính' },
      { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/financial-management/intro', icon: '📋', titleAttr: 'Đề cương chi tiết học phần Quản trị tài chính' },
      { label: 'Về Góc học tập', href: '/study-corner', icon: '📚', titleAttr: 'Về mục Góc học tập' },
    ],
    defaultFaqs: [
      {
        question: 'Mô hình phân tích DuPont phân tách ROE thành những nhân tố nào?',
        answer: 'Mô hình DuPont 3 nhân tố phân tách: ROE = Tỷ suất sinh lời ròng (ROS) x Vòng quay tổng tài sản (AU) x Đòn bẩy tài chính (FL). Điều này giúp nhà quản trị nhận biết động lực gia tăng ROE đến từ quản lý chi phí, hiệu suất tài sản hay sử dụng nợ vay.'
      },
      {
        question: 'Ý nghĩa của Chi phí sử dụng vốn bình quân (WACC)?',
        answer: 'WACC là chi phí vốn bình quân từ các nguồn tài trợ nợ và vốn cổ phần (sau khi tính lá chắn thuế lãi vay). WACC đóng vai trò là tỷ suất sinh lời tối thiểu mà các dự án đầu tư của doanh nghiệp phải đạt được để không làm giảm giá trị của công ty.'
      }
    ]
  },
  'risk-management': {
    key: 'risk-management',
    name: 'Quản Trị Rủi Ro',
    badge: 'Học phần chuyên ngành • Risk Management (MH24)',
    hubHref: '/study-corner/risk-management',
    description: 'Giáo trình Quản trị rủi ro (MH24) - Đồng tác giả: ThS. Nguyễn Thị Trúc Phương. Nhận dạng rủi ro, lượng hóa thống kê (kỳ vọng, độ lệch chuẩn, Ma trận rủi ro 5x5), kiểm soát và tài trợ rủi ro qua bảo hiểm.',
    tabs: [
      { label: 'Giáo trình toàn tập (5 chương)', href: '/study-corner/risk-management', icon: '🛡️', titleAttr: 'Giáo trình toàn tập Quản trị rủi ro' },
      { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/risk-management/intro', icon: '📋', titleAttr: 'Đề cương chi tiết học phần Quản trị rủi ro' },
      { label: 'Về Góc học tập', href: '/study-corner', icon: '📚', titleAttr: 'Về mục Góc học tập' },
    ],
    defaultFaqs: [
      {
        question: 'Quy trình quản trị rủi ro doanh nghiệp gồm những bước nào?',
        answer: 'Quy trình 5 bước chuẩn mực gồm: (1) Nhận dạng rủi ro; (2) Đo lường và đánh giá mức độ rủi ro; (3) Kiểm soát rủi ro (né tránh, ngăn ngừa, giảm thiểu, chuyển giao); (4) Tài trợ rủi ro (quỹ dự phòng, mua bảo hiểm); (5) Giám sát và đánh giá lại.'
      },
      {
        question: 'Bốn nguyên tắc pháp lý cốt lõi của hợp đồng bảo hiểm thương mại là gì?',
        answer: 'Bao gồm: (1) Nguyên tắc Bồi thường (Indemnity) - bồi thường đúng giá trị tổn thất thực tế; (2) Quyền lợi có thể được bảo hiểm (Insurable Interest); (3) Trung thực tuyệt đối (Utmost Good Faith); và (4) Thế quyền (Subrogation).'
      }
    ]
  },
  'strategic-management': {
    key: 'strategic-management',
    name: 'Quản Trị Chiến Lược',
    badge: 'Học phần chuyên ngành • Strategic Management (MH17)',
    hubHref: '/study-corner/strategic-management',
    description: 'Giáo trình Quản trị chiến lược (MH17) - Khoa QTKD HCE. Phân tích môi trường PESTEL, 5 áp lực Porter, sứ mạng SMART, chiến lược cạnh tranh, ma trận SWOT, BCG, QSPM và Thẻ điểm cân bằng (BSC).',
    tabs: [
      { label: 'Giáo trình toàn tập (6 chương)', href: '/study-corner/strategic-management', icon: '♟️', titleAttr: 'Giáo trình toàn tập Quản trị chiến lược' },
      { label: 'Đề cương & Giới thiệu học phần', href: '/study-corner/strategic-management/intro', icon: '📋', titleAttr: 'Đề cương chi tiết học phần Quản trị chiến lược' },
      { label: 'Về Góc học tập', href: '/study-corner', icon: '📚', titleAttr: 'Về mục Góc học tập' },
    ],
    defaultFaqs: [
      {
        question: 'Ba chiến lược cạnh tranh tổng quát của Michael Porter là gì?',
        answer: 'Gồm: (1) Chiến lược dẫn đầu về chi phí thấp (Cost Leadership) - tối ưu hóa quy mô và chi phí vận hành; (2) Chiến lược khác biệt hóa sản phẩm (Differentiation) - tạo ra sản phẩm độc đáo mà khách hàng sẵn sàng trả giá cao; (3) Chiến lược tập trung (Focus/Niche) - phục vụ một phân khúc khách hàng hẹp.'
      },
      {
        question: 'Hệ thống Thẻ điểm cân bằng (Balanced Scorecard - BSC) đo lường hiệu quả qua 4 khía cạnh nào?',
        answer: 'Gồm: (1) Khía cạnh Tài chính (Financial); (2) Khía cạnh Khách hàng (Customer); (3) Khía cạnh Quy trình nội bộ (Internal Processes); và (4) Khía cạnh Học hỏi & Phát triển (Learning & Growth).'
      }
    ]
  },

        
  
    'principles-of-marketing': {
    key: 'principles-of-marketing',
    name: 'Marketing Căn Bản',
    badge: 'Học phần cơ sở ngành • Principles of Marketing',
    hubHref: '/study-corner/principles-of-marketing',
    description: 'Hệ thống bài giảng môi trường Marketing vĩ mô/vi mô, nghiên cứu thị trường, hành vi người tiêu dùng, chiến lược STP và 4P (Product, Price, Place, Promotion).',
    tabs: [
      { label: 'Bài giảng Marketing căn bản', href: '/study-corner/principles-of-marketing', icon: '📘', titleAttr: 'Bài giảng và đề cương học phần Marketing căn bản' },
      { label: 'Bài tập trắc nghiệm ôn tập', href: '/study-corner/principles-of-marketing/test', icon: '🎯', titleAttr: 'Làm bài tập trắc nghiệm ôn thi môn Marketing căn bản' },
      { label: 'Thi Online 50 câu / 60 phút', href: '/ngan-hang-de-thi', icon: '🏆', titleAttr: 'Thi thử trực tuyến 50 câu trong 60 phút' },
    ],
    defaultFaqs: [
      {
        question: 'Sự khác nhau giữa Nhu cầu tự nhiên (Needs), Mong muốn (Wants) và Nhu cầu có khả năng thanh toán (Demands) là gì?',
        answer: 'Nhu cầu tự nhiên (Needs) là cảm giác thiếu hụt một cái gì đó cơ bản của con người (ăn, mặc, an toàn). Mong muốn (Wants) là nhu cầu tự nhiên có dạng đặc thù tương ứng với văn hóa và cá tính cá nhân. Khi mong muốn được hậu thuẫn bởi sức mua (khả năng tài chính và sẵn sàng chi trả) thì trở thành Nhu cầu có khả năng thanh toán (Demands).'
      },
      {
        question: 'Mô hình Marketing-Mix 4P truyền thống chuyển sang góc nhìn 4C của khách hàng như thế nào?',
        answer: 'Bốn chữ P của doanh nghiệp tương ứng trực tiếp với 4 chữ C của khách hàng: Product (Sản phẩm) ứng với Customer Solution (Giải pháp cho khách hàng), Price (Giá cả) ứng với Customer Cost (Chi phí của khách hàng), Place (Phân phối) ứng với Convenience (Sự thuận tiện), và Promotion (Xúc tiến) ứng với Communication (Giao tiếp hai chiều).'
      }
    ]
  },
  'microeconomics': {
    key: 'microeconomics',
    name: 'Kinh Tế Vi Mô',
    badge: 'Học phần cơ sở ngành • Microeconomics',
    hubHref: '/study-corner/microeconomics',
    description: 'Bài giảng lý thuyết cung cầu, độ co giãn, lý thuyết hữu dụng người tiêu dùng, hàm sản xuất - chi phí doanh nghiệp và các cấu trúc thị trường cạnh tranh hoàn hảo, độc quyền.',
    tabs: [
      { label: 'Bài giảng Kinh tế vi mô', href: '/study-corner/microeconomics', icon: '📈', titleAttr: 'Bài giảng lý thuyết và công thức học phần Kinh tế vi mô' },
      { label: 'Thi thử & Ôn tập theo chương', href: '/study-corner/microeconomics/microeconomics-test', icon: '🎯', titleAttr: 'Bài tập thực hành và đề thi thử trắc nghiệm môn Kinh tế vi mô' },
      { label: 'Thi Online 50 câu / 60 phút', href: '/ngan-hang-de-thi', icon: '🏆', titleAttr: 'Thi thử trực tuyến 50 câu trên Ngân hàng đề thi' },
    ],
    defaultFaqs: [
      {
        question: 'Mối quan hệ giữa độ co giãn của cầu theo giá (Ed) và tổng doanh thu (TR) được xác định như thế nào?',
        answer: 'Khi cầu co giãn nhiều (|Ed| > 1), giá P và tổng doanh thu TR biến thiên ngược chiều (giảm giá sẽ làm tăng doanh thu). Khi cầu ít co giãn (|Ed| < 1), giá P và tổng doanh thu TR biến thiên cùng chiều (tăng giá sẽ làm tăng doanh thu). Khi cầu co giãn đơn vị (|Ed| = 1), tổng doanh thu đạt cực đại và không đổi khi giá thay đổi nhỏ.'
      },
      {
        question: 'Nguyên tắc tối đa hóa lợi nhuận chung cho mọi doanh nghiệp trên thị trường là gì?',
        answer: 'Mọi doanh nghiệp (dù ở thị trường cạnh tranh hoàn hảo hay độc quyền) đều tối đa hóa lợi nhuận tại mức sản lượng Q* mà tại đó Doanh thu biên bằng Chi phí biên (MR = MC). Riêng trong thị trường cạnh tranh hoàn hảo, vì giá bán P không đổi và bằng MR nên điều kiện tối đa hóa lợi nhuận trở thành P = MC.'
      }
    ]
  },
  'internships': {
    key: 'internships',
    name: 'Hướng Dẫn Thực Tập Tốt Nghiệp',
    badge: 'Cẩm nang Thực tập • HCE & CTIM',
    hubHref: '/study-corner/internships',
    description: 'Cẩm nang quy trình thực tập tốt nghiệp, đề cương chi tiết, chuẩn trình bày báo cáo HCE & CTIM, kho 19 bài báo cáo mẫu đạt điểm giỏi và chuẩn trích dẫn tài liệu tham khảo APA/IEEE.',
    tabs: [
      { label: 'Quy trình chung', href: '/study-corner/internships', icon: '🧭', titleAttr: 'Quy trình và hướng dẫn chung thực tập tốt nghiệp' },
      { label: 'Đề cương & Biểu mẫu HCE', href: '/study-corner/internships/hcehdtt', icon: '📋', titleAttr: 'Đề cương chi tiết và biểu mẫu báo cáo thực tập trường HCE' },
      { label: 'Hướng dẫn báo cáo HCE', href: '/study-corner/internships/huong-dan-bao-cao-hce', icon: '🏛️', titleAttr: 'Hướng dẫn trình bày báo cáo thực tập tốt nghiệp chuẩn HCE' },
      { label: '19 Mẫu báo cáo thực tập', href: '/study-corner/internships/sample', icon: '📂', titleAttr: 'Kho 19 mẫu báo cáo thực tập tốt nghiệp ngành Quản trị kinh doanh & Marketing' },
      { label: 'Cách trích dẫn tài liệu', href: '/study-corner/internships/tailieuthamkhao', icon: '📚', titleAttr: 'Hướng dẫn cách viết và trích dẫn tài liệu tham khảo chuẩn học thuật' },
      { label: 'Tra cứu Mã đề cương (/dcct)', href: '/dcct', icon: '🔍', titleAttr: 'Cổng tra cứu nhanh đề cương chi tiết theo mã số' },
    ],
    defaultFaqs: [
      {
        question: 'Bố cục chuẩn của một bài báo cáo thực tập tốt nghiệp ngành Quản trị kinh doanh gồm mấy chương?',
        answer: 'Một báo cáo thực tập tốt nghiệp chuẩn mực tại HCE và CTIM thường gồm 3 chương chính: Chương 1 - Giới thiệu khái quát về đơn vị thực tập (lịch sử hình thành, cơ cấu tổ chức, kết quả kinh doanh 3 năm gần nhất); Chương 2 - Phân tích thực trạng hoạt động chuyên môn theo đề tài tại doanh nghiệp (dựa trên số liệu thực tế); Chương 3 - Đề xuất giải pháp hoặc kiến nghị hoàn thiện.'
      },
      {
        question: 'Những lỗi định dạng văn bản nào khiến sinh viên dễ bị trừ điểm hình thức báo cáo thực tập nhất?',
        answer: 'Các lỗi phổ biến nhất gồm: sai kích thước lề trang (chuẩn: Trái 3.0–3.5cm, Phải 2.0cm, Trên 2.0–2.5cm, Dưới 2.0–2.5cm), không đồng nhất font chữ Times New Roman cỡ 13, quên đánh số bảng biểu/hình vẽ kèm nguồn trích dẫn, mục lục tự động bị lệch trang và sắp xếp danh mục tài liệu tham khảo không đúng chuẩn Bộ GD&ĐT hoặc APA.'
      },
      {
        question: 'Làm thế nào để chọn đề tài thực tập vừa dễ xin số liệu vừa đạt điểm cao?',
        answer: 'Sinh viên nên chọn đề tài đi sâu vào một nghiệp vụ cụ thể mà phòng ban mình thực tập đang nắm giữ dữ liệu (ví dụ: quy trình bán hàng, quản trị kho hàng, hoạt động truyền thông mạng xã hội, chăm sóc khách hàng, tuyển dụng nhân sự) thay vì chọn đề tài quá rộng như "Nâng cao hiệu quả kinh doanh toàn công ty".'
      }
    ]
  },
  'entrepreneurship': {
    key: 'entrepreneurship',
    name: 'Khởi Nghiệp',
    badge: 'Học phần ứng dụng • Entrepreneurship',
    hubHref: '/study-corner/entrepreneurship',
    description: 'Tài liệu lập dự án khởi nghiệp kinh doanh, cấu trúc bản kế hoạch kinh doanh mẫu (Business Plan), phân tích môi trường PEST, đánh giá năng lực PEC và hành vi người tiêu dùng.',
    tabs: [
      { label: 'Bài giảng Khởi nghiệp', href: '/study-corner/entrepreneurship', icon: '🚀', titleAttr: 'Bài giảng và kiến thức nền tảng học phần Khởi nghiệp kinh doanh' },
      { label: 'Cấu trúc dự án mẫu', href: '/study-corner/entrepreneurship/cau-truc-du-an-mau', icon: '📐', titleAttr: 'Cấu trúc bản kế hoạch dự án khởi nghiệp kinh doanh mẫu' },
      { label: 'Mô hình PEST & Đánh giá PEC', href: '/study-corner/entrepreneurship/pest', icon: '🧭', titleAttr: 'Phân tích môi trường vĩ mô PEST và tự đánh giá tố chất doanh nhân PEC' },
      { label: 'Hành vi người tiêu dùng', href: '/study-corner/entrepreneurship/hanh-vi-nguoi-tieu-dung', icon: '👥', titleAttr: 'Phân tích các yếu tố ảnh hưởng đến hành vi người tiêu dùng Việt Nam' },
    ],
    defaultFaqs: [
      {
        question: 'Một bản kế hoạch dự án khởi nghiệp (Business Plan) hoàn chỉnh cần có những nội dung nào?',
        answer: 'Bản kế hoạch khởi nghiệp chuẩn bao gồm: Tóm tắt dự án (Executive Summary), Ý tưởng và giá trị cốt lõi của sản phẩm/dịch vụ, Phân tích thị trường và đối thủ cạnh tranh, Kế hoạch Marketing và bán hàng, Kế hoạch vận hành và nhân sự, Dự toán tài chính (vốn đầu tư ban đầu, điểm hòa vốn, dòng tiền, NPV/IRR) và Quản trị rủi ro.'
      },
      {
        question: 'Bộ tiêu chí PEC dùng để đánh giá điều gì ở người khởi nghiệp?',
        answer: 'PEC (Personal Entrepreneurial Competencies) là bộ 10 năng lực cốt lõi của doanh nhân thành công (chia thành 3 cụm: Cụm Thành tựu, Cụm Kế hoạch và Cụm Quyền lực), giúp sinh viên tự lượng giá điểm mạnh và điểm cần rèn luyện trước khi bắt tay triển khai dự án thực tế.'
      }
    ]
  },
  'spss': {
    key: 'spss',
    name: 'Xử Lý Dữ Liệu SPSS & NCKH',
    badge: 'Phân tích định lượng • SPSS & Research',
    hubHref: '/spss',
    description: 'Hướng dẫn thực hành xử lý dữ liệu khảo sát bằng phần mềm SPSS: thống kê mô tả, kiểm định độ tin cậy thang đo Cronbach’s Alpha, phân tích nhân tố khám phá EFA, tương quan Pearson và hồi quy tuyến tính bội.',
    tabs: [
      { label: 'Hướng dẫn xử lý dữ liệu SPSS', href: '/spss', icon: '📊', titleAttr: 'Hướng dẫn phân tích dữ liệu khảo sát trên phần mềm SPSS từ A đến Z' },
      { label: 'Mẫu Bảng câu hỏi khảo sát NCKH', href: '/spss/nckhsv', icon: '📝', titleAttr: 'Mẫu bảng câu hỏi khảo sát nghiên cứu khoa học sinh viên chuẩn thang đo Likert' },
      { label: 'Tải phần mềm SPSS & Công cụ', href: '/software', icon: '💿', titleAttr: 'Tải phần mềm thống kê SPSS và bộ công cụ học tập chuyên ngành' },
    ],
    defaultFaqs: [
      {
        question: 'Tiêu chuẩn để một thang đo đạt độ tin cậy Cronbach’s Alpha trong SPSS là gì?',
        answer: 'Một thang đo đạt độ tin cậy tốt khi hệ số Cronbach’s Alpha tổng thể đạt từ 0.7 trở lên (mức từ 0.6 đến dưới 0.7 có thể chấp nhận với nghiên cứu khám phá mới). Đồng thời, hệ số tương quan biến tổng (Corrected Item-Total Correlation) của từng biến quan sát phải lớn hơn hoặc bằng 0.3; các biến nhỏ hơn 0.3 cần được loại bỏ.'
      },
      {
        question: 'Các điều kiện cần kiểm tra khi chạy phân tích nhân tố khám phá EFA trong SPSS là gì?',
        answer: 'Khi chạy EFA, cần đảm bảo 5 tiêu chuẩn: (1) Hệ số KMO nằm trong khoảng 0.5 <= KMO <= 1.0, (2) Kiểm định Bartlett có Sig. < 0.05, (3) Giá trị Eigenvalue của các nhân tố được giữ lại phải >= 1.0, (4) Tổng phương sai trích (Total Variance Explained) đạt từ 50% trở lên, và (5) Hệ số tải nhân tố (Factor Loading) đạt >= 0.5.'
      },
      {
        question: 'Làm thế nào để kiểm tra hiện tượng đa cộng tuyến trong mô hình hồi quy tuyến tính bội?',
        answer: 'Hiện tượng đa cộng tuyến được kiểm tra thông qua hệ số phóng đại phương sai VIF (Variance Inflation Factor) trong bảng Coefficients. Với đề tài nghiên cứu kinh tế - quản trị sử dụng thang đo Likert, nếu VIF < 2 (hoặc theo tiêu chuẩn tổng quát VIF < 10) thì mô hình không bị vi phạm đa cộng tuyến.'
      }
    ]
  }
};

export const PAGE_SEO_META: Record<string, PageSeoConfig> = {
  '/study-corner/project-management': {
    title: 'GIÁO TRÌNH QUẢN TRỊ DỰ ÁN — BẬC CAO ĐẲNG & ĐẠI HỌC — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Giáo trình Quản trị dự án (MH38) - Chủ biên ThS. Nguyễn Thị Trúc Phương. Hệ thống 8 chương rút gọn còn 50% tinh hoa: lựa chọn dự án NPV/IRR, cấu trúc WBS, tiến độ Gantt/CPM/PERT và kiểm soát EVM.',
    breadcrumbLabel: 'Quản trị dự án',
    parentPath: '/study-corner',
    siloKey: 'project-management',
    schemaType: 'Course',
    courseCode: 'MH38'
  },
  '/study-corner/project-management/intro': {
    title: 'ĐỀ CƯƠNG CHI TIẾT & GIỚI THIỆU HỌC PHẦN QUẢN TRỊ DỰ ÁN — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Đề cương chi tiết học phần Quản trị dự án (MH38) - 3 tín chỉ (45 tiết), chuẩn đầu ra CĐR, phương pháp đánh giá kết quả học tập và tài liệu tham khảo chính thức.',
    breadcrumbLabel: 'Giới thiệu Quản trị dự án',
    parentPath: '/study-corner/project-management',
    siloKey: 'project-management',
    schemaType: 'LearningResource'
  },

  '/study-corner/financial-management': {
    title: 'GIÁO TRÌNH QUẢN TRỊ TÀI CHÍNH — BẬC CAO ĐẲNG & ĐẠI HỌC — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Giáo trình Quản trị tài chính (MH21) - Chủ biên ThS. Nguyễn Thị Trúc Phương. 8 chương toàn diện: phân tích BCTC DuPont, điểm hòa vốn, đòn bẩy DOL/DFL, vốn lưu động EOQ, định giá chứng khoán & WACC.',
    breadcrumbLabel: 'Quản trị tài chính',
    parentPath: '/study-corner',
    siloKey: 'financial-management',
    schemaType: 'Course',
    courseCode: 'MH21'
  },
  '/study-corner/financial-management/intro': {
    title: 'ĐỀ CƯƠNG CHI TIẾT & GIỚI THIỆU HỌC PHẦN QUẢN TRỊ TÀI CHÍNH — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Đề cương chi tiết học phần Quản trị tài chính (MH21) - 3 tín chỉ (45 tiết), chuẩn đầu ra CĐR, phương pháp đánh giá và hệ thống tài liệu học tập chuẩn mực.',
    breadcrumbLabel: 'Giới thiệu Quản trị tài chính',
    parentPath: '/study-corner/financial-management',
    siloKey: 'financial-management',
    schemaType: 'LearningResource'
  },

  '/study-corner/risk-management': {
    title: 'GIÁO TRÌNH QUẢN TRỊ RỦI RO — BẬC CAO ĐẲNG & ĐẠI HỌC — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Giáo trình Quản trị rủi ro (MH24) - Đồng tác giả ThS. Nguyễn Thị Trúc Phương. 5 chương toàn diện: nhận dạng, đo lường thống kê (kỳ vọng, độ lệch chuẩn, Ma trận 5x5), kiểm soát và tài trợ rủi ro qua bảo hiểm.',
    breadcrumbLabel: 'Quản trị rủi ro',
    parentPath: '/study-corner',
    siloKey: 'risk-management',
    schemaType: 'Course',
    courseCode: 'MH24'
  },
  '/study-corner/risk-management/intro': {
    title: 'ĐỀ CƯƠNG CHI TIẾT & GIỚI THIỆU HỌC PHẦN QUẢN TRỊ RỦI RO — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Đề cương chi tiết học phần Quản trị rủi ro (MH24) - 3 tín chỉ (45 tiết), mục tiêu học tập, chuẩn đầu ra và quy trình kiểm soát rủi ro thực chiến.',
    breadcrumbLabel: 'Giới thiệu Quản trị rủi ro',
    parentPath: '/study-corner/risk-management',
    siloKey: 'risk-management',
    schemaType: 'LearningResource'
  },

  '/study-corner/strategic-management': {
    title: 'GIÁO TRÌNH QUẢN TRỊ CHIẾN LƯỢC — BẬC CAO ĐẲNG & ĐẠI HỌC — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Giáo trình Quản trị chiến lược (MH17) - Khoa QTKD HCE. 6 chương chuyên sâu: PESTEL, 5 áp lực Porter, sứ mạng SMART, ma trận SWOT, BCG, QSPM và Thẻ điểm cân bằng (Balanced Scorecard).',
    breadcrumbLabel: 'Quản trị chiến lược',
    parentPath: '/study-corner',
    siloKey: 'strategic-management',
    schemaType: 'Course',
    courseCode: 'MH17'
  },
  '/study-corner/strategic-management/intro': {
    title: 'ĐỀ CƯƠNG CHI TIẾT & GIỚI THIỆU HỌC PHẦN QUẢN TRỊ CHIẾN LƯỢC — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Đề cương chi tiết học phần Quản trị chiến lược (MH17) - 3 tín chỉ (45 tiết), chuẩn đầu ra CĐR, phương pháp đánh giá kết quả và lộ trình học tập hiệu quả.',
    breadcrumbLabel: 'Giới thiệu Quản trị chiến lược',
    parentPath: '/study-corner/strategic-management',
    siloKey: 'strategic-management',
    schemaType: 'LearningResource'
  },

  '/': {
    title: 'NGUYỄN THỊ TRÚC PHƯƠNG — Cổng Học Liệu, Bài Giảng & Thi Trắc Nghiệm HCE',
    description: 'Cổng học tập trực tuyến của NGUYỄN THỊ TRÚC PHƯƠNG (HCE): bài giảng Marketing căn bản, Kinh tế vi mô, Khởi nghiệp, hướng dẫn SPSS, thực tập tốt nghiệp và thi thử.',
    breadcrumbLabel: 'Trang chủ',
    schemaType: 'WebPage'
  },
  '/study-corner': {
    title: 'Góc Học Tập Quản Trị Kinh Doanh, Marketing & Kinh Tế Học HCE',
    description: 'Tổng hợp các chuyên mục bài giảng, hướng dẫn giải bài tập, đề cương chi tiết và ngân hàng đề thi thử khối ngành Quản trị kinh doanh & Marketing tại HCE.',
    breadcrumbLabel: 'Góc học tập',
    schemaType: 'LearningResource'
  },
  '/ngan-hang-de-thi': {
    title: 'Thi Trắc Nghiệm Online Quản Trị Kinh Doanh, Marketing & Vi Mô',
    description: 'Hệ thống thi thử trắc nghiệm trực tuyến 50 câu trong 60 phút có chấm điểm tức thì các môn Marketing căn bản, Kinh tế vi mô và Khởi nghiệp.',
    breadcrumbLabel: 'Thi Online',
    schemaType: 'Quiz'
  },
  '/dcct': {
    title: 'Tra Cứu Đề Cương Chi Tiết Báo Cáo Thực Tập & Học Phần HCE',
    description: 'Công cụ tra cứu nhanh đề cương chi tiết báo cáo thực tập tốt nghiệp, tiểu luận và tài liệu học phần theo mã số dành cho sinh viên HCE và CTIM.',
    breadcrumbLabel: 'Đề cương chi tiết',
    siloKey: 'internships',
    schemaType: 'LearningResource',
    studyGuideTitle: 'Hướng Dẫn Tra Cứu Mã Đề Cương & Cấu Trúc Đề Cương Thực Tập Chuẩn',
    studyGuidePoints: [
      {
        heading: '1. Cách sử dụng mã tra cứu đề cương chi tiết trên hệ thống',
        content: 'Sinh viên nhập chính xác mã đề cương do giảng viên hướng dẫn cung cấp (ví dụ: MSV01, MSV02, HCE01...) vào ô tra cứu phía trên để mở trực tiếp file đề cương chi tiết tương ứng với chuyên đề thực tập của mình. Ngoài ra, danh sách các đề cương công khai phía dưới cho phép tải về ngay mà không cần nhập mã.'
      },
      {
        heading: '2. Vai trò của đề cương chi tiết trong kỳ thực tập tốt nghiệp',
        content: 'Đề cương chi tiết đóng vai trò là bản thiết kế khung sườn cho toàn bộ báo cáo thực tập 3 chương. Việc bám sát đề cương ngay từ tuần đầu tiên giúp sinh viên xác định đúng danh mục bảng biểu, số liệu kế toán - nhân sự - bán hàng cần xin tại doanh nghiệp, tránh tình trạng viết lan man hoặc thiếu hụt dữ liệu phân tích ở Chương 2.'
      },
      {
        heading: '3. Quy trình duyệt đề cương với Giảng viên hướng dẫn',
        content: 'Sau khi tải mẫu đề cương phù hợp với tên đề tài và đặc thù đơn vị thực tập, sinh viên cần điền đầy đủ thông tin doanh nghiệp, điều chỉnh các tiểu mục Chương 2 cho sát thực tế, sau đó gửi giảng viên hướng dẫn phê duyệt trước khi tiến hành viết bản thảo chi tiết.'
      }
    ]
  },
  '/goc-chia-se': {
    title: 'Góc Chia Sẻ Kiến Thức Quản Trị, Phương Pháp Học Đại Học & AI',
    description: 'Chuyên mục bài viết phân tích quản trị doanh nghiệp, ứng dụng AI trong học tập nghiên cứu khoa học và kinh nghiệm thực tập tốt nghiệp đạt điểm giỏi.',
    breadcrumbLabel: 'Góc chia sẻ',
    schemaType: 'WebPage'
  },
  '/spss': {
    title: 'Hướng Dẫn Xử Lý Dữ Liệu SPSS Từ A-Z Cho Sinh Viên Nghiên Cứu',
    description: 'Cẩm nang thực hành phân tích dữ liệu khảo sát bằng SPSS: mã hóa thang đo Likert, chạy thống kê mô tả, Cronbach’s Alpha, nhân tố khám phá EFA và hồi quy.',
    breadcrumbLabel: 'SPSS & NCKH',
    siloKey: 'spss',
    schemaType: 'Course'
  },
  '/spss/nckhsv': {
    title: 'Mẫu Bảng Câu Hỏi Khảo Sát Nghiên Cứu Khoa Học Sinh Viên Chuẩn',
    description: 'Tham khảo mẫu bảng câu hỏi khảo sát nghiên cứu khoa học sinh viên thiết kế theo thang đo Likert 5 mức độ về ý định tiếp tục sử dụng Ví điện tử.',
    breadcrumbLabel: 'Mẫu khảo sát NCKH',
    parentPath: '/spss',
    siloKey: 'spss',
    schemaType: 'LearningResource'
  },
  '/software': {
    title: 'Tải Phần Mềm Học Tập Quản Trị: IBM SPSS, POM-QM & Bộ Công Cụ',
    description: 'Kho tải phần mềm phục vụ học tập và nghiên cứu khoa học ngành Quản trị kinh doanh: phần mềm thống kê IBM SPSS, mô phỏng định lượng POM-QM for Windows.',
    breadcrumbLabel: 'Phần mềm học tập',
    siloKey: 'spss',
    schemaType: 'LearningResource',
    studyGuideTitle: 'Hướng Dẫn Lựa Chọn & Cài Đặt Phần Mềm Chuyên Ngành Quản Trị Kinh Doanh',
    studyGuidePoints: [
      {
        heading: '1. Phần mềm IBM SPSS Statistics phục vụ Nghiên cứu khoa học & Khóa luận',
        content: 'IBM SPSS Statistics là công cụ tiêu chuẩn dùng để xử lý dữ liệu khảo sát định lượng trong các đề tài nghiên cứu khoa học sinh viên, chuyên đề tốt nghiệp và khóa luận ngành Quản trị kinh doanh, Marketing, Thương mại điện tử. Phần mềm hỗ trợ đầy đủ các kiểm định thống kê mô tả, kiểm định độ tin cậy Cronbach’s Alpha, phân tích nhân tố khám phá EFA, kiểm định T-Test, ANOVA và hồi quy tuyến tính bội.'
      },
      {
        heading: '2. Phần mềm thống kê & mô phỏng phục vụ học tập',
        content: 'POM-QM for Windows (Production and Operations Management - Quantitative Methods) là phần mềm mô phỏng bài toán quản trị tác nghiệp cực kỳ trực quan. Sinh viên sử dụng POM-QM để giải nhanh và vẽ đồ thị các bài toán: Dự báo nhu cầu (Forecasting), Quy hoạch tuyến tính, Quản trị tồn kho (EOQ, POQ, Quantity Discount), Hoạch định tổng hợp, Lý thuyết xếp hàng và Điều độ sản xuất Johnson.'
      },
      {
        heading: '3. Lưu ý kỹ thuật khi cài đặt và nhập liệu tiếng Việt',
        content: 'Khi cài đặt trên Windows 10/11, sinh viên nên giải nén bộ cài bằng WinRAR hoặc 7-Zip trước khi chạy file Setup với quyền Run as Administrator. Khi nhập tên biến (Variable Name) trong SPSS hoặc POM-QM, tuyệt đối viết liền không dấu (ví dụ: TC1, TC2, GiaCa), còn phần nhãn hiển thị tiếng Việt có dấu được khai báo trong cột Label.'
      }
    ]
  },
  '/teaching': {
    title: 'Hoạt Động Giảng Dạy & Triết Lý Giáo Dục — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Tổng hợp các học phần đảm nhiệm giảng dạy, phương pháp sư phạm lấy người học làm trung tâm và ứng dụng công nghệ số trong đào tạo của NGUYỄN THỊ TRÚC PHƯƠNG.',
    breadcrumbLabel: 'Hoạt động giảng dạy',
    schemaType: 'ProfilePage'
  },
  '/mentor': {
    title: 'Công Tác Cố Vấn Học Tập & Đồng Hành Sinh Viên HCE — NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Thông tin tư vấn lộ trình học tập, đăng ký học phần, rèn luyện kỹ năng mềm và định hướng nghề nghiệp dành cho sinh viên từ Cố vấn học tập NGUYỄN THỊ TRÚC PHƯƠNG.',
    breadcrumbLabel: 'Cố vấn học tập',
    schemaType: 'ProfilePage'
  },
  '/contact': {
    title: 'Liên Hệ Giảng Viên NGUYỄN THỊ TRÚC PHƯƠNG — Khoa QTKD Trường HCE',
    description: 'Thông tin liên hệ chính thức của Giảng viên NGUYỄN THỊ TRÚC PHƯƠNG (Khoa Quản trị - Kinh doanh, Trường Cao đẳng Kinh tế TP.HCM): Email, Điện thoại và Kênh học thuật.',
    breadcrumbLabel: 'Liên hệ',
    schemaType: 'ContactPage',
    studyGuideTitle: 'Hướng Dẫn Liên Hệ Giải Đáp Học Thuật & Hướng Dẫn Thực Tập Tốt Nghiệp',
    studyGuidePoints: [
      {
        heading: '1. Quy chuẩn gửi Email trao đổi học tập và nộp bài báo cáo',
        content: 'Khi gửi email trao đổi học phần hoặc nộp bản thảo đề cương/báo cáo thực tập qua địa chỉ phuongntt@kthcm.edu.vn, sinh viên vui lòng đặt tiêu đề email rõ ràng theo cú pháp: [Lớp - Tên Học Phần/Thực Tập] - [Họ và Tên Sinh Viên] - [MSSV] - [Nội dung cần hỗ trợ]. File đính kèm cần đặt tên không dấu kèm phiên bản ngày nộp để giảng viên phản hồi nhanh nhất.'
      },
      {
        heading: '2. Kênh hỗ trợ học tập trực tuyến và trao đổi học thuật chính thức',
        content: 'Ngoài cổng học tập trực tuyến, sinh viên có thể trao đổi trực tiếp với giảng viên qua email chính thức phuongntt@kthcm.edu.vn hoặc liên hệ trong khung giờ làm việc đối với các vấn đề về học phần, lịch thi và khóa thực tập tốt nghiệp.'
      }
    ]
  },
  '/danh-gia-giang-vien': {
    title: 'Phiếu Đánh Giá Chất Lượng Giảng Viên — NGUYỄN THỊ TRÚC PHƯƠNG (HCE)',
    description: 'Phiếu khảo sát ý kiến sinh viên đánh giá chất lượng hoạt động giảng dạy của giảng viên NGUYỄN THỊ TRÚC PHƯƠNG theo thang đo Likert 5 mức độ.',
    breadcrumbLabel: 'Phiếu đánh giá giảng viên',
    parentPath: '/contact',
    schemaType: 'WebPage'
  },
  '/home/introduction': {
    title: 'Giới Thiệu NGUYỄN THỊ TRÚC PHƯƠNG — Giảng Viên Khoa QTKD Trường HCE',
    description: 'Hồ sơ học thuật, quá trình công tác, các học phần giảng dạy và định hướng nghiên cứu ứng dụng của NGUYỄN THỊ TRÚC PHƯƠNG tại Trường Cao đẳng Kinh tế TP.HCM (HCE).',
    breadcrumbLabel: 'Giới thiệu giảng viên',
    parentPath: '/',
    schemaType: 'ProfilePage',
    studyGuideTitle: 'Cổng học tập số',
    studyGuidePoints: [
      {
        heading: '1. Xây dựng hệ sinh thái học liệu mở cho sinh viên khối ngành Kinh tế - Quản trị',
        content: 'Được khởi tạo và phát triển liên tục từ năm 2013, cổng thông tin học thuật Nguyễn Thị Trúc Phương ra đời với mục tiêu số hóa toàn bộ đề cương, bài giảng, hướng dẫn giải bài tập định lượng và ngân hàng câu hỏi trắc nghiệm. Sinh viên có thể tự học, tự kiểm tra năng lực mọi lúc mọi nơi trên cả máy tính và điện thoại di động.'
      },
      {
        heading: '2. Kết nối lý thuyết quản trị hiện đại với bài toán doanh nghiệp Việt Nam',
        content: 'Mọi học phần từ Marketing căn bản, Kinh tế vi mô đến Khởi nghiệp và Thực tập tốt nghiệp đều được thiết kế gắn liền với dữ liệu thực tiễn, phần mềm mô phỏng chuyên ngành (SPSS, POM-QM) và hệ thống tình huống doanh nghiệp thực tế tại Việt Nam.'
      }
    ]
  },
  '/home/marketing': {
    title: 'Chuyên Đề Kiến Thức Marketing Hiện Đại, Chuyển Đổi Số & Ứng Dụng AI',
    description: 'Tổng hợp kiến thức xu hướng Marketing hiện đại, chiến lược nội dung số, phân tích hành vi khách hàng và ứng dụng trí tuệ nhân tạo AI trong quản trị doanh nghiệp.',
    breadcrumbLabel: 'Kiến thức Marketing & AI',
    parentPath: '/',
    schemaType: 'LearningResource'
  },

  
            
  
            
  
    
        
        
  // --- SILO 7: MARKETING CĂN BẢN ---
  '/study-corner/principles-of-marketing': {
    title: 'GIÁO TRÌNH MARKETING CĂN BẢN — Hệ Thống 9 Chương Chuẩn Học Thuật | NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Đề cương và bài giảng học phần Marketing căn bản: bản chất Marketing, môi trường vi mô vĩ mô, hành vi mua của người tiêu dùng và phối thức Marketing-Mix 4P.',
    breadcrumbLabel: 'Marketing căn bản',
    parentPath: '/study-corner',
    siloKey: 'principles-of-marketing',
    schemaType: 'Course',
    studyGuideTitle: 'Hệ Thống Kiến Thức Nền Tảng Học Phần Marketing Căn Bản',
    studyGuidePoints: [
      {
        heading: '1. Bản chất của Marketing & Các quan điểm Quản trị Marketing',
        content: 'Marketing là quá trình tạo dựng giá trị cho khách hàng và xây dựng mối quan hệ bền chặt với khách hàng nhằm thu về giá trị từ họ. Sinh viên cần phân biệt rõ 5 quan điểm quản trị Marketing qua các thời kỳ: Quan điểm tập trung vào sản xuất, Quan điểm hoàn thiện sản phẩm, Quan điểm tập trung vào bán hàng (từ trong ra ngoài), Quan điểm Marketing hiện đại (lấy nhu cầu khách hàng làm xuất phát điểm) và Quan điểm Marketing đạo đức xã hội.'
      },
      {
        heading: '2. Mô hình Hành vi Mua của Người tiêu dùng & Quá trình Quyết định Mua 5 Bước',
        content: 'Hành vi mua của người tiêu dùng chịu tác động của 4 nhóm yếu tố: Văn hóa (nền văn hóa, nhánh văn hóa, tầng lớp xã hội), Xã hội (nhóm tham khảo, gia đình, vai trò và địa vị), Cá nhân (tuổi tác, nghề nghiệp, hoàn cảnh kinh tế, lối sống, nhân cách) và Tâm lý (động cơ, nhận thức, sự hiểu biết, niềm tin và thái độ). Quá trình quyết định mua gồm 5 giai đoạn: Nhận thức nhu cầu -> Tìm kiếm thông tin -> Đánh giá các phương án -> Quyết định mua -> Hành vi sau khi mua.'
      },
      {
        heading: '3. Phối thức Marketing-Mix 4P (Product - Price - Place - Promotion)',
        content: 'Sản phẩm (Product) được xem xét trên 3 cấp độ: Sản phẩm cốt lõi (lợi ích chính), Sản phẩm hiện thực (nhãn hiệu, bao bì, chất lượng, kiểu dáng) và Sản phẩm bổ sung (bảo hành, lắp đặt, hậu mãi). Kết hợp cùng chiến lược Giá (Price), Kênh phân phối trực tiếp/gián tiếp (Place) và Truyền thông cổ động (Promotion) để tạo nên sức mạnh tổng hợp trên thị trường mục tiêu.'
      }
    ]
  },
  '/study-corner/principles-of-marketing/test': {
    title: 'Đề Thi Thử Trắc Nghiệm Marketing Căn Bản Có Đáp Án & Giải Thích',
    description: 'Làm bài thi thử trắc nghiệm trực tuyến môn Marketing căn bản: khái niệm nhu cầu, môi trường Marketing, hành vi người tiêu dùng, phân khúc STP và chiến lược 4P.',
    breadcrumbLabel: 'Trắc nghiệm Marketing căn bản',
    parentPath: '/study-corner/principles-of-marketing',
    siloKey: 'principles-of-marketing',
    schemaType: 'Quiz',
    studyGuideTitle: 'Trọng Tâm Ôn Tập Trắc Nghiệm Học Phần Marketing Căn Bản',
    studyGuidePoints: [
      {
        heading: '1. Nhóm câu hỏi về Môi trường Marketing & Hành vi Khách hàng',
        content: 'Lưu ý phân biệt chính xác các yếu tố thuộc Môi trường vi mô (doanh nghiệp có thể tác động kiểm soát một phần như nhà cung cấp, trung gian, khách hàng, đối thủ) và Môi trường vĩ mô PESTEL (doanh nghiệp phải thích nghi). Trong hành vi người tiêu dùng, chú ý các dạng hành vi mua: Mua phức tạp, Mua thỏa hiệp, Mua theo thói quen và Mua tìm kiếm sự đa dạng.'
      },
      {
        heading: '2. Nhóm câu hỏi về Chiến lược Sản phẩm, Giá, Phân phối & Xúc tiến (4P)',
        content: 'Ở chính sách Giá: phân biệt chiến lược Định giá hớt váng sữa (Market-Skimming Pricing - đặt giá ban đầu cao cho sản phẩm công nghệ mới) và Định giá thâm nhập thị trường (Market-Penetration Pricing - đặt giá thấp để nhanh chóng chiếm lĩnh thị phần lớn). Ở chính sách Phân phối: phân biệt phân phối rộng rãi (Intensive), phân phối chọn lọc (Selective) và phân phối độc quyền (Exclusive).'
      }
    ]
  },

  // --- SILO 8: KINH TẾ VI MÔ ---
  '/study-corner/microeconomics': {
    title: 'GIÁO TRÌNH KINH TẾ VI MÔ — Hệ Thống 6 Chương Chuẩn Học Thuật | NGUYỄN THỊ TRÚC PHƯƠNG',
    description: 'Tổng hợp lý thuyết và công thức Kinh tế vi mô: quy luật cung cầu, độ co giãn Ed/Es/Exy/Ei, lý thuyết hữu dụng TU/MU, chi phí sản xuất và thị trường độc quyền.',
    breadcrumbLabel: 'Kinh tế vi mô',
    parentPath: '/study-corner',
    siloKey: 'microeconomics',
    schemaType: 'Course'
  },
  '/study-corner/microeconomics/microeconomics-test': {
    title: 'Bài Tập Thực Hành & Đề Thi Thử Trắc Nghiệm Kinh Tế Vi Mô Có Đáp Án',
    description: 'Luyện tập trắc nghiệm Kinh tế vi mô theo 6 chương và đề thi thử tổng hợp: cân bằng thị trường, giá trần giá sàn, thặng dư tiêu dùng, chi phí biên và độc quyền.',
    breadcrumbLabel: 'Trắc nghiệm Kinh tế vi mô',
    parentPath: '/study-corner/microeconomics',
    siloKey: 'microeconomics',
    schemaType: 'Quiz',
    studyGuideTitle: 'Tóm Tắt Công Thức Tính Toán Cốt Lõi Khi Làm Bài Thi Kinh Tế Vi Mô',
    studyGuidePoints: [
      {
        heading: '1. Công thức Cân bằng Thị trường, Thuế và Độ co giãn của Cầu - Cung',
        content: 'Thị trường cân bằng tại mức giá Pe và sản lượng Qe thỏa mãn phương trình Qd = Qs. Khi Chính phủ đánh thuế t trên mỗi đơn vị sản phẩm bán ra, hàm cung mới trở thành Ps_mới = Ps_cũ + t. Độ co giãn của cầu theo giá tại một điểm được tính bằng công thức: Ed = (dQd/dP) * (P/Qd) = a * (P/Qd) (với hàm cầu tuyến tính Qd = aP + b).'
      },
      {
        heading: '2. Nguyên tắc Tối đa hóa Hữu dụng của Người tiêu dùng (TU & MU)',
        content: 'Người tiêu dùng đạt tổng hữu dụng tối đa (TU max) khi phân bổ ngân sách I cho hai hàng hóa X và Y thỏa mãn đồng thời 2 điều kiện: (1) Đẳng thức hữu dụng biên trên mỗi đồng chi tiêu: MUx / Px = MUy / Py, và (2) Phương trình đường ngân sách: X * Px + Y * Py = I. Tại điểm tiêu dùng tối ưu, đường bàng quan tiếp xúc với đường ngân sách (MRSxy = Px / Py).'
      },
      {
        heading: '3. Hàm Chi phí Ngắn hạn và Các mốc Giá đặc biệt của Doanh nghiệp Cạnh tranh hoàn hảo',
        content: 'Tổng chi phí TC = TFC + TVC; Chi phí trung bình AC = AFC + AVC; Chi phí biên MC = (TC)’_Q = (TVC)’_Q. Đường MC luôn cắt đường AVC và đường AC tại điểm cực tiểu của mỗi đường. Trong thị trường cạnh tranh hoàn hảo: Giá hòa vốn P_hv = AC_min; Giá đóng cửa sản xuất trong ngắn hạn P_đc = AVC_min.'
      }
    ]
  },

  // --- SILO 9: HƯỚNG DẪN THỰC TẬP ---
  '/study-corner/internships': {
    title: 'Cẩm Nang Thực Tập Tốt Nghiệp Quản Trị Kinh Doanh & Marketing',
    description: 'Hướng dẫn toàn diện quy trình thực tập tốt nghiệp: cách chọn đề tài, xin số liệu tại doanh nghiệp, lập đề cương chi tiết và viết báo cáo thực tập đạt điểm giỏi.',
    breadcrumbLabel: 'Hướng dẫn thực tập',
    parentPath: '/study-corner',
    siloKey: 'internships',
    schemaType: 'LearningResource'
  },
  '/study-corner/internships/hcehdtt': {
    title: 'Đề Cương Chi Tiết & Mẫu Báo Cáo Thực Tập Tốt Nghiệp Trường HCE',
    description: 'Tổng hợp hệ thống đề cương chi tiết các chuyên đề thực tập tốt nghiệp ngành Quản trị kinh doanh, Marketing, Thương mại và mẫu trình bày chuẩn trường HCE.',
    breadcrumbLabel: 'Đề cương & Biểu mẫu HCE',
    parentPath: '/study-corner/internships',
    siloKey: 'internships',
    schemaType: 'LearningResource'
  },
  '/study-corner/internships/huong-dan-bao-cao-hce': {
    title: 'Hướng Dẫn Trình Bày Báo Cáo Thực Tập Tốt Nghiệp Chuẩn Trường HCE',
    description: 'Quy định chi tiết về hình thức định dạng trang in, font chữ, đánh số bảng biểu, sơ đồ, mục lục tự động và thang điểm chấm báo cáo thực tập tốt nghiệp tại HCE.',
    breadcrumbLabel: 'Chuẩn trình bày HCE',
    parentPath: '/study-corner/internships',
    siloKey: 'internships',
    schemaType: 'LearningResource'
  },
  '/study-corner/internships/sample': {
    title: 'Kho 19 Mẫu Báo Cáo Thực Tập Tốt Nghiệp Quản Trị Kinh Doanh Điểm Cao',
    description: 'Tải miễn phí 19 bài báo cáo thực tập tốt nghiệp mẫu hoàn chỉnh các đề tài: chiến lược Marketing, bán hàng, nhân sự, tiền lương, huy động vốn và dịch vụ khách hàng.',
    breadcrumbLabel: '19 Mẫu báo cáo thực tập',
    parentPath: '/study-corner/internships',
    siloKey: 'internships',
    schemaType: 'LearningResource',
    studyGuideTitle: 'Hướng Dẫn Tham Khảo 19 Mẫu Báo Cáo Thực Tập Hiệu Quả & Không Vi Phạm Đạo Văn',
    studyGuidePoints: [
      {
        heading: '1. Cách học hỏi bố cục và phương pháp phân tích số liệu từ bài mẫu',
        content: 'Kho 19 bài báo cáo thực tập mẫu phía trên được tuyển chọn từ các bài đạt điểm Giỏi/Xuất sắc ở nhiều lĩnh vực: Quản trị bán hàng, Marketing truyền thông, Quản trị nhân sự - tiền lương, Quản trị chuỗi cung ứng - xuất nhập khẩu và Tín dụng ngân hàng. Sinh viên nên tham khảo cách tác giả thiết kế hệ thống bảng biểu so sánh chênh lệch tuyệt đối/tương đối qua 3 năm và cách dẫn dắt từ số liệu Chương 2 sang giải pháp Chương 3.'
      },
      {
        heading: '2. Nguyên tắc tùy biến theo đặc thù doanh nghiệp thực tập thực tế',
        content: 'Tuyệt đối không sao chép nguyên văn nhận xét của bài mẫu vào bài làm của mình. Mỗi doanh nghiệp có quy mô vốn, cơ cấu phòng ban, danh mục sản phẩm và tệp khách hàng khác nhau; do đó mọi nhận định ưu điểm, hạn chế và nguyên nhân ở cuối Chương 2 phải được rút ra trực tiếp từ bảng số liệu thực tế của đơn vị nơi sinh viên thực tập.'
      }
    ]
  },
  '/study-corner/internships/tailieuthamkhao': {
    title: 'Hướng Dẫn Cách Trích Dẫn & Viết Danh Mục Tài Liệu Tham Khảo Chuẩn',
    description: 'Quy tắc trích dẫn tài liệu tham khảo trong báo cáo thực tập, tiểu luận và khóa luận tốt nghiệp theo chuẩn Bộ Giáo dục & Đào tạo, chuẩn APA và IEEE kèm ví dụ mẫu.',
    breadcrumbLabel: 'Cách trích dẫn tài liệu',
    parentPath: '/study-corner/internships',
    siloKey: 'internships',
    schemaType: 'LearningResource'
  },

  // --- SILO 8: KHỞI NGHIỆP ---
  '/study-corner/entrepreneurship': {
    title: 'Bài Giảng Khởi Nghiệp: Ý Tưởng, Mô Hình Canvas & Dự Án',
    description: 'Tài liệu học phần Khởi nghiệp kinh doanh: phương pháp tìm kiếm ý tưởng, thiết kế Business Model Canvas, lập kế hoạch Marketing, vận hành và tài chính khởi nghiệp.',
    breadcrumbLabel: 'Khởi nghiệp',
    parentPath: '/study-corner',
    siloKey: 'entrepreneurship',
    schemaType: 'Course'
  },
  '/study-corner/entrepreneurship/cau-truc-du-an-mau': {
    title: 'Cấu Trúc Bản Kế Hoạch Dự Án Khởi Nghiệp Mẫu Chi Tiết',
    description: 'Khung đề cương chi tiết bản thuyết minh dự án khởi nghiệp kinh doanh dành cho sinh viên: từ phân tích thị trường, kế hoạch vận hành đến bảng dự phóng dòng tiền.',
    breadcrumbLabel: 'Cấu trúc dự án mẫu',
    parentPath: '/study-corner/entrepreneurship',
    siloKey: 'entrepreneurship',
    schemaType: 'LearningResource'
  },
  '/study-corner/entrepreneurship/pest': {
    title: 'Mô Hình Phân Tích Môi Trường Vĩ Mô PEST & Đánh Giá Tố Chất PEC',
    description: 'Hướng dẫn vận dụng mô hình PEST (Chính trị, Kinh tế, Xã hội, Công nghệ) phân tích cơ hội khởi nghiệp và bộ công cụ tự đánh giá năng lực doanh nhân PEC.',
    breadcrumbLabel: 'Mô hình PEST & PEC',
    parentPath: '/study-corner/entrepreneurship',
    siloKey: 'entrepreneurship',
    schemaType: 'LearningResource'
  },
  '/study-corner/entrepreneurship/hanh-vi-nguoi-tieu-dung': {
    title: 'Các Yếu Tố Ảnh Hưởng Đến Hành Vi Người Tiêu Dùng & Ví Dụ Thực Tế',
    description: 'Phân tích chuyên sâu 4 nhóm yếu tố Văn hóa, Xã hội, Cá nhân, Tâm lý tác động đến hành vi mua sắm của người tiêu dùng kèm tình huống thực tiễn tại Việt Nam.',
    breadcrumbLabel: 'Hành vi người tiêu dùng',
    parentPath: '/study-corner/entrepreneurship',
    siloKey: 'entrepreneurship',
    schemaType: 'LearningResource'
  },

  // --- SILO 11: CHUYÊN ĐỀ IMC ---
  '/study-corner/imc': {
    title: 'Bài Giảng Truyền Thông Marketing Tích Hợp (IMC) Toàn Tập Thực Chiến',
    description: 'Giáo trình và bài giảng chuyên đề Truyền thông Marketing tích hợp (IMC): lập kế hoạch truyền thông, quảng cáo, PR, khuyến mãi, bán hàng cá nhân và Digital Marketing.',
    breadcrumbLabel: 'Chuyên đề IMC',
    parentPath: '/study-corner',
    schemaType: 'Course'
  },

  // --- PROTECTED / INTERNAL PORTALS & SHARED PUBLIC ELEARNING DOCS ---
        };

export function getSeoMetaForPath(cleanPath: string, fallbackTitle?: string): PageSeoConfig {
  const norm = cleanPath === '/' ? '/' : cleanPath.toLowerCase().replace(/\/+$/, '');
  if (PAGE_SEO_META[norm]) {
    return PAGE_SEO_META[norm];
  }
  const cleanFallback = (fallbackTitle || 'Tài liệu học thuật')
    .replace(/^NGUYỄN THỊ TRÚC PHƯƠNG\s*-\s*/i, '')
    .trim();
  return {
    title: `${cleanFallback} — Cổng Học Liệu NGUYỄN THỊ TRÚC PHƯƠNG`,
    description: `Tài liệu học tập, hướng dẫn giải bài tập và đề cương chuyên đề ${cleanFallback} dành cho sinh viên trên cổng học thuật của Giảng viên NGUYỄN THỊ TRÚC PHƯƠNG.`,
    breadcrumbLabel: cleanFallback,
    schemaType: 'LearningResource'
  };
}
