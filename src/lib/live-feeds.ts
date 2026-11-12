export interface StockIndexItem {
  code: string;
  label: string;
  price: string;
  changePoint: string;
  changePercent: string;
  isUp: boolean;
}

export interface FootballMatchItem {
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  statusText: string;
  isLive: boolean;
}

export interface NewsFeedItem {
  title: string;
  link: string;
  timeText: string;
}

export interface YouTubeVideoItem {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
}

export interface TikTokVideoItem {
  title: string;
  url: string;
  views: string;
  cover?: string;
}

export interface LiveFeedsData {
  stocks: StockIndexItem[];
  stockNews: NewsFeedItem[];
  matches: FootballMatchItem[];
  footballNews: NewsFeedItem[];
  youtube: YouTubeVideoItem[];
  tiktok: TikTokVideoItem[];
  hceAdmissionsNews: NewsFeedItem[];
  hceCenterNews: NewsFeedItem[];
  updatedAt: string;
}

export const DEFAULT_HCE_ADMISSIONS_NEWS: NewsFeedItem[] = [
  {
    title: 'Thông báo tuyển sinh trình độ Cao đẳng chính quy Trường Cao đẳng Kinh tế TP.HCM (HCE)',
    link: 'https://www.kthcm.edu.vn/thong-tin-tuyen-sinh',
    timeText: 'Tuyển sinh HCE',
  },
  {
    title: 'Hướng dẫn thủ tục nhập học và tiếp nhận hồ sơ thí sinh trúng tuyển tại HCE',
    link: 'https://www.kthcm.edu.vn/huong-dan-nhap-hoc',
    timeText: 'Tuyển sinh HCE',
  },
  {
    title: 'Hệ thống đăng ký xét tuyển trực tuyến và tra cứu kết quả trúng tuyển HCE',
    link: 'https://tuyensinh.kthcm.edu.vn/he-dang-ky-xet-tuyen.html',
    timeText: 'Trực tuyến',
  },
  {
    title: 'Thông báo xét tuyển các ngành đào tạo trình độ Cao đẳng chính quy tại HCE',
    link: 'https://www.kthcm.edu.vn/thong-tin-tuyen-sinh',
    timeText: 'Tuyển sinh HCE',
  },
  {
    title: 'Thông tin Hội đồng tuyển sinh và tư vấn hướng nghiệp Trường Cao đẳng Kinh tế TP.HCM',
    link: 'https://www.kthcm.edu.vn/hoi-dong-tuyen-sinh',
    timeText: 'HCE',
  },
];

export const DEFAULT_HCE_CENTER_NEWS: NewsFeedItem[] = [
  {
    title: 'Thông báo danh sách thi đánh giá năng lực Ngoại ngữ Tiếng Anh chuẩn đầu ra tại HCE',
    link: 'https://www.kthcm.edu.vn/co-cau-to-chuc-hce/phong-ban/trung-tam-dao-tao-nguon-nhan-luc-va-dich-vu',
    timeText: 'Trung tâm TT-TS&DV',
  },
  {
    title: 'Thông báo lịch thi đánh giá năng lực Ngoại ngữ và Tin học chuẩn đầu ra hàng tháng',
    link: 'https://www.kthcm.edu.vn/co-cau-to-chuc-hce/phong-ban/trung-tam-dao-tao-nguon-nhan-luc-va-dich-vu',
    timeText: 'Trung tâm TT-TS&DV',
  },
  {
    title: 'Kết quả thi đánh giá năng lực Ngoại ngữ Anh văn chuẩn đầu ra tại HCE',
    link: 'https://www.kthcm.edu.vn/co-cau-to-chuc-hce/phong-ban/trung-tam-dao-tao-nguon-nhan-luc-va-dich-vu',
    timeText: 'Kết quả thi',
  },
  {
    title: 'Danh sách chiêu sinh các lớp Ứng dụng CNTT cơ bản và Anh văn chuẩn đầu ra khai giảng mới',
    link: 'https://www.kthcm.edu.vn/co-cau-to-chuc-hce/phong-ban/trung-tam-dao-tao-nguon-nhan-luc-va-dich-vu',
    timeText: 'Chiêu sinh',
  },
  {
    title: 'Các khóa đào tạo ngắn hạn kỹ năng nghề nghiệp và nghiệp vụ doanh nghiệp tại HCE',
    link: 'https://www.kthcm.edu.vn/co-cau-to-chuc-hce/phong-ban/trung-tam-dao-tao-nguon-nhan-luc-va-dich-vu/dao-tao-ngan-han',
    timeText: 'Ngắn hạn',
  },
];

