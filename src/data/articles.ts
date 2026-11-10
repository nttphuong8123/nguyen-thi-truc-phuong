export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  author: string;
  tags: string[];
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'triet-ly-thach-luu-moc',
    title: 'Triết Lý Thạch Lựu Mộc: Sức Bền Nội Tại Giữa Nghịch Cảnh',
    excerpt: 'Trong lục Mộc, Thạch Lựu Mộc là loài cây đặc biệt nhất. Không mọc ở đồng bằng màu mỡ hay rừng rậm sum suê, nó đâm chồi từ vách đá cằn cỗi, nở hoa đỏ thắm và kết quả ngọt ngào.',
    category: 'Triết Lý Nhân Sinh',
    publishedAt: '2026-03-15',
    readTime: '6 phút đọc',
    coverImage: '/images/articles/art-1.svg',
    featured: true,
    author: 'Nguyễn Thị Trúc Phương',
    tags: ['Thạch Lựu Mộc', 'Nội Lực', 'Tâm Thái', 'Trưởng Thành'],
    content: `
      <p class="lead text-lg font-medium text-brand-forest/90 leading-relaxed mb-6">
        Người xưa xếp Thạch Lựu Mộc vào nạp âm của những con người sinh năm Canh Thân và Tân Dậu. Đó là loài gỗ cây lựu mọc trên ghềnh đá. Đất ít, gió nhiều, sương lạnh quanh năm, nhưng kỳ lạ thay, rễ cây lại bám sâu vào từng kẽ nứt của đá tảng để hút lấy tinh hoa của đất trời.
      </p>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">1. Đứng Vững Trước Sóng Gió Bằng Cội Rễ Bền Sâu</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Cuộc sống hiếm khi trải thảm hoa hồng. Với người phụ nữ ở độ tuổi chín muồi của cuộc đời, qua bao thăng trầm, điều giá trị nhất không phải là sự êm ả bên ngoài, mà là khả năng tự đứng vững trước mọi đổi thay. Cây lựu trên đá dạy chúng ta rằng: môi trường cằn cỗi không quyết định số phận, cách rễ cây tìm nước mới quyết định sức sống.
      </p>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Khi đối diện với thử thách trong công việc lẫn cuộc sống gia đình, tôi luôn nhớ về hình tượng ấy. Bình thản đón nhận, kiên nhẫn tìm giải pháp, và không bao giờ đánh mất niềm tin vào bản thân.
      </p>

      <blockquote class="my-8 p-6 bg-brand-sage/60 border-l-4 border-brand-gold rounded-r-xl italic font-serif text-lg text-brand-forest">
        "Không có hoàn cảnh nào giam cầm được một tâm hồn kiên định. Giống như lựu trên vách đá, càng thử thách, sắc hoa càng thêm thắm đỏ."
      </blockquote>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">2. Cho Đi Hương Sắc Dù Môi Trường Khắc Nghiệt</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Một điểm đặc biệt của Thạch Lựu Mộc là dù sống nơi sỏi đá, hoa lựu vẫn rực rỡ và quả lựu vẫn chứa chan những hạt ngọc mọng nước. Điều này mang ý nghĩa: dù nghịch cảnh có khắc nghiệt đến đâu, người mang cốt cách này vẫn giữ trọn lòng nhân hậu, sự hào sảng và tình thương dành cho người xung quanh.
      </p>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Đó chính là kim chỉ nam trong mọi quyết định của tôi: làm việc với sự tận tâm, đối đãi với mọi người bằng lòng chân thành và luôn để lại những giá trị tích cực sau mỗi chặng đường đã qua.
      </p>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">3. Lời Kết Cho Một Hành Trình</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Mỗi chúng ta đều là một phiên bản duy nhất với nguồn năng lượng riêng biệt. Hiểu mình, thuận theo tự nhiên và không ngừng vun bồi nội lực chính là bí quyết để sống an yên và kiến tạo những thành quả bền vững cho đời.
      </p>
    `,
  },
  {
    slug: 'nghe-thuat-can-bang-phu-nu-hien-dai',
    title: 'Nghệ Thuật Cân Bằng: Giữ Lửa Gia Đình Và Khẳng Định Bản Thân',
    excerpt: 'Cân bằng không phải là chia đều thời gian một cách máy móc, mà là hiện diện trọn vẹn ở mỗi khoảnh khắc ta đang sống.',
    category: 'Góc Nhìn Cuộc Sống',
    publishedAt: '2026-02-28',
    readTime: '5 phút đọc',
    coverImage: '/images/articles/art-2.svg',
    featured: true,
    author: 'Nguyễn Thị Trúc Phương',
    tags: ['Cân Bằng', 'Gia Đình', 'Hạnh Phúc', 'Phụ Nữ'],
    content: `
      <p class="lead text-lg font-medium text-brand-forest/90 leading-relaxed mb-6">
        Nhiều người hỏi tôi: "Làm thế nào để vừa chu toàn công việc xã hội, vừa chăm lo tổ ấm gia đình mà vẫn giữ được sự tươi trẻ, an lạc?". Câu trả lời của tôi nằm ở hai chữ: Hiện Diện.
      </p>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">Hiện Diện Trọn Vẹn Trong Từng Vai Trò</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Khi làm việc, tôi tập trung 100% tâm trí cho mục tiêu trước mắt. Nhưng khi bước chân qua cánh cửa nhà, tôi bỏ lại mọi âu lo ngoài thềm, để trở thành một người mẹ dịu dàng, một người bạn tâm giao bên mâm cơm ấm cúng.
      </p>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Chất lượng của thời gian bên nhau quý giá hơn số lượng. Một bữa tối 30 phút rộn tiếng cười và lắng nghe thấu hiểu giá trị hơn nhiều giờ ngồi cạnh nhau nhưng tâm trí ở nơi khác.
      </p>

      <blockquote class="my-8 p-6 bg-brand-sage/60 border-l-4 border-brand-teal rounded-r-xl italic font-serif text-lg text-brand-forest">
        "Tổ ấm là nơi nuôi dưỡng năng lượng, chứ không phải nơi trút bỏ những áp lực tích tụ từ thế giới bên ngoài."
      </blockquote>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">Nuôi Dưỡng Bản Thân Là Nền Tảng Của Sự Yêu Thương</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Một chiếc bình rỗng không thể rót nước cho người khác. Phụ nữ muốn đem lại sự ấm áp cho gia đình thì trước hết tâm hồn mình phải được tưới tắm bình an. Hãy dành thời gian đọc một cuốn sách hay, thưởng thức tách trà sớm, hoặc dạo bước giữa thiên nhiên xanh mát.
      </p>
    `,
  },
  {
    slug: 'hanh-trinh-gan-ket-cong-dong',
    title: 'Hành Trình Gắn Kết Cộng Đồng: Cho Đi Là Nhận Lại Nguồn Năng Lượng An Lành',
    excerpt: 'Những chuyến đi thiện nguyện, những buổi sẻ chia cùng phụ nữ và trẻ em vùng khó khăn đã cho tôi hiểu thêm về ý nghĩa sâu sắc của sự kết nối con người.',
    category: 'Hoạt Động Cộng Đồng',
    publishedAt: '2026-01-20',
    readTime: '7 phút đọc',
    coverImage: '/images/articles/art-3.svg',
    featured: true,
    author: 'Nguyễn Thị Trúc Phương',
    tags: ['Thiện Nguyện', 'Cộng Đồng', 'Gắn Kết', 'Chia Sẻ'],
    content: `
      <p class="lead text-lg font-medium text-brand-forest/90 leading-relaxed mb-6">
        Trong hành trình hơn bốn thập kỷ của cuộc đời, những khoảnh khắc khiến trái tim tôi rung động và cảm thấy trọn vẹn nhất không phải là lúc gặt hái thành công cá nhân, mà là khi nhìn thấy nụ cười rạng rỡ của những em nhỏ và bà con nơi vùng xa.
      </p>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">Mỗi Bàn Tay Chạm Đến Là Một Niềm Hy Vọng Được Thắp Lên</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Cộng đồng không ở đâu xa, chính là những con người quanh ta cần một bờ vai động viên, một cuốn tập mới cho năm học, hay chỉ là sự lắng nghe chân thành. Khi cho đi bằng tất cả tấm lòng không mưu cầu đáp đền, ta nhận lại sự thanh thản vô giá trong tâm khảm.
      </p>

      <blockquote class="my-8 p-6 bg-brand-sage/60 border-l-4 border-brand-gold rounded-r-xl italic font-serif text-lg text-brand-forest">
        "Bàn tay tặng hoa hồng luôn phảng phất hương thơm. Hạnh phúc chân thật sinh ra từ việc giúp đỡ tha nhân."
      </blockquote>

      <h2 class="text-2xl font-serif font-bold text-brand-emerald mt-8 mb-4">Cam Kết Đồng Hành Dài Lâu</h2>
      <p class="mb-4 text-brand-forest/80 leading-relaxed">
        Chúng tôi không chỉ trao quà ngắn hạn, mà hướng đến việc hỗ trợ kỹ năng sống, khuyến khích học tập và nâng cao năng lực cho phụ nữ tự chủ kinh tế. Đó mới là hạt mầm bền vững cho tương lai.
      </p>
    `,
  },
  {
    slug: '5-thoi-quen-nuoi-duong-tam-the-tinh-thuc',
    title: '5 Thói Quen Mỗi Sáng Nuôi Dưỡng Tâm Thế Tỉnh Thức & An Nhiên',
    excerpt: 'Cách bạn bắt đầu một buổi sáng sẽ định hình năng lượng cho toàn bộ ngày hôm đó. Hãy dành tặng cho bản thân những phút giây lắng đọng đầu ngày.',
    category: 'Sống Khỏe & Tinh Thần',
    publishedAt: '2025-12-10',
    readTime: '4 phút đọc',
    coverImage: '/images/articles/art-4.svg',
    featured: false,
    author: 'Nguyễn Thị Trúc Phương',
    tags: ['Tỉnh Thức', 'Thói Quen', 'Sức Khỏe', 'Lối Sống'],
    content: `
      <p class="lead text-lg font-medium text-brand-forest/90 leading-relaxed mb-6">
        Buổi sáng là thời khắc đất trời chuyển giao linh khí, không khí trong lành và tĩnh mịch nhất. Dưới đây là 5 thói quen giản dị tôi duy trì suốt nhiều năm qua để nuôi dưỡng sức sống mỗi ngày.
      </p>

      <ul class="space-y-4 my-6 list-disc list-inside text-brand-forest/85">
        <li><strong>Uống một ly nước ấm ấm đầu ngày:</strong> Đánh thức hệ tiêu hóa, thanh lọc cơ thể sau giấc ngủ dài.</li>
        <li><strong>15 phút hít thở sâu và lắng nghe cơ thể:</strong> Điều hòa nhịp tim, giải tỏa căng thẳng tiềm ẩn.</li>
        <li><strong>Viết ra 3 điều biết ơn:</strong> Biết ơn sức khỏe, biết ơn những người thân yêu và biết ơn một ngày mới để cống hiến.</li>
        <li><strong>Thưởng thức một ấm trà xanh thơm dịu:</strong> Nhâm nhi từng ngụm trà trong tĩnh lặng, không cầm điện thoại.</li>
        <li><strong>Xác định 1 nhiệm vụ trọng tâm nhất trong ngày:</strong> Giúp tâm trí tập trung vào điều thật sự có ý nghĩa.</li>
      </ul>
    `,
  },
];
