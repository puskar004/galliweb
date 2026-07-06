export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#1c2a4a_0%,#0F1729_60%)] py-24 text-paper md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-mono text-xs font-medium text-teal">
            <span className="text-[8px]">●</span> Made for local shops in India
          </span>

          <h1 className="mb-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-[56px]">
            Your shop board
            <br />
            deserves a{" "}
            <em className="font-medium italic text-marigold">website</em>,
            <br />
            not just a signboard.
          </h1>

          <p className="mb-8 max-w-[460px] text-[17px] leading-relaxed text-[#B7BECF]">
            Send us your shop&apos;s name and a few photos. We design, build, and launch
            a fast, professional website — live in days, not months.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#pricing"
              className="inline-block rounded-full bg-marigold px-6 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-white"
            >
              See pricing →
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 px-2.5 py-3.5 text-[15px] font-semibold transition hover:text-marigold"
            >
              View our work ↓
            </a>
          </div>
        </div>

        <TransformCard />
      </div>
    </section>
  );
}

/** The signature hero element: hover to see a shop's signboard turn into a live website. */
function TransformCard() {
  return (
    <div className="transform-card">
      <div className="layer flex items-center justify-center bg-[linear-gradient(160deg,#4a3d26,#2b2316)] [background-image:repeating-linear-gradient(0deg,#3a2f1f_0px,#3a2f1f_2px,#453824_2px,#453824_4px)]">
        <div className="absolute top-[38%] left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 -rotate-1 text-center font-display text-[34px] font-black italic text-[#f2e2c0] [text-shadow:2px_2px_0_rgba(0,0,0,0.35)]">
          Sharma General
          <br />
          Store
        </div>
        <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-widest text-[#d8c39a]">
          Est. 1998 · Kirana &amp; More
        </div>
      </div>

      <div className="layer layer-after bg-paper">
        <div className="flex h-11 items-center justify-between border-b border-black/5 px-[18px]">
          <div className="h-[22px] w-[22px] rounded-md bg-teal" />
          <div className="flex gap-3.5">
            <div className="h-1.5 w-[34px] rounded bg-[#e2e5ea]" />
            <div className="h-1.5 w-[34px] rounded bg-[#e2e5ea]" />
            <div className="h-1.5 w-[34px] rounded bg-[#e2e5ea]" />
          </div>
        </div>
        <div className="p-[22px]">
          <div className="mb-2 h-4 w-[70%] rounded bg-charcoal" />
          <div className="mb-3.5 h-4 w-1/2 rounded bg-charcoal" />
          <div className="mb-1.5 h-2 w-[85%] rounded bg-[#dfe2e8]" />
          <div className="mb-[18px] h-2 w-3/5 rounded bg-[#dfe2e8]" />
          <div className="h-8 w-28 rounded-full bg-marigold" />
        </div>
        <div className="grid grid-cols-3 gap-2 px-[18px] pb-[22px]">
          <div className="aspect-square rounded-lg bg-[linear-gradient(135deg,#f0d9b5,#e3a857)]" />
          <div className="aspect-square rounded-lg bg-[linear-gradient(135deg,#b5e3d8,#1B998B)]" />
          <div className="aspect-square rounded-lg bg-[linear-gradient(135deg,#c9d4f0,#4a5fc1)]" />
        </div>
      </div>

      <div className="drag-hint absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3.5 py-1.5 font-mono text-[11px] text-slate shadow-lg">
        hover to see it come alive ↗
      </div>
    </div>
  );
}
