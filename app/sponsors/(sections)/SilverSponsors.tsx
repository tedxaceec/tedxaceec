"use client";

import { motion } from "framer-motion";
import { SILVER_SPONSORS, BRONZE_SPONSORS } from "@/data/sponsors";
import type { Sponsor } from "@/data/sponsors";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

function SponsorCard({
    sponsor,
    index,
    tierLabel,
    tierColorBorder,
    tierColorBg,
    tierColorText,
}: {
    sponsor: Sponsor;
    index: number;
    tierLabel: string;
    tierColorBorder: string;
    tierColorBg: string;
    tierColorText: string;
}) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={`group relative overflow-hidden rounded-2xl border ${tierColorBorder} bg-white/3 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/5`}
        >
            <div className="relative z-10">
                {/* Logo placeholder */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-white/8 bg-white/5">
                    <span
                        className="text-lg font-bold tracking-wider"
                        style={{ color: sponsor.color || "#94A3B8" }}
                    >
                        {sponsor.initials}
                    </span>
                </div>

                {/* Tier label */}
                <span
                    className={`mb-2 inline-flex items-center rounded-full border ${tierColorBorder} ${tierColorBg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${tierColorText}`}
                >
                    {tierLabel}
                </span>

                {/* Name & description */}
                <h3 className="mt-2 text-base font-bold text-white md:text-lg">
                    {sponsor.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {sponsor.description}
                </p>
            </div>

            {/* Hover glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/3 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        </motion.div>
    );
}

export default function SilverBronzeSponsors() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Subtle steel glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-neutral-400/3 blur-[160px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* ── Silver Sponsors ────────────────────────────────── */}
                <div className="mb-16 md:mb-20">
                    <div className="mx-auto max-w-3xl text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-400/20 bg-linear-to-r from-neutral-400/10 to-neutral-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-neutral-400"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                            Silver Partners
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
                        >
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-300 via-neutral-400 to-neutral-500">
                                Silver
                            </span>{" "}
                            Partners
                        </motion.h2>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 max-w-5xl mx-auto">
                        {SILVER_SPONSORS.map((sponsor, i) => (
                            <SponsorCard
                                key={sponsor.id}
                                sponsor={sponsor}
                                index={i}
                                tierLabel="Silver Partner"
                                tierColorBorder="border-white/10"
                                tierColorBg="bg-white/5"
                                tierColorText="text-neutral-500"
                            />
                        ))}
                    </div>
                </div>

                {/* ── Divider ───────────────────────────────────────── */}
                <div className="mx-auto mb-16 h-px max-w-md bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* ── Bronze Sponsors ───────────────────────────────── */}
                <div>
                    <div className="mx-auto max-w-3xl text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-linear-to-r from-amber-700/10 to-amber-700/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-600"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                                <path d="M12 2v20" />
                                <path d="M2 12h20" />
                            </svg>
                            Bronze Partners
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                        >
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-amber-700 to-amber-800">
                                Bronze
                            </span>{" "}
                            Partners
                        </motion.h2>
                    </div>

                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 lg:gap-5 max-w-5xl mx-auto">
                        {BRONZE_SPONSORS.map((sponsor, i) => (
                            <SponsorCard
                                key={sponsor.id}
                                sponsor={sponsor}
                                index={i}
                                tierLabel="Bronze"
                                tierColorBorder="border-amber-700/10"
                                tierColorBg="bg-amber-700/5"
                                tierColorText="text-amber-600/80"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
