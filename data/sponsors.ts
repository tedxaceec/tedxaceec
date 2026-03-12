// ─── Sponsor Data ──────────────────────────────────────────────────────────────
// TEDxACE Engineering College: Bedrock & Beyond — Sponsors & Partners

export type SponsorTier =
  | "title"
  | "powered"
  | "gold"
  | "silver"
  | "bronze"
  | "community";

export interface Sponsor {
  id: string;
  name: string;
  initials: string; // 2-3 letter abbreviation for logo placeholder
  tier: SponsorTier;
  description: string;
  website?: string;
  tagline?: string;
  color?: string; // accent color for the logo placeholder
}

export interface SponsorBenefit {
  icon: "eye" | "users" | "handshake" | "heart";
  title: string;
  description: string;
  highlights: string[];
}

// ─── Title Sponsor ───────────────────────────────────────────────────────────
export const TITLE_SPONSOR: Sponsor = {
  id: "title-techvista",
  name: "TechVista Solutions",
  initials: "TV",
  tier: "title",
  description:
    "Pioneering AI-driven enterprise solutions that transform how businesses operate. TechVista's commitment to innovation mirrors TEDx's mission to spread ideas that reshape industries and inspire the next generation of thinkers.",
  website: "https://techvista.example.com",
  tagline: "Innovate. Transform. Lead.",
  color: "#EB0028",
};

// ─── Powered By ──────────────────────────────────────────────────────────────
export const POWERED_BY_SPONSOR: Sponsor = {
  id: "powered-nexacore",
  name: "NexaCore Technologies",
  initials: "NC",
  tier: "powered",
  description:
    "Building the digital infrastructure for tomorrow's world. NexaCore powers seamless connectivity, cloud platforms, and edge computing for enterprises at scale.",
  website: "https://nexacore.example.com",
  tagline: "Infrastructure for Tomorrow",
  color: "#8B5CF6",
};

// ─── Gold Sponsors ───────────────────────────────────────────────────────────
export const GOLD_SPONSORS: Sponsor[] = [
  {
    id: "gold-innovatelabs",
    name: "InnovateLabs",
    initials: "IL",
    tier: "gold",
    description:
      "Pioneering research in AI, machine learning, and autonomous systems for a smarter future.",
    website: "https://innovatelabs.example.com",
    tagline: "Intelligence Reimagined",
    color: "#D4A437",
  },
  {
    id: "gold-futurestack",
    name: "FutureStack",
    initials: "FS",
    tier: "gold",
    description:
      "Full-stack cloud solutions empowering startups and enterprises to scale without limits.",
    website: "https://futurestack.example.com",
    tagline: "Scale Without Limits",
    color: "#D4A437",
  },
];

// ─── Silver Sponsors ─────────────────────────────────────────────────────────
export const SILVER_SPONSORS: Sponsor[] = [
  {
    id: "silver-cloudpeak",
    name: "CloudPeak",
    initials: "CP",
    tier: "silver",
    description:
      "Multi-cloud management platform simplifying hybrid infrastructure.",
    color: "#94A3B8",
  },
  {
    id: "silver-dataforge",
    name: "DataForge",
    initials: "DF",
    tier: "silver",
    description:
      "Real-time analytics and data engineering for data-driven decisions.",
    color: "#94A3B8",
  },
  {
    id: "silver-greensynth",
    name: "GreenSynth",
    initials: "GS",
    tier: "silver",
    description:
      "Sustainable materials and green chemistry for a cleaner planet.",
    color: "#94A3B8",
  },
];

// ─── Bronze Sponsors ─────────────────────────────────────────────────────────
export const BRONZE_SPONSORS: Sponsor[] = [
  {
    id: "bronze-codecraft",
    name: "CodeCraft",
    initials: "CC",
    tier: "bronze",
    description: "Developer tools and IDE extensions.",
    color: "#B45309",
  },
  {
    id: "bronze-pixelwave",
    name: "PixelWave",
    initials: "PW",
    tier: "bronze",
    description: "Creative design and branding studio.",
    color: "#B45309",
  },
  {
    id: "bronze-logicgate",
    name: "LogicGate",
    initials: "LG",
    tier: "bronze",
    description: "Cybersecurity and risk management.",
    color: "#B45309",
  },
  {
    id: "bronze-byteshift",
    name: "ByteShift",
    initials: "BS",
    tier: "bronze",
    description: "Edge computing and IoT solutions.",
    color: "#B45309",
  },
];

