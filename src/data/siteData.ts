export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface SiteConfig {
  title: string;
  name: string;
  shortName: string;
  dob: string;
  destiny: string;
  destinyDetail: string;
  role: string;
  tagline: string;
  description: string;
  siteUrl: string;
  email: string;
  phone: string;
  address: string;
  social: {
    facebook?: string;
    linkedin?: string;
    zalo?: string;
    youtube?: string;
  };
  nav: NavItem[];
}

export const siteConfig: SiteConfig = {
  title: 'Nguyễn Thị Trúc Phương — Chân Dung & Giá Trị Bền Vững',
  name: 'Nguyễn Thị Trúc Phương',
  shortName: 'Trúc Phương',
  dob: '23/02/1981',
  destiny: 'Thạch Lựu Mộc (Tân Dậu 1981)',
  destinyDetail: 'Cây lựu kiên cường mọc giữa đá núi — biểu tượng của nội lực mạnh mẽ, sự kiên định, thanh tao và tấm lòng thiện lương ấm áp.',
  role: 'Nhà Quản Trị & Phát Triển Cộng Đồng',
  tagline: 'Vững chãi như mộc trên đá, thanh tao giữa dòng đời vạn biến.',
  description: 'Website cá nhân chính thức của Nguyễn Thị Trúc Phương. Nơi lưu giữ hành trình sống, triết lý nhân sinh Thạch Lựu Mộc, chia sẻ kinh nghiệm quản trị và các hoạt động cống hiến cho cộng đồng.',
  siteUrl: 'https://nguyenthitrucphuong.pages.dev',
  email: 'contact@nguyenthitrucphuong.pages.dev',
  phone: '0908 xxx xxx',
  address: 'TP. Hồ Chí Minh, Việt Nam',
  social: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    zalo: 'https://zalo.me',
    youtube: 'https://youtube.com',
  },
  nav: [
    { title: 'Trang chủ', href: '/' },
    { title: 'Giới thiệu', href: '/gioi-thieu' },
    { title: 'Sự nghiệp & Hành trình', href: '/su-nghiep' },
    { title: 'Thư viện hình ảnh', href: '/thu-vien' },
    { title: 'Góc chia sẻ', href: '/tin-tuc' },
    { title: 'Liên hệ', href: '/lien-he' },
  ],
};
