import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacySections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Bin to Better",
  description:
    "What Bin to Better collects, how youth data and photographs are handled, and why this site sets no cookies.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Bin to Better is run by students, for a community that includes a lot of minors. This page says plainly what we collect, what we do not, and how to make us delete something."
      sections={privacySections}
      reviewed="August 2026"
    />
  );
}
