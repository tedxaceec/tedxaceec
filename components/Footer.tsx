import Link from "next/link";
import Image from "next/image";

// ─── Footer Link Grids ──────────────────────────────────────────────────────
const FOOTER_GRIDS = [
    {
        title: "Event",
        links: [
            { label: "About", href: "/about" },
            { label: "Speakers", href: "/speakers" },
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

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200/60 dark:border-neutral-800/60">
            {/* ── Giant Background Watermark ──────────────────────────── */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden select-none"
                aria-hidden="true"
            >
                <span className="translate-y-[35%] whitespace-nowrap text-[clamp(6rem,18vw,16rem)] font-extrabold uppercase leading-none tracking-tight text-neutral-200/60 dark:text-neutral-800/40">
                    TEDxACEEC
                </span>
            </div>

            {/* ── Footer Content ─────────────────────────────────────── */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

                    {/* ── Left: Branding + Copyright ──────────────────────── */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 group w-fit"
                            aria-label="TEDxACEEC — Go to homepage"
                        >
                            {/* Light mode logo */}
                            <Image
                                src="/tedxaceec-dark.svg"
                                alt="TEDxACEEC Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto dark:hidden"
                            />
                            {/* Dark mode logo */}
                            <Image
                                src="/tedxaceec.svg"
                                alt="TEDxACEEC Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto hidden dark:block"
                            />
                        </Link>

                        {/* Tagline */}
                        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xs">
                            Ideas Worth Spreading — An independently organized TEDx event at
                            Acharya College of Engineering.
                        </p>

                        {/* Copyright */}
                        <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                            © {new Date().getFullYear()} TEDxACEEC. All rights reserved.
                        </p>

                        {/* TED License Notice */}
                        <p className="text-[10px] leading-relaxed text-neutral-400/80 dark:text-neutral-600 max-w-xs">
                            This independent TEDx event is operated under license from TED.
                        </p>
                    </div>

                    {/* ── Right: Four-Column Link Grid ───────────────────── */}
                    <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {FOOTER_GRIDS.map(({ title, links }) => (
                            <div key={title} className="flex flex-col gap-4">
                                {/* Column Heading */}
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                                    {title}
                                </h3>

                                {/* Links */}
                                <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                                    {links.map(({ label, href }) => {
                                        const isExternal = href.startsWith("http");
                                        return (
                                            <li key={label}>
                                                <Link
                                                    href={href}
                                                    {...(isExternal && {
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                    })}
                                                    className="group/link inline-flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-neutral-100"
                                                >
                                                    {label}
                                                    {/* Subtle arrow for external links */}
                                                    {isExternal && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="10"
                                                            height="10"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                                                        >
                                                            <path d="M7 17L17 7" />
                                                            <path d="M7 7h10v10" />
                                                        </svg>
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom Divider + Secondary Row ────────────────────── */}
                <div className="mt-14 border-t border-neutral-200/60 dark:border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center sm:text-left">
                        Bedrock &amp; Beyond — Exploring the foundations of our past and the future ahead.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/tedxaceec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 dark:text-neutral-500 transition-all duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            aria-label="Follow us on Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/company/tedxaceec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 dark:text-neutral-500 transition-all duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            aria-label="Follow us on LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>

                        {/* Twitter / X */}
                        <a
                            href="https://twitter.com/tedxaceec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 dark:text-neutral-500 transition-all duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            aria-label="Follow us on Twitter"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://www.youtube.com/@tedxaceec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/icon flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 dark:text-neutral-500 transition-all duration-200 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            aria-label="Follow us on YouTube"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