export const DEFAULT_STOCKS: StockIndexItem[] = [
  { code: 'VNINDEX', label: 'VN-INDEX', price: '1,746.90', changePoint: '+3.83 điểm', changePercent: '▲ +0.22%', isUp: true },
  { code: 'VN30', label: 'VN30-INDEX', price: '1,855.27', changePoint: '-5.66 điểm', changePercent: '▼ -0.30%', isUp: false },
  { code: 'HNX', label: 'HNX-INDEX', price: '255.73', changePoint: '-0.53 điểm', changePercent: '▼ -0.21%', isUp: false },
];

export const DEFAULT_STOCK_NEWS: NewsFeedItem[] = [
  { title: 'Thị trường chứng khoán Việt Nam: Dòng tiền tập trung vào nhóm cổ phiếu ngân hàng và bán lẻ', link: 'https://cafef.vn/thi-truong-chung-khoan.chn', timeText: 'CafeF' },
  { title: 'Khối ngoại gia tăng giao dịch tại nhóm cổ phiếu vốn hóa lớn VN30 trong phiên đầu tuần', link: 'https://cafef.vn/thi-truong-chung-khoan.chn', timeText: 'CafeF' },
  { title: 'Cập nhật báo cáo kết quả kinh doanh quý của các doanh nghiệp niêm yết trên HOSE & HNX', link: 'https://cafef.vn/thi-truong-chung-khoan.chn', timeText: 'CafeF' },
  { title: 'Triển vọng vĩ mô và mặt bằng lãi suất hỗ trợ thanh khoản thị trường tài chính', link: 'https://cafef.vn/thi-truong-chung-khoan.chn', timeText: 'CafeF' },
];

export const DEFAULT_MATCHES: FootballMatchItem[] = [
  { league: 'Ngoại Hạng Anh • FT', homeTeam: 'Chelsea', awayTeam: 'Man Utd', homeScore: '2', awayScore: '1', statusText: 'FT', isLive: false },
  { league: 'Ngoại Hạng Anh • FT', homeTeam: 'Arsenal', awayTeam: 'Liverpool', homeScore: '2', awayScore: '2', statusText: 'FT', isLive: false },
  { league: 'La Liga • FT', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: '2', awayScore: '1', statusText: 'FT', isLive: false },
  { league: 'Champions League • FT', homeTeam: 'Man City', awayTeam: 'Bayern', homeScore: '3', awayScore: '1', statusText: 'FT', isLive: false },
];

export const DEFAULT_FOOTBALL_NEWS: NewsFeedItem[] = [
  { title: 'Tâm điểm vòng đấu Ngoại hạng Anh: Cuộc đua kịch tính ở nhóm dẫn đầu bảng xếp hạng', link: 'https://vnexpress.net/the-thao/bong-da', timeText: 'VnExpress' },
  { title: 'Lịch thi đấu và kết quả UEFA Champions League: Các ông lớn châu Âu bứt phá', link: 'https://vnexpress.net/the-thao/bong-da', timeText: 'VnExpress' },
  { title: 'Đội tuyển Việt Nam chuẩn bị lực lượng hướng tới các giải đấu quốc tế trọng điểm', link: 'https://vnexpress.net/the-thao/bong-da', timeText: 'VnExpress' },
  { title: 'Chuyển nhượng bóng đá quốc tế: Nhiều bản hợp đồng chiến lược được kích hoạt', link: 'https://vnexpress.net/the-thao/bong-da', timeText: 'VnExpress' },
];

export const DEFAULT_YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    videoId: 'ThWjfeasS8o',
    title: 'Bài giảng Marketing căn bản: Phân tích STP & Chiến lược Marketing-Mix',
    publishedAt: 'Chuyên đề QTSX',
    thumbnail: 'https://i.ytimg.com/vi/ThWjfeasS8o/hqdefault.jpg',
  },
  {
    videoId: 'OUvXB4HFLgU',
    title: 'Bài giảng Kinh tế vi mô: Lý thuyết Cung Cầu & Cân bằng thị trường',
    publishedAt: 'Chuyên đề QTSX',
    thumbnail: 'https://i.ytimg.com/vi/OUvXB4HFLgU/hqdefault.jpg',
  },
  {
    videoId: 'loOF48UVkrw',
    title: 'Bài giảng Quản trị hàng tồn kho: Mô hình EOQ, POQ và Khấu trừ theo số lượng',
    publishedAt: 'Chuyên đề Tồn kho',
    thumbnail: 'https://i.ytimg.com/vi/loOF48UVkrw/hqdefault.jpg',
  },
  {
    videoId: '-QdI7-qungU',
    title: 'Bài giảng Lập lịch trình sản xuất & Điều độ công việc trên máy (Nguyên tắc Johnson)',
    publishedAt: 'Chuyên đề Điều độ',
    thumbnail: 'https://i.ytimg.com/vi/-QdI7-qungU/hqdefault.jpg',
  },
];

