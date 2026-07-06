import Link from "next/link";
import Image from "next/image";

// These link to real, fully-filled-out demo shops seeded via
// `npm run db:seed` (see scripts/seed-demo-shops.js) — so clicking through
// shows an actual built site, not an empty placeholder. Thumbnails match
// each shop's actual cover photo for consistency.
const sampleWork = [
  {
    slug: "meher-boutique",
    name: "Meher Boutique",
    type: "Clothing store",
    thumb: "https://loremflickr.com/600/450/saree,india?lock=101",
  },
  {
    slug: "green-leaf-cafe",
    name: "Green Leaf Café",
    type: "Restaurant",
    thumb: "https://loremflickr.com/600/450/cafe,coffee?lock=201",
  },
  {
    slug: "verma-electronics",
    name: "Verma Electronics",
    type: "Electronics shop",
    thumb: "https://loremflickr.com/600/450/electronics,store?lock=301",
  },
];

export function Portfolio() {
  return (
    <section id="work" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dim">
          Recent work
        </div>
        <h2 className="mb-4 max-w-xl font-display text-4xl font-semibold tracking-tight">
          Real shops, real websites.
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-[#9AA2B8]">
          A few businesses we&apos;ve helped move online — click through to see the live site.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {sampleWork.map((shop) => (
            <Link
              key={shop.slug}
              href={`/site/${shop.slug}`}
              target="_blank"
              className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-2 transition hover:border-teal/40"
            >
              <div className="relative h-[150px] w-full overflow-hidden">
                <Image
                  src={shop.thumb}
                  alt={shop.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-[18px]">
                <div className="mb-1 text-[15px] font-semibold">{shop.name}</div>
                <div className="font-mono text-[11px] uppercase text-teal">{shop.type}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
