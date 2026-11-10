import seedRaw from '../data/seed-db.json';
export type {
  BirthdayTemplate,
  BirthdayAssignment,
  BirthdayStats,
  BirthdayRecipientDetail,
} from './birthday-service';
export { getVietnamDate, shuffleArray } from './birthday-service';
import {
  type BirthdayTemplate,
  type BirthdayAssignment,
  type BirthdayStats,
  type BirthdayRecipientDetail,
  getVietnamDate,
  shuffleArray,
} from './birthday-service';

export interface AdminAccount {
  id: number;
  username: string;
  display_name: string;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'editor' | 'viewer';
  permissions_json: string;
  is_active: number;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: number;
  actor_username: string;
  actor_role: string;
  action_type: string;
  target_module: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export interface AccessGate {
  gate_key: string;
  gate_name: string;
  passcodes_json: string;
  description: string;
  updated_at: string;
}

export interface SyllabusCode {
  code: string;
  title: string;
  category: string;
  url: string;
  is_public: number;
  updated_at: string;
}

export interface SitePage {
  route_path: string;
  title: string;
  category: string;
  page_type: string;
  html_content: string;
  custom_css: string;
  custom_js: string;
  requires_gate: string | null;
  updated_at: string;
}

export interface ExamSubmission {
  id: number;
  student_name: string;
  student_id: string;
  class_name: string;
  subject_path: string;
  subject_title: string;
  exam_mode: string;
  test_code: string;
  score: number;
  max_score: number;
  duration_text: string;
  ip_address: string;
  submitted_at: string;
}

export interface BirthdayWish {
  id: number;
  full_name: string;
  role_or_class: string;
  birth_day: number;
  birth_month: number;
  wish_message: string;
  avatar_emoji: string;
  is_active: number;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content_html: string;
  author: string;
  published_at: string;
  views: number;
}

export interface LecturerEvaluation {
  id: number;
  semester_year: string;
  course_name: string;
  class_code: string;
  instructor_name: string;
  ratings_json: string;
  average_score: number;
  overall_satisfaction: string;
  positives: string;
  improvements: string;
  ip_address: string;
  submitted_at: string;
}

export interface StudentSurvey {
  id: number;
  survey_type: string;
  student_name: string;
  student_id: string;
  class_name: string;
  answers_json: string;
  ip_address: string;
  submitted_at: string;
}


export interface LuckyRaceHistoryWinner {
  rank: number;
  id: string;
  label: string;
  className?: string;
  animalId: string;
  animalName: string;
  animalEmoji: string;
  animalColor: string;
  finishTimeSec: number;
}

export interface LuckyRaceHistoryItem {
  raceCode: string;
  createdAt: string;
  dateKey: string;
  mode: 'number' | 'excel';
  modeLabel: string;
  heatLabel?: string;
  durationSec: number;
  participantCount: number;
  laneCount: number;
  winnerCount: number;
  participantsSummary: string;
  winners: LuckyRaceHistoryWinner[];
}

export interface SiteContactConfig {
  instructor_name: string;
  department: string;
  email: string;
  hotline: string;
  zalo_url: string;
  address: string;
  youtube_url: string;
  tiktok_url: string;
  office_hours: string;
}

export interface YoutubeVideoItem {
  videoId: string;
  title: string;
  publishedAt: string;
}


export interface TeachingScheduleItem {
  id: string;
  day_of_week: string;
  session: string;
  periods: string;
  subject: string;
  class_code: string;
  room: string;
  group_url: string;
  notes?: string;
  is_active?: boolean;
  order?: number;
}

export const DEFAULT_TEACHING_SCHEDULE: TeachingScheduleItem[] = [
  {
    id: 'sched-1',
    day_of_week: 'Thứ 2',
    session: 'Sáng',
    periods: 'Tiết 1 – 5 (07:00 – 11:15)',
    subject: 'Marketing căn bản',
    class_code: '24DMKT01',
    room: 'A.302 (CS Vĩnh Viễn)',
    group_url: 'https://zalo.me/g/demo-mkt01',
    notes: 'Lý thuyết trọng tâm & Bài tập tình huống trên lớp',
    is_active: true,
    order: 1,
  },
  {
    id: 'sched-2',
    day_of_week: 'Thứ 3',
    session: 'Chiều',
    periods: 'Tiết 6 – 10 (13:00 – 17:15)',
    subject: 'Kinh tế vi mô',
    class_code: '24DKTVM02',
    room: 'B.204 (CS Vĩnh Viễn)',
    group_url: 'https://zalo.me/g/demo-ktvm02',
    notes: 'Thảo luận bài tập Cung Cầu & Độ co giãn',
    is_active: true,
    order: 2,
  },
  {
    id: 'sched-3',
    day_of_week: 'Thứ 5',
    session: 'Sáng',
    periods: 'Tiết 1 – 5 (07:00 – 11:15)',
    subject: 'Khởi nghiệp',
    class_code: '24DKN01',
    room: 'Phòng Lab 02 - Tầng 3',
    group_url: 'https://zalo.me/g/demo-kn',
    notes: 'Thực hành mô hình Canvas & Thẩm định dự án',
    is_active: true,
    order: 3,
  },
  {
    id: 'sched-4',
    day_of_week: 'Thứ 6',
    session: 'Sáng',
    periods: 'Tiết 1 – 4 (07:00 – 10:30)',
    subject: 'Thực tập tốt nghiệp',
    class_code: '21DTH01',
    room: 'Văn phòng Khoa / Online',
    group_url: 'https://zalo.me/g/demo-tttn',
    notes: 'Hướng dẫn viết chuyên đề báo cáo & Duyệt đề cương',
    is_active: true,
    order: 4,
  },
];

export interface EvaluationCriterion {
  id?: number;
  code: string;
  group?: string;
  group_title?: string;
  text: string;
}

export const DEFAULT_SITE_CONTACT_CONFIG: SiteContactConfig = {
  instructor_name: 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG',
  department: 'Khoa Quản trị - Kinh doanh (HCE)',
  email: 'dinhtk@kthcm.edu.vn',
  hotline: '0902 928 928',
  zalo_url: 'https://zalo.me/0902928928',
  address: '33 Vĩnh Viễn, Phường Vườn Lài, Tp.HCM',
  youtube_url: 'https://www.youtube.com/@dinhtran928',
  tiktok_url: 'https://www.tiktok.com/@thanhks86?_r=1&_t=ZS-99gey46u0C8',
  office_hours: 'Thứ Ba & Thứ Năm: 08:30 – 11:30 | Thứ Sáu: 13:30 – 16:30 (Hẹn trước qua Email/Zalo)',
};

export const DEFAULT_YOUTUBE_VIDEOS: YoutubeVideoItem[] = [
  {
    videoId: 'ThWjfeasS8o',
    title: 'Bài giảng Marketing căn bản: Phân đoạn thị trường & Định vị (STP)',
    publishedAt: 'Chuyên đề QTSX',
  },
  {
    videoId: 'OUvXB4HFLgU',
    title: 'Bài giảng Kinh tế vi mô: Lý thuyết Cung Cầu & Cân bằng thị trường',
    publishedAt: 'Chuyên đề QTSX',
  },
  {
    videoId: 'loOF48UVkrw',
    title: 'Bài giảng Quản trị hàng tồn kho: Mô hình EOQ, POQ và Khấu trừ theo số lượng',
    publishedAt: 'Chuyên đề Tồn kho',
  },
  {
    videoId: '-QdI7-qungU',
    title: 'Bài giảng Lập lịch trình sản xuất & Điều độ công việc trên máy (Nguyên tắc Johnson)',
    publishedAt: 'Chuyên đề Điều độ',
  },
  {
    videoId: 'q00DQpYNnGE',
    title: 'Bài giảng Marketing căn bản: Chiến lược Marketing-Mix 4P & 7P',
    publishedAt: 'Quản trị học',
  },
  {
    videoId: 'K2v91vaKl58',
    title: 'Bài giảng Kinh tế vi mô: Độ co giãn của cầu theo giá',
    publishedAt: 'Quản trị học',
  },
  {
    videoId: 'gdPXx_ne0oA',
    title: 'Bài giảng Khởi nghiệp: Xây dựng mô hình kinh doanh Canvas',
    publishedAt: 'Quản trị học',
  },
  {
    videoId: 'cjsosWNpSN4',
    title: 'Chuyên đề Khởi nghiệp: Startup là gì & Những lầm tưởng thường gặp',
    publishedAt: 'Khởi nghiệp',
  },
  {
    videoId: '6OSqgULHD6w',
    title: 'Khởi nghiệp: Lập dự án kinh doanh thực chiến',
    publishedAt: 'Thương hiệu',
  },
];

export const DEFAULT_EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: 1,
    code: 'q1',
    group: 'I',
    group_title: 'Đề cương, mục tiêu & tài liệu học tập',
    text: 'Giảng viên phổ biến rõ ràng đề cương, mục tiêu, chuẩn đầu ra và tiêu chí đánh giá môn học ngay từ đầu kỳ.',
  },
  {
    id: 2,
    code: 'q2',
    group: 'I',
    group_title: 'Đề cương, mục tiêu & tài liệu học tập',
    text: 'Giảng viên cung cấp, hướng dẫn đầy đủ tài liệu học tập, giáo trình tham khảo và các nguồn học liệu hữu ích.',
  },
  {
    id: 3,
    code: 'q3',
    group: 'II',
    group_title: 'Nội dung & Phương pháp giảng dạy',
    text: 'Nội dung bài giảng bám sát mục tiêu đề cương, có tính hệ thống, cập nhật kiến thức mới và thực tiễn.',
  },
  {
    id: 4,
    code: 'q4',
    group: 'II',
    group_title: 'Nội dung & Phương pháp giảng dạy',
    text: 'Giảng viên truyền đạt rõ ràng, dễ hiểu, làm nổi bật được trọng tâm và phân tích sâu các vấn đề phức tạp.',
  },
  {
    id: 5,
    code: 'q5',
    group: 'II',
    group_title: 'Nội dung & Phương pháp giảng dạy',
    text: 'Kết hợp hài hòa giữa lý thuyết và bài tập thực hành, tình huống thực tế hoặc thảo luận nhóm.',
  },
  {
    id: 6,
    code: 'q6',
    group: 'II',
    group_title: 'Nội dung & Phương pháp giảng dạy',
    text: 'Ứng dụng hiệu quả công nghệ thông tin, bài giảng điện tử và hệ thống học liệu số hỗ trợ bài học.',
  },
  {
    id: 7,
    code: 'q7',
    group: 'III',
    group_title: 'Tác phong sư phạm & Tương tác với sinh viên',
    text: 'Giảng viên lên lớp đúng giờ, thực hiện nghiêm túc kế hoạch và thời lượng giảng dạy quy định.',
  },
  {
    id: 8,
    code: 'q8',
    group: 'III',
    group_title: 'Tác phong sư phạm & Tương tác với sinh viên',
    text: 'Tác phong mẫu mực, lịch sự, nhiệt tình và có trách nhiệm cao với sinh viên và lớp học.',
  },
  {
    id: 9,
    code: 'q9',
    group: 'III',
    group_title: 'Tác phong sư phạm & Tương tác với sinh viên',
    text: 'Khuyến khích sinh viên đặt câu hỏi, nêu quan điểm phản biện và kích thích tinh thần tự học.',
  },
  {
    id: 10,
    code: 'q10',
    group: 'III',
    group_title: 'Tác phong sư phạm & Tương tác với sinh viên',
    text: 'Sẵn sàng hỗ trợ, tư vấn và phản hồi kịp thời các thắc mắc của sinh viên trong và ngoài giờ lên lớp.',
  },
  {
    id: 11,
    code: 'q11',
    group: 'IV',
    group_title: 'Đánh giá & Phản hồi kết quả học tập',
    text: 'Nội dung kiểm tra, bài tập quá trình bám sát trọng tâm đã giảng dạy và tương xứng với thời lượng môn học.',
  },
  {
    id: 12,
    code: 'q12',
    group: 'IV',
    group_title: 'Đánh giá & Phản hồi kết quả học tập',
    text: 'Chấm bài khách quan, công bằng; có nhận xét hoặc sửa bài rõ ràng để sinh viên rút kinh nghiệm.',
  },
];

