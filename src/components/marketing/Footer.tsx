export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-[13px] text-[#8890A5] sm:flex-row sm:items-center sm:justify-between">
        <div>© {new Date().getFullYear()} GalliWeb</div>
        <div className="flex flex-wrap gap-4">
          <a href="https://wa.me/919241969273" target="_blank" className="hover:text-teal">
            +91 9241969273
          </a>
          <a href="mailto:puskarkumar.p4@gmail.com" className="hover:text-teal">
            puskarkumar.p4@gmail.com
          </a>
        </div>
        <div>Made for local businesses, everywhere.</div>
      </div>
    </footer>
  );
}
