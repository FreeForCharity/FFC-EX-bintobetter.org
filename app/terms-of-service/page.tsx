import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { termsSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Bin to Better",
  description:
    "Terms for using bintobetter.org, participating in Bin to Better programs, and donating materials.",
};

export default function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The ground rules for using this website, taking part in our programs, and donating materials to us."
      sections={termsSections}
      reviewed="August 2026"
    />
  );
}
