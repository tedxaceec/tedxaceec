export interface NavLink {
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGrid {
  title: string;
  links: FooterLink[];
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/speakers", label: "Speakers" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_GRIDS: FooterGrid[] = [
  {
    title: "Event",
    links: [
      { label: "About", href: "/about" },
      { label: "Speakers", href: "/speakers" },
      { label: "Team", href: "/team" },
      { label: "Schedule", href: "/schedule" },
      { label: "Venue", href: "/venue" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/tedxaceec" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/tedxaceec" },
      { label: "Twitter", href: "https://twitter.com/tedxaceec" },
      { label: "YouTube", href: "https://www.youtube.com/@tedxaceec" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Register", href: "#register" },
      { label: "Sponsor Us", href: "/sponsors" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