interface StoreState {
  access_gates: AccessGate[];
  syllabus_codes: SyllabusCode[];
  site_pages: SitePage[];
  exam_submissions: ExamSubmission[];
  birthday_wishes: BirthdayWish[];
  news_articles: NewsArticle[];
  lecturer_evaluations: LecturerEvaluation[];
  student_surveys: StudentSurvey[];
  admin_accounts: AdminAccount[];
  admin_audit_logs: AdminAuditLog[];
  birthday_templates: BirthdayTemplate[];
  birthday_assignments: BirthdayAssignment[];
  online_exam_config_json: string;
  site_contact_config_json: string;
  youtube_videos_json: string;
  evaluation_criteria_json: string;
  teaching_schedule_json: string;
  lucky_race_history_json: string;
}

const raw = seedRaw as unknown as StoreState;

const store: StoreState = {
  access_gates: Array.isArray(raw.access_gates) ? [...raw.access_gates] : [],
  syllabus_codes: Array.isArray(raw.syllabus_codes) ? [...raw.syllabus_codes] : [],
  site_pages: Array.isArray(raw.site_pages) ? [...raw.site_pages] : [],
  exam_submissions: Array.isArray(raw.exam_submissions) ? [...raw.exam_submissions] : [],
  birthday_wishes: Array.isArray(raw.birthday_wishes) ? [...raw.birthday_wishes] : [],
  news_articles: Array.isArray(raw.news_articles) ? [...raw.news_articles] : [],
  lecturer_evaluations: Array.isArray(raw.lecturer_evaluations) ? [...raw.lecturer_evaluations] : [],
  student_surveys: Array.isArray(raw.student_surveys) ? [...raw.student_surveys] : [],
  admin_accounts: [
    {
      id: 1,
      username: 'admin',
      display_name: 'Quản Trị Viên Cấp Cao (Bản Sao)',
      email: 'admin@nguyenthitrucphuong.pages.dev',
      password_hash: 'sha256$tkd-copy-salt-01$14d7c06f6e461635e22d1bc5693f5a71fc1052ce13d5e45ed03ad3ccf476f4a2',
      role: 'super_admin',
      permissions_json: '["all"]',
      is_active: 1,
      last_login_at: '',
      created_at: '2026-11-09 18:00:00',
      updated_at: '2026-11-09 18:00:00',
    },
    {
      id: 2,
      username: 'editor',
      display_name: 'Biên Tập Viên Học Liệu (Trợ Giảng)',
      email: 'editor@nguyenthitrucphuong.pages.dev',
      password_hash: 'sha256$tkd-copy-salt-02$ee6b595b128527a20c35f29dca418ca10bc06e5bb593740263884399b50b5ddf',
      role: 'editor',
      permissions_json: '["dashboard","articles","categories","documents","quiz","students","submissions","leaderboard","banners","library","settings"]',
      is_active: 1,
      last_login_at: '',
      created_at: '2026-11-09 18:00:00',
      updated_at: '2026-11-09 18:00:00',
    },
    {
      id: 3,
      username: 'viewer',
      display_name: 'Quan Sát Viên / Kiểm Duyệt',
      email: 'viewer@nguyenthitrucphuong.pages.dev',
      password_hash: 'sha256$tkd-copy-salt-03$6d5db9e64e52e46c768997a6e709087d3a04a55ce8c807b539cf24f5a34e5657',
      role: 'viewer',
      permissions_json: '["dashboard","submissions","leaderboard","audit_logs"]',
      is_active: 1,
      last_login_at: '',
      created_at: '2026-11-09 18:00:00',
      updated_at: '2026-11-09 18:00:00',
    },
  ],
  admin_audit_logs: [],
  birthday_templates: (() => {
    const rawBdays = Array.isArray(raw.birthday_wishes) ? raw.birthday_wishes : [];
    const set = new Set<string>();
    const templates: BirthdayTemplate[] = [];
    let id = 1;
    for (const b of rawBdays) {
      const msg = String(b.wish_message || '').trim();
      if (msg && !set.has(msg.toLowerCase())) {
        set.add(msg.toLowerCase());
        templates.push({
          id: id++,
          content: msg,
          category: 'Chung',
          is_active: 1,
          created_at: '2026-11-09 19:00:00',
          updated_at: '2026-11-09 19:00:00',
        });
      }
    }
    return templates;
  })(),
  birthday_assignments: [],
  online_exam_config_json: '',
  site_contact_config_json: '',
  youtube_videos_json: '',
  evaluation_criteria_json: '',
  teaching_schedule_json: '',
  lucky_race_history_json: '',
};

export function normalizeRoutePath(raw: string): string {
  if (!raw || raw === '/') return '/';
  let s = raw.trim();
  try {
    s = decodeURIComponent(s);
  } catch {}
  s = s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase();
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s;
}

// Fast page lookup maps
const pageExactMap = new Map<string, SitePage>();
const pageLowerMap = new Map<string, SitePage>();
const pageNormMap = new Map<string, SitePage>();
for (const p of store.site_pages) {
  pageExactMap.set(p.route_path, p);
  pageLowerMap.set(p.route_path.toLowerCase(), p);
  pageNormMap.set(normalizeRoutePath(p.route_path), p);
}

// Pending Cloudflare D1 SQL mutations queued during synchronous .run() calls
interface PendingD1Write {
  sql: string;
  params: any[];
}
const pendingD1Writes: PendingD1Write[] = [];
let lastPublicSyncAt = 0;
let lastAdminSyncAt = 0;
const PUBLIC_SYNC_TTL_MS = 5_000;
const ADMIN_SYNC_TTL_MS = 0;

function queueD1Write(sql: string, params: any[]) {
  pendingD1Writes.push({ sql, params });
  lastPublicSyncAt = 0;
  lastAdminSyncAt = 0;
}

