const steps = [
  {
    num: "01 · YOU SHARE",
    title: "Shop details & photos",
    body: "Name, what you sell, contact number, and a few good photos of your shop and products.",
  },
  {
    num: "02 · WE BUILD",
    title: "A site made for you",
    body: "We pick the right template for your business and fill it in with your real photos and details.",
  },
  {
    num: "03 · YOU GO LIVE",
    title: "Share your link everywhere",
    body: "Put it on your visiting card, Instagram bio, and Google listing. Customers find you instantly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dim">
          The process
        </div>
        <h2 className="mb-4 max-w-xl font-display text-4xl font-semibold tracking-tight">
          Three steps. That&apos;s really it.
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-slate">
          No back-and-forth over WhatsApp for weeks. You tell us about the shop once —
          we handle the rest.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="border-t-2 border-charcoal pt-5">
              <span className="mb-3.5 block font-mono text-[13px] font-bold text-teal">
                {step.num}
              </span>
              <h3 className="mb-2.5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