export const DEFAULT_TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    title: 'Kinh nghiệm làm bài thi trắc nghiệm Marketing căn bản & Kinh tế vi mô đạt điểm cao',
    url: 'https://www.tiktok.com/@thanhks86?_r=1&_t=ZS-99gey46u0C8',
    views: 'Chuyên đề Ôn thi',
  },
  {
    title: 'Hướng dẫn chọn đề tài và viết Báo cáo thực tập tốt nghiệp chuẩn quy định HCE & CTIM',
    url: 'https://www.tiktok.com/@thanhks86?_r=1&_t=ZS-99gey46u0C8',
    views: 'Thực tập Tốt nghiệp',
  },
  {
    title: 'Mẹo bấm máy tính Casio FX-570VN / 580VNX tính nhanh Hồi quy tuyến tính & Dự báo nhu cầu',
    url: 'https://www.tiktok.com/@thanhks86?_r=1&_t=ZS-99gey46u0C8',
    views: 'Kỹ năng Tính toán',
  },
  {
    title: 'Phân tích dữ liệu khảo sát SPSS: Kiểm định Cronbach’s Alpha và Nhân tố khám phá EFA',
    url: 'https://www.tiktok.com/@thanhks86?_r=1&_t=ZS-99gey46u0C8',
    views: 'SPSS & NCKH',
  },
];

let cachedData: LiveFeedsData | null = null;
let lastFetchMs = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache for ultra-fast response

