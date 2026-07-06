import { NextRequest, NextResponse } from "next/server";
import { comparePassword, signAdminToken, ADMIN_COOKIE_NAME } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

// There's only ever one admin (you), so credentials live in env vars
// instead of a database table — one less thing to seed or manage.
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return NextResponse.json(
      { error: "Admin credentials are not configured on the server." },
      { status: 500 }
    );
  }

  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await comparePassword(password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    // Same error for both cases — don't reveal which part was wrong.
    return NextResponse.json({ error: "Incorrect email or password" }, { status: 401 });
  }

  const token = signAdminToken(email);
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true, // JavaScript in the browser can't read this — blocks XSS token theft
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches the JWT's own expiry
  });

  return response;
}
