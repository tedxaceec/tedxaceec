"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#speakers", label: "Speakers" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("/");

    // ── Track scroll to toggle navbar bg intensity ───────────────────────────
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── Lock body scroll when mobile menu is open ────────────────────────────
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // ── Close mobile menu on resize to desktop ───────────────────────────────
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleLinkClick = useCallback((href: string) => {
        setActiveLink(href);
        setMobileOpen(false);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-500 ${scrolled
                        ? "bg-black/70 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.05)]"
                        : "bg-transparent"
                    }`}
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-16 md:h-[72px]">
                        {/* ── Logo ───────────────────────────────────────── */}
                        <Link
                            href="/"
                            className="relative group flex items-center gap-1"
                            aria-label="TEDxACEEC — Go to homepage"
                            onClick={() => handleLinkClick("/")}
                        >
                            <span className="text-white font-black text-xl tracking-wide">
                                TEDx
                            </span>
                            <span className="text-red-500 font-black text-xl tracking-wide transition-colors duration-300 group-hover:text-red-400">
                                ACEEC
                            </span>
                            {/* Subtle glow on hover */}
                            <span className="absolute -inset-3 rounded-lg bg-red-500/0 group-hover:bg-red-500/5 transition-all duration-500" />
                        </Link>

                        {/* ── Desktop Navigation ─────────────────────────── */}
                        <div className="hidden md:flex items-center gap-1">
                            <ul className="flex items-center gap-0.5 list-none m-0 p-0" role="list">
                                {NAV_LINKS.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => handleLinkClick(href)}
                                            className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-all duration-300 rounded-lg group ${activeLink === href
                                                    ? "text-white"
                                                    : "text-white/50 hover:text-white/90"
                                                }`}
                                        >
                                            {label}
                                            {/* Active / Hover indicator line */}
                                            <span
                                                className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-px rounded-full transition-all duration-300 ${activeLink === href
                                                        ? "w-4 bg-red-500"
                                                        : "w-0 bg-white/40 group-hover:w-3"
                                                    }`}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* ── CTA Button ─────────────────────────────── */}
                            <Link
                                href="#register"
                                className="relative ml-4 px-5 py-2 text-[13px] font-semibold tracking-wide uppercase text-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(235,0,40,0.3)] group"
                            >
                                {/* Gradient background */}
                                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transition-opacity duration-300" />
                                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                <span className="relative z-10">Register</span>
                            </Link>
                        </div>

                        {/* ── Mobile Menu Toggle ─────────────────────────── */}
                        <button
                            type="button"
                            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 hover:bg-white/10"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                        >
                            <div className="w-5 h-4 relative flex flex-col justify-between">
                                <span
                                    className={`block h-[1.5px] w-full bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7.25px]" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-[1.5px] w-full bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block h-[1.5px] w-full bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7.25px]" : ""
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── Subtle bottom border line ───────────────────────────── */}
                <div
                    className={`h-px w-full transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(235,0,40,0.3) 30%, rgba(255,255,255,0.08) 50%, rgba(235,0,40,0.3) 70%, transparent 100%)",
                    }}
                />
            </nav>

            {/* ── Mobile Fullscreen Overlay ────────────────────────────────── */}
            <div
                className={`fixed inset-0 z-[99] transition-all duration-500 md:hidden ${mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden={!mobileOpen}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                    onClick={() => setMobileOpen(false)}
                />

                {/* Mobile Nav Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                    {NAV_LINKS.map(({ href, label }, i) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => handleLinkClick(href)}
                            className={`text-3xl font-light tracking-wider uppercase transition-all duration-500 ${activeLink === href
                                    ? "text-white"
                                    : "text-white/40 hover:text-white/80"
                                }`}
                            style={{
                                transitionDelay: mobileOpen ? `${i * 80 + 100}ms` : "0ms",
                                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                                opacity: mobileOpen ? 1 : 0,
                            }}
                        >
                            {label}
                        </Link>
                    ))}

                    {/* Mobile CTA */}
                    <Link
                        href="#register"
                        onClick={() => setMobileOpen(false)}
                        className="mt-8 px-8 py-3 text-sm font-semibold tracking-widest uppercase text-white bg-gradient-to-r from-red-600 to-red-500 rounded-full hover:shadow-[0_0_32px_rgba(235,0,40,0.4)] transition-all duration-500"
                        style={{
                            transitionDelay: mobileOpen ? `${NAV_LINKS.length * 80 + 100}ms` : "0ms",
                            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: mobileOpen ? 1 : 0,
                        }}
                    >
                        Register Now
                    </Link>

                    {/* Bottom branding */}
                    <div
                        className="absolute bottom-10 flex flex-col items-center gap-2 transition-all duration-700"
                        style={{
                            transitionDelay: mobileOpen ? "500ms" : "0ms",
                            opacity: mobileOpen ? 1 : 0,
                        }}
                    >
                        <span className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-medium">
                            Ideas Worth Spreading
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
