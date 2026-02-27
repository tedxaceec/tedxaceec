"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/speakers", label: "Speakers" },
    { href: "/gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
];

/* ─── Magnetic Link ───────────────────────────────────────────────────────── */
function MagneticLink({
    href,
    label,
    isActive,
    onClick,
}: {
    href: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!linkRef.current) return;
        const rect = linkRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setOffset({ x: x * 0.15, y: y * 0.25 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    return (
        <li>
            <Link
                ref={linkRef}
                href={href}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 rounded-lg group block ${isActive
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                    }`}
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    transition: offset.x === 0 ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.15s ease-out",
                }}
            >
                {label}
            </Link>
        </li>
    );
}

/* ─── Main Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("/");
    const [activeIndex, setActiveIndex] = useState(0);
    const navListRef = useRef<HTMLUListElement>(null);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

    // ── Track scroll ────────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── Lock body scroll when mobile menu is open ───────────────────────────
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // ── Close mobile menu on resize to desktop ──────────────────────────────
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // ── Calculate sliding pill position ─────────────────────────────────────
    useEffect(() => {
        if (!navListRef.current) return;
        const items = navListRef.current.querySelectorAll("li");
        const item = items[activeIndex];
        if (!item) return;

        const listRect = navListRef.current.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        setPillStyle({
            left: itemRect.left - listRect.left,
            width: itemRect.width,
        });
    }, [activeIndex]);

    const handleLinkClick = useCallback((href: string, index: number) => {
        setActiveLink(href);
        setActiveIndex(index);
        setMobileOpen(false);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 w-full z-100 transition-all duration-700 ${scrolled
                    ? "py-3"
                    : "py-1"
                    }`}
                aria-label="Main navigation"
            >
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* ── Floating pill container ─────────────────────────── */}
                    <div
                        className={`relative flex items-center justify-between rounded-2xl transition-all duration-700 px-5 ${scrolled
                            ? "bg-white/8 dark:bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 dark:border-white/6 h-14"
                            : "bg-transparent h-16"
                            }`}
                    >
                        {/* Noise texture overlay */}
                        {scrolled && (
                            <div
                                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.015]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                                    backgroundSize: "128px 128px",
                                }}
                            />
                        )}

                        {/* ── Logo ───────────────────────────────────────── */}
                        <Link
                            href="/"
                            className="relative group flex items-center gap-1 shrink-0"
                            aria-label="TEDx ACE Engineering College - Go to homepage"
                            onClick={() => handleLinkClick("/", 0)}
                        >
                            <Image
                                src="/tedxaceec-dark.svg"
                                alt="TEDxACEEC Logo"
                                width={100}
                                height={100}
                                className="h-6 w-auto dark:hidden transition-transform duration-300 group-hover:scale-105"
                            />
                            <Image
                                src="/tedxaceec.svg"
                                alt="TEDxACEEC Logo"
                                width={100}
                                height={100}
                                className="h-6 w-auto hidden dark:block transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>

                        {/* ── Desktop Navigation ────────────────────────── */}
                        <div className="hidden md:flex items-center gap-1">
                            <div className="relative">
                                <ul
                                    ref={navListRef}
                                    className="relative flex items-center gap-0.5 list-none m-0 p-0"
                                    role="list"
                                >
                                    {/* Sliding active pill behind links */}
                                    <motion.div
                                        className="absolute top-0 h-full rounded-lg bg-white/10 dark:bg-white/8"
                                        animate={{
                                            left: pillStyle.left,
                                            width: pillStyle.width,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />

                                    {NAV_LINKS.map(({ href, label }, i) => (
                                        <MagneticLink
                                            key={href}
                                            href={href}
                                            label={label}
                                            isActive={activeLink === href}
                                            onClick={() => handleLinkClick(href, i)}
                                        />
                                    ))}
                                </ul>
                            </div>

                            {/* ── Separator ─────────────────────────────── */}
                            <div className="mx-3 h-5 w-px bg-white/10" />

                            {/* ── CTA Button ───────────────────────────── */}
                            <Link
                                href="#register"
                                className="relative px-5 py-2 text-[13px] font-semibold tracking-wide uppercase text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(235,0,40,0.35)] group"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 transition-opacity duration-300" />
                                <span className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Shimmer sweep */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                {/* Glow ring */}
                                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-white/20" />
                                <span className="relative z-10 flex items-center gap-1.5">
                                    Register
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>

                            {/* ── Theme Toggle ─────────────────────────── */}
                            <AnimatedThemeToggler
                                className="ml-1 p-2 relative size-9 flex items-center justify-center rounded-xl border border-foreground/10 text-foreground/40 hover:text-foreground hover:bg-foreground/8 hover:border-foreground/20 transition-all duration-300 cursor-pointer"
                            />
                        </div>

                        {/* ── Mobile: Theme Toggle + Menu Toggle ──────── */}
                        <div className="md:hidden flex items-center gap-1">
                            <AnimatedThemeToggler
                                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-neutral-400 hover:text-white hover:bg-white/8 transition-all duration-300 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/8"
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
                                        className={`block h-[1.5px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0 w-0" : "w-3/4"
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

                    {/* ── Subtle gradient accent line ───────────────────── */}
                    <div
                        className={`mx-auto mt-0.5 h-px max-w-xs transition-all duration-700 ${scrolled ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(235,0,40,0.4), transparent)",
                        }}
                    />
                </div>
            </nav>

            {/* ── Mobile Fullscreen Overlay ─────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-99 md:hidden"
                        aria-hidden={!mobileOpen}
                    >
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Decorative gradient orbs */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-red-500/8 blur-[80px]" />
                            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-red-500/5 blur-[80px]" />
                        </div>

                        {/* Mobile Nav Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1">
                            {NAV_LINKS.map(({ href, label }, i) => (
                                <motion.div
                                    key={href}
                                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.08 + 0.1,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => handleLinkClick(href, i)}
                                        className={`block px-6 py-4 text-3xl font-light tracking-wider uppercase transition-colors duration-300 ${activeLink === href
                                            ? "text-white"
                                            : "text-neutral-500 hover:text-neutral-300"
                                            }`}
                                    >
                                        <span className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-red-500/60 tabular-nums">
                                                0{i + 1}
                                            </span>
                                            {label}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.4,
                                    delay: NAV_LINKS.length * 0.08 + 0.1,
                                }}
                            >
                                <Link
                                    href="#register"
                                    onClick={() => setMobileOpen(false)}
                                    className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-widest uppercase text-white bg-linear-to-r from-red-600 to-red-500 rounded-xl hover:shadow-[0_0_32px_rgba(235,0,40,0.4)] transition-all duration-500"
                                >
                                    Register Now
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </motion.div>

                            {/* Bottom branding */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute bottom-10 flex flex-col items-center gap-3"
                            >
                                <div className="h-px w-16 bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
                                <span className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase font-medium">
                                    Ideas Worth Spreading
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
