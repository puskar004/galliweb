import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadSchema } from "@/lib/validations";
import { getAdminSession } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

// POST /api/upload — attach a new photo to a shop.
// Body: { shopId, fileDataUrl } where fileDataUrl is a base64 "data:image/..." string
// (the browser reads the file with FileReader before sending it here).
export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = uploadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { shopId, fileDataUrl } = parsed.data;

  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });

  const { url, publicId } = await uploadImage(fileDataUrl);

  const currentPhotoCount = await prisma.photo.count({ where: { shopId } });

  const photo = await prisma.photo.create({
    data: { shopId, url, publicId, order: currentPhotoCount },
  });

  return NextResponse.json({ photo }, { status: 201 });
}

// DELETE /api/upload?photoId=xyz — remove a single photo from a shop.
export async function DELETE(request: NextRequest) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const photoId = request.nextUrl.searchParams.get("photoId");
  if (!photoId) return NextResponse.json({ error: "photoId is required" }, { status: 400 });

  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) return NextResponse.json({ error: "Photo not found" }, { status: 404 });

  await deleteImage(photo.publicId);
  await prisma.photo.delete({ where: { id: photoId } });

  return NextResponse.json({ success: true });
}
