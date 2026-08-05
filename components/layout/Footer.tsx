import Link from "next/link";
import Image from "next/image";
import { site, fiscalSponsor } from "@/content/site";
import { navLinks, programLinks } from "@/content/nav";

export function Footer() {
  return (
    <footer className="bg-canvas text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <span className="inline-flex rounded-md bg-paper p-2 transition-transform duration-300 ease-[var(--ease-out-hover)] hover:scale-[1.03]">
            <Image
              src="/logo.webp"
              alt="Bin to Better"
              width={120}
              height={30}
              className="h-[30px] w-auto"
            />
          </span>
          <p className="mt-4 max-w-xs text-sm text-paper/60 leading-relaxed">
            {site.tagline}
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-paper/70">
            {[
              ...navLinks,
              ...programLinks,
              { label: "Awards", href: "/achievements" },
              { label: "Support Us", href: "/donate" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline inline-block transition-colors hover:text-court"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-sage mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-paper/70">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="link-underline inline-block transition-colors hover:text-court"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-block transition-colors hover:text-court"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-block transition-colors hover:text-court"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*
        Policy links live in their own row rather than the Explore column so
        they are present in every footer regardless of how Explore is edited.
        The Free For Charity post-deploy smoke asserts a footer containing
        /privacy-policy and /terms-of-service — see post-deploy-smoke.yml.
      */}
      <div className="border-t border-paper/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center font-mono text-xs tracking-wide text-paper/40">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p>{site.copyright}</p>

          {/*
            Bin to Better has no IRS determination of its own, so a bare EIN
            here would misread as ours. Naming the sponsor is what actually
            lets a donor verify tax-deductible status.
          */}
          <p className="max-w-xl leading-relaxed">
            A fiscally sponsored project of{" "}
            <a
              href={fiscalSponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-court focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-court"
            >
              {fiscalSponsor.name}
            </a>
            , a 501(c)(3) nonprofit. EIN {fiscalSponsor.ein}. Donations are
            received and receipted by {fiscalSponsor.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
