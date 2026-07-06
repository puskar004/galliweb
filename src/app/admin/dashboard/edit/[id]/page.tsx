import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShopForm } from "@/components/admin/ShopForm";
import { PhotoUploader } from "@/components/admin/PhotoUploader";

export default async function EditShopPage({ params }: { params: { id: string } }) {
  const shop = await prisma.shop.findUnique({
    where: { id: params.id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!shop) notFound();

  return (
    <main className="min-h-screen bg-[#F7F6F2] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin/dashboard" className="mb-6 inline-block text-sm text-slate hover:underline">
          ← Back to shops
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">{shop.name}</h1>
            <p className="text-sm text-slate">/site/{shop.slug}</p>
          </div>
          <a
            href={`/site/${shop.slug}`}
            target="_blank"
            className="rounded-full border border-charcoal/20 px-4 py-2 text-sm font-semibold hover:bg-charcoal/5"
          >
            View live site ↗
          </a>
        </div>

        <section className="mb-8 rounded-2xl border border-charcoal/10 bg-white p-7">
          <h2 className="mb-5 font-display text-lg font-semibold">Photos</h2>
          <PhotoUploader
            shopId={shop.id}
            initialPhotos={shop.photos.map((p: (typeof shop.photos)[number]) => ({
              id: p.id,
              url: p.url,
            }))}
          />
        </section>

        <section className="rounded-2xl border border-charcoal/10 bg-white p-7">
          <h2 className="mb-5 font-display text-lg font-semibold">Details</h2>
          <ShopForm
            shopId={shop.id}
            initialValues={{
              name: shop.name,
              category: shop.category,
              templateType: shop.templateType,
              tagline: shop.tagline,
              description: shop.description,
              phone: shop.phone,
              whatsapp: shop.whatsapp ?? "",
              address: shop.address,
              mapEmbedUrl: shop.mapEmbedUrl ?? "",
            }}
          />
        </section>
      </div>
    </main>
  );
}
