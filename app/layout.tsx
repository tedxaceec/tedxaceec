import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, TASA_Orbiter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const tasaOrbiter = TASA_Orbiter({
  variable: "--font-tasa-orbiter",
  subsets: ["latin"],
  display: "swap",
});

// ─── Site Constants ──────────────────────────────────────────────────────────
const SITE_URL = "https://tedxaceec.vercel.app/";
const SITE_NAME = "TEDxACE Engineering College";
const SITE_TITLE = "TEDxACE Engineering College | Bedrock & Beyond | Ideas Worth Spreading";
const SITE_DESCRIPTION =
  "TEDxACE Engineering College presents 'Bedrock & Beyond' — an independently organized TED event at ACE Engineering College. Explore groundbreaking talks on innovation, technology, creativity, and the resilient foundations of our past that shape our limitless future.";

// ─── Viewport (exported separately in Next.js 14+) ─────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eb0028" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark",
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Core Meta ──────────────────────────────────────────────────────────────
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  // ── Keywords (SEO + GEO) ──────────────────────────────────────────────────
  keywords: [
    // Primary brand keywords
    "TEDxACE Engineering College",
    "TEDx ACEEC",
    "ACE Engineering College",
    "ACEEC",
    "TEDx ACE Engineering College",
    "TEDx ACE Engineering College",
    "Bedrock and Beyond",
    "Bedrock & Beyond",
    // Generic TEDx keywords
    "TEDx event",
    "TEDx talks",
    "TEDx conference",
    "TED talks India",
    "TEDx India",
    "TEDx college event",
    "TEDx university",
    // Topic keywords (GEO optimized)
    "innovation talks",
    "ideas worth spreading",
    "technology conference",
    "inspiration event",
    "motivational speakers",
    "thought leaders",
    "creative talks",
    "student innovation",
    "engineering conference",
    "leadership talks",
    // Location-based keywords (Local SEO / GEO)
    "TEDx Hyderabad",
    "TEDx Karnataka",
    "college events Hyderabad",
    "engineering college events India",
    "ACE Engineering College College events",
    "tech events Hyderabad 2026",
  ],

  // ── Authors & Creator ─────────────────────────────────────────────────────
  authors: [
    { name: "TEDxACE Engineering College Organizing Committee", url: SITE_URL },
  ],
  creator: "TEDxACE Engineering College",
  publisher: "TEDxACE Engineering College",

  // ── Canonical & Alternate URLs ─────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  // ── Robots (Search Engine Crawling) ────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp, Discord) ─────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TEDxACE Engineering College | Bedrock & Beyond",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X Cards ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@tedxaceengineeringcollege",
    site: "@tedxaceengineeringcollege",
  },

  // ── Icons & Manifest ──────────────────────────────────────────────────────
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",

  // ── Verification (replace with actual tokens when available) ──────────────
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  //   other: {
  //     "msvalidate.01": "YOUR_BING_TOKEN",
  //   },
  // },

  // ── Category ───────────────────────────────────────────────────────────────
  category: "Events",
};

// ─── JSON-LD Structured Data (Schema.org) ────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "TEDxACE Engineering College",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.instagram.com/tedxaceengineeringcollege",
        "https://www.linkedin.com/company/tedxaceengineeringcollege",
        "https://twitter.com/tedxaceengineeringcollege",
      ],
      description: "An independently organized TEDx event at ACE Engineering College, Electronics and Communications (ACEEC).",
    },
    // Event
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event`,
      name: "TEDxACE Engineering College | Bedrock & Beyond",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: `${SITE_URL}/og-image.png`,
      organizer: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "TEDxACE Engineering College",
        url: SITE_URL,
      },
      location: {
        "@type": "Place",
        name: "ACE Engineering College, Electronics and Communications",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      performer: {
        "@type": "PerformingGroup",
        name: "TEDxACE Engineering College Speakers",
      },
      offers: {
        "@type": "Offer",
        url: SITE_URL,
        availability: "https://schema.org/InStock",
        priceCurrency: "INR",
      },
    },
    // WebSite (for sitelinks search box)
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
    // WebPage
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#event` },
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
    },
  ],
};

// ─── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>


        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* DNS prefetch for analytics / third-party (add as needed) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${tasaOrbiter.className} antialiased overflow-x-hidden bg-background text-foreground selection:bg-red-500/20 dark:selection:bg-white/30 transition-colors duration-300`}
      >
        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          data-transition-ignore
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-999 focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>

        <CustomCursor />

        <PageLoader />

        <Navbar />

        <PageTransition>
          <main id="main-content">
            {children}
          </main>
        </PageTransition>

        <Footer />

        {/* Noscript fallback for SEO crawlers that don't run JS */}
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", color: "#fff", backgroundColor: "#000000" }}>
            <h1>TEDxACE Engineering College | Bedrock &amp; Beyond</h1>
            <p>
              An independently organized TEDx event at ACE Engineering College, Hyderabad.
              Exploring the resilient foundations of our past and the limitless possibilities shaping our future.
            </p>
            <p>Please enable JavaScript for the best experience.</p>
          </div>
        </noscript>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
