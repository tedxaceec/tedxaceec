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
const SITE_URL = "https://tedx.aceec.ac.in/";
const SITE_NAME = "TEDxACE Engineering College";
const SITE_TITLE = "TEDxACEEC | Bedrock & Beyond | TEDx at ACE Engineering College, Hyderabad";
const SITE_DESCRIPTION =
  "TEDxACEEC — Bedrock & Beyond is an independently organized TEDx event at ACE Engineering College, Ankushapur, Ghatkesar, Hyderabad, Telangana. Experience powerful talks on innovation, technology, leadership, and ideas worth spreading from India's brightest minds.";

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
    "TEDxACE Engineering College",
    "TEDx ACE Engineering College",
    "ACE Engineering College",
    "ACEEC",
    "ACE Engineering College TEDx",
    "Bedrock and Beyond",
    "Bedrock & Beyond",
    "tedxaceec 2026",
    // Generic TEDx keywords
    "TEDx event",
    "TEDx talks",
    "TEDx conference",
    "TEDx event 2026",
    "TED talks India",
    "TEDx India",
    "TEDx India 2026",
    "TEDx college event",
    "TEDx university event",
    "TEDx student event",
    // Topic keywords
    "innovation talks",
    "ideas worth spreading",
    "technology conference",
    "inspiration event",
    "motivational speakers India",
    "thought leaders India",
    "creative talks",
    "student innovation",
    "engineering conference India",
    "leadership talks",
    "startup talks India",
    "entrepreneurship talks",
    // Location-based keywords (Local SEO / GEO — Hyderabad + Telangana)
    "TEDx Hyderabad",
    "TEDx Hyderabad 2026",
    "TEDx Telangana",
    "TEDx Secunderabad",
    "TEDx Ghatkesar",
    "college events Hyderabad",
    "college events Telangana",
    "engineering college events Hyderabad",
    "engineering college events India",
    "ACE Engineering College events",
    "ACE Engineering College Hyderabad",
    "ACE Engineering College Ghatkesar",
    "ACE Engineering College Ankushapur",
    "tech events Hyderabad 2026",
    "events near Ghatkesar",
    "events in Medchal district",
    "student events Hyderabad 2026",
    "JNTUH affiliated college events",
    // Long-tail / Conversational / Voice search
    "TEDx events near me Hyderabad",
    "upcoming TEDx events in Hyderabad",
    "best TEDx events in India 2026",
    "TEDx college events near Hyderabad",
    "ACE Engineering College Ankushapur Ghatkesar Telangana",
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
      alternateName: ["TEDxACEEC", "TEDx ACEEC", "TEDx ACE Engineering College"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}og-image.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://www.instagram.com/tedxaceengineeringcollege",
        "https://www.linkedin.com/in/tedxaceengineeringcollege/",
        "https://x.com/TedxC28766",
        "https://www.youtube.com/@tedxaceengineeringcollege",
      ],
      description: "TEDxACEEC is an independently organized TEDx event hosted at ACE Engineering College, Ankushapur, Ghatkesar, Hyderabad, Telangana. We bring together innovators, thought leaders, and change-makers to share ideas worth spreading.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "tedx@aceec.ac.in",
        telephone: "+917995162648",
        contactType: "General Inquiry",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Engineering Block, ACE Engineering College, Ankushapur",
        addressLocality: "Ghatkesar",
        addressRegion: "Telangana",
        postalCode: "501301",
        addressCountry: "IN",
      },
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
      image: [
        `${SITE_URL}og-image.png`,
        `${SITE_URL}logo.png`,
      ],
      organizer: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "TEDxACE Engineering College",
        url: SITE_URL,
      },
      location: {
        "@type": "Place",
        name: "Engineering Block, ACE Engineering College",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Engineering Block, ACE Engineering College, Ankushapur",
          addressLocality: "Ghatkesar",
          addressRegion: "Telangana",
          postalCode: "501301",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.4602,
          longitude: 78.6569,
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
    // EducationalOrganization (for ACE Engineering College)
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#college`,
      name: "ACE Engineering College",
      alternateName: ["ACEEC", "ACE Engineering College Hyderabad"],
      url: "https://aceec.ac.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Engineering Block, ACE Engineering College, Ankushapur",
        addressLocality: "Ghatkesar",
        addressRegion: "Telangana",
        postalCode: "501301",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.4602,
        longitude: 78.6569,
      },
      description: "ACE Engineering College is a premier engineering institution affiliated to JNTUH, located in Ankushapur, Ghatkesar, Telangana. NAAC accredited with 20+ years of academic excellence.",
    },
    // WebSite (for sitelinks search box)
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "TEDxACEEC",
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
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
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
        {/* ── GEO Meta Tags (Local SEO) ────────────────────────────────────── */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Ghatkesar, Hyderabad, Telangana" />
        <meta name="geo.position" content="17.4602;78.6569" />
        <meta name="ICBM" content="17.4602, 78.6569" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* DNS prefetch for analytics / third-party */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
            <h1>TEDxACEEC | Bedrock &amp; Beyond — TEDx at ACE Engineering College, Hyderabad</h1>
            <p>
              TEDxACEEC is an independently organized TEDx event at ACE Engineering College,
              Engineering Block, Ankushapur, Ghatkesar, Hyderabad, Telangana 501301.
              Experience powerful talks on innovation, technology, leadership, and ideas worth spreading.
            </p>
            <p>Explore groundbreaking talks on innovation, technology, creativity, and the resilient foundations of our past that shape our limitless future.</p>
            <p>Please enable JavaScript for the best experience.</p>
          </div>
        </noscript>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
