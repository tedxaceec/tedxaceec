import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

// ─── Site Constants ──────────────────────────────────────────────────────────
const SITE_URL = "https://tedxaceec.vercel.app/";
const SITE_NAME = "TEDxACEEC";
const SITE_TITLE = "TEDxACEEC — Bedrock & Beyond | Ideas Worth Spreading";
const SITE_DESCRIPTION =
  "TEDxACEEC presents 'Bedrock & Beyond' — an independently organized TED event at Acharya College of Engineering. Explore groundbreaking talks on innovation, technology, creativity, and the resilient foundations of our past that shape our limitless future.";

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
    "TEDxACEEC",
    "TEDx ACEEC",
    "TEDx Acharya",
    "TEDx Acharya College of Engineering",
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
    "TEDx Bangalore",
    "TEDx Karnataka",
    "college events Bangalore",
    "engineering college events India",
    "Acharya College events",
    "tech events Bangalore 2026",
  ],

  // ── Authors & Creator ─────────────────────────────────────────────────────
  authors: [
    { name: "TEDxACEEC Organizing Committee", url: SITE_URL },
  ],
  creator: "TEDxACEEC",
  publisher: "TEDxACEEC",

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
        alt: "TEDxACEEC — Bedrock & Beyond",
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
    creator: "@tedxaceec",
    site: "@tedxaceec",
  },

  // ── Icons & Manifest ──────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
      name: "TEDxACEEC",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.instagram.com/tedxaceec",
        "https://www.linkedin.com/company/tedxaceec",
        "https://twitter.com/tedxaceec",
      ],
      description: "An independently organized TEDx event at Acharya College of Engineering, Electronics and Communications (ACEEC).",
    },
    // Event
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event`,
      name: "TEDxACEEC — Bedrock & Beyond",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: `${SITE_URL}/og-image.png`,
      organizer: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "TEDxACEEC",
        url: SITE_URL,
      },
      location: {
        "@type": "Place",
        name: "Acharya College of Engineering, Electronics and Communications",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      performer: {
        "@type": "PerformingGroup",
        name: "TEDxACEEC Speakers",
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
    <html lang="en" dir="ltr">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for analytics / third-party (add as needed) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/30 overflow-x-hidden`}
      >
        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-999 focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          {children}
        </main>

        {/* Noscript fallback for SEO crawlers that don't run JS */}
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", color: "#fff", backgroundColor: "#0a0a0a" }}>
            <h1>TEDxACEEC — Bedrock &amp; Beyond</h1>
            <p>
              An independently organized TEDx event at Acharya College of Engineering.
              Exploring the resilient foundations of our past and the limitless possibilities shaping our future.
            </p>
            <p>Please enable JavaScript for the best experience.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
