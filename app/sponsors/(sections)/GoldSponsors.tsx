"use client";

import { motion } from "framer-motion";
import { GOLD_SPONSORS } from "@/data/sponsors";
import type { Sponsor } from "@/data/sponsors";

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
    return (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <span
                className="text-xl font-bold tracking-wider"
                style={{ color: sponsor.color || "#D4A437" }}
            >
                {sponsor.initials}
            </span>
        </div>
    );
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function GoldSponsors() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Ambient amber glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-amber-500/3 blur-[180px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-linear-to-r from-amber-500/10 to-amber-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-400"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                            <path d="M4 22h16" />
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </svg>
                        Gold Partners
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
                    >
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-amber-400 to-yellow-500">
                            Gold
                        </span>{" "}
                        Partners
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
                    {GOLD_SPONSORS.map((sponsor, i) => (
                        <motion.div
                            key={sponsor.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative overflow-hidden rounded-2xl border border-amber-500/10 bg-linear-to-br from-amber-500/5 via-white/3 to-transparent p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/25 hover:bg-white/5"
                        >
                            {/* Inner glow */}
                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/5 blur-[60px] group-hover:bg-amber-500/10 transition-colors duration-700" />

                            <div className="relative z-10">
                                <SponsorLogo sponsor={sponsor} />

                                <span className="mt-4 mb-2 inline-flex items-center gap-1 rounded-full border border-amber-500/15 bg-amber-500/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
                                    Gold Partner
                                </span>

                                <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
                                    {sponsor.name}
                                </h3>

                                {sponsor.tagline && (
                                    <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.15em] text-amber-400/50">
                                        {sponsor.tagline}
                                    </p>
                                )}

                                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                                    {sponsor.description}
                                </p>

                                {sponsor.website && (
                                    <a
                                        href={sponsor.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-amber-400/70 transition-colors duration-200 hover:text-amber-300"
                                    >
                                        Visit Website
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
