-- =========================================================================
-- MIGRATION 0001: HỆ THỐNG TRỢ LÝ HỌC TẬP & TRA CỨU ĐIỂM (ASTRO + CLOUDFLARE D1)
-- =========================================================================

-- 1. Bảng Quản trị viên (admin_users)
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor', -- 'super_admin', 'editor', 'viewer'
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Bảng Danh bạ Phòng ban & Kênh liên hệ (departments)
CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  function_desc TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  is_verified INTEGER NOT NULL DEFAULT 0, -- 1: Đã xác minh, 0: Chưa xác minh chính thức
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Bảng Tài liệu & Văn bản Quy chế (documents)
CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  code TEXT, -- Số quyết định / mã văn bản, ví dụ: '624/QĐ-CĐKT'
  category TEXT NOT NULL DEFAULT 'quy-che-dao-tao', -- 'quy-che-dao-tao', 'chuan-dau-ra', 'hoc-bong-hoc-phi', 'thuc-tap', 'khac'
  issuing_body TEXT NOT NULL DEFAULT 'Trường Cao đẳng Kinh tế TP.HCM',
  issued_date TEXT,
  effective_date TEXT,
  expiry_date TEXT,
  is_effective INTEGER NOT NULL DEFAULT 1, -- 1: Còn hiệu lực, 0: Hết hiệu lực
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' (chờ duyệt), 'approved' (đã duyệt), 'rejected' (từ chối), 'archived' (lưu trữ)
  source_type TEXT NOT NULL DEFAULT 'upload', -- 'upload' (tải lên), 'gdrive' (đồng bộ Google Drive), 'system' (hệ thống)
  source_file_url TEXT, -- Đường dẫn lưu file gốc trong Cloudflare R2
  file_name TEXT,
  file_size INTEGER DEFAULT 0,
  file_type TEXT, -- 'pdf', 'docx', 'doc', 'txt'
  approved_by INTEGER,
  approved_at TEXT,
  total_chunks INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (approved_by) REFERENCES admin_users(id)
);

CREATE INDEX IF NOT EXISTS idx_docs_status ON documents(status, is_effective);
CREATE INDEX IF NOT EXISTS idx_docs_category ON documents(category);

-- 4. Bảng Phân đoạn văn bản phục vụ RAG (document_chunks)
CREATE TABLE IF NOT EXISTS document_chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  chunk_index INTEGER NOT NULL,
  chapter TEXT, -- Ví dụ: 'Chương II'
  article TEXT, -- Ví dụ: 'Điều 13'
  clause TEXT, -- Ví dụ: 'Khoản 1'
  page_number INTEGER, -- Số trang trong văn bản
  heading TEXT, -- Tiêu đề điều khoản
  content TEXT NOT NULL, -- Nội dung đoạn trích xuất
  keywords TEXT, -- Từ khóa trích xuất bổ trợ tìm kiếm
  char_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chunks_doc ON document_chunks(document_id, chunk_index);

-- Bảng ảo tìm kiếm toàn văn FTS5 cho các đoạn trích (document_chunks_fts)
CREATE VIRTUAL TABLE IF NOT EXISTS document_chunks_fts USING fts5(
  chunk_id UNINDEXED,
  document_id UNINDEXED,
  title,
  article,
  heading,
  content,
  keywords,
  tokenize = 'unicode61'
);

-- 5. Bảng Lịch sử phiên bản tài liệu (document_versions)
CREATE TABLE IF NOT EXISTS document_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  version_number INTEGER NOT NULL DEFAULT 1,
  change_summary TEXT,
  previous_file_url TEXT,
  created_by INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- 6. Bảng Phiên hội thoại Chatbot (chat_sessions)
CREATE TABLE IF NOT EXISTS chat_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_token TEXT NOT NULL UNIQUE,
  character_role TEXT NOT NULL DEFAULT 'TRUC_PHUONG', -- 'TRUC_PHUONG' (Trợ lý học thuật ThS. Nguyễn Thị Trúc Phương)
  user_ip_hash TEXT, -- Băm SHA-256 IP để bảo vệ quyền riêng tư & chống spam
  user_agent TEXT,
  total_messages INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_token ON chat_sessions(session_token);

-- 7. Bảng Nhật ký tin nhắn Chatbot (chat_logs)
CREATE TABLE IF NOT EXISTS chat_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  role TEXT NOT NULL, -- 'user', 'assistant'
  message TEXT NOT NULL,
  grounding_status TEXT NOT NULL DEFAULT 'unverified', -- 'verified' (có căn cứ quy chế), 'refused' (từ chối do thiếu căn cứ), 'irrelevant' (ngoài phạm vi)
  citations_json TEXT, -- Danh sách trích dẫn văn bản, điều, khoản, trang dạng JSON
  model_name TEXT, -- Ví dụ: 'gemini-2.5-flash-lite'
  latency_ms INTEGER DEFAULT 0,
  feedback_score INTEGER, -- 1: Hữu ích, -1: Chưa đúng
  feedback_comment TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON chat_logs(session_id);

-- 8. Bảng Câu hỏi chưa giải đáp (unanswered_questions)
CREATE TABLE IF NOT EXISTS unanswered_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  category TEXT,
  occurrence_count INTEGER NOT NULL DEFAULT 1,
  last_asked_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'reviewed', 'answered_by_doc'
  reviewed_by INTEGER,
  reviewed_at TEXT,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_unanswered_status ON unanswered_questions(status);

-- 9. Bảng Nhật ký đồng bộ Google Drive (sync_logs)
CREATE TABLE IF NOT EXISTS sync_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  folder_id TEXT,
  sync_type TEXT NOT NULL DEFAULT 'manual', -- 'manual', 'scheduled'
  status TEXT NOT NULL DEFAULT 'success', -- 'success', 'failed', 'partial'
  files_scanned INTEGER NOT NULL DEFAULT 0,
  files_added INTEGER NOT NULL DEFAULT 0,
  files_updated INTEGER NOT NULL DEFAULT 0,
  files_deleted INTEGER NOT NULL DEFAULT 0,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 10. Bảng Tài khoản Sinh viên phục vụ tra cứu điểm SIS (student_accounts)
-- Mặc định SIS_ENABLED = false. Bảng tạo sẵn phục vụ mở rộng trong tương lai.
CREATE TABLE IF NOT EXISTS student_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL UNIQUE, -- MSSV (đã xác thực qua SSO)
  full_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  major TEXT,
  cohort TEXT, -- Khóa học
  email TEXT,
  phone TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Bảng Nhật ký truy cập điểm sinh viên (grade_access_logs)
CREATE TABLE IF NOT EXISTS grade_access_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL,
  access_type TEXT NOT NULL DEFAULT 'view',
  semester TEXT,
  ip_address TEXT,
  user_agent TEXT,
  access_status TEXT NOT NULL DEFAULT 'locked_sis_disabled', -- Ghi nhận trạng thái khi SIS_ENABLED=false
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
