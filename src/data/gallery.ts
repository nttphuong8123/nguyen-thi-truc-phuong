export interface GalleryItem {
  id: string;
  title: string;
  category: 'social' | 'event' | 'lifestyle' | 'education';
  categoryLabel: string;
  image: string;
  date: string;
  description: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Hội thảo Lãnh Đạo Nữ & Phát Triển Bền Vững 2026',
    category: 'event',
    categoryLabel: 'Sự kiện & Tọa đàm',
    image: '/images/gallery/g-1.svg',
    date: 'Tháng 02/2026',
    description: 'Chia sẻ về phương pháp xây dựng nội lực và quản trị doanh nghiệp kiên cường trước biến động thị trường.',
  },
  {
    id: 'gal-2',
    title: 'Chương trình thiện nguyện "Gieo Mầm Ước Mơ"',
    category: 'social',
    categoryLabel: 'Hoạt động xã hội',
    image: '/images/gallery/g-2.svg',
    date: 'Tháng 01/2026',
    description: 'Trao tặng học bổng và sách vở cho các em học sinh có hoàn cảnh khó khăn vượt khó học giỏi.',
  },
  {
    id: 'gal-3',
    title: 'Khoảnh khắc an nhiên giữa không gian trà đạo',
    category: 'lifestyle',
    categoryLabel: 'Khoảnh khắc đời thường',
    image: '/images/gallery/g-3.svg',
    date: 'Tháng 12/2025',
    description: 'Tìm lại sự tĩnh lặng và cân bằng qua từng chén trà ấm áp bên những người bạn tâm giao.',
  },
  {
    id: 'gal-4',
    title: 'Tọa đàm chuyên đề: Định vị giá trị phụ nữ thế kỷ 21',
    category: 'education',
    categoryLabel: 'Kết nối tri thức',
    image: '/images/gallery/g-4.svg',
    date: 'Tháng 11/2025',
    description: 'Giao lưu cùng các bạn trẻ về hành trình hoàn thiện bản thân và định hướng tương lai bền vững.',
  },
  {
    id: 'gal-5',
    title: 'Hành trình vì môi trường xanh cộng đồng',
    category: 'social',
    categoryLabel: 'Hoạt động xã hội',
    image: '/images/gallery/g-5.svg',
    date: 'Tháng 10/2025',
    description: 'Tham gia trồng cây gây rừng, lan tỏa thông điệp bảo vệ hành tinh xanh và lối sống thuần khiết.',
  },
  {
    id: 'gal-6',
    title: 'Dấu ấn ngày hội văn hóa doanh nhân Việt Nam',
    category: 'event',
    categoryLabel: 'Sự kiện & Tọa đàm',
    image: '/images/gallery/g-6.svg',
    date: 'Tháng 09/2025',
    description: 'Vinh danh những đóng góp tích cực cho phong trào kết nối và phát triển cộng đồng.',
  },
];
