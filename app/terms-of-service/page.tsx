import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { LegalPage } from "@/components/ui/LegalPage";
import { termsSections } from "@/content/legal";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/terms-of-service",
  title: "Terms of Service",
  description:
    "Terms for using bintobetter.org, participating in Bin to Better programs, and donating materials.",
});

export default function TermsOfService() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Terms of Service", "/terms-of-service")} />
      <LegalPage
        title="Terms of Service"
        intro="The ground rules for using this website, taking part in our programs, and donating materials to us."
        sections={termsSections}
        reviewed="August 2026"
      />
    </>
  );
}