export async function syncFromD1(d1: any, includeAdminData = false): Promise<void> {
  if (!d1 || typeof d1.batch !== 'function') return;
  const now = Date.now();
  if (includeAdminData) {
    if (now - lastAdminSyncAt < ADMIN_SYNC_TTL_MS && pendingD1Writes.length === 0) {
      return;
    }
  } else {
    if (now - lastPublicSyncAt < PUBLIC_SYNC_TTL_MS && pendingD1Writes.length === 0) {
      return;
    }
  }

  try {
    const queries = [
      d1.prepare('SELECT * FROM access_gates'),
      d1.prepare('SELECT * FROM syllabus_codes'),
      d1.prepare('SELECT * FROM birthday_wishes'),
      d1.prepare('SELECT * FROM news_articles ORDER BY id DESC'),
      d1.prepare('SELECT * FROM site_pages_overrides'),
      d1.prepare(
        includeAdminData
          ? 'SELECT * FROM exam_submissions ORDER BY id DESC LIMIT 1000'
          : 'SELECT * FROM exam_submissions ORDER BY id DESC LIMIT 50'
      ),
      d1.prepare('SELECT * FROM lecturer_evaluations ORDER BY id DESC LIMIT 1000'),
      d1.prepare('SELECT * FROM student_surveys ORDER BY id DESC LIMIT 1000'),
      d1.prepare('SELECT * FROM admin_accounts ORDER BY id ASC'),
      d1.prepare('SELECT * FROM admin_audit_logs ORDER BY id DESC LIMIT 500'),
      d1.prepare('SELECT * FROM birthday_templates ORDER BY id ASC'),
      d1.prepare('SELECT * FROM birthday_assignments ORDER BY id ASC'),
    ];

    const results = (await Promise.allSettled(queries.map((q) => q.all()))).map((s) => (s.status === 'fulfilled' ? s.value : { results: [] }));
    const [gatesRes, codesRes, bdaysRes, newsRes, overridesRes, subsRes, evalsRes, surveysRes, accountsRes, logsRes, bdayTemplatesRes, bdayAssignmentsRes] = results;

    if (Array.isArray(gatesRes?.results) && gatesRes.results.length > 0) {
      store.access_gates = gatesRes.results as AccessGate[];
    }
    if (Array.isArray(codesRes?.results) && codesRes.results.length > 0) {
      store.syllabus_codes = codesRes.results as SyllabusCode[];
    }
    if (Array.isArray(bdaysRes?.results)) {
      store.birthday_wishes = bdaysRes.results as BirthdayWish[];
    }
    if (Array.isArray(newsRes?.results)) {
      store.news_articles = newsRes.results as NewsArticle[];
    }
    if (Array.isArray(subsRes?.results)) {
      store.exam_submissions = subsRes.results as ExamSubmission[];
    }
    if (Array.isArray(evalsRes?.results) && evalsRes.results.length > 0) {
      store.lecturer_evaluations = evalsRes.results as LecturerEvaluation[];
    }
    if (Array.isArray(surveysRes?.results)) {
      store.student_surveys = surveysRes.results as StudentSurvey[];
    }
    if (Array.isArray(accountsRes?.results) && accountsRes.results.length > 0) {
      store.admin_accounts = accountsRes.results as AdminAccount[];
    }
    if (Array.isArray(logsRes?.results)) {
      store.admin_audit_logs = logsRes.results as AdminAuditLog[];
    }
    if (Array.isArray(bdayTemplatesRes?.results)) {
      store.birthday_templates = bdayTemplatesRes.results as BirthdayTemplate[];
    }
    if (Array.isArray(bdayAssignmentsRes?.results)) {
      store.birthday_assignments = bdayAssignmentsRes.results as BirthdayAssignment[];
    }
    if (Array.isArray(overridesRes?.results) && overridesRes.results.length > 0) {
      for (const ov of overridesRes.results as Array<Partial<SitePage> & { route_path: string }>) {
        if (ov.route_path === '__online_exam_config__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.online_exam_config_json = ov.custom_js;
          }
          continue;
        }
        if (ov.route_path === '__site_contact_config__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.site_contact_config_json = ov.custom_js;
          }
          continue;
        }
        if (ov.route_path === '__youtube_videos__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.youtube_videos_json = ov.custom_js;
          }
          continue;
        }
                if (ov.route_path === '__teaching_schedule__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.teaching_schedule_json = ov.custom_js;
          }
          continue;
        }
        if (ov.route_path === '__evaluation_criteria__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.evaluation_criteria_json = ov.custom_js;
          }
          continue;
        }
        if (ov.route_path === '__lucky_race_history__') {
          if (typeof ov.custom_js === 'string' && ov.custom_js.trim()) {
            store.lucky_race_history_json = ov.custom_js;
          }
          continue;
        }
        const target =
          pageExactMap.get(ov.route_path) ||
          pageLowerMap.get(ov.route_path.toLowerCase()) ||
          pageNormMap.get(normalizeRoutePath(ov.route_path));
        if (target) {
          if (ov.title !== undefined) target.title = ov.title;
          if (ov.html_content !== undefined) target.html_content = ov.html_content;
          if (ov.custom_css !== undefined) target.custom_css = ov.custom_css;
          if (ov.custom_js !== undefined) target.custom_js = ov.custom_js;
          if (ov.updated_at !== undefined) target.updated_at = ov.updated_at;
        }
      }
    }
    lastPublicSyncAt = Date.now();
    if (includeAdminData) {
      lastAdminSyncAt = Date.now();
    }
  } catch (err) {
    console.error('[D1 Sync Error]', err);
  }
}

export async function flushD1Writes(d1: any): Promise<void> {
  if (pendingD1Writes.length === 0) return;
  const writes = pendingD1Writes.splice(0, pendingD1Writes.length);
  lastPublicSyncAt = 0;
  lastAdminSyncAt = 0;
  if (!d1 || typeof d1.batch !== 'function') return;
  try {
    const stmts = writes.map((w) => d1.prepare(w.sql).bind(...w.params));
    await d1.batch(stmts);
  } catch (err) {
    console.error('[D1 Flush Error]', err);
  }
}

function nowIso(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

// Pure JS deterministic token signature (works identically on Cloudflare Workers & Node.js)
const SECRET_SALT = 'nguyenthitrucphuong-hce-secret-key-2026';
function signPayload(input: string): string {
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

export function createGateToken(gateKey: string): string {
  const sig = signPayload(`${gateKey}:unlocked:${SECRET_SALT}`);
  return `${gateKey}.${sig}`;
}

export function verifyGateToken(gateKey: string, token: string | undefined): boolean {
  if (!token) return false;
  return token === createGateToken(gateKey);
}

export function checkGatePasscode(gateKey: string, inputCode: string): boolean {
  const row = store.access_gates.find((g) => g.gate_key === gateKey);
  if (!row) return false;
  try {
    const codes: string[] = JSON.parse(row.passcodes_json);
    const trimmed = inputCode.trim();
    return codes.some((c) => c === trimmed || c.toUpperCase() === trimmed.toUpperCase());
  } catch {
    return false;
  }
}

export function getPageByPath(routePath: string): SitePage | undefined {
  return (
    pageExactMap.get(routePath) ||
    pageLowerMap.get(routePath.toLowerCase()) ||
    pageNormMap.get(normalizeRoutePath(routePath))
  );
}

export function getOnlineExamConfigRaw(): string {
  return store.online_exam_config_json;
}

export function saveOnlineExamConfigRaw(jsonStr: string): void {
  const ts = nowIso();
  store.online_exam_config_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__online_exam_config__', 'Cấu hình Thi Online (/ngan-hang-de-thi)', '', '', jsonStr, ts]
  );
}

export function getSiteContactConfig(): SiteContactConfig {
  if (!store.site_contact_config_json) return { ...DEFAULT_SITE_CONTACT_CONFIG };
  try {
    const parsed = JSON.parse(store.site_contact_config_json);
    return {
      instructor_name: parsed.instructor_name || DEFAULT_SITE_CONTACT_CONFIG.instructor_name,
      department: parsed.department || DEFAULT_SITE_CONTACT_CONFIG.department,
      email: parsed.email || DEFAULT_SITE_CONTACT_CONFIG.email,
      hotline: parsed.hotline || DEFAULT_SITE_CONTACT_CONFIG.hotline,
      zalo_url: parsed.zalo_url || DEFAULT_SITE_CONTACT_CONFIG.zalo_url,
      address: parsed.address || DEFAULT_SITE_CONTACT_CONFIG.address,
      youtube_url: parsed.youtube_url || DEFAULT_SITE_CONTACT_CONFIG.youtube_url,
      tiktok_url: parsed.tiktok_url || DEFAULT_SITE_CONTACT_CONFIG.tiktok_url,
      office_hours: parsed.office_hours || DEFAULT_SITE_CONTACT_CONFIG.office_hours,
    };
  } catch {
    return { ...DEFAULT_SITE_CONTACT_CONFIG };
  }
}

export function saveSiteContactConfig(cfg: Partial<SiteContactConfig>): void {
  const ts = nowIso();
  const merged: SiteContactConfig = {
    ...getSiteContactConfig(),
    ...Object.fromEntries(Object.entries(cfg).filter(([_, v]) => typeof v === 'string' && v.trim() !== '')),
  };
  const jsonStr = JSON.stringify(merged);
  store.site_contact_config_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__site_contact_config__', 'Cấu hình Thông tin Liên hệ toàn website', '', '', jsonStr, ts]
  );
}

