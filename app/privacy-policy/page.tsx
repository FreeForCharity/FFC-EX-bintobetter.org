import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/content/structured-data";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacySections } from "@/content/legal";
import { pageMetadata } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  route: "/privacy-policy",
  title: "Privacy Policy",
  description:
    "What Bin to Better collects, how youth data and photographs are handled, and why this site sets no cookies.",
});

export default function PrivacyPolicy() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Privacy Policy", "/privacy-policy")} />
      <LegalPage
        title="Privacy Policy"
        intro="Bin to Better is run by students, for a community that includes a lot of minors. This page says plainly what we collect, what we do not, and how to make us delete something."
        sections={privacySections}
        reviewed="August 2026"
      />
    </>
  );
}
