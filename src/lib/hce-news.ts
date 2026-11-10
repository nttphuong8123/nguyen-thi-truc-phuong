// Module tự động cập nhật tin tức & thông báo từ Cổng thông tin sinh viên HCE (sv.kthcm.edu.vn)
// Tuân thủ quy định dẫn nguồn tin tức chính thống từ Nhà trường

export interface HceNewsItem {
  id: string;
  title: string;
  url: string;
  category: string;
  date: string;
  summary: string;
  source: string;
}

function decodeEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Fallback seed data đảm bảo trang luôn hiển thị thông báo mới nhất ngay cả khi mạng ngoài bị ngắt
const FALLBACK_HCE_NEWS: HceNewsItem[] = [
  {
    id: 'hce-1754',
    title: 'Thông báo nhận bằng tốt nghiệp trình độ Cao đẳng, Trung cấp chuyên nghiệp',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/thong-bao-nhan-bang-tot-nghiep-trinh-do-cao-dang-trung-cap-chuyen-nghiep.html?pIDDanhMuc=9',
    category: 'HƯỚNG DẪN HỌC VỤ',
    date: '04 Tháng 07',
    summary: 'Thông báo chi tiết về thời gian, địa điểm và thủ tục nhận bằng tốt nghiệp dành cho sinh viên hoàn thành chương trình.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1753',
    title: 'Thông báo hướng dẫn khôi phục mật khẩu tài khoản trang sinh viên, tài khoản email do Nhà trường cung cấp; cài đặt app OneUni',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/thong-bao-huong-dan-khoi-phuc-mat-khau-tai-khoan-trang-sinh-tai-khoan-email-do-nha-truong-cung-cap-khac-phuc-tinh-trang-khong-truy-cap-duoc-vao-trang.html?pIDDanhMuc=9',
    category: 'HƯỚNG DẪN HỌC VỤ',
    date: '30 Tháng 06',
    summary: 'Quy trình lấy lại mật khẩu tài khoản học tập, kích hoạt email sinh viên và cài đặt ứng dụng OneUni trên điện thoại.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1752',
    title: 'Quy trình giải quyết học vụ',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/quy-trinh-phong-dao-tao-phoi-voi-khoa-giai-quyet-hoc-vu-sinh-vien.html?pIDDanhMuc=9',
    category: 'HƯỚNG DẪN HỌC VỤ',
    date: '09 Tháng 06',
    summary: 'Quy trình phối hợp giữa Phòng Đào tạo và các Khoa trong công tác tiếp nhận, xử lý đơn từ và học vụ của sinh viên.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1751',
    title: 'Hướng dẫn sinh viên gửi yêu cầu rút bớt môn học',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/huong-dan-sinh-vien-gui-yeu-cau-rut-bot-mon-hoc.html?pIDDanhMuc=9',
    category: 'HƯỚNG DẪN HỌC VỤ',
    date: '30 Tháng 05',
    summary: 'Các bước thao tác nộp đơn rút môn học hợp lệ trên cổng sinh viên theo đúng khung thời gian quy định.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1750',
    title: 'Hướng dẫn đăng ký môn học trực tuyến',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/huong-dan-dang-ky-mon-hoc.html?pIDDanhMuc=9',
    category: 'HƯỚNG DẪN HỌC VỤ',
    date: '18 Tháng 05',
    summary: 'Hướng dẫn chi tiết quy trình đăng ký học phần, chọn lớp học phần và thời khóa biểu trực tuyến.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1749',
    title: 'Danh sách sinh viên đăng ký tham dự Lễ tốt nghiệp năm 2026 - Lần 2',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/danh-sach-sinh-vien-dang-ky-tham-du-le-tot-nghiep-nam-2026-lan-2.html?pIDDanhMuc=5',
    category: 'ĐÀO TẠO',
    date: '21 Tháng 10',
    summary: 'Danh sách rà soát sinh viên đủ điều kiện và đăng ký tham dự buổi Lễ trao bằng tốt nghiệp đợt 2.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1748',
    title: 'Quyết định công nhận tốt nghiệp đợt tháng 09/2026',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/quyet-dinh-cong-nhan-tot-nghiep-dot-thang-09-2026.html?pIDDanhMuc=5',
    category: 'ĐÀO TẠO',
    date: '14 Tháng 10',
    summary: 'Quyết định chính thức công nhận tốt nghiệp cho các khóa đào tạo hệ chính quy hoàn thành chuẩn đầu ra.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1747',
    title: 'Lịch thi kết thúc học phần và danh sách phòng thi các khóa',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/lich-thi-hoc-ky.html',
    category: 'KHẢO THÍ',
    date: '10 Tháng 10',
    summary: 'Thông báo lịch thi chính thức, ca thi, số báo danh và quy chế thi học kỳ dành cho sinh viên các khoa.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1746',
    title: 'Thông báo về việc xét cấp học bổng khuyến khích học tập học kỳ',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/hoc-bong-khuyen-khich.html',
    category: 'CÔNG TÁC HS-SV',
    date: '05 Tháng 10',
    summary: 'Danh sách dự kiến và tiêu chuẩn xét duyệt học bổng khuyến khích học tập căn cứ trên kết quả học tập và rèn luyện.',
    source: 'sv.kthcm.edu.vn'
  },
  {
    id: 'hce-1745',
    title: 'Kế hoạch tổ chức Tuần sinh hoạt công dân - sinh viên đầu khóa và giữa khóa',
    url: 'https://sv.kthcm.edu.vn/sinh-vien/tin-tuc/tuan-sinh-hoat-cong-dan.html',
    category: 'THÔNG TIN CHUNG',
    date: '28 Tháng 09',
    summary: 'Lịch phổ biến quy chế, thời sự chính trị và kỹ năng học đại học cho sinh viên toàn trường.',
    source: 'sv.kthcm.edu.vn'
  }
];

