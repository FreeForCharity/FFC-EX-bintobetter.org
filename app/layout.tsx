import type { Metadata } from "next";
import { Hanken_Grotesk, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site, isProductionSite } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/content/structured-data";

// Body font. `display: "swap"` matches the other two — without it this one
// alone blocks text painting while the file downloads, and it is the face most
// of the page is set in.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bin to Better | Turning Waste into Opportunity",
  description:
    "At Bin to Better, we believe that waste is not just trash. It is an opportunity. Join us in creating a more sustainable, circular future.",
  metadataBase: new URL(site.url),
  // No `alternates.canonical` here on purpose. Page metadata merges over the
  // layout's rather than replacing it, so a canonical set at this level is
  // inherited by every route — previously pointing all of them at the
  // homepage. Each page declares its own via `canonicalFor` in content/site.ts.
  openGraph: {
    title: "Bin to Better | Turning Waste into Opportunity",
    description:
      "Student-led programs turning discarded materials into resources for schools, shelters, and communities.",
    url: site.url,
    siteName: site.name,
    // logo.webp is 666x375. It was declared here as 1200x630, which is the
    // recommended OG size but not this file's size — social cards size their
    // preview from these numbers, so the wrong pair distorts the crop.
    images: [{ url: "/logo.webp", width: 666, height: 375, alt: "Bin to Better" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bin to Better | Turning Waste into Opportunity",
    description:
      "Student-led programs turning discarded materials into resources for schools, shelters, and communities.",
    images: ["/logo.webp"],
  },
  // Belt and braces alongside robots.txt: a noindex header on every page of a
  // test deployment, which also covers crawlers that ignore robots.txt.
  ...(isProductionSite() ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(hanken.variable, dmMono.variable, geist.variable, "font-sans")}
    >
      <body>
        {/* Sitewide entity graph. Both nodes carry a stable @id, so the
            per-page schema on individual routes references the organisation
            rather than repeating (and risking contradicting) it. */}
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {children}
      </body>
    </html>
  );
}
