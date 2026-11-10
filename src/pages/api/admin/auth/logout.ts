import type { APIRoute } from 'astro';
import { addAdminAuditLog } from '../../../../lib/db';
import { verifyAdminToken } from '../../../../lib/admin-auth';

export const POST: APIRoute = async ({ cookies, clientAddress }) => {
  try {
    const sessionToken = cookies.get('tkd_admin_session')?.value;
    const session = verifyAdminToken(sessionToken);

    if (session) {
      addAdminAuditLog({
        actor_username: session.username,
        actor_role: session.role,
        action_type: 'LOGOUT',
        target_module: 'AUTH',
        details: 'Đăng xuất khỏi phiên làm việc quản trị',
        ip_address: clientAddress || '',
      });
    }

    cookies.delete('tkd_admin_session', { path: '/' });
    cookies.delete('tkd_gate_admin', { path: '/' });

    return new Response(JSON.stringify({ ok: true, message: 'Đã đăng xuất thành công!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
