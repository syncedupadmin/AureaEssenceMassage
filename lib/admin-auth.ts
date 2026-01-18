import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { verifyAdminPassword } from './settings';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get the JWT secret from environment variable
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

/**
 * Verify password - checks KV first, then env var
 */
export async function verifyPassword(password: string): Promise<boolean> {
  return await verifyAdminPassword(password);
}

/**
 * Create a new session token
 */
export async function createSession(): Promise<string> {
  const secret = getJwtSecret();
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

/**
 * Verify a session token
 */
export async function verifySession(token: string): Promise<boolean> {
  try {
    const secret = getJwtSecret();
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get session from cookies and verify it
 */
export async function getSessionFromCookies(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return false;
    }

    return await verifySession(token);
  } catch {
    return false;
  }
}

/**
 * Check if request is authenticated (for API routes)
 */
export async function isAuthenticated(): Promise<boolean> {
  return await getSessionFromCookies();
}
