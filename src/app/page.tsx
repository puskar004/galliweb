import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Portfolio } from "@/components/marketing/Portfolio";
import { Pricing } from "@/components/marketing/Pricing";
import { Contact } from "@/components/marketing/Contact";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Footer } from "@/components/marketing/Footer";

// This is the public-facing agency site — the one clients see. It has
// zero database calls: everything here is static content, so it loads
// instantly and costs nothing to serve. The private generator tool lives
// entirely under /admin (see src/app/admin).
export default function HomePage() {
  return (
    <main className="bg-paper text-charcoal">
      <Nav />
      <Hero />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Contact />
      <CtaBand />
      <Footer />
    </main>
  );
}