// Bộ nhớ cache tạm thời (In-memory Cache) trong 10 phút
let cachedNews: { items: HceNewsItem[]; timestamp: number } | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 phút

export function parseHceNewsHtml(rawHtml: string): HceNewsItem[] {
  const articles: HceNewsItem[] = [];

  // Trích xuất các danh mục từ nav-tabs
  const categoryMap: Record<string, string> = {};
  const tabLinkRegex = /<a[^>]+href=["']#([^"']+)["'][^>]*>[\s\S]*?<div[^>]+class=["'][^"']*head-notifi[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
  let tMatch: RegExpExecArray | null;
  while ((tMatch = tabLinkRegex.exec(rawHtml)) !== null) {
    categoryMap[tMatch[1]] = decodeEntities(tMatch[2].trim());
  }

  // Parse từng tab-pane để gán đúng Category
  const paneRegex = /<div[^>]+class=["'][^"']*tab-pane[^"']*["'][^>]+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/div>\s*(?=<div[^>]+class=["'][^"']*tab-pane|<\/div>\s*<\/div>\s*$)/gi;
  let pMatch: RegExpExecArray | null;
  while ((pMatch = paneRegex.exec(rawHtml)) !== null) {
    const paneId = pMatch[1];
    const paneContent = pMatch[2];
    const categoryName = categoryMap[paneId] || 'Thông báo chung';

    const notifiRegex = /<div[^>]+class=["'][^"']*item-notifi[^"']*["'][^>]*>([\s\S]*?)(?=<div[^>]+class=["'][^"']*item-notifi|$)/gi;
    let nMatch: RegExpExecArray | null;
    while ((nMatch = notifiRegex.exec(paneContent)) !== null) {
      const itemHtml = nMatch[1];

      const aMatch = itemHtml.match(/<a[^>]+href=["']([^"']+)["'][^>]*class=["'][^"']*title-notifi[^"']*["'][^>]*>([\s\S]*?)<\/a>/i);
      if (!aMatch) continue;

      let href = aMatch[1].trim();
      if (!href.startsWith('http')) {
        href = 'https://sv.kthcm.edu.vn' + (href.startsWith('/') ? '' : '/') + href;
      }
      const title = decodeEntities(aMatch[2].replace(/<[^>]+>/g, '').trim());

      const monthMatch = itemHtml.match(/<p[^>]+class=["'][^"']*month[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
      const dayMatch = itemHtml.match(/<p[^>]+class=["'][^"']*days[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);

      let dateStr = '';
      if (dayMatch) {
        const day = dayMatch[1].replace(/<[^>]+>/g, '').trim();
        const month = monthMatch ? monthMatch[1].replace(/<[^>]+>/g, '').trim() : '';
        dateStr = month ? `${day} ${month}` : day;
      }

      const descMatch = itemHtml.match(/<p[^>]+class=["'][^"']*desc[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
      const desc = descMatch ? decodeEntities(descMatch[1].replace(/<[^>]+>/g, '').trim()) : '';

      const id = href.split('/').pop()?.replace('.html', '') || `news-${articles.length + 1}`;

      if (title && !articles.some(x => x.url === href)) {
        articles.push({
          id,
          title,
          url: href,
          category: categoryName,
          date: dateStr || 'Mới nhất',
          summary: desc || 'Thông báo chính thức từ Nhà trường dành cho sinh viên. Nhấp xem chi tiết trên Cổng thông tin đào tạo.',
          source: 'sv.kthcm.edu.vn'
        });
      }
    }
  }

  return articles;
}

export async function getHceNews(): Promise<HceNewsItem[]> {
  const now = Date.now();
  if (cachedNews && now - cachedNews.timestamp < CACHE_DURATION_MS) {
    return cachedNews.items;
  }

  try {
    const postData = new URLSearchParams({
      'param[ViewName]': 'ViewLogin_TinTucSinhVien',
      'param[PageNumber]': '1',
      'param[PageSize]': '15',
      'param[Keyword]': ''
    }).toString();

    // Dùng fetch với timeout 5 giây để không làm chậm render trang
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch('https://sv.kthcm.edu.vn/SinhVienTinTuc/GetTinForWeb_PageLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/html, */*; q=0.01'
      },
      body: postData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const html = await res.text();
      const parsed = parseHceNewsHtml(html);
      if (parsed.length > 0) {
        cachedNews = { items: parsed, timestamp: now };
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[HCE News] Tự động fallback danh sách tin dự phòng:', (err as Error).message);
  }

  return FALLBACK_HCE_NEWS;
}
