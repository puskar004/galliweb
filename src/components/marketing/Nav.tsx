export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <div className="font-display text-xl font-bold tracking-tight text-paper">
          Galli<span className="text-marigold">Web</span>
        </div>

        <div className="hidden gap-9 text-sm font-medium text-[#C9CEDC] md:flex">
          <a href="#work" className="hover:text-marigold">
            Our Work
          </a>
          <a href="#pricing" className="hover:text-marigold">
            Pricing
          </a>
          <a href="#how" className="hover:text-marigold">
            How it works
          </a>
        </div>

        <a
          href="https://wa.me/919241969273"
          target="_blank"
          className="rounded-full bg-marigold px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white"
        >
          Get your shop online
        </a>
      </div>
    </nav>
  );
}
