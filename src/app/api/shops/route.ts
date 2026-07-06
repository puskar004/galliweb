import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shopSchema } from "@/lib/validations";
import { generateUniqueSlug } from "@/lib/slugify";
import { getAdminSession } from "@/lib/auth";

// GET /api/shops — list every shop, newest first. Used by the admin dashboard.
// (Middleware already blocks non-admins from reaching /admin pages that call
// this, but we re-check here too since API routes can be hit directly.)
export async function GET() {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shops = await prisma.shop.findMany({
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  return NextResponse.json({ shops });
}

// POST /api/shops — create a new shop. This is what turns a shop's
// name + details into a live page at /site/[slug].
export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = shopSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const slug = await generateUniqueSlug(parsed.data.name);

  const shop = await prisma.shop.create({
    data: { ...parsed.data, slug },
  });

  return NextResponse.json({ shop }, { status: 201 });
}
