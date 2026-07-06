import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Everything under /admin is private except the login page itself.
// Clients only ever receive links like /site/their-shop — they never
// see or need this section.
//
// NOTE: Next.js middleware runs on the Edge runtime, which can't use the
// Node-only `jsonwebtoken` package (used elsewhere in src/lib/auth.ts).
// So this file verifies the token itself using `jose`, which is Edge-safe.
const COOKIE_NAME = "galliweb_admin_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminRoute || isLoginPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Token missing, expired, or tampered with.
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
