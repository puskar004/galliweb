import slugify from "slugify";
import { prisma } from "./prisma";

/**
 * Converts a shop name like "Sharma General Store" into a URL slug like
 * "sharma-general-store". If that slug is already taken, appends -2, -3,
 * etc. until it finds a free one — so two shops can share a name.
 */
export async function generateUniqueSlug(name: string): Promise<string> {
  const base = slugify(name, { lower: true, strict: true });
  let candidate = base;
  let suffix = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.shop.findUnique({ where: { slug: candidate } });
    if (!existing) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}
