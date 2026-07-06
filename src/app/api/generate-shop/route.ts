import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { generateShopSchema } from "@/lib/validations";
import { generateShopDraft } from "@/lib/ai";

// POST /api/generate-shop — admin describes a shop in plain English,
// this returns draft field values to pre-fill the "New shop" form.
// Nothing is saved to the database here; the admin still reviews and
// submits the form themselves (and adds photos afterward).
export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = generateShopSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  try {
    const draft = await generateShopDraft(parsed.data.prompt);
    return NextResponse.json({ draft });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate shop details";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
