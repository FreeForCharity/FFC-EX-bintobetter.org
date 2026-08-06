import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <>
      <Nav />
      <Section className="bg-canvas">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-court">
            404
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-paper">
            Page not found
          </h1>
          <p className="mt-5 text-base leading-relaxed text-paper/70">
            The page may have moved as the site was reorganized around programs,
            impact, getting involved, and support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-[3px] bg-court px-5 py-2.5 text-sm font-medium text-ink hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
            >
              Home
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex rounded-[3px] border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper hover:border-court hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
