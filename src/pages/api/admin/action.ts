import type { APIRoute } from 'astro';
import db, {
  verifyGateToken,
  getPageByPath,
  getSiteContactConfig,
  saveSiteContactConfig,
  getYoutubeVideos,
  saveYoutubeVideos,
  getEvaluationCriteria,
  saveEvaluationCriteria,
  resetEvaluationCriteria,
  deleteEvaluation,
  clearAllEvaluations,
  deleteSurvey,  getTeachingSchedule,
  saveTeachingSchedule,
  resetTeachingSchedule,
  type TeachingScheduleItem,
  clearAllSurveys,
  type YoutubeVideoItem,
  getAdminAccounts,
  getAdminAccountByUsername,
  upsertAdminAccount,
  deleteAdminAccount,
  getAdminAuditLogs,
  addAdminAuditLog,
  clearAdminAuditLogs,
  getBirthdayTemplates,
  getBirthdayTemplateById,
  upsertBirthdayTemplate,
  bulkImportBirthdayTemplates,
  deleteBirthdayTemplate,
  bulkDeleteBirthdayTemplates,
  clearAllBirthdayTemplates,
  bulkDeleteBirthdays,
  getBirthdayStats,
  getMonthlyBirthdayRecipients,
  distributeBirthdayWishes,
} from '../../../lib/db';
import { verifyAdminToken, hashPassword } from '../../../lib/admin-auth';
import { buildTextbook, parseRawTextbook } from '../../../lib/textbook-builder';
import { buildArticle } from '../../../lib/article-builder';
import {
  getOnlineExamConfig,
  saveOnlineExamConfig,
  addOnlineExamSubject,
  deleteOnlineExamSubject,
  extractQuestionBankFromJs,
  extractModeCardsFromHtml,
  updateSitePageQuizData,
  parseBulkQuestionsText,
  type QuizQuestionItem,
  type QuizModeCard,
} from '../../../lib/quiz-helper';

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const action = String(body.action || '');

    if (action === 'add_public_birthday') {
      const fullName = String(body.full_name || '').trim();
      const roleOrClass = String(body.role_or_class || 'Sinh viên').trim();
      const birthDay = Math.max(1, Math.min(31, Number(body.birth_day || 1)));
      const birthMonth = Math.max(1, Math.min(12, Number(body.birth_month || 1)));
      const wishMessage = String(body.wish_message || 'Chúc mừng sinh nhật thật nhiều niềm vui và học tập xuất sắc!').trim();
      if (!fullName) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập họ tên.' }), { status: 400 });
      }
      db.prepare(`
        INSERT INTO birthday_wishes (full_name, role_or_class, birth_day, birth_month, wish_message, avatar_emoji, is_active)
        VALUES (?, ?, ?, ?, ?, '🎂', 1)
      `).run(fullName, roleOrClass, birthDay, birthMonth, wishMessage);
      return new Response(JSON.stringify({ ok: true, message: 'Đã đăng lời chúc mừng sinh nhật!' }), { status: 200 });
    }

    // Check modern admin session first, fallback to gate token
    const sessionToken = cookies.get('tkd_admin_session')?.value;
    const adminSession = verifyAdminToken(sessionToken);
    const gateAdminToken = cookies.get('tkd_gate_admin')?.value;
    const isGateValid = verifyGateToken('admin', gateAdminToken);

    if (!adminSession && !isGateValid) {
      return new Response(JSON.stringify({ ok: false, message: 'Chưa đăng nhập quyền Admin!' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const currentActor = adminSession
      ? { username: adminSession.username, role: adminSession.role }
      : { username: 'admin', role: 'super_admin' as const };
    const currentRole = currentActor.role;

    // Role-based authorization check helper
    function requireRole(allowedRoles: Array<'super_admin' | 'editor' | 'viewer'>) {
      if (!allowedRoles.includes(currentRole as any)) {
        return new Response(JSON.stringify({ ok: false, message: `Bạn không có quyền thực hiện tác vụ này (Yêu cầu quyền: ${allowedRoles.join(', ')})!` }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return null;
    }

    if (action === 'update_gate') {
      const gateKey = String(body.gate_key || '').trim();
      const rawCodes = String(body.passcodes || '').trim();
      const codes = rawCodes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (!gateKey || codes.length === 0) {
        return new Response(JSON.stringify({ ok: false, message: 'Mã truy cập không được để trống.' }), { status: 400 });
      }

      db.prepare('UPDATE access_gates SET passcodes_json = ?, updated_at = CURRENT_TIMESTAMP WHERE gate_key = ?').run(
        JSON.stringify(codes),
        gateKey
      );
      return new Response(JSON.stringify({ ok: true, message: 'Đã cập nhật mật khẩu thành công!' }), { status: 200 });
    }

    if (action === 'upsert_dcct') {
      const code = String(body.code || '').trim().toUpperCase();
      const title = String(body.title || '').trim();
      const url = String(body.url || '').trim();
      const category = String(body.category || 'DeTai').trim();
      const isPublic = body.is_public ? 1 : 0;

      if (!code || !url) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập Mã số và Link tài liệu.' }), { status: 400 });
      }

      db.prepare(`
        INSERT INTO syllabus_codes (code, title, category, url, is_public, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(code) DO UPDATE SET
          title = excluded.title,
          category = excluded.category,
          url = excluded.url,
          is_public = excluded.is_public,
          updated_at = CURRENT_TIMESTAMP
      `).run(code, title || `Đề cương mã ${code}`, category, url, isPublic);

      return new Response(JSON.stringify({ ok: true, message: `Đã lưu mã đề cương ${code}!` }), { status: 200 });
    }

    if (action === 'delete_dcct') {
      const code = String(body.code || '').trim().toUpperCase();
      db.prepare('DELETE FROM syllabus_codes WHERE UPPER(code) = ?').run(code);
      return new Response(JSON.stringify({ ok: true, message: `Đã xóa mã ${code}!` }), { status: 200 });
    }

    if (action === 'delete_submission') {
      const id = Number(body.id || 0);
      db.prepare('DELETE FROM exam_submissions WHERE id = ?').run(id);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (action === 'clear_all_submissions') {
      db.prepare('DELETE FROM exam_submissions').run();
      return new Response(JSON.stringify({ ok: true, message: 'Đã xóa toàn bộ lịch sử bảng điểm!' }), { status: 200 });
    }

    if (action === 'clear_all_birthdays') {
      const roleErr = requireRole(['super_admin']);
      if (roleErr) return roleErr;
      db.prepare('DELETE FROM birthday_wishes').run();
      addAdminAuditLog({
        actor_username: currentActor.username,
        actor_role: currentActor.role,
        action_type: 'CLEAR_BIRTHDAYS',
        target_module: 'BIRTHDAY',
        details: 'Xóa toàn bộ danh sách sinh nhật sinh viên',
        ip_address: clientAddress || '',
      });
      return new Response(JSON.stringify({ ok: true, message: 'Đã xóa toàn bộ danh sách sinh nhật!' }), { status: 200 });
    }

    // =========================================================================
    // CÁC ACTION NÂNG CẤP KHO LỜI CHÚC & PHÂN PHỐI SINH NHẬT
    // =========================================================================

    if (action === 'get_birthday_stats') {
      const stats = getBirthdayStats(
        body.year ? Number(body.year) : undefined,
        body.month ? Number(body.month) : undefined
      );
      return new Response(JSON.stringify({ ok: true, stats }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_birthday_templates') {
      const templates = getBirthdayTemplates(Boolean(body.active_only));
      return new Response(JSON.stringify({ ok: true, templates }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'upsert_birthday_template') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const res = upsertBirthdayTemplate(
        body.content,
        body.category || 'Chung',
        body.is_active !== undefined ? Number(body.is_active) : 1,
        body.id ? Number(body.id) : undefined
      );
      if (res.ok) {
        addAdminAuditLog({
          actor_username: currentActor.username,
          actor_role: currentActor.role,
          action_type: body.id ? 'UPDATE_BIRTHDAY_TEMPLATE' : 'CREATE_BIRTHDAY_TEMPLATE',
          target_module: 'BIRTHDAY',
          details: `${body.id ? 'Cập nhật' : 'Thêm mới'} lời chúc ID #${res.template?.id}: "${res.template?.content.slice(0, 40)}..."`,
          ip_address: clientAddress || '',
        });
      }
      return new Response(JSON.stringify(res), {
        status: res.ok ? 200 : 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'bulk_import_birthday_templates') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      let lines: string[] = [];
      if (Array.isArray(body.contents)) {
        lines = body.contents.map((c: any) => String(c || '').trim()).filter(Boolean);
      } else {
        lines = String(body.raw_text || '')
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
      }

      if (lines.length === 0) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng cung cấp danh sách lời chúc để import.' }), { status: 400 });
      }

      const res = bulkImportBirthdayTemplates(lines, body.category || 'Chung');
      addAdminAuditLog({
        actor_username: currentActor.username,
        actor_role: currentActor.role,
        action_type: 'BULK_IMPORT_BIRTHDAY_TEMPLATES',
        target_module: 'BIRTHDAY',
        details: `Import kho lời chúc: Thêm thành công ${res.addedCount} câu mới, loại bỏ ${res.duplicateCount} câu trùng lặp.`,
        ip_address: clientAddress || '',
      });
      return new Response(
        JSON.stringify({
          ok: true,
          addedCount: res.addedCount,
          duplicateCount: res.duplicateCount,
          message: `Đã nhập thành công ${res.addedCount} lời chúc mới vào kho (loại bỏ ${res.duplicateCount} lời chúc trùng lặp).`,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'delete_birthday_template') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const id = Number(body.id);
      const tmpl = getBirthdayTemplateById(id);
      const ok = deleteBirthdayTemplate(id);
      if (ok) {
        addAdminAuditLog({
          actor_username: currentActor.username,
          actor_role: currentActor.role,
          action_type: 'DELETE_BIRTHDAY_TEMPLATE',
          target_module: 'BIRTHDAY',
          details: `Xóa lời chúc ID #${id} khỏi kho: "${tmpl?.content?.slice(0, 40)}..."`,
          ip_address: clientAddress || '',
        });
      }
      return new Response(
        JSON.stringify({ ok, message: ok ? 'Đã xóa lời chúc khỏi kho!' : 'Không tìm thấy lời chúc cần xóa.' }),
        { status: ok ? 200 : 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'bulk_delete_birthday_templates') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const deleteAll = Boolean(body.delete_all);
      if (deleteAll) {
        const { deletedCount } = clearAllBirthdayTemplates();
        addAdminAuditLog({
          actor_username: currentActor.username,
          actor_role: currentActor.role,
          action_type: 'CLEAR_ALL_BIRTHDAY_TEMPLATES',
          target_module: 'BIRTHDAY',
          details: `Xóa toàn bộ ${deletedCount} lời chúc trong kho`,
          ip_address: clientAddress || '',
        });
        return new Response(
          JSON.stringify({ ok: true, deletedCount, message: `Đã xóa toàn bộ ${deletedCount} lời chúc khỏi kho!` }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const rawIds = Array.isArray(body.ids) ? body.ids : [];
      const ids = rawIds.map((id: any) => Number(id)).filter((id: number) => !isNaN(id) && id > 0);
      if (ids.length === 0) {
        return new Response(
          JSON.stringify({ ok: false, message: 'Vui lòng chọn ít nhất một lời chúc để xóa.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const { deletedCount } = bulkDeleteBirthdayTemplates(ids);
      addAdminAuditLog({
        actor_username: currentActor.username,
        actor_role: currentActor.role,
        action_type: 'BULK_DELETE_BIRTHDAY_TEMPLATES',
        target_module: 'BIRTHDAY',
        details: `Xóa hàng loạt ${deletedCount} lời chúc khỏi kho (IDs: ${ids.slice(0, 10).join(', ')}${ids.length > 10 ? '...' : ''})`,
        ip_address: clientAddress || '',
      });
      return new Response(
        JSON.stringify({ ok: true, deletedCount, message: `Đã xóa thành công ${deletedCount} lời chúc được chọn khỏi kho!` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'distribute_birthday_wishes') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const forceRedistribute = Boolean(body.force_redistribute);
      const year = body.year ? Number(body.year) : undefined;
      const month = body.month ? Number(body.month) : undefined;
      const res = distributeBirthdayWishes(year, month, forceRedistribute);

      if (res.success) {
        addAdminAuditLog({
          actor_username: currentActor.username,
          actor_role: currentActor.role,
          action_type: forceRedistribute ? 'REDISTRIBUTE_BIRTHDAYS' : 'DISTRIBUTE_BIRTHDAYS',
          target_module: 'BIRTHDAY',
          details: `${forceRedistribute ? 'Phân phối lại toàn bộ' : 'Phân phối ngẫu nhiên'} lời chúc tháng ${month || 'hiện tại'}: Cấp thành công ${res.assignedCount} sinh viên.`,
          ip_address: clientAddress || '',
        });
      }

      return new Response(JSON.stringify({ ok: res.success, ...res }), {
        status: res.success ? 200 : 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_monthly_birthday_recipients') {
      const recipients = getMonthlyBirthdayRecipients(
        body.year ? Number(body.year) : undefined,
        body.month ? Number(body.month) : undefined
      );
      return new Response(JSON.stringify({ ok: true, recipients }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'add_birthday') {
      const fullName = String(body.full_name || '').trim();
      const roleOrClass = String(body.role_or_class || 'Sinh viên').trim();
      const birthDay = Number(body.birth_day || 1);
      const birthMonth = Number(body.birth_month || 1);
      const wishMessage = String(body.wish_message || 'Chúc mừng sinh nhật thật nhiều niềm vui và học tập xuất sắc!').trim();
      if (!fullName) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập họ tên.' }), { status: 400 });
      }
      db.prepare(`
        INSERT INTO birthday_wishes (full_name, role_or_class, birth_day, birth_month, wish_message, avatar_emoji, is_active)
        VALUES (?, ?, ?, ?, ?, '🎂', 1)
      `).run(fullName, roleOrClass, birthDay, birthMonth, wishMessage);

      // Tự động cấp lời chúc riêng từ kho nếu thuộc tháng hiện tại
      try {
        distributeBirthdayWishes(undefined, birthMonth, false);
      } catch {}

      return new Response(JSON.stringify({ ok: true, message: 'Đã thêm sinh nhật thành công!' }), { status: 200 });
    }

    if (action === 'bulk_add_birthdays') {
      const rawText = String(body.raw_text || '').trim();
      const defaultClass = String(body.default_class || 'Sinh viên HCE').trim();
      const defaultWish = String(
        body.default_wish ||
          'Chúc em tuổi mới tràn đầy năng lượng, học tập xuất sắc và đạt kết quả cao nhất trong các học phần!'
      ).trim();
      const replaceAll = Boolean(body.replace_all);

      if (!rawText) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng dán danh sách lớp vào ô nhập liệu.' }), {
          status: 400,
        });
      }

      const lines = rawText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

      const parsedRows: Array<{
        full_name: string;
        role_or_class: string;
        birth_day: number;
        birth_month: number;
        wish_message: string;
        avatar_emoji: string;
      }> = [];

      const emojis = ['🎂', '🎉', '🌟', '💐', '🎁'];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Skip header rows
        if (/^(stt|họ\s*và\s*tên|họ\s*tên|mssv|mã\s*sv)/i.test(line) && /ngày\s*sinh|birthday|dob/i.test(line)) {
          continue;
        }

        // Match DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY, or DD/MM
        const dateMatch = line.match(/\b(\d{1,2})[\/\-\.](\d{1,2})(?:[\/\-\.](\d{2,4}))?\b/);
        if (!dateMatch) continue;

        const day = Number(dateMatch[1]);
        const month = Number(dateMatch[2]);
        if (day < 1 || day > 31 || month < 1 || month > 12) continue;

        // Split columns by Tab, comma, semicolon, or pipe
        const parts = line
          .split(/\t|,|;|\|/)
          .map((p) => p.trim())
          .filter(Boolean);

        let fullName = '';
        let roleOrClass = defaultClass;
        let wishMsg = defaultWish;

        if (parts.length >= 2) {
          // Find which column contains the date
          const dateColIdx = parts.findIndex((p) => p.includes(dateMatch[0]));
          const otherCols = parts.filter((_, idx) => idx !== dateColIdx);
          // Filter out pure numbers (STT) or student ID codes like SV260108 / 2300123
          const textCols = otherCols.filter((c) => !/^\d+$/.test(c) && !/^(SV|CD|CĐ|MSSV)\d+$/i.test(c));
          fullName = textCols[0] || otherCols[0] || '';
          if (textCols.length >= 2) {
            roleOrClass = textCols[1];
          }
          if (textCols.length >= 3) {
            wishMsg = textCols.slice(2).join(' ');
          }
        } else {
          // Single string with name and date, e.g., "Nguyễn Văn A - 15/11/2006"
          fullName = line
            .replace(dateMatch[0], '')
            .replace(/^\d+[\.\-\)\s]+/, '')
            .replace(/[\-\–\|]+/g, ' ')
            .trim();
        }

        if (!fullName) continue;

        parsedRows.push({
          full_name: fullName,
          role_or_class: roleOrClass || defaultClass,
          birth_day: day,
          birth_month: month,
          wish_message: wishMsg || defaultWish,
          avatar_emoji: emojis[parsedRows.length % emojis.length],
        });
      }

      if (parsedRows.length === 0) {
        return new Response(
          JSON.stringify({
            ok: false,
            message: 'Không tìm thấy dòng hợp lệ. Hãy đảm bảo mỗi dòng có Họ tên và Ngày sinh (VD: Nguyễn Văn A | 15/11/2006 | Lớp CĐ QTKD K26A).',
          }),
          { status: 400 }
        );
      }

      if (replaceAll) {
        db.prepare('DELETE FROM birthday_wishes').run();
      }

      const stmt = db.prepare(`
        INSERT INTO birthday_wishes (full_name, role_or_class, birth_day, birth_month, wish_message, avatar_emoji, is_active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `);

      for (const row of parsedRows) {
        stmt.run(row.full_name, row.role_or_class, row.birth_day, row.birth_month, row.wish_message, row.avatar_emoji);
      }

      // Tự động phân phối lời chúc riêng biệt cho sinh viên mới nhập
      try {
        distributeBirthdayWishes();
      } catch {}

      return new Response(
        JSON.stringify({
          ok: true,
          count: parsedRows.length,
          message: `Đã nhập tự động thành công ${parsedRows.length} sinh viên vào danh sách chúc mừng sinh nhật!`,
        }),
        { status: 200 }
      );
    }

    if (action === 'delete_birthday') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const id = Number(body.id || 0);
      db.prepare('DELETE FROM birthday_wishes WHERE id = ?').run(id);
      addAdminAuditLog({
        actor_username: currentActor.username,
        actor_role: currentActor.role,
        action_type: 'DELETE_BIRTHDAY',
        target_module: 'BIRTHDAY',
        details: `Xóa sinh viên ID #${id} khỏi danh sách sinh nhật`,
        ip_address: clientAddress || '',
      });
      return new Response(JSON.stringify({ ok: true, message: 'Đã xóa sinh viên khỏi danh sách!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'bulk_delete_birthdays') {
      const roleErr = requireRole(['super_admin', 'editor']);
      if (roleErr) return roleErr;
      const deleteAll = Boolean(body.delete_all);
      if (deleteAll) {
        db.prepare('DELETE FROM birthday_wishes').run();
        addAdminAuditLog({
          actor_username: currentActor.username,
          actor_role: currentActor.role,
          action_type: 'CLEAR_BIRTHDAYS',
          target_module: 'BIRTHDAY',
          details: 'Xóa toàn bộ danh sách sinh nhật sinh viên',
          ip_address: clientAddress || '',
        });
        return new Response(
          JSON.stringify({ ok: true, message: 'Đã xóa toàn bộ sinh viên khỏi danh sách!' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const rawIds = Array.isArray(body.ids) ? body.ids : [];
      const ids = rawIds.map((id: any) => Number(id)).filter((id: number) => !isNaN(id) && id > 0);
      if (ids.length === 0) {
        return new Response(
          JSON.stringify({ ok: false, message: 'Vui lòng chọn ít nhất một sinh viên để xóa.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const { deletedCount } = bulkDeleteBirthdays(ids);
      addAdminAuditLog({
        actor_username: currentActor.username,
        actor_role: currentActor.role,
        action_type: 'BULK_DELETE_BIRTHDAYS',
        target_module: 'BIRTHDAY',
        details: `Xóa hàng loạt ${deletedCount} sinh viên khỏi danh sách sinh nhật (IDs: ${ids.slice(0, 10).join(', ')}${ids.length > 10 ? '...' : ''})`,
        ip_address: clientAddress || '',
      });
      return new Response(
        JSON.stringify({ ok: true, deletedCount, message: `Đã xóa thành công ${deletedCount} sinh viên được chọn!` }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // THÊM GIÁO TRÌNH MỚI CHUẨN SƯ PHẠM VÀ CHUẨN SEO
    if (action === 'add_textbook') {
      const title = String(body.title || '').trim();
      if (!title) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập tên giáo trình.' }), { status: 400 });
      }

      const built = buildTextbook({
        title,
        slug: body.slug ? String(body.slug).trim() : undefined,
        courseCode: body.course_code ? String(body.course_code).trim() : undefined,
        credits: body.credits ? String(body.credits).trim() : undefined,
        instructor: body.instructor ? String(body.instructor).trim() : 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG',
        department: body.department ? String(body.department).trim() : 'Khoa Quản trị - Kinh doanh',
        description: body.description ? String(body.description).trim() : undefined,
        chapters: Array.isArray(body.chapters) ? body.chapters : [],
      });

      db.prepare(`
        INSERT OR REPLACE INTO site_pages (route_path, title, category, page_type, html_content, custom_css, custom_js, requires_gate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        built.route_path,
        built.title,
        built.category,
        built.page_type,
        built.html_content,
        built.custom_css,
        built.custom_js,
        null
      );

      // Lưu đĩa mềm vào seed-db.json nếu có
      try {
        const fsModule = await import('node:fs');
        const pathModule = await import('node:path');
        const seedPath = pathModule.resolve(process.cwd(), 'src/data/seed-db.json');
        if (fsModule.existsSync(seedPath)) {
          const rawDb = JSON.parse(fsModule.readFileSync(seedPath, 'utf8'));
          if (Array.isArray(rawDb.site_pages)) {
            const existingIdx = rawDb.site_pages.findIndex((p: any) => p.route_path === built.route_path);
            const pageObj = { ...built, updated_at: new Date().toISOString() };
            if (existingIdx >= 0) {
              rawDb.site_pages[existingIdx] = pageObj;
            } else {
              rawDb.site_pages.push(pageObj);
            }
            fsModule.writeFileSync(seedPath, JSON.stringify(rawDb, null, 2), 'utf8');
          }
        }
      } catch (e) {
        // ignore filesystem in edge runtime
      }

      addAdminAuditLog({
        actor_username: 'admin',
        actor_role: 'super_admin',
        action_type: 'ADD_TEXTBOOK',
        target_module: 'SITE_PAGES',
        details: `Thêm giáo trình mới chuẩn SEO: ${built.title} (${built.route_path})`,
        ip_address: clientAddress || '',
      });

      return new Response(JSON.stringify({
        ok: true,
        message: `Đã xuất bản giáo trình mới "${built.title}" chuẩn SEO thành công!`,
        route_path: built.route_path,
      }), { status: 200 });
    }

    // PHÂN TÍCH VĂN BẢN THÔ GIÁO TRÌNH
    if (action === 'parse_raw_textbook') {
      const rawText = String(body.raw_text || '').trim();
      const defaultTitle = String(body.default_title || 'Giáo trình mới').trim();
      const parsed = parseRawTextbook(rawText, defaultTitle);
      return new Response(JSON.stringify({ ok: true, data: parsed }), { status: 200 });
    }

    // THÊM BÀI VIẾT MỚI CHUẨN SEO
    if (action === 'add_article' || action === 'add_news') {
      const title = String(body.title || '').trim();
      const author = String(body.author || 'ThS. NGUYỄN THỊ TRÚC PHƯƠNG').trim();
      const category = String(body.category || 'Góc chia sẻ').trim();
      const summary = String(body.summary || '').trim();
      const rawContent = String(body.content || body.content_html || '').trim();
      const imageUrl = String(body.image_url || '').trim();
      const imageCaption = String(body.image_caption || '').trim();
      const customSlug = String(body.slug || '').trim();

      if (!title) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập tiêu đề bài viết.' }), { status: 400 });
      }

      const built = buildArticle({
        title,
        slug: customSlug,
        author,
        category,
        summary,
        imageUrl,
        imageCaption,
        content: rawContent,
      });

      const nextId = Date.now();
      db.prepare(`
        INSERT INTO news_articles (slug, title, category, summary, content_html, author)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(built.slug, built.title, built.category, built.summary, built.content_html, built.author);

      // Lưu đĩa mềm vào seed-db.json nếu có
      try {
        const fsModule = await import('node:fs');
        const pathModule = await import('node:path');
        const seedPath = pathModule.resolve(process.cwd(), 'src/data/seed-db.json');
        if (fsModule.existsSync(seedPath)) {
          const rawDb = JSON.parse(fsModule.readFileSync(seedPath, 'utf8'));
          if (Array.isArray(rawDb.news_articles)) {
            rawDb.news_articles.unshift({
              id: nextId,
              ...built,
              published_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
              views: 1,
            });
            fsModule.writeFileSync(seedPath, JSON.stringify(rawDb, null, 2), 'utf8');
          }
        }
      } catch (e) {
        // ignore filesystem in edge runtime
      }

      addAdminAuditLog({
        actor_username: 'admin',
        actor_role: 'super_admin',
        action_type: 'ADD_ARTICLE',
        target_module: 'NEWS_ARTICLES',
        details: `Đăng bài viết mới chuẩn SEO: ${built.title} (Tác giả: ${built.author})`,
        ip_address: clientAddress || '',
      });

      return new Response(JSON.stringify({
        ok: true,
        message: `Đã xuất bản bài viết "${built.title}" chuẩn SEO thành công!`,
        slug: built.slug,
        url: `/goc-chia-se/${built.slug}`,
      }), { status: 200 });
    }

    if (action === 'edit_news') {
      const id = Number(body.id || 0);
      const title = String(body.title || '').trim();
      const category = String(body.category || 'Góc chia sẻ').trim();
      const summary = String(body.summary || '').trim();
      const rawContent = String(body.content_html || '').trim();
      if (!id || !title || !summary) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập đầy đủ tiêu đề và tóm tắt.' }), { status: 400 });
      }
      const formattedHtml = rawContent.startsWith('<') ? rawContent : `<p>${rawContent.replace(/\n/g, '</p><p>')}</p>`;
      db.prepare('UPDATE news_articles SET title = ?, category = ?, summary = ?, content_html = ? WHERE id = ?').run(
        title,
        category,
        summary,
        formattedHtml,
        id
      );
      return new Response(JSON.stringify({ ok: true, message: 'Đã cập nhật bài viết thành công!' }), { status: 200 });
    }

    if (action === 'delete_news') {
      const id = Number(body.id || 0);
      db.prepare('DELETE FROM news_articles WHERE id = ?').run(id);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (action === 'get_page') {
      const routePath = String(body.route_path || '').trim();
      const page = db.prepare('SELECT * FROM site_pages WHERE route_path = ?').get(routePath);
      if (!page) {
        return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang.' }), { status: 404 });
      }
      return new Response(JSON.stringify({ ok: true, page }), { status: 200 });
    }

    if (action === 'update_page') {
      const routePath = String(body.route_path || '').trim();
      const title = String(body.title || '').trim();
      const htmlContent = String(body.html_content ?? '');
      const customCss = String(body.custom_css ?? '');
      const customJs = String(body.custom_js ?? '');

      if (!routePath) {
        return new Response(JSON.stringify({ ok: false, message: 'Thiếu đường dẫn trang.' }), { status: 400 });
      }

      db.prepare(`
        UPDATE site_pages
        SET title = ?, html_content = ?, custom_css = ?, custom_js = ?, updated_at = CURRENT_TIMESTAMP
        WHERE route_path = ?
      `).run(title, htmlContent, customCss, customJs, routePath);

      return new Response(JSON.stringify({ ok: true, message: `Đã cập nhật nội dung trang ${routePath}!` }), { status: 200 });
    }

    if (action === 'get_quiz_target') {
      const targetId = String(body.target_id || '').trim();
      const onlineCfg = getOnlineExamConfig();

      if (targetId.startsWith('online:')) {
        const subKey = targetId.replace(/^online:/, '');
        const sub = onlineCfg.subjects.find((s) => s.key === subKey);
        if (!sub) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy môn thi Online.' }), { status: 404 });
        }
        let linkedCount = 0;
        let activeQuestions = sub.questions || [];
        if (sub.linked_route) {
          const lp = getPageByPath(sub.linked_route);
          if (lp) {
            const linkedQs = extractQuestionBankFromJs(lp.custom_js || '');
            linkedCount = linkedQs.length;
            if ((sub.use_linked_bank !== false || activeQuestions.length < 50) && linkedQs.length > activeQuestions.length) {
              activeQuestions = linkedQs;
            }
          }
        }
        return new Response(
          JSON.stringify({
            ok: true,
            group: 'online',
            target_id: targetId,
            subject: sub,
            questions: activeQuestions,
            linked_count: linkedCount,
            online_config: onlineCfg,
          }),
          { status: 200 }
        );
      }

      if (targetId.startsWith('page:')) {
        const routePath = targetId.replace(/^page:/, '');
        const page = getPageByPath(routePath);
        if (!page) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang đề thi.' }), { status: 404 });
        }
        const questions = extractQuestionBankFromJs(page.custom_js || '');
        const modes = extractModeCardsFromHtml(page.html_content || '');
        return new Response(
          JSON.stringify({
            ok: true,
            group: 'page',
            target_id: targetId,
            route_path: page.route_path,
            title: page.title,
            questions,
            modes,
          }),
          { status: 200 }
        );
      }

      return new Response(JSON.stringify({ ok: false, message: 'Target không hợp lệ.' }), { status: 400 });
    }

    if (action === 'save_quiz_questions') {
      const targetId = String(body.target_id || '').trim();
      const rawQuestions = Array.isArray(body.questions) ? body.questions : [];
      const sanitized: QuizQuestionItem[] = rawQuestions
        .map((q: any) => ({
          question: String(q.question || '').trim(),
          answers: Array.isArray(q.answers)
            ? q.answers.slice(0, 4).map((a: any) => String(a ?? '').trim())
            : ['', '', '', ''],
          correct: Math.max(0, Math.min(3, Number(q.correct) || 0)),
          chapter: Number(q.chapter) > 0 ? Number(q.chapter) : 1,
          difficulty: String(q.difficulty || 'Trung bình').trim(),
          explanation: String(q.explanation || '').trim(),
        }))
        .filter((q: QuizQuestionItem) => q.question.length > 0);

      if (targetId.startsWith('online:')) {
        const subKey = targetId.replace(/^online:/, '');
        const cfg = getOnlineExamConfig();
        const sub = cfg.subjects.find((s) => s.key === subKey);
        if (!sub) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy môn thi Online.' }), { status: 404 });
        }
        sub.questions = sanitized;
        if (body.use_linked_bank !== undefined) {
          sub.use_linked_bank = Boolean(body.use_linked_bank);
        }
        saveOnlineExamConfig(cfg);
        return new Response(
          JSON.stringify({
            ok: true,
            count: sanitized.length,
            message: `Đã lưu ${sanitized.length} câu hỏi cho môn "${sub.label}" trên Cổng Thi Online!`,
          }),
          { status: 200 }
        );
      }

      if (targetId.startsWith('page:')) {
        const routePath = targetId.replace(/^page:/, '');
        const ok = updateSitePageQuizData(routePath, sanitized, undefined);
        if (!ok) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang học phần.' }), { status: 404 });
        }
        return new Response(
          JSON.stringify({
            ok: true,
            count: sanitized.length,
            message: `Đã cập nhật ${sanitized.length} câu hỏi vào trang ${routePath} (Cloudflare D1)!`,
          }),
          { status: 200 }
        );
      }

      return new Response(JSON.stringify({ ok: false, message: 'Target không hợp lệ.' }), { status: 400 });
    }

    if (action === 'bulk_import_quiz_questions') {
      const targetId = String(body.target_id || '').trim();
      const rawText = String(body.raw_text || '').trim();
      const replaceAll = Boolean(body.replace_all);
      const defaultChapter = Number(body.default_chapter) > 0 ? Number(body.default_chapter) : 0;

      if (!rawText) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng chọn file Excel hoặc dán danh sách câu hỏi.' }), {
          status: 400,
        });
      }

      const parsed = parseBulkQuestionsText(rawText);
      if (parsed.length === 0) {
        return new Response(
          JSON.stringify({
            ok: false,
            message:
              'Không đọc được câu hỏi hợp lệ. Đảm bảo mỗi dòng có tối thiểu 5 cột: Câu hỏi | Đáp án A | Đáp án B | Đáp án C | Đáp án D | Đáp án đúng (A/B/C/D) | Chương.',
          }),
          { status: 400 }
        );
      }

      if (defaultChapter > 0) {
        parsed.forEach((q) => {
          q.chapter = defaultChapter;
        });
      }

      if (targetId.startsWith('online:')) {
        const subKey = targetId.replace(/^online:/, '');
        const cfg = getOnlineExamConfig();
        const sub = cfg.subjects.find((s) => s.key === subKey);
        if (!sub) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy môn thi.' }), { status: 404 });
        }
        sub.questions = replaceAll ? parsed : [...(sub.questions || []), ...parsed];
        saveOnlineExamConfig(cfg);
        return new Response(
          JSON.stringify({
            ok: true,
            imported: parsed.length,
            total: sub.questions.length,
            message: `Đã import thành công ${parsed.length} câu hỏi! Tổng số câu hiện tại: ${sub.questions.length} câu.`,
          }),
          { status: 200 }
        );
      }

      if (targetId.startsWith('page:')) {
        const routePath = targetId.replace(/^page:/, '');
        const page = getPageByPath(routePath);
        if (!page) {
          return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang học phần.' }), { status: 404 });
        }
        const existing = extractQuestionBankFromJs(page.custom_js || '');
        const merged = replaceAll ? parsed : [...existing, ...parsed];
        updateSitePageQuizData(routePath, merged, undefined);
        return new Response(
          JSON.stringify({
            ok: true,
            imported: parsed.length,
            total: merged.length,
            message: `Đã import thành công ${parsed.length} câu hỏi! Tổng số câu hiện tại: ${merged.length} câu.`,
          }),
          { status: 200 }
        );
      }
    }

    if (action === 'sync_online_from_linked') {
      const subKey = String(body.subject_key || '').trim();
      const cfg = getOnlineExamConfig();
      const sub = cfg.subjects.find((s) => s.key === subKey);
      if (!sub || !sub.linked_route) {
        return new Response(JSON.stringify({ ok: false, message: 'Môn học này không có kho câu hỏi học phần liên kết.' }), {
          status: 400,
        });
      }
      const lp = getPageByPath(sub.linked_route);
      if (!lp) {
        return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang học phần liên kết.' }), { status: 404 });
      }
      const linkedQs = extractQuestionBankFromJs(lp.custom_js || '');
      if (linkedQs.length === 0) {
        return new Response(JSON.stringify({ ok: false, message: 'Kho học phần liên kết chưa có câu hỏi.' }), { status: 400 });
      }
      sub.questions = linkedQs;
      saveOnlineExamConfig(cfg);
      return new Response(
        JSON.stringify({
          ok: true,
          count: linkedQs.length,
          message: `Đã đồng bộ toàn bộ ${linkedQs.length} câu hỏi từ trang "${sub.linked_route}" sang môn "${sub.label}"!`,
        }),
        { status: 200 }
      );
    }

    if (action === 'save_quiz_modes') {
      const routePath = String(body.route_path || '').trim();
      const rawModes = Array.isArray(body.modes) ? body.modes : [];
      const modes: QuizModeCard[] = rawModes.map((m: any, idx: number) => ({
        index: typeof m.index === 'number' ? m.index : idx,
        value: String(m.value ?? idx),
        title: String(m.title ?? '').trim(),
        desc: String(m.desc ?? '').trim(),
        badge: String(m.badge ?? '').trim(),
      }));

      const ok = updateSitePageQuizData(routePath, undefined, modes);
      if (!ok) {
        return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy trang cần cập nhật.' }), { status: 404 });
      }
      return new Response(
        JSON.stringify({
          ok: true,
          message: `Đã lưu cấu hình các ô "Chọn hình thức làm bài (Đề thi thử / Chương 1–6)" cho trang ${routePath}!`,
        }),
        { status: 200 }
      );
    }

    if (action === 'save_online_exam_config') {
      const cfg = getOnlineExamConfig();
      if (typeof body.header_badge === 'string' && body.header_badge.trim()) {
        cfg.header_badge = body.header_badge.trim();
      }
      if (typeof body.header_title === 'string' && body.header_title.trim()) {
        cfg.header_title = body.header_title.trim();
      }
      if (typeof body.header_subtitle === 'string' && body.header_subtitle.trim()) {
        cfg.header_subtitle = body.header_subtitle.trim();
      }
      if (typeof body.step1_title === 'string' && body.step1_title.trim()) {
        cfg.step1_title = body.step1_title.trim();
      }
      if (body.show_detailed_answers !== undefined) {
        cfg.show_detailed_answers = Boolean(body.show_detailed_answers);
      }
      if (Array.isArray(body.modes) && body.modes.length > 0) {
        cfg.modes = body.modes
          .map((m: any) => ({
            count: Math.max(1, Number(m.count) || 10),
            minutes: Math.max(1, Number(m.minutes) || 15),
            label: String(m.label || '').trim(),
          }))
          .filter((m: any) => m.label.length > 0);
      }
      if (Array.isArray(body.subjects_meta)) {
        for (const sm of body.subjects_meta) {
          const target = cfg.subjects.find((s) => s.key === sm.key);
          if (target) {
            if (typeof sm.label === 'string' && sm.label.trim()) target.label = sm.label.trim();
            if (sm.enabled !== undefined) target.enabled = Boolean(sm.enabled);
            if (sm.use_linked_bank !== undefined) target.use_linked_bank = Boolean(sm.use_linked_bank);
          }
        }
      }
      saveOnlineExamConfig(cfg);
      return new Response(
        JSON.stringify({
          ok: true,
          message: 'Đã lưu cấu hình Cổng Thi Online (/ngan-hang-de-thi) lên Cloudflare D1!',
        }),
        { status: 200 }
      );
    }

    if (action === 'add_online_exam_subject') {
      const rawLabel = String(body.label || '').trim();
      if (!rawLabel) {
        return new Response(JSON.stringify({ ok: false, error: 'Vui lòng nhập tên môn thi trắc nghiệm!' }), { status: 400 });
      }
      let key = String(body.key || '').trim().toLowerCase();
      if (!key) {
        key = rawLabel
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/gi, 'd')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      const linkedRoute = String(body.linked_route || '').trim();
      const useLinked = Boolean(body.use_linked_bank ?? (linkedRoute ? true : false));
      let questions: QuizQuestionItem[] = [];
      if (typeof body.questions_raw === 'string' && body.questions_raw.trim()) {
        questions = parseBulkQuestionsText(body.questions_raw);
      } else if (Array.isArray(body.questions)) {
        questions = body.questions;
      }

      addOnlineExamSubject({
        key,
        label: rawLabel,
        linked_route: linkedRoute || undefined,
        use_linked_bank: useLinked,
        enabled: body.enabled !== false,
        questions,
      });

      logAdminAudit(adminUser, 'add_online_exam_subject', 'quiz_bank', `Thêm môn thi online mới: ${rawLabel} (${key}) - ${questions.length} câu hỏi`, clientIp);

      return new Response(
        JSON.stringify({
          ok: true,
          message: `Đã thêm thành công môn thi "${rawLabel}" vào Ngân hàng Đề thi Online!`,
          subject: { key, label: rawLabel, questionCount: questions.length },
        }),
        { status: 200 }
      );
    }

    if (action === 'delete_online_exam_subject') {
      const key = String(body.key || '').trim();
      if (!key) {
        return new Response(JSON.stringify({ ok: false, error: 'Thiếu mã môn thi cần xóa!' }), { status: 400 });
      }
      deleteOnlineExamSubject(key);
      logAdminAudit(adminUser, 'delete_online_exam_subject', 'quiz_bank', `Xóa môn thi online: ${key}`, clientIp);
      return new Response(
        JSON.stringify({ ok: true, message: 'Đã xóa môn thi khỏi Ngân hàng Đề thi Online!' }),
        { status: 200 }
      );
    }

    if (action === 'save_site_contact_config') {
      const currentCfg = getSiteContactConfig();
      const updated = saveSiteContactConfig({
        instructor_name: String(body.instructor_name ?? currentCfg.instructor_name).trim(),
        department: String(body.department ?? currentCfg.department).trim(),
        email: String(body.email ?? currentCfg.email).trim(),
        hotline: String(body.hotline ?? currentCfg.hotline).trim(),
        zalo_url: String(body.zalo_url ?? currentCfg.zalo_url).trim(),
        address: String(body.address ?? currentCfg.address).trim(),
        youtube_url: String(body.youtube_url ?? body.youtube_channel_url ?? currentCfg.youtube_url).trim(),
        tiktok_url: String(body.tiktok_url ?? body.tiktok_channel_url ?? currentCfg.tiktok_url).trim(),
        office_hours: String(body.office_hours ?? currentCfg.office_hours).trim(),
      });
      return new Response(
        JSON.stringify({
          ok: true,
          config: updated,
          message: 'Đã lưu cấu hình Thông tin Liên hệ (Email, Hotline, Zalo, Địa chỉ, YouTube, TikTok) lên Cloudflare D1!',
        }),
        { status: 200 }
      );
    }

    if (action === 'save_youtube_videos') {
      return new Response(
        JSON.stringify({
          ok: true,
          message: 'Chức năng Video Bài Giảng đã được tinh gọn và gỡ bỏ theo thiết kế mới.',
        }),
        { status: 200 }
      );
    }

    if (action === 'save_evaluation_criteria') {
      const rawCrit = Array.isArray(body.criteria) ? body.criteria : [];
      saveEvaluationCriteria(rawCrit);
      const saved = getEvaluationCriteria();
      return new Response(
        JSON.stringify({
          ok: true,
          criteria: saved,
          message: `Đã lưu cấu hình ${saved.length} tiêu chí đánh giá giảng viên lên Cloudflare D1!`,
        }),
        { status: 200 }
      );
    }

    if (action === 'reset_evaluation_criteria') {
      const def = resetEvaluationCriteria();
      return new Response(
        JSON.stringify({
          ok: true,
          criteria: def,
          message: 'Đã khôi phục 12 tiêu chí đánh giá giảng viên mặc định!',
        }),
        { status: 200 }
      );
    }

    if (action === 'delete_evaluation') {
      const id = Number(body.id || 0);
      deleteEvaluation(id);
      return new Response(JSON.stringify({ ok: true, message: `Đã xóa phiếu đánh giá #${id}!` }), { status: 200 });
    }

    if (action === 'clear_all_evaluations') {
      clearAllEvaluations();
      return new Response(
        JSON.stringify({ ok: true, message: 'Đã xóa toàn bộ dữ liệu đánh giá giảng viên!' }),
        { status: 200 }
      );
    }

    if (action === 'delete_survey') {
      const id = Number(body.id || 0);
      deleteSurvey(id);
      return new Response(JSON.stringify({ ok: true, message: `Đã xóa bản ghi #${id}!` }), { status: 200 });
    }

    if (action === 'clear_all_surveys') {
      clearAllSurveys();
      return new Response(
        JSON.stringify({ ok: true, message: 'Đã xóa toàn bộ dữ liệu khảo sát & góp ý!' }),
        { status: 200 }
      );
    }

    
    if (action === 'save_teaching_schedule') {
      const schedule = Array.isArray(body.schedule) ? body.schedule : [];
      saveTeachingSchedule(schedule);
      return new Response(
        JSON.stringify({
          ok: true,
          schedule: getTeachingSchedule(),
          message: 'Đã lưu lịch giảng dạy thành công lên Cloudflare D1!',
        }),
        { status: 200 }
      );
    }

    if (action === 'upsert_schedule_item') {
      const item = body.item || {};
      const list = getTeachingSchedule();
      const id = String(item.id || `sched-${Date.now()}`);
      const index = list.findIndex(x => x.id === id);
      const cleanItem: TeachingScheduleItem = {
        id,
        day_of_week: String(item.day_of_week || 'Thứ 2').trim(),
        session: String(item.session || 'Sáng').trim(),
        periods: String(item.periods || '').trim(),
        subject: String(item.subject || '').trim(),
        class_code: String(item.class_code || '').trim(),
        room: String(item.room || '').trim(),
        group_url: String(item.group_url || '').trim(),
        notes: String(item.notes || '').trim(),
        is_active: item.is_active !== false,
        order: Number(item.order || (index >= 0 ? list[index].order : list.length + 1)),
      };
      if (index >= 0) {
        list[index] = cleanItem;
      } else {
        list.push(cleanItem);
      }
      saveTeachingSchedule(list);
      return new Response(
        JSON.stringify({
          ok: true,
          item: cleanItem,
          schedule: list,
          message: 'Đã lưu thông tin lớp học vào lịch giảng dạy!',
        }),
        { status: 200 }
      );
    }

    if (action === 'delete_schedule_item') {
      const id = String(body.id || '');
      const list = getTeachingSchedule().filter(x => x.id !== id);
      saveTeachingSchedule(list);
      return new Response(
        JSON.stringify({
          ok: true,
          schedule: list,
          message: 'Đã xóa lớp học khỏi lịch giảng dạy!',
        }),
        { status: 200 }
      );
    }

    if (action === 'reset_teaching_schedule') {
      const def = resetTeachingSchedule();
      return new Response(
        JSON.stringify({
          ok: true,
          schedule: def,
          message: 'Đã khôi phục danh sách lịch giảng dạy mẫu ban đầu!',
        }),
        { status: 200 }
      );
    }

    // =========================================================================
    // MODULE 10: QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN ADMIN (CHỈ SUPER_ADMIN)
    // =========================================================================
    if (action === 'get_admin_accounts') {
      const accounts = getAdminAccounts().map((a) => ({
        id: a.id,
        username: a.username,
        display_name: a.display_name,
        email: a.email,
        role: a.role,
        permissions: JSON.parse(a.permissions_json || '[]'),
        is_active: a.is_active,
        last_login_at: a.last_login_at,
        created_at: a.created_at,
      }));
      return new Response(JSON.stringify({ ok: true, accounts }), { status: 200 });
    }

    if (action === 'upsert_admin_account') {
      const authErr = requireRole(['super_admin']);
      if (authErr) return authErr;

      const username = String(body.username || '').trim().toLowerCase();
      const displayName = String(body.display_name || '').trim();
      const email = String(body.email || '').trim();
      const password = String(body.password || '').trim();
      const role = String(body.role || 'editor') as 'super_admin' | 'editor' | 'viewer';
      const permissions = Array.isArray(body.permissions) ? body.permissions : ['all'];
      const isActive = body.is_active !== undefined ? (body.is_active ? 1 : 0) : 1;
      const accountId = body.id ? Number(body.id) : undefined;

      if (!username || !displayName) {
        return new Response(JSON.stringify({ ok: false, message: 'Tên đăng nhập và tên hiển thị không được để trống.' }), { status: 400 });
      }

      if (!accountId && !password) {
        return new Response(JSON.stringify({ ok: false, message: 'Vui lòng đặt mật khẩu cho tài khoản mới.' }), { status: 400 });
      }

      let passwordHash: string | undefined = undefined;
      if (password) {
        passwordHash = hashPassword(password, `salt-${username}-${Date.now().toString(36)}`);
      }

      const saved = upsertAdminAccount({
        id: accountId,
        username,
        display_name: displayName,
        email,
        password_hash: passwordHash,
        role,
        permissions_json: JSON.stringify(permissions),
        is_active: isActive,
      });

      addAdminAuditLog({
        actor_username: currentActor,
        actor_role: currentRole,
        action_type: accountId ? 'UPDATE_ACCOUNT' : 'CREATE_ACCOUNT',
        target_module: 'ADMIN_ACCOUNTS',
        details: `${accountId ? 'Cập nhật' : 'Tạo mới'} tài khoản ${username} (${displayName}) với vai trò ${role}`,
        ip_address: clientAddress || '',
      });

      return new Response(JSON.stringify({
        ok: true,
        account: {
          id: saved.id,
          username: saved.username,
          display_name: saved.display_name,
          role: saved.role,
        },
        message: `Đã ${accountId ? 'cập nhật' : 'tạo mới'} tài khoản admin "${username}" thành công!`,
      }), { status: 200 });
    }

    if (action === 'delete_admin_account') {
      const authErr = requireRole(['super_admin']);
      if (authErr) return authErr;

      const id = Number(body.id || 0);
      if (id === 1) {
        return new Response(JSON.stringify({ ok: false, message: 'Không thể xóa tài khoản Quản trị viên tối cao (Root Admin)!' }), { status: 400 });
      }

      const ok = deleteAdminAccount(id);
      if (ok) {
        addAdminAuditLog({
          actor_username: currentActor,
          actor_role: currentRole,
          action_type: 'DELETE_ACCOUNT',
          target_module: 'ADMIN_ACCOUNTS',
          details: `Xóa tài khoản admin ID #${id}`,
          ip_address: clientAddress || '',
        });
        return new Response(JSON.stringify({ ok: true, message: `Đã xóa tài khoản ID #${id}!` }), { status: 200 });
      }
      return new Response(JSON.stringify({ ok: false, message: 'Không tìm thấy tài khoản để xóa.' }), { status: 404 });
    }

    // =========================================================================
    // MODULE 11: NHẬT KÝ HỆ THỐNG (AUDIT LOGS)
    // =========================================================================
    if (action === 'get_audit_logs') {
      const logs = getAdminAuditLogs(500);
      return new Response(JSON.stringify({ ok: true, logs }), { status: 200 });
    }

    if (action === 'clear_audit_logs') {
      const authErr = requireRole(['super_admin']);
      if (authErr) return authErr;

      clearAdminAuditLogs();
      addAdminAuditLog({
        actor_username: currentActor,
        actor_role: currentRole,
        action_type: 'CLEAR_LOGS',
        target_module: 'AUDIT_LOGS',
        details: 'Đã dọn dẹp toàn bộ nhật ký hệ thống',
        ip_address: clientAddress || '',
      });
      return new Response(JSON.stringify({ ok: true, message: 'Đã làm sạch nhật ký hệ thống!' }), { status: 200 });
    }

    return new Response(JSON.stringify({ ok: false, message: 'Action không hợp lệ.' }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, message: String(err) }), { status: 500 });
  }
};
