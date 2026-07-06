import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ShopTemplate } from "@/components/templates/ShopTemplate";

type Props = { params: { slug: string } };

// Generates the browser tab title / meta description per shop, so each
// generated site looks legitimate when shared or found via search.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shop = await prisma.shop.findUnique({ where: { slug: params.slug } });
  if (!shop) return {};
  return {
    title: `${shop.name} — ${shop.category}`,
    description: shop.tagline,
  };
}

export default async function ShopSitePage({ params }: Props) {
  const shop = await prisma.shop.findUnique({
    where: { slug: params.slug },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  // Unpublished or non-existent shops both 404 — visitors shouldn't be
  // able to tell the difference between "never existed" and "hidden".
  if (!shop || !shop.published) notFound();

  return <ShopTemplate shop={shop} />;
}
