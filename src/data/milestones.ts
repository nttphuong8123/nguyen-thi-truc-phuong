export interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export const milestones: Milestone[] = [
  {
    year: '1981',
    title: 'Khởi Đầu Cội Rễ — Tân Dậu',
    subtitle: 'Nạp âm Thạch Lựu Mộc',
    description: 'Sinh ngày 23/02/1981. Mang trong mình tinh thần bền bỉ của loài mộc trên đá, được nuôi dưỡng bởi sự kiên nhẫn, đức tính chịu thương chịu khó và ý chí tự lập từ thuở ấu thơ.',
    tag: 'Nguồn Cội',
  },
  {
    year: '2003 - 2008',
    title: 'Nền Tảng Tri Thức & Khởi Nghiệp Thực Tiễn',
    subtitle: 'Học tập và tôi luyện môi trường thực tế',
    description: 'Tốt nghiệp đại học chuyên ngành kinh tế - quản trị. Bước vào thương trường với tinh thần học hỏi không ngừng, trải qua nhiều vị trí quản lý vận hành then chốt.',
    tag: 'Kiến Tạo Nền Tảng',
  },
  {
    year: '2009 - 2016',
    title: 'Khẳng Định Bản Lĩnh Quản Trị',
    subtitle: 'Điều hành và phát triển đội ngũ',
    description: 'Trực tiếp dẫn dắt các dự án phát triển kinh doanh, tối ưu hóa quy trình tổ chức và xây dựng văn hóa doanh nghiệp lấy con người làm trọng tâm.',
    tag: 'Phát Triển',
  },
  {
    year: '2017 - 2022',
    title: 'Mở Rộng Tầm Nhìn & Cống Hiến Xã Hội',
    subtitle: 'Tư vấn chiến lược & Hoạt động thiện nguyện',
    description: 'Đồng hành cùng nhiều chương trình hỗ trợ phụ nữ làm kinh tế, xây dựng các quỹ khuyến học và tham gia tích cực vào các phong trào thiện nguyện vì cộng đồng.',
    tag: 'Đồng Hành',
  },
  {
    year: '2023 - Nay',
    title: 'Nuôi Dưỡng Nội Lực & Giá Trị Bền Vững',
    subtitle: 'Sống an nhiên, sẻ chia tri thức và truyền cảm hứng',
    description: 'Tập trung vào sứ mệnh chia sẻ trải nghiệm sống, tư vấn định hướng giá trị cho thế hệ kế thừa, và lan tỏa năng lượng bình an, thanh cao đến với cuộc đời.',
    tag: 'Viên Mãn',
  },
];

export const coreValues = [
  {
    title: 'Bền Bỉ (Mộc)',
    desc: 'Ý chí kiên định trước mọi nghịch cảnh, như rễ cây lựu bám chặt trên đá ghềnh để vươn mình đón nắng mai.',
    icon: 'tree',
  },
  {
    title: 'Linh Hoạt (Thủy)',
    desc: 'Mềm mại như dòng nước uốn lượn qua vạn vật, nuôi dưỡng sự an lạc và thích ứng với mọi đổi thay.',
    icon: 'water',
  },
  {
    title: 'Thanh Cao (Ngọc & Kim)',
    desc: 'Giữ trọn đạo lý làm người, nhân ái, trung thực và mang đến vẻ đẹp sang trọng, chuẩn mực trong từng hành xử.',
    icon: 'gem',
  },
  {
    title: 'Bền Vững (Thổ)',
    desc: 'Lấy sự ổn định, tử tế và giá trị thực làm nền tảng cho mọi mối quan hệ cũng như sự nghiệp lâu dài.',
    icon: 'shield',
  },
];
