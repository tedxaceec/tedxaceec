"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TITLE_SPONSOR, POWERED_BY_SPONSOR } from "@/data/sponsors";
import type { Sponsor } from "@/data/sponsors";

gsap.registerPlugin(ScrollTrigger);

/* ─── Logo Placeholder ────────────────────────────────────── */
function LogoPlaceholder({ sponsor, size = "lg" }: { sponsor: Sponsor; size?: "lg" | "md" }) {
    const dims = size === "lg" ? "h-28 w-28 md:h-36 md:w-36" : "h-20 w-20 md:h-24 md:w-24";
    const fontSize = size === "lg" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl";

    return (
        <div
            className={`${dims} flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm`}
        >
            <span
                className={`${fontSize} font-bold tracking-wider`}
                style={{ color: sponsor.color || "#fff" }}
            >
                {sponsor.initials}
            </span>
        </div>
    );
}

export default function TitleSponsor() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title sponsor card entrance
            if (titleCardRef.current) {
                gsap.from(titleCardRef.current, {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleCardRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            }

            // Pulsing glow
            if (titleCardRef.current) {
                gsap.to(titleCardRef.current, {
                    boxShadow: "0 0 80px 15px rgba(235, 0, 40, 0.1), 0 0 160px 40px rgba(235, 0, 40, 0.05)",
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-20 md:py-28"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-500/4 blur-[180px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Our Champions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Title Sponsor &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-violet-500">
                            Powered By
                        </span>
                    </motion.h2>
                </div>

                {/* ── Title Sponsor Card ────────────────────────────── */}
                <div
                    ref={titleCardRef}
                    className="group relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-red-500/15 bg-linear-to-br from-red-500/5 via-white/3 to-transparent backdrop-blur-xl transition-all duration-700 hover:border-red-500/30"
                    style={{
                        boxShadow: "0 0 60px 10px rgba(235, 0, 40, 0.06), 0 0 120px 30px rgba(235, 0, 40, 0.03)",
                    }}
                >
                    {/* Inner glow accents */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/8 blur-[80px] group-hover:bg-red-500/12 transition-colors duration-700" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-600/5 blur-[60px]" />

                    <div className="relative z-10 flex flex-col items-center gap-8 p-10 md:flex-row md:gap-12 md:p-14">
                        {/* Logo */}
                        <LogoPlaceholder sponsor={TITLE_SPONSOR} size="lg" />

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
                                <span className="h-1 w-1 rounded-full bg-red-400 animate-pulse" />
                                Title Sponsor
                            </span>

                            <h3 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                {TITLE_SPONSOR.name}
                            </h3>

                            {TITLE_SPONSOR.tagline && (
                                <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-red-400/60">
                                    {TITLE_SPONSOR.tagline}
                                </p>
                            )}

                            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">
                                {TITLE_SPONSOR.description}
                            </p>

                            {TITLE_SPONSOR.website && (
                                <a
                                    href={TITLE_SPONSOR.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors duration-200 hover:text-red-300"
                                >
                                    Visit Website
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="h-px w-full bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
                </div>

                {/* ── Powered By Card ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="group relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-violet-500/10 bg-linear-to-br from-violet-500/5 via-white/2 to-transparent p-8 md:p-10 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/20"
                >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/5 blur-[60px] group-hover:bg-violet-500/10 transition-colors duration-700" />

                    <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:gap-10">
                        <LogoPlaceholder sponsor={POWERED_BY_SPONSOR} size="md" />

                        <div className="flex-1 text-center md:text-left">
                            <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-violet-500/15 bg-violet-500/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                                Powered By
                            </span>

                            <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                                {POWERED_BY_SPONSOR.name}
                            </h3>

                            {POWERED_BY_SPONSOR.tagline && (
                                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] text-violet-400/50">
                                    {POWERED_BY_SPONSOR.tagline}
                                </p>
                            )}

                            <p className="mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                                {POWERED_BY_SPONSOR.description}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-violet-500/20 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
