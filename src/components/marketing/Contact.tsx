const PHONE = "9241969273";
const PHONE_INTL = "919241969273"; // country code prefixed, needed for wa.me links
const EMAIL = "puskarkumar.p4@gmail.com";

// Real contact details for the agency itself (not a generated shop's contact
// info). Shown on the public marketing site so prospective clients can
// reach out directly. Update the constants above if these details change.
export function Contact() {
  return (
    <section id="contact" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-marigold-dim">
          Get in touch
        </div>
        <h2 className="mb-4 max-w-xl font-display text-4xl font-semibold tracking-tight">
          Let's get your shop online.
        </h2>
        <p className="mb-10 max-w-lg text-base leading-relaxed text-[#9AA2B8]">
          Message us on WhatsApp, call directly, or drop an email — whichever
          is easiest for you.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href={`https://wa.me/${PHONE_INTL}`}
            target="_blank"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:border-teal/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
              ✆
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-slate">
                WhatsApp
              </span>
              <span className="block text-[15px] font-semibold group-hover:text-teal">
                +91 {PHONE}
              </span>
            </span>
          </a>

          <a
            href={`tel:+91${PHONE}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:border-marigold/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marigold/15 text-marigold">
              ☏
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-slate">
                Call
              </span>
              <span className="block text-[15px] font-semibold group-hover:text-marigold">
                +91 {PHONE}
              </span>
            </span>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:border-white/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-paper">
              ✉
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-slate">
                Email
              </span>
              <span className="block text-[15px] font-semibold break-all group-hover:text-white">
                {EMAIL}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