// ─── Community & Media Partners ──────────────────────────────────────────────
export const COMMUNITY_PARTNERS: Sponsor[] = [
  {
    id: "cp-ecovoice",
    name: "EcoVoice",
    initials: "EV",
    tier: "community",
    description: "Environmental media outlet",
    color: "#22C55E",
  },
  {
    id: "cp-techweekly",
    name: "TechWeekly",
    initials: "TW",
    tier: "community",
    description: "Technology journalism",
    color: "#3B82F6",
  },
  {
    id: "cp-devstream",
    name: "DevStream",
    initials: "DS",
    tier: "community",
    description: "Developer streaming platform",
    color: "#8B5CF6",
  },
  {
    id: "cp-startupindia",
    name: "StartupIndia",
    initials: "SI",
    tier: "community",
    description: "Startup ecosystem hub",
    color: "#F59E0B",
  },
  {
    id: "cp-campusconnect",
    name: "CampusConnect",
    initials: "CX",
    tier: "community",
    description: "Student network",
    color: "#EC4899",
  },
  {
    id: "cp-radiocity",
    name: "Radio City",
    initials: "RC",
    tier: "community",
    description: "Media partner",
    color: "#EF4444",
  },
  {
    id: "cp-youthvibe",
    name: "YouthVibe",
    initials: "YV",
    tier: "community",
    description: "Youth culture magazine",
    color: "#14B8A6",
  },
  {
    id: "cp-edutimes",
    name: "EduTimes",
    initials: "ET",
    tier: "community",
    description: "Education news",
    color: "#6366F1",
  },
];

// ─── Why Sponsor Benefits ────────────────────────────────────────────────────
export const SPONSOR_BENEFITS: SponsorBenefit[] = [
  {
    icon: "eye",
    title: "Brand Exposure",
    description: "Maximum visibility across all event touchpoints.",
    highlights: [
      "Logo on stage backdrop & LED screens",
      "Featured in all printed materials",
      "Livestream & video branding",
      "Social media shoutouts & posts",
    ],
  },
  {
    icon: "users",
    title: "Audience Reach",
    description: "Connect with a curated, engaged audience.",
    highlights: [
      "Large in-person audience",
      "Massive social media impressions",
      "Post-event YouTube viewership",
      "Campus-wide promotional reach",
    ],
  },
  {
    icon: "handshake",
    title: "Networking",
    description: "Exclusive access to thought leaders and innovators.",
    highlights: [
      "VIP access to all speakers",
      "Dedicated networking sessions",
      "Industry leader roundtables",
      "Direct talent pipeline access",
    ],
  },
  {
    icon: "heart",
    title: "Social Impact",
    description: "Align your brand with meaningful change.",
    highlights: [
      "Support ideas worth spreading",
      "Empower student innovation",
      "CSR alignment & reporting",
      "Community goodwill & trust",
    ],
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────
// Stats will be updated once confirmed.
export const SPONSOR_STATS: { value: string; label: string }[] = [];

export const SPONSOR_CTA = {
  badge: "Open for Partnership",
  title: {
    part1: "Want to be part of the",
    highlight: "TEDx story",
    part2: "?",
  },
  description:
    "Join forces with us to bring the brightest minds to our stage. Gain premium brand visibility and be part of a movement at TEDxACE Engineering College.",
  contactEmail: "tedx@aceec.ac.in",
  primaryCTA: {
    text: "Contact Us",
    href: "#contact",
  },
  secondaryCTA: {
    text: "Download Brochure",
    href: "https://drive.google.com/file/d/1ABij3WHkGpwC8Kl8vrkGhZtTN88AlHQD/view?usp=sharing",
  },
  notice:
    "This independent TEDx event is operated under license from TED. Sponsorships support the event and are not endorsements by TED.",
};
