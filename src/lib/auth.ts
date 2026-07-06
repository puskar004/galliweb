import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = "galliweb_admin_token";
const TOKEN_TTL = "7d";

if (!JWT_SECRET) {
  // Fail loudly at startup rather than silently signing tokens with "undefined".
  throw new Error("JWT_SECRET is not set. Add it to your .env file.");
}

/** Hash a plain-text password for storage (used by scripts/hash-password.js). */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

/** Compare a plain-text password against a stored bcrypt hash. */
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Sign a JWT for the admin session. Payload is intentionally minimal. */
export function signAdminToken(email: string): string {
  return jwt.sign({ role: "admin", email }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

/** Verify a JWT string. Returns the decoded payload, or null if invalid/expired. */
export function verifyAdminToken(token: string): { role: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { role: string; email: string };
  } catch {
    return null;
  }
}

/**
 * Reads the admin session cookie in a Server Component or Route Handler
 * and returns the decoded token, or null if the visitor isn't logged in.
 * (Middleware does the actual route *blocking* — this is for pages/routes
 * that additionally need to know *who* is logged in.)
 */
export function getAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
