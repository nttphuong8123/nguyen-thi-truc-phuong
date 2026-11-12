import type { APIRoute } from 'astro';
import { getAdminAccountByUsername, updateAdminLastLogin, addAdminAuditLog, checkGatePasscode } from '../../../../lib/db';
import { verifyPassword, signAdminToken } from '../../../../lib/admin-auth';

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  try {
    const body = (await request.json()) as any;
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '').trim();

    if (!username || !password) {
      return new Response(JSON.stringify({ ok: false, message: 'Vui lòng nhập tài khoản và mật khẩu.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const account = getAdminAccountByUsername(username);
    if (!account) {
      return new Response(JSON.stringify({ ok: false, message: 'Tài khoản không tồn tại trên hệ thống.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!account.is_active) {
      return new Response(JSON.stringify({ ok: false, message: 'Tài khoản này đang bị khóa. Vui lòng liên hệ Super Admin.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let isValid = verifyPassword(password, account.password_hash);
    if (!isValid) {
      isValid = checkGatePasscode('admin', password);
    }
    if (!isValid) {
      return new Response(JSON.stringify({ ok: false, message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse permissions
    let permissions: string[] = ['all'];
    try {
      permissions = JSON.parse(account.permissions_json || '["all"]');
    } catch {}

    const sessionPayload = {
      userId: account.id,
      username: account.username,
      role: account.role,
      permissions,
      displayName: account.display_name,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    };

    const token = signAdminToken(sessionPayload);

    // Set secure HTTP-only cookie
    cookies.set('tkd_admin_session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Also set gate token for backwards compatibility with any legacy endpoint
    cookies.set('tkd_gate_admin', `admin.${token.split('.')[1]}`, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Update last login & audit log
    updateAdminLastLogin(account.username);
    addAdminAuditLog({
      actor_username: account.username,
      actor_role: account.role,
      action_type: 'LOGIN_SUCCESS',
      target_module: 'AUTH',
      details: `Đăng nhập thành công với vai trò ${account.role} (${account.display_name})`,
      ip_address: clientAddress || '',
    });

    return new Response(JSON.stringify({
      ok: true,
      user: {
        username: account.username,
        display_name: account.display_name,
        role: account.role,
        permissions,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, message: 'Lỗi máy chủ: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