export function extractYoutubeVideoId(input: string): string {
  const s = String(input || '').trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m =
    s.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
    s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    s.match(/embed\/([a-zA-Z0-9_-]{11})/) ||
    s.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : s;
}

export function getYoutubeVideos(): YoutubeVideoItem[] {
  if (!store.youtube_videos_json) return DEFAULT_YOUTUBE_VIDEOS.map((v) => ({ ...v }));
  try {
    const parsed = JSON.parse(store.youtube_videos_json);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
        .map((v: any) => ({
          videoId: extractYoutubeVideoId(v.videoId || ''),
          title: String(v.title || '').trim(),
          publishedAt: String(v.publishedAt || 'Bài giảng').trim(),
        }))
        .filter((v) => v.videoId && v.title);
    }
  } catch {}
  return DEFAULT_YOUTUBE_VIDEOS.map((v) => ({ ...v }));
}

export function saveYoutubeVideos(videos: YoutubeVideoItem[]): void {
  const ts = nowIso();
  const cleaned = (Array.isArray(videos) ? videos : [])
    .map((v) => ({
      videoId: extractYoutubeVideoId(v.videoId || ''),
      title: String(v.title || '').trim(),
      publishedAt: String(v.publishedAt || 'Bài giảng').trim(),
    }))
    .filter((v) => v.videoId && v.title);
  const jsonStr = JSON.stringify(cleaned);
  store.youtube_videos_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__youtube_videos__', 'Danh sách Video Bài Giảng YouTube Trang Chủ', '', '', jsonStr, ts]
  );
}

export function getEvaluationCriteria(): EvaluationCriterion[] {
  if (!store.evaluation_criteria_json) return DEFAULT_EVALUATION_CRITERIA.map((c) => ({ ...c }));
  try {
    const parsed = JSON.parse(store.evaluation_criteria_json);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((c: any, idx: number) => ({
        id: Number(c.id || idx + 1),
        code: String(c.code || `q${idx + 1}`).trim(),
        group: String(c.group || (idx < 2 ? 'I' : idx < 6 ? 'II' : idx < 10 ? 'III' : 'IV')).trim(),
        group_title: String(
          c.group_title ||
            (idx < 2
              ? 'Đề cương, mục tiêu & tài liệu học tập'
              : idx < 6
                ? 'Nội dung & Phương pháp giảng dạy'
                : idx < 10
                  ? 'Tác phong sư phạm & Tương tác với sinh viên'
                  : 'Đánh giá & Phản hồi kết quả học tập')
        ).trim(),
        text: String(c.text || '').trim(),
      }));
    }
  } catch {}
  return DEFAULT_EVALUATION_CRITERIA.map((c) => ({ ...c }));
}

export function saveEvaluationCriteria(criteria: EvaluationCriterion[]): void {
  const ts = nowIso();
  const jsonStr = JSON.stringify(criteria);
  store.evaluation_criteria_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__evaluation_criteria__', 'Cấu hình Tiêu chí Đánh giá Giảng viên', '', '', jsonStr, ts]
  );
}


export function getTeachingSchedule(): TeachingScheduleItem[] {
  if (!store.teaching_schedule_json) return DEFAULT_TEACHING_SCHEDULE.map((s) => ({ ...s }));
  try {
    const parsed = JSON.parse(store.teaching_schedule_json);
    if (Array.isArray(parsed)) {
      return parsed.map((item: any, idx: number) => ({
        id: String(item.id || `sched-${Date.now()}-${idx}`),
        day_of_week: String(item.day_of_week || 'Thứ 2').trim(),
        session: String(item.session || 'Sáng').trim(),
        periods: String(item.periods || '').trim(),
        subject: String(item.subject || '').trim(),
        class_code: String(item.class_code || '').trim(),
        room: String(item.room || '').trim(),
        group_url: String(item.group_url || '').trim(),
        notes: String(item.notes || '').trim(),
        is_active: item.is_active !== false,
        order: Number(item.order || idx + 1),
      }));
    }
  } catch {}
  return DEFAULT_TEACHING_SCHEDULE.map((s) => ({ ...s }));
}

export function saveTeachingSchedule(schedule: TeachingScheduleItem[]): void {
  const ts = nowIso();
  const cleaned = (Array.isArray(schedule) ? schedule : []).map((item, idx) => ({
    id: String(item.id || `sched-${Date.now()}-${idx}`),
    day_of_week: String(item.day_of_week || 'Thứ 2').trim(),
    session: String(item.session || 'Sáng').trim(),
    periods: String(item.periods || '').trim(),
    subject: String(item.subject || '').trim(),
    class_code: String(item.class_code || '').trim(),
    room: String(item.room || '').trim(),
    group_url: String(item.group_url || '').trim(),
    notes: String(item.notes || '').trim(),
    is_active: item.is_active !== false,
    order: Number(item.order || idx + 1),
  }));
  const jsonStr = JSON.stringify(cleaned);
  store.teaching_schedule_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__teaching_schedule__', 'Lịch Giảng Dạy & Nhóm Lớp Học Phần Của Giảng Viên', '', '', jsonStr, ts]
  );
}

export function resetTeachingSchedule(): TeachingScheduleItem[] {
  saveTeachingSchedule(DEFAULT_TEACHING_SCHEDULE);
  return getTeachingSchedule();
}

export function resetEvaluationCriteria(): void {
  saveEvaluationCriteria(DEFAULT_EVALUATION_CRITERIA);
}

export function getEvaluations(): LecturerEvaluation[] {
  return [...store.lecturer_evaluations].sort((a, b) => Number(b.id) - Number(a.id));
}

export function addEvaluation(input: {
  semester_year: string;
  course_name: string;
  class_code: string;
  instructor_name: string;
  ratings_json: string;
  average_score: number;
  overall_satisfaction: string;
  positives: string;
  improvements: string;
  ip_address: string;
}): LecturerEvaluation {
  const ts = nowIso();
  const nextId = store.lecturer_evaluations.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
  const row: LecturerEvaluation = {
    id: nextId,
    semester_year: input.semester_year || 'HK I - Năm học 2026 - 2027',
    course_name: input.course_name || 'Chưa rõ',
    class_code: input.class_code || '',
    instructor_name: input.instructor_name || 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG',
    ratings_json: input.ratings_json || '{}',
    average_score: Number(input.average_score ?? 5),
    overall_satisfaction: input.overall_satisfaction || 'Hài lòng',
    positives: input.positives || '',
    improvements: input.improvements || '',
    ip_address: input.ip_address || '',
    submitted_at: ts,
  };
  store.lecturer_evaluations.unshift(row);
  queueD1Write(
    `INSERT INTO lecturer_evaluations (semester_year, course_name, class_code, instructor_name, ratings_json, average_score, overall_satisfaction, positives, improvements, ip_address, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      row.semester_year,
      row.course_name,
      row.class_code,
      row.instructor_name,
      row.ratings_json,
      row.average_score,
      row.overall_satisfaction,
      row.positives,
      row.improvements,
      row.ip_address,
      row.submitted_at,
    ]
  );
  return row;
}

export function deleteEvaluation(id: number): void {
  const idx = store.lecturer_evaluations.findIndex((e) => Number(e.id) === Number(id));
  if (idx !== -1) store.lecturer_evaluations.splice(idx, 1);
  queueD1Write(`DELETE FROM lecturer_evaluations WHERE id = ?`, [Number(id)]);
}

export function clearAllEvaluations(): void {
  store.lecturer_evaluations.length = 0;
  queueD1Write(`DELETE FROM lecturer_evaluations`, []);
}

export function getSurveys(surveyType?: string): StudentSurvey[] {
  let list = [...store.student_surveys];
  if (surveyType) {
    list = list.filter((s) => s.survey_type === surveyType);
  }
  return list.sort((a, b) => Number(b.id) - Number(a.id));
}

export function addSurvey(input: {
  survey_type: string;
  student_name: string;
  student_id: string;
  class_name: string;
  answers_json: string;
  ip_address: string;
}): StudentSurvey {
  const ts = nowIso();
  const nextId = store.student_surveys.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
  const row: StudentSurvey = {
    id: nextId,
    survey_type: input.survey_type || 'nckh',
    student_name: input.student_name || 'Ẩn danh',
    student_id: input.student_id || '',
    class_name: input.class_name || '',
    answers_json: input.answers_json || '{}',
    ip_address: input.ip_address || '',
    submitted_at: ts,
  };
  store.student_surveys.unshift(row);
  queueD1Write(
    `INSERT INTO student_surveys (survey_type, student_name, student_id, class_name, answers_json, ip_address, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      row.survey_type,
      row.student_name,
      row.student_id,
      row.class_name,
      row.answers_json,
      row.ip_address,
      row.submitted_at,
    ]
  );
  return row;
}

export function deleteSurvey(id: number): void {
  const idx = store.student_surveys.findIndex((s) => Number(s.id) === Number(id));
  if (idx !== -1) store.student_surveys.splice(idx, 1);
  queueD1Write(`DELETE FROM student_surveys WHERE id = ?`, [Number(id)]);
}