async function fetchJsonWithTimeout(url: string, timeoutMs = 1800): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRssWithTimeout(rssUrl: string, fallback: NewsFeedItem[], filterKeyword?: RegExp): Promise<NewsFeedItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1800);
  try {
    const resp = await fetch(rssUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });
    if (!resp.ok) return fallback;
    const xml = await resp.text();
    const allItems: NewsFeedItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match: RegExpExecArray | null;
    while ((match = itemRegex.exec(xml)) !== null && allItems.length < 16) {
      const block = match[1];
      const titleMatch = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/i);
      const linkMatch = block.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>|<link>([\s\S]*?)<\/link>/i);
      const rawTitle = (titleMatch?.[1] || titleMatch?.[2] || '')
        .trim()
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
      const rawLink = (linkMatch?.[1] || linkMatch?.[2] || '').trim();
      if (rawTitle && rawLink) {
        allItems.push({ title: rawTitle, link: rawLink, timeText: 'Trực tiếp' });
      }
    }
    if (allItems.length === 0) return fallback;
    if (filterKeyword) {
      const filtered = allItems.filter((it) => filterKeyword.test(it.title));
      if (filtered.length >= 4) return filtered.slice(0, 4);
    }
    return allItems.slice(0, 4);
  } catch {
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchLiveStocks(): Promise<StockIndexItem[]> {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 86400 * 12;
  const defs = [
    { symbol: 'VNINDEX', label: 'VN-INDEX' },
    { symbol: 'VN30', label: 'VN30-INDEX' },
    { symbol: 'HNX', label: 'HNX-INDEX' },
  ];

  const results = await Promise.all(
    defs.map(async (d) => {
      const data = await fetchJsonWithTimeout(
        `https://services.entrade.com.vn/chart-api/v2/ohlcs/index?symbol=${d.symbol}&resolution=1D&from=${from}&to=${to}`
      );
      const closes: number[] = Array.isArray(data?.c) ? data.c : [];
      if (closes.length >= 2) {
        const curr = closes[closes.length - 1];
        const prev = closes[closes.length - 2];
        const diff = curr - prev;
        const pct = prev > 0 ? (diff / prev) * 100 : 0;
        const isUp = diff >= 0;
        return {
          code: d.symbol,
          label: d.label,
          price: curr.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          changePoint: `${isUp ? '+' : ''}${diff.toFixed(2)} điểm`,
          changePercent: `${isUp ? '▲ +' : '▼ '}${pct.toFixed(2)}%`,
          isUp,
        };
      }
      return null;
    })
  );

  return defs.map((d, i) => results[i] || DEFAULT_STOCKS[i]);
}

async function fetchLiveFootballMatches(): Promise<FootballMatchItem[]> {
  const leagues = [
    { code: 'eng.1', name: 'Ngoại Hạng Anh' },
    { code: 'esp.1', name: 'La Liga' },
    { code: 'uefa.champions', name: 'Champions League' },
  ];

  const responses = await Promise.all(
    leagues.map((lg) =>
      fetchJsonWithTimeout(`https://site.api.espn.com/apis/site/v2/sports/soccer/${lg.code}/scoreboard`).then((json) => ({
        leagueName: lg.name,
        events: Array.isArray(json?.events) ? json.events : [],
      }))
    )
  );

  const matches: FootballMatchItem[] = [];
  for (const group of responses) {
    for (const ev of group.events.slice(0, 2)) {
      const comp = ev?.competitions?.[0];
      const competitors = Array.isArray(comp?.competitors) ? comp.competitors : [];
      const home = competitors.find((c: any) => c.homeAway === 'home') || competitors[0];
      const away = competitors.find((c: any) => c.homeAway === 'away') || competitors[1];
      if (!home || !away) continue;

      const state = comp?.status?.type?.state || 'post';
      const shortDetail = comp?.status?.type?.shortDetail || 'FT';
      const isLive = state === 'in';

      matches.push({
        league: `${group.leagueName} • ${shortDetail}`,
        homeTeam: home?.team?.shortDisplayName || home?.team?.displayName || 'Home',
        awayTeam: away?.team?.shortDisplayName || away?.team?.displayName || 'Away',
        homeScore: state === 'pre' ? '-' : String(home?.score ?? '0'),
        awayScore: state === 'pre' ? '-' : String(away?.score ?? '0'),
        statusText: shortDetail,
        isLive,
      });
    }
  }

  matches.sort((a, b) => (a.isLive === b.isLive ? 0 : a.isLive ? -1 : 1));
  return matches.length >= 4 ? matches.slice(0, 4) : DEFAULT_MATCHES;
}

function decodeHtmlEntities(str: string): string {
  return String(str || '')
    .replace(/<[^>]+>/g, '')
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '–')
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&#8216;|&#8217;|&#039;|&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatVnDateShort(isoStr?: string): string {
  if (!isoStr) return 'Mới';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return 'Mới';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

async function fetchHceWpCategoryNews(categoryId: number, fallback: NewsFeedItem[], prependItem?: NewsFeedItem): Promise<NewsFeedItem[]> {
  try {
    const posts = await fetchJsonWithTimeout(
      `https://www.kthcm.edu.vn/wp-json/wp/v2/posts?categories=${categoryId}&per_page=5&_fields=title,link,date`,
      2500
    );
    if (!Array.isArray(posts) || posts.length === 0) return fallback;
    const items: NewsFeedItem[] = [];
    if (prependItem) {
      items.push(prependItem);
    }
    for (const p of posts) {
      const title = decodeHtmlEntities(p?.title?.rendered || '');
      const link = String(p?.link || '').trim();
      if (title && link && !items.some((x) => x.link === link)) {
        items.push({
          title,
          link,
          timeText: formatVnDateShort(p?.date),
        });
      }
      if (items.length >= 5) break;
    }
    return items.length > 0 ? items : fallback;
  } catch {
    return fallback;
  }
}

export async function getLiveFeeds(forceRefresh = false): Promise<LiveFeedsData> {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - lastFetchMs < CACHE_TTL_MS) {
    return cachedData;
  }

  const [stocks, matches, stockNews, footballNews, hceAdmissionsNews, hceCenterNews] = await Promise.all([
    fetchLiveStocks(),
    fetchLiveFootballMatches(),
    fetchRssWithTimeout('https://cafef.vn/thi-truong-chung-khoan.rss', DEFAULT_STOCK_NEWS),
    fetchRssWithTimeout(
      'https://vnexpress.net/rss/the-thao.rss',
      DEFAULT_FOOTBALL_NEWS,
      /bóng đá|v-league|ngoại hạng anh|hlv|cầu thủ|champions league|bàn thắng|trận|clb|tuyển|man utd|chelsea|arsenal|real|barca/i
    ),
    fetchHceWpCategoryNews(149, DEFAULT_HCE_ADMISSIONS_NEWS, {
      title: 'Thông báo tuyển sinh trình độ Cao đẳng chính quy Trường Cao đẳng Kinh tế TP.HCM (HCE)',
      link: 'https://www.kthcm.edu.vn/thong-tin-tuyen-sinh',
      timeText: 'Chính thức',
    }),
    fetchHceWpCategoryNews(184, DEFAULT_HCE_CENTER_NEWS),
  ]);

  cachedData = {
    stocks,
    stockNews,
    matches,
    footballNews,
    youtube: DEFAULT_YOUTUBE_VIDEOS,
    tiktok: DEFAULT_TIKTOK_VIDEOS,
    hceAdmissionsNews,
    hceCenterNews,
    updatedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
  lastFetchMs = now;
  return cachedData;
}
