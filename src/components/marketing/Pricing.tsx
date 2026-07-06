const plans = [
  {
    name: "Starter",
    tag: "For a simple online presence",
    price: "₹1,499",
    features: ["1-page website", "Up to 6 photos", "Contact & location"],
    featured: false,
  },
  {
    name: "Business",
    tag: "Most shops choose this",
    price: "₹2,999",
    features: [
      "Multi-section website",
      "Up to 20 photos, gallery",
      "WhatsApp & call buttons",
      "Google Maps embed",
    ],
    featured: true,
  },
  {
    name: "Growth",
    tag: "For shops ready to scale",
    price: "₹4,999",
    features: ["Everything in Business", "Product catalogue page", "1 year free updates"],
    featured: false,
  },
];

// NOTE: prices are placeholders — update these to whatever you decide to
// charge. Keeping them here as plain data (not hardcoded in markup) makes
// that a one-line change per plan.
export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dim">
          Pricing
        </div>
        <h2 className="mb-4 max-w-xl font-display text-4xl font-semibold tracking-tight">
          Simple pricing, no surprises.
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-slate">
          One-time setup, pick what fits your shop.
        </p>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[18px] border bg-white px-7 py-8 ${
                plan.featured
                  ? "-translate-y-2 border-2 border-marigold shadow-[0_20px_40px_-20px_rgba(245,166,35,0.4)] md:-translate-y-2"
                  : "border-[#e6e3da]"
              }`}
            >
              <div className="mb-1.5 text-[15px] font-semibold">{plan.name}</div>
              <div className="mb-[22px] text-[13px] text-slate">{plan.tag}</div>
              <div className="font-mono text-[34px] font-bold leading-none">
                {plan.price}{" "}
                <span className="text-sm font-medium text-slate">one-time</span>
              </div>

              <ul className="my-6 list-none">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2.5 border-t border-[#f0eee7] py-2.5 text-sm text-charcoal"
                  >
                    <span className="font-bold text-teal">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/919241969273?text=${encodeURIComponent(
                  `Hi! I'm interested in the ${plan.name} plan for my shop's website.`
                )}`}
                target="_blank"
                className={`block rounded-full border-[1.5px] border-charcoal py-3 text-center text-sm font-semibold ${
                  plan.featured ? "bg-charcoal text-white" : "text-charcoal"
                }`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