export function clearAllSurveys(surveyType?: string): void {
  if (surveyType) {
    for (let i = store.student_surveys.length - 1; i >= 0; i--) {
      if (store.student_surveys[i].survey_type === surveyType) {
        store.student_surveys.splice(i, 1);
      }
    }
    queueD1Write(`DELETE FROM student_surveys WHERE survey_type = ?`, [surveyType]);
  } else {
    store.student_surveys.length = 0;
    queueD1Write(`DELETE FROM student_surveys`, []);
  }
}



export function getAdminAccounts(): AdminAccount[] {
  return [...store.admin_accounts].sort((a, b) => a.id - b.id);
}

export function getAdminAccountByUsername(username: string): AdminAccount | undefined {
  const u = username.trim().toLowerCase();
  return store.admin_accounts.find((a) => a.username.toLowerCase() === u);
}

export function upsertAdminAccount(acc: {
  id?: number;
  username: string;
  display_name: string;
  email?: string;
  password_hash?: string;
  role: 'super_admin' | 'editor' | 'viewer';
  permissions_json?: string;
  is_active?: number;
}): AdminAccount {
  const ts = nowIso();
  let target = acc.id ? store.admin_accounts.find((a) => a.id === acc.id) : undefined;
  if (!target) {
    target = store.admin_accounts.find((a) => a.username.toLowerCase() === acc.username.toLowerCase());
  }

  if (target) {
    target.display_name = acc.display_name || target.display_name;
    if (acc.email !== undefined) target.email = acc.email;
    if (acc.password_hash) target.password_hash = acc.password_hash;
    target.role = acc.role || target.role;
    if (acc.permissions_json) target.permissions_json = acc.permissions_json;
    if (acc.is_active !== undefined) target.is_active = acc.is_active;
    target.updated_at = ts;

    queueD1Write(
      `UPDATE admin_accounts SET display_name = ?, email = ?, password_hash = ?, role = ?, permissions_json = ?, is_active = ?, updated_at = ? WHERE id = ?`,
      [target.display_name, target.email, target.password_hash, target.role, target.permissions_json, target.is_active, ts, target.id]
    );
    return target;
  } else {
    const nextId = store.admin_accounts.reduce((max, a) => Math.max(max, a.id), 0) + 1;
    const newRow: AdminAccount = {
      id: nextId,
      username: acc.username.trim().toLowerCase(),
      display_name: acc.display_name.trim(),
      email: acc.email ? acc.email.trim() : '',
      password_hash: acc.password_hash || '',
      role: acc.role || 'editor',
      permissions_json: acc.permissions_json || '[]',
      is_active: acc.is_active !== undefined ? acc.is_active : 1,
      last_login_at: '',
      created_at: ts,
      updated_at: ts,
    };
    store.admin_accounts.push(newRow);
    queueD1Write(
      `INSERT INTO admin_accounts (id, username, display_name, email, password_hash, role, permissions_json, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [newRow.id, newRow.username, newRow.display_name, newRow.email, newRow.password_hash, newRow.role, newRow.permissions_json, newRow.is_active, ts, ts]
    );
    return newRow;
  }
}

export function updateAdminLastLogin(username: string): void {
  const ts = nowIso();
  const acc = getAdminAccountByUsername(username);
  if (acc) {
    acc.last_login_at = ts;
    queueD1Write(`UPDATE admin_accounts SET last_login_at = ? WHERE id = ?`, [ts, acc.id]);
  }
}

export function deleteAdminAccount(id: number): boolean {
  if (id === 1) return false; // Never delete root admin
  const idx = store.admin_accounts.findIndex((a) => a.id === id);
  if (idx !== -1) {
    store.admin_accounts.splice(idx, 1);
    queueD1Write(`DELETE FROM admin_accounts WHERE id = ?`, [id]);
    return true;
  }
  return false;
}

export function getAdminAuditLogs(limit = 300): AdminAuditLog[] {
  return [...store.admin_audit_logs].sort((a, b) => b.id - a.id).slice(0, limit);
}

export function addAdminAuditLog(log: {
  actor_username: string;
  actor_role: string;
  action_type: string;
  target_module: string;
  details: string;
  ip_address?: string;
}): AdminAuditLog {
  const ts = nowIso();
  const nextId = store.admin_audit_logs.reduce((max, l) => Math.max(max, l.id), 0) + 1;
  const newRow: AdminAuditLog = {
    id: nextId,
    actor_username: log.actor_username || 'system',
    actor_role: log.actor_role || 'super_admin',
    action_type: log.action_type || 'UPDATE',
    target_module: log.target_module || 'SYSTEM',
    details: log.details || '',
    ip_address: log.ip_address || '',
    created_at: ts,
  };
  store.admin_audit_logs.unshift(newRow);
  queueD1Write(
    `INSERT INTO admin_audit_logs (actor_username, actor_role, action_type, target_module, details, ip_address, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [newRow.actor_username, newRow.actor_role, newRow.action_type, newRow.target_module, newRow.details, newRow.ip_address, ts]
  );
  return newRow;
}

export function clearAdminAuditLogs(): void {
  store.admin_audit_logs = [];
  queueD1Write(`DELETE FROM admin_audit_logs`, []);
}

// =========================================================================
// MODULE QUẢN LÝ & PHÂN PHỐI LỜI CHÚC MỪNG SINH NHẬT (CHỐNG TRÙNG LẶP TUYỆT ĐỐI)
// =========================================================================

export function getBirthdayTemplates(activeOnly = false): BirthdayTemplate[] {
  let list = [...store.birthday_templates];
  if (activeOnly) {
    list = list.filter((t) => Number(t.is_active ?? 1) === 1);
  }
  return list.sort((a, b) => a.id - b.id);
}

export function getBirthdayTemplateById(id: number): BirthdayTemplate | undefined {
  return store.birthday_templates.find((t) => Number(t.id) === id);
}

export function upsertBirthdayTemplate(
  content: string,
  category = 'Chung',
  isActive = 1,
  id?: number
): { ok: boolean; message: string; template?: BirthdayTemplate } {
  const text = String(content || '').trim();
  if (!text) {
    return { ok: false, message: 'Nội dung lời chúc không được để trống.' };
  }
  const ts = nowIso();
  const lower = text.toLowerCase();

  const dup = store.birthday_templates.find(
    (t) => t.content.trim().toLowerCase() === lower && (id ? Number(t.id) !== id : true)
  );
  if (dup) {
    return { ok: false, message: `Lời chúc này đã tồn tại trong kho (ID #${dup.id})!` };
  }

  if (id) {
    const target = store.birthday_templates.find((t) => Number(t.id) === id);
    if (!target) {
      return { ok: false, message: 'Không tìm thấy lời chúc cần cập nhật.' };
    }
    target.content = text;
    target.category = category || 'Chung';
    target.is_active = isActive;
    target.updated_at = ts;
    queueD1Write(
      `UPDATE birthday_templates SET content = ?, category = ?, is_active = ?, updated_at = ? WHERE id = ?`,
      [text, target.category, target.is_active, ts, target.id]
    );
    return { ok: true, message: 'Đã cập nhật lời chúc thành công!', template: target };
  } else {
    const nextId = store.birthday_templates.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0) + 1;
    const newTmpl: BirthdayTemplate = {
      id: nextId,
      content: text,
      category: category || 'Chung',
      is_active: isActive,
      created_at: ts,
      updated_at: ts,
    };
    store.birthday_templates.push(newTmpl);
    queueD1Write(
      `INSERT INTO birthday_templates (id, content, category, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
      [newTmpl.id, text, newTmpl.category, newTmpl.is_active, ts, ts]
    );
    return { ok: true, message: 'Đã thêm lời chúc mới vào kho!', template: newTmpl };
  }
}

export function bulkImportBirthdayTemplates(
  contents: string[],
  category = 'Chung'
): { addedCount: number; duplicateCount: number; templates: BirthdayTemplate[] } {
  const ts = nowIso();
  const existingSet = new Set(store.birthday_templates.map((t) => t.content.trim().toLowerCase()));
  let nextId = store.birthday_templates.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0) + 1;
  const added: BirthdayTemplate[] = [];
  let duplicateCount = 0;

  for (const raw of contents) {
    const text = String(raw || '').trim();
    if (!text) continue;
    const lower = text.toLowerCase();
    if (existingSet.has(lower)) {
      duplicateCount++;
      continue;
    }
    existingSet.add(lower);
    const tmpl: BirthdayTemplate = {
      id: nextId++,
      content: text,
      category: category || 'Chung',
      is_active: 1,
      created_at: ts,
      updated_at: ts,
    };
    store.birthday_templates.push(tmpl);
    queueD1Write(
      `INSERT OR IGNORE INTO birthday_templates (id, content, category, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, ?, ?)`,
      [tmpl.id, text, category || 'Chung', ts, ts]
    );
    added.push(tmpl);
  }

  return { addedCount: added.length, duplicateCount, templates: added };
}

export function deleteBirthdayTemplate(id: number): boolean {
  const numId = Number(id);
  const idx = store.birthday_templates.findIndex((t) => Number(t.id) === numId);
  if (idx !== -1) {
    store.birthday_templates.splice(idx, 1);
  }
  queueD1Write(`DELETE FROM birthday_templates WHERE id = ?`, [numId]);
  store.birthday_assignments = store.birthday_assignments.filter((a) => Number(a.template_id) !== numId);
  queueD1Write(`DELETE FROM birthday_assignments WHERE template_id = ?`, [numId]);
  return true;
}

export function bulkDeleteBirthdayTemplates(ids: number[]): { deletedCount: number } {
  if (!Array.isArray(ids) || ids.length === 0) return { deletedCount: 0 };
  const numIds = ids.map((id) => Number(id)).filter((id) => !isNaN(id) && id > 0);
  if (numIds.length === 0) return { deletedCount: 0 };
  const idSet = new Set(numIds);
  const initialCount = store.birthday_templates.length;
  store.birthday_templates = store.birthday_templates.filter((t) => !idSet.has(Number(t.id)));
  const deletedCount = Math.max(initialCount - store.birthday_templates.length, numIds.length);

  const CHUNK_SIZE = 50;
  for (let i = 0; i < numIds.length; i += CHUNK_SIZE) {
    const chunk = numIds.slice(i, i + CHUNK_SIZE);
    const placeholders = chunk.map(() => '?').join(',');
    queueD1Write(`DELETE FROM birthday_templates WHERE id IN (${placeholders})`, chunk);
    queueD1Write(`DELETE FROM birthday_assignments WHERE template_id IN (${placeholders})`, chunk);
  }
  store.birthday_assignments = store.birthday_assignments.filter((a) => !idSet.has(Number(a.template_id)));

  return { deletedCount };
}

export function clearAllBirthdayTemplates(): { deletedCount: number } {
  const deletedCount = store.birthday_templates.length;
  store.birthday_templates.length = 0;
  queueD1Write(`DELETE FROM birthday_templates`, []);
  store.birthday_assignments.length = 0;
  queueD1Write(`DELETE FROM birthday_assignments`, []);
  return { deletedCount };
}

export function bulkDeleteBirthdays(ids: number[]): { deletedCount: number } {
  if (!Array.isArray(ids) || ids.length === 0) return { deletedCount: 0 };
  const numIds = ids.map((id) => Number(id)).filter((id) => !isNaN(id) && id > 0);
  if (numIds.length === 0) return { deletedCount: 0 };
  const idSet = new Set(numIds);
  const initialCount = store.birthday_wishes.length;
  store.birthday_wishes = store.birthday_wishes.filter((b) => !idSet.has(Number(b.id)));
  const deletedCount = Math.max(initialCount - store.birthday_wishes.length, numIds.length);

  const CHUNK_SIZE = 50;
  for (let i = 0; i < numIds.length; i += CHUNK_SIZE) {
    const chunk = numIds.slice(i, i + CHUNK_SIZE);
    const placeholders = chunk.map(() => '?').join(',');
    queueD1Write(`DELETE FROM birthday_wishes WHERE id IN (${placeholders})`, chunk);
    queueD1Write(`DELETE FROM birthday_assignments WHERE person_id IN (${placeholders})`, chunk);
  }
  store.birthday_assignments = store.birthday_assignments.filter((a) => !idSet.has(Number(a.person_id)));

  return { deletedCount };
}

export function getBirthdayAssignments(year?: number, month?: number): BirthdayAssignment[] {
  let list = [...store.birthday_assignments];
  if (year) list = list.filter((a) => Number(a.year) === year);
  if (month) list = list.filter((a) => Number(a.month) === month);
  return list.sort((a, b) => b.id - a.id);
}

export function getBirthdayStats(targetYear?: number, targetMonth?: number): BirthdayStats {
  const vn = getVietnamDate();
  const year = targetYear || vn.year;
  const month = targetMonth || vn.month;

  const totalTemplates = store.birthday_templates.length;
  const activeTemplates = store.birthday_templates.filter((t) => Number(t.is_active ?? 1) === 1).length;

  const monthAssignments = store.birthday_assignments.filter(
    (a) => Number(a.year) === year && Number(a.month) === month
  );
  const usedThisMonth = monthAssignments.length;
  const remainingThisMonth = Math.max(0, activeTemplates - usedThisMonth);

  const monthPersons = store.birthday_wishes.filter(
    (b) => Number(b.birth_month) === month && Number(b.is_active ?? 1) === 1
  );
  const monthPersonsCount = monthPersons.length;

  const assignedPersonIds = new Set(monthAssignments.map((a) => a.person_id));
  const assignedPersonsCount = monthPersons.filter((p) => assignedPersonIds.has(p.id)).length;
  const unassignedPersonsCount = Math.max(0, monthPersonsCount - assignedPersonsCount);

  const isSufficient = remainingThisMonth >= unassignedPersonsCount;
  const missingCount = isSufficient ? 0 : unassignedPersonsCount - remainingThisMonth;

  return {
    totalTemplates,
    activeTemplates,
    usedThisMonth,
    remainingThisMonth,
    monthPersonsCount,
    assignedPersonsCount,
    unassignedPersonsCount,
    isSufficient,
    missingCount,
    currentMonth: month,
    currentYear: year,
  };
}

export function getMonthlyBirthdayRecipients(targetYear?: number, targetMonth?: number): BirthdayRecipientDetail[] {
  const vn = getVietnamDate();
  const year = targetYear || vn.year;
  const month = targetMonth || vn.month;

  const monthPersons = store.birthday_wishes.filter(
    (b) => Number(b.birth_month) === month && Number(b.is_active ?? 1) === 1
  );

  const monthAssignments = store.birthday_assignments.filter(
    (a) => Number(a.year) === year && Number(a.month) === month
  );
  const assignmentMap = new Map(monthAssignments.map((a) => [a.person_id, a]));

  return monthPersons
    .sort((a, b) => Number(a.birth_day) - Number(b.birth_day) || a.id - b.id)
    .map((p) => {
      const asg = assignmentMap.get(p.id);
      return {
        person_id: p.id,
        full_name: p.full_name,
        role_or_class: p.role_or_class,
        birth_day: p.birth_day,
        birth_month: p.birth_month,
        avatar_emoji: p.avatar_emoji || '🎂',
        template_id: asg ? asg.template_id : null,
        wish_content: asg ? asg.wish_content : p.wish_message || 'Chưa phân phối',
        assigned_at: asg ? asg.assigned_at : null,
        is_assigned: Boolean(asg),
      };
    });
}

export function distributeBirthdayWishes(
  targetYear?: number,
  targetMonth?: number,
  forceRedistribute = false
): {
  success: boolean;
  message: string;
  assignedCount: number;
  missingCount: number;
  totalPersons: number;
  totalTemplates: number;
  remainingTemplates: number;
} {
  const vn = getVietnamDate();
  const year = targetYear || vn.year;
  const month = targetMonth || vn.month;

  if (forceRedistribute) {
    store.birthday_assignments = store.birthday_assignments.filter(
      (a) => !(Number(a.year) === year && Number(a.month) === month)
    );
    queueD1Write(`DELETE FROM birthday_assignments WHERE year = ? AND month = ?`, [year, month]);
  }

  const monthPersons = store.birthday_wishes.filter(
    (b) => Number(b.birth_month) === month && Number(b.is_active ?? 1) === 1
  );

  if (monthPersons.length === 0) {
    return {
      success: true,
      message: `Tháng ${month} không có sinh viên nào có ngày sinh.`,
      assignedCount: 0,
      missingCount: 0,
      totalPersons: 0,
      totalTemplates: store.birthday_templates.length,
      remainingTemplates: store.birthday_templates.filter((t) => Number(t.is_active ?? 1) === 1).length,
    };
  }

  const existingAssignments = store.birthday_assignments.filter(
    (a) => Number(a.year) === year && Number(a.month) === month
  );

  const assignedPersonIds = new Set(existingAssignments.map((a) => a.person_id));
  const usedTemplateIds = new Set(existingAssignments.map((a) => a.template_id));

  for (const person of monthPersons) {
    const existing = existingAssignments.find((a) => a.person_id === person.id);
    if (existing) {
      person.wish_message = existing.wish_content;
    }
  }

  const unassignedPersons = monthPersons.filter((p) => !assignedPersonIds.has(p.id));

  if (unassignedPersons.length === 0) {
    return {
      success: true,
      message: `Tất cả ${monthPersons.length} sinh viên tháng ${month}/${year} đã có lời chúc cố định riêng biệt.`,
      assignedCount: 0,
      missingCount: 0,
      totalPersons: monthPersons.length,
      totalTemplates: store.birthday_templates.length,
      remainingTemplates: store.birthday_templates.filter(
        (t) => Number(t.is_active ?? 1) === 1 && !usedTemplateIds.has(t.id)
      ).length,
    };
  }

  const availableTemplates = store.birthday_templates.filter(
    (t) => Number(t.is_active ?? 1) === 1 && !usedTemplateIds.has(t.id)
  );

  if (availableTemplates.length < unassignedPersons.length) {
    const missing = unassignedPersons.length - availableTemplates.length;
    return {
      success: false,
      message: `Kho lời chúc không đủ cấp riêng cho sinh viên tháng ${month}/${year}! Còn thiếu ${missing} lời chúc (Cần cấp: ${unassignedPersons.length}, Kho khả dụng: ${availableTemplates.length}). Hệ thống tuyệt đối không cấp trùng, vui lòng bổ sung thêm lời chúc vào kho!`,
      assignedCount: 0,
      missingCount: missing,
      totalPersons: monthPersons.length,
      totalTemplates: store.birthday_templates.length,
      remainingTemplates: availableTemplates.length,
    };
  }

  const shuffled = shuffleArray(availableTemplates);

  let nextAssignmentId =
    store.birthday_assignments.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
  let assignedCount = 0;

  for (let i = 0; i < unassignedPersons.length; i++) {
    const person = unassignedPersons[i];
    const template = shuffled[i];

    usedTemplateIds.add(template.id);

    const assignment: BirthdayAssignment = {
      id: nextAssignmentId++,
      year,
      month,
      person_id: person.id,
      template_id: template.id,
      wish_content: template.content,
      assigned_at: new Date().toISOString(),
    };

    store.birthday_assignments.push(assignment);
    queueD1Write(
      `INSERT INTO birthday_assignments (year, month, person_id, template_id, wish_content, assigned_at) VALUES (?, ?, ?, ?, ?, datetime('now'))`,
      [year, month, person.id, template.id, template.content]
    );

    person.wish_message = template.content;
    queueD1Write(`UPDATE birthday_wishes SET wish_message = ? WHERE id = ?`, [template.content, person.id]);

    assignedCount++;
  }

  return {
    success: true,
    message: `Đã phân phối ngẫu nhiên thành công ${assignedCount} lời chúc riêng biệt cho sinh viên tháng ${month}/${year}.`,
    assignedCount,
    missingCount: 0,
    totalPersons: monthPersons.length,
    totalTemplates: store.birthday_templates.length,
    remainingTemplates: store.birthday_templates.filter(
      (t) => Number(t.is_active ?? 1) === 1 && !usedTemplateIds.has(t.id)
    ).length,
  };
}

export function getLuckyRaceHistory(limit = 200): LuckyRaceHistoryItem[] {
  if (!store.lucky_race_history_json) return [];
  try {
    const parsed = JSON.parse(store.lucky_race_history_json);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, limit);
    }
  } catch {}
  return [];
}

export function saveLuckyRaceHistoryList(list: LuckyRaceHistoryItem[]): void {
  const ts = nowIso();
  const trimmed = (Array.isArray(list) ? list : []).slice(0, 200);
  const jsonStr = JSON.stringify(trimmed);
  store.lucky_race_history_json = jsonStr;
  queueD1Write(
    `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['__lucky_race_history__', 'Lịch sử Cuộc Đua NGUYỄN THỊ TRÚC PHƯƠNG LUCKY RACE', '', '', jsonStr, ts]
  );
}

export function addLuckyRaceHistory(item: LuckyRaceHistoryItem): LuckyRaceHistoryItem[] {
  const current = getLuckyRaceHistory(200);
  const filtered = current.filter((r) => r.raceCode !== item.raceCode);
  const updated = [item, ...filtered].slice(0, 200);
  saveLuckyRaceHistoryList(updated);
  return updated;
}

export function deleteLuckyRaceHistory(raceCode: string): LuckyRaceHistoryItem[] {
  const current = getLuckyRaceHistory(200);
  const updated = current.filter((r) => r.raceCode !== raceCode);
  saveLuckyRaceHistoryList(updated);
  return updated;
}

export function clearAllLuckyRaceHistory(): void {
  saveLuckyRaceHistoryList([]);
}

export function initSchema() {}

// Universal SQL-compatible prepared statement adapter backed by Cloudflare D1
const db = {
  exec(_sql: string) {},
  prepare(sql: string) {
    const norm = sql.replace(/\s+/g, ' ').trim();
    const normUpper = norm.toUpperCase();

    return {
      get(...params: any[]): any {
        if (normUpper.includes('FROM ACCESS_GATES') && normUpper.includes('WHERE GATE_KEY = ?')) {
          const key = String(params[0] ?? '');
          return store.access_gates.find((g) => g.gate_key === key);
        }
        if (normUpper.includes('FROM SITE_PAGES')) {
          const pathArg = String(params[0] ?? '');
          return (
            pageExactMap.get(pathArg) ||
            pageLowerMap.get(pathArg.toLowerCase()) ||
            pageNormMap.get(normalizeRoutePath(pathArg))
          );
        }
        if (normUpper.includes('FROM SYLLABUS_CODES') && normUpper.includes('UPPER(CODE) = ?')) {
          const code = String(params[0] ?? '').toUpperCase();
          return store.syllabus_codes.find((c) => c.code.toUpperCase() === code);
        }
        if (normUpper.includes('FROM NEWS_ARTICLES') && normUpper.includes('WHERE SLUG = ?')) {
          const slug = String(params[0] ?? '');
          return store.news_articles.find((a) => a.slug === slug);
        }
        return undefined;
      },

      all(...params: any[]): any[] {
        // 1. access_gates
        if (normUpper.includes('FROM ACCESS_GATES')) {
          return [...store.access_gates].sort((a, b) => a.gate_key.localeCompare(b.gate_key));
        }

        // 2. syllabus_codes
        if (normUpper.includes('FROM SYLLABUS_CODES')) {
          let list = [...store.syllabus_codes];
          if (normUpper.includes('WHERE IS_PUBLIC = 1')) {
            list = list.filter((c) => Number(c.is_public) === 1);
            return list.sort((a, b) => a.code.localeCompare(b.code));
          }
          return list.sort((a, b) => Number(b.is_public) - Number(a.is_public) || a.code.localeCompare(b.code));
        }

        // 3. site_pages
        if (normUpper.includes('FROM SITE_PAGES')) {
          let list = [...store.site_pages];
          if (normUpper.includes("NOT LIKE '/ELEARNING/%'")) {
            list = list.filter(
              (p) => !p.route_path.toUpperCase().startsWith('/ELEARNING/') && p.route_path.toLowerCase() !== '/data'
            );
          }
          return list.sort((a, b) => a.route_path.localeCompare(b.route_path));
        }

        // 4. exam_submissions
        if (normUpper.includes('FROM EXAM_SUBMISSIONS')) {
          let list = [...store.exam_submissions];
          if (normUpper.includes('WHERE SCORE > 0')) {
            list = list.filter((s) => Number(s.score) > 0);
          }
          let pIdx = 0;
          if (normUpper.includes('AND SUBJECT_PATH = ?')) {
            const subFilter = normalizeRoutePath(String(params[pIdx++] ?? ''));
            list = list.filter((s) => normalizeRoutePath(s.subject_path) === subFilter);
          }
          if (normUpper.includes('STUDENT_NAME LIKE ?')) {
            const rawQ = String(params[pIdx] ?? '').replace(/^%|%$/g, '').toLowerCase();
            if (rawQ) {
              list = list.filter(
                (s) =>
                  s.student_name.toLowerCase().includes(rawQ) ||
                  s.student_id.toLowerCase().includes(rawQ) ||
                  s.test_code.toLowerCase().includes(rawQ)
              );
            }
          }
          if (normUpper.includes('ORDER BY SCORE DESC')) {
            list.sort((a, b) => Number(b.score) - Number(a.score) || Number(b.id) - Number(a.id));
          } else {
            list.sort((a, b) => Number(b.id) - Number(a.id));
          }
          const limitMatch = normUpper.match(/LIMIT\s+(\d+)/);
          if (limitMatch) {
            list = list.slice(0, Number(limitMatch[1]));
          }
          return list;
        }

        // 5. birthday_wishes
        if (normUpper.includes('FROM BIRTHDAY_WISHES')) {
          let list = [...store.birthday_wishes];
          if (normUpper.includes('WHERE IS_ACTIVE = 1')) {
            list = list.filter((b) => Number(b.is_active) === 1);
          }
          list.sort((a, b) => Number(a.birth_month) - Number(b.birth_month) || Number(a.birth_day) - Number(b.birth_day));
          const limitMatch = normUpper.match(/LIMIT\s+(\d+)/);
          if (limitMatch) {
            list = list.slice(0, Number(limitMatch[1]));
          }
          return list;
        }

        // 6. news_articles
        if (normUpper.includes('FROM NEWS_ARTICLES')) {
          let list = [...store.news_articles];
          if (normUpper.includes('WHERE SLUG != ?')) {
            const excludeSlug = String(params[0] ?? '');
            list = list.filter((a) => a.slug !== excludeSlug);
          }
          list.sort((a, b) => Number(b.id) - Number(a.id));
          const limitMatch = normUpper.match(/LIMIT\s+(\d+)/);
          if (limitMatch) {
            list = list.slice(0, Number(limitMatch[1]));
          }
          return list;
        }

        return [];
      },

      run(...params: any[]): { lastInsertRowid: number; changes: number } {
        const ts = nowIso();

        // 1. INSERT INTO exam_submissions
        if (normUpper.startsWith('INSERT INTO EXAM_SUBMISSIONS')) {
          const nextId = store.exam_submissions.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
          const row: ExamSubmission = {
            id: nextId,
            student_name: String(params[0] ?? 'Sinh viên'),
            student_id: String(params[1] ?? ''),
            class_name: String(params[2] ?? ''),
            subject_path: String(params[3] ?? '/'),
            subject_title: String(params[4] ?? 'Bài kiểm tra'),
            exam_mode: String(params[5] ?? 'Đề thi thử'),
            test_code: String(params[6] ?? 'N/A'),
            score: Number(params[7] ?? 0),
            max_score: Number(params[8] ?? 100),
            duration_text: String(params[9] ?? ''),
            ip_address: String(params[10] ?? ''),
            submitted_at: ts,
          };
          store.exam_submissions.unshift(row);
          queueD1Write(
            `INSERT INTO exam_submissions (student_name, student_id, class_name, subject_path, subject_title, exam_mode, test_code, score, max_score, duration_text, ip_address, submitted_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              row.student_name,
              row.student_id,
              row.class_name,
              row.subject_path,
              row.subject_title,
              row.exam_mode,
              row.test_code,
              row.score,
              row.max_score,
              row.duration_text,
              row.ip_address,
              row.submitted_at,
            ]
          );
          return { lastInsertRowid: nextId, changes: 1 };
        }

        // 2. UPDATE access_gates
        if (normUpper.startsWith('UPDATE ACCESS_GATES')) {
          const codesJson = String(params[0] ?? '[]');
          const gateKey = String(params[1] ?? '');
          const target = store.access_gates.find((g) => g.gate_key === gateKey);
          if (target) {
            target.passcodes_json = codesJson;
            target.updated_at = ts;
          }
          queueD1Write(
            `UPDATE access_gates SET passcodes_json = ?, updated_at = ? WHERE gate_key = ?`,
            [codesJson, ts, gateKey]
          );
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 3. INSERT/UPSERT INTO syllabus_codes
        if (normUpper.startsWith('INSERT INTO SYLLABUS_CODES')) {
          const code = String(params[0] ?? '').toUpperCase();
          const title = String(params[1] ?? '');
          const category = String(params[2] ?? 'DeTai');
          const url = String(params[3] ?? '');
          const is_public = Number(params[4] ?? 0);
          const existing = store.syllabus_codes.find((c) => c.code.toUpperCase() === code);
          if (existing) {
            existing.title = title;
            existing.category = category;
            existing.url = url;
            existing.is_public = is_public;
            existing.updated_at = ts;
          } else {
            store.syllabus_codes.push({ code, title, category, url, is_public, updated_at: ts });
          }
          queueD1Write(
            `INSERT OR REPLACE INTO syllabus_codes (code, title, category, url, is_public, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [code, title, category, url, is_public, ts]
          );
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 4. DELETE FROM syllabus_codes
        if (normUpper.startsWith('DELETE FROM SYLLABUS_CODES')) {
          const code = String(params[0] ?? '').toUpperCase();
          const idx = store.syllabus_codes.findIndex((c) => c.code.toUpperCase() === code);
          if (idx !== -1) store.syllabus_codes.splice(idx, 1);
          queueD1Write(`DELETE FROM syllabus_codes WHERE UPPER(code) = ?`, [code]);
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 5. DELETE FROM exam_submissions
        if (normUpper.startsWith('DELETE FROM EXAM_SUBMISSIONS')) {
          if (!normUpper.includes('WHERE')) {
            store.exam_submissions.length = 0;
            queueD1Write(`DELETE FROM exam_submissions`, []);
            return { lastInsertRowid: 0, changes: 1 };
          }
          const id = Number(params[0] ?? 0);
          const idx = store.exam_submissions.findIndex((s) => Number(s.id) === id);
          if (idx !== -1) store.exam_submissions.splice(idx, 1);
          queueD1Write(`DELETE FROM exam_submissions WHERE id = ?`, [id]);
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 6. INSERT INTO birthday_wishes
        if (normUpper.startsWith('INSERT INTO BIRTHDAY_WISHES')) {
          const nextId = store.birthday_wishes.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
          const emoji = String(params[5] || '🎂');
          const bday: BirthdayWish = {
            id: nextId,
            full_name: String(params[0] ?? ''),
            role_or_class: String(params[1] ?? 'Sinh viên'),
            birth_day: Number(params[2] ?? 1),
            birth_month: Number(params[3] ?? 1),
            wish_message: String(params[4] ?? ''),
            avatar_emoji: emoji,
            is_active: 1,
            created_at: ts,
          };
          store.birthday_wishes.push(bday);
          queueD1Write(
            `INSERT INTO birthday_wishes (full_name, role_or_class, birth_day, birth_month, wish_message, avatar_emoji, is_active, created_at)
             VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
            [bday.full_name, bday.role_or_class, bday.birth_day, bday.birth_month, bday.wish_message, emoji, ts]
          );
          return { lastInsertRowid: nextId, changes: 1 };
        }

        // 7. DELETE FROM birthday_wishes
        if (normUpper.startsWith('DELETE FROM BIRTHDAY_WISHES')) {
          if (!normUpper.includes('WHERE')) {
            store.birthday_wishes.length = 0;
            queueD1Write(`DELETE FROM birthday_wishes`, []);
            store.birthday_assignments.length = 0;
            queueD1Write(`DELETE FROM birthday_assignments`, []);
            return { lastInsertRowid: 0, changes: 1 };
          }
          const id = Number(params[0] ?? 0);
          const idx = store.birthday_wishes.findIndex((b) => Number(b.id) === id);
          if (idx !== -1) store.birthday_wishes.splice(idx, 1);
          queueD1Write(`DELETE FROM birthday_wishes WHERE id = ?`, [id]);
          store.birthday_assignments = store.birthday_assignments.filter((a) => Number(a.person_id) !== id);
          queueD1Write(`DELETE FROM birthday_assignments WHERE person_id = ?`, [id]);
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 8. INSERT INTO news_articles
        if (normUpper.startsWith('INSERT INTO NEWS_ARTICLES')) {
          const nextId = store.news_articles.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1;
          const art: NewsArticle = {
            id: nextId,
            slug: String(params[0] ?? ''),
            title: String(params[1] ?? ''),
            category: String(params[2] ?? 'Góc chia sẻ'),
            summary: String(params[3] ?? ''),
            content_html: String(params[4] ?? ''),
            author: 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG',
            published_at: ts,
            views: 1,
          };
          store.news_articles.unshift(art);
          queueD1Write(
            `INSERT INTO news_articles (slug, title, category, summary, content_html, author, published_at, views)
             VALUES (?, ?, ?, ?, ?, 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG', ?, 1)`,
            [art.slug, art.title, art.category, art.summary, art.content_html, ts]
          );
          return { lastInsertRowid: nextId, changes: 1 };
        }

        // 8b. UPDATE news_articles content
        if (normUpper.startsWith('UPDATE NEWS_ARTICLES SET TITLE')) {
          const title = String(params[0] ?? '');
          const category = String(params[1] ?? 'Góc chia sẻ');
          const summary = String(params[2] ?? '');
          const content_html = String(params[3] ?? '');
          const id = Number(params[4] ?? 0);
          const art = store.news_articles.find((a) => Number(a.id) === id);
          if (art) {
            art.title = title;
            art.category = category;
            art.summary = summary;
            art.content_html = content_html;
          }
          queueD1Write(
            `UPDATE news_articles SET title = ?, category = ?, summary = ?, content_html = ? WHERE id = ?`,
            [title, category, summary, content_html, id]
          );
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 9. DELETE FROM news_articles
        if (normUpper.startsWith('DELETE FROM NEWS_ARTICLES')) {
          const id = Number(params[0] ?? 0);
          const idx = store.news_articles.findIndex((a) => Number(a.id) === id);
          if (idx !== -1) store.news_articles.splice(idx, 1);
          queueD1Write(`DELETE FROM news_articles WHERE id = ?`, [id]);
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 10. UPDATE news_articles SET views = views + 1
        if (normUpper.startsWith('UPDATE NEWS_ARTICLES SET VIEWS')) {
          const id = Number(params[0] ?? 0);
          const art = store.news_articles.find((a) => Number(a.id) === id);
          if (art) {
            art.views = Number(art.views || 0) + 1;
          }
          queueD1Write(`UPDATE news_articles SET views = views + 1 WHERE id = ?`, [id]);
          return { lastInsertRowid: 0, changes: 1 };
        }

        // 11. UPDATE site_pages
        if (normUpper.startsWith('UPDATE SITE_PAGES')) {
          const title = String(params[0] ?? '');
          const html_content = String(params[1] ?? '');
          const custom_css = String(params[2] ?? '');
          const custom_js = String(params[3] ?? '');
          const route_path = normalizeRoutePath(String(params[4] ?? ''));
          const page =
            pageExactMap.get(route_path) ||
            pageLowerMap.get(route_path.toLowerCase()) ||
            pageNormMap.get(route_path);
          if (page) {
            page.title = title;
            page.html_content = html_content;
            page.custom_css = custom_css;
            page.custom_js = custom_js;
            page.updated_at = ts;
          }
          queueD1Write(
            `INSERT OR REPLACE INTO site_pages_overrides (route_path, title, html_content, custom_css, custom_js, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [route_path, title, html_content, custom_css, custom_js, ts]
          );
          return { lastInsertRowid: 0, changes: 1 };
        }

        return { lastInsertRowid: 0, changes: 0 };
      },
    };
  },
};

export default db;
