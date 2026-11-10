import { createHash } from 'node:crypto';

export function sha256Hex(ascii: string): string {
  return createHash('sha256').update(ascii, 'utf8').digest('hex');
}

export function hashPassword(password: string, salt: string = 'tkd-copy-salt-01'): string {
  const hash = sha256Hex(`${salt}:${password}`);
  return `sha256$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.startsWith('sha256$')) return false;
  const parts = storedHash.split('$');
  if (parts.length !== 3) return false;
  const salt = parts[1];
  const expectedHash = parts[2];
  const computed = sha256Hex(`${salt}:${password}`);
  return computed === expectedHash;
}

export interface AdminSessionPayload {
  userId: number;
  username: string;
  role: 'super_admin' | 'editor' | 'viewer';
  permissions: string[];
  displayName: string;
  exp: number; // Unix timestamp ms
}

const ADMIN_JWT_SECRET = 'tkd-copy-admin-jwt-secret-2026';

export function signAdminToken(payload: AdminSessionPayload): string {
  const data = JSON.stringify(payload);
  const base64Data = Buffer.from(data, 'utf8').toString('base64url');
  const sig = sha256Hex(`${base64Data}:${ADMIN_JWT_SECRET}`);
  return `${base64Data}.${sig}`;
}

export function verifyAdminToken(token: string | undefined): AdminSessionPayload | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [base64Data, sig] = parts;
    const expectedSig = sha256Hex(`${base64Data}:${ADMIN_JWT_SECRET}`);
    if (sig !== expectedSig) return null;

    const jsonStr = Buffer.from(base64Data, 'base64url').toString('utf8');
    const payload = JSON.parse(jsonStr) as AdminSessionPayload;

    if (!payload || !payload.exp || Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
}
