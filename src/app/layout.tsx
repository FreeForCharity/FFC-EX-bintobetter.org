import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, DM_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site, isProductionSite } from "@/content/site";
import GoogleTagManager, {
  GoogleTagManagerNoScript,
} from "@/components/google-tag-manager";
import CookieConsent from "@/components/cookie-consent";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bin to Better | Turning Waste into Opportunity",
    description:
      "Student-led programs turning discarded materials into resources for schools, shelters, and communities.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/logo.webp", width: 1200, height: 630, alt: "Bin to Better" }],
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
      className={cn(hanken.variable, inter.variable, dmMono.variable, "font-sans", geist.variable)}
    >
      <GoogleTagManager />
      <body>
        <GoogleTagManagerNoScript />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
