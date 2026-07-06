import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shopSchema } from "@/lib/validations";
import { getAdminSession } from "@/lib/auth";
import { deleteImage } from "@/lib/cloudinary";

type Params = { params: { id: string } };

export async function GET(_request: NextRequest, { params }: Params) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await prisma.shop.findUnique({
    where: { id: params.id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  return NextResponse.json({ shop });
}

// PATCH — edit shop details. Note: this only updates text fields;
// photos are added/removed via /api/upload and its DELETE counterpart.
export async function PATCH(request: NextRequest, { params }: Params) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  // Partial because an edit form might only send changed fields.
  const parsed = shopSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const shop = await prisma.shop.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json({ shop });
}

// DELETE — removes the shop, its DB rows (photos cascade automatically),
// and cleans up its images on Cloudinary so they don't sit there forever.
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const shop = await prisma.shop.findUnique({
    where: { id: params.id },
    include: { photos: true },
  });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  await Promise.all(
    shop.photos.map((photo: (typeof shop.photos)[number]) => deleteImage(photo.publicId))
  );
  await prisma.shop.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
