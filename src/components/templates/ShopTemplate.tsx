import Image from "next/image";
import { Gallery } from "./Gallery";

type ShopData = {
  name: string;
  category: string;
  templateType: "RETAIL" | "RESTAURANT" | "BOUTIQUE";
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string | null;
  address: string;
  mapEmbedUrl: string | null;
  photos: { id: string; url: string }[];
};

// Each template type gets its own accent color, so a restaurant doesn't
// look identical to a boutique even though they share one component.
const accentByTemplate: Record<ShopData["templateType"], string> = {
  RETAIL: "#F5A623", // marigold
  RESTAURANT: "#1B998B", // teal
  BOUTIQUE: "#5b6fd6", // indigo
};

export function ShopTemplate({ shop }: { shop: ShopData }) {
  const accent = accentByTemplate[shop.templateType];
  const coverPhoto = shop.photos[0];
  const galleryPhotos = shop.photos.slice(1);
  const waNumber = shop.whatsapp?.replace(/[^0-9]/g, "");

  return (
    <main className="bg-paper text-charcoal">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 border-b border-charcoal/8 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="font-display text-lg font-bold tracking-tight">{shop.name}</div>
          <div className="flex gap-2.5">
            <a
              href={`tel:${shop.phone}`}
              className="rounded-full border border-charcoal/15 px-4 py-2 text-xs font-semibold hover:bg-charcoal/5 sm:text-sm"
            >
              Call
            </a>
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                className="rounded-full px-4 py-2 text-xs font-semibold text-white sm:text-sm"
                style={{ backgroundColor: accent }}
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[340px] w-full sm:h-[420px]">
          {coverPhoto ? (
            <Image src={coverPhoto.url} alt={shop.name} fill className="object-cover" priority />
          ) : (
            <div className="h-full w-full" style={{ background: accent }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="-mt-20 rounded-3xl bg-paper p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] sm:p-9">
            <span
              className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {shop.category}
            </span>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {shop.name}
            </h1>
            <p className="mt-2 max-w-xl text-[15px] text-slate sm:text-base">{shop.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${shop.phone}`}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                Call {shop.phone}
              </a>
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  className="rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-semibold hover:bg-charcoal/5"
                >
                  Message on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-slate">
              About
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Why visit {shop.name}
            </h2>
          </div>
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-charcoal/80">
            {shop.description}
          </p>
        </div>
      </section>

      {/* Gallery */}
      {galleryPhotos.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-6">
          <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-slate">
            Take a look
          </span>
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Gallery</h2>
          <Gallery photos={galleryPhotos} accent={accent} />
        </section>
      )}

      {/* Contact */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-slate">
          Get in touch
        </span>
        <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight">
          Visit or contact us
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <div className="mb-4 flex flex-wrap gap-3">
              <a
                href={`tel:${shop.phone}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                Call {shop.phone}
              </a>
              {waNumber && (
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-semibold hover:bg-charcoal/5"
                >
                  WhatsApp
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed text-charcoal/70">{shop.address}</p>
          </div>

          {shop.mapEmbedUrl ? (
            <div className="overflow-hidden rounded-2xl border border-charcoal/10">
              <iframe
                src={shop.mapEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0, minHeight: 220 }}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-charcoal/15 p-6 text-center text-sm text-slate">
              Map coming soon
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-charcoal/10 py-6 text-center text-xs text-slate">
        Made with GalliWeb
      </footer>
    </main>
  );
}
