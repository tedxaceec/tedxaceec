"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const SPEAKER_CTA = {
    badge: "Call for Speakers",
    title: {
        part1: "Want to be our next",
        highlight: "TEDx Speaker",
        part2: "?",
    },
    description:
        "Have an idea worth spreading? We're looking for passionate individuals with unique perspectives to take the TEDx stage. Share your story, inspire an audience of 2,000+, and join a global community of thought leaders.",
    contactEmail: "tedx@aceec.ac.in",
    primaryCTA: {
        text: "Apply to Speak",
        href: "/contact",
    },
    secondaryCTA: {
        text: "Learn More",
        href: "/about",
    },
    brochureCTA: {
        text: "Download Brochure",
        href: "https://drive.google.com/file/d/15BSr16Cde7agsyC2I-zpTKmfdMIsX3Qg/view?usp=sharing",
    },
    notice:
        "This independent TEDx event is operated under license from TED. Speaker selection is curated by the TEDxACEEC organising committee.",
};

export default function SpeakerCTA() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            {/* Background glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-red-500/5 blur-[200px]" />
                <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-red-600/4 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative overflow-hidden rounded-3xl border border-red-500/15"
                >
                    {/* Card gradient background */}
                    <div className="absolute inset-0 bg-linear-to-br from-red-500/8 via-red-600/5 to-neutral-950" />

                    {/* Noise texture */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                            backgroundSize: "128px 128px",
                        }}
                    />

                    {/* Inner glow orbs */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-red-600/8 blur-[60px]" />

                    <div className="relative z-10 flex flex-col items-center gap-6 py-16 px-8 md:py-20 md:px-12 text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                        >
                            <Mic className="h-3.5 w-3.5" />
                            {SPEAKER_CTA.badge}
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl max-w-2xl"
                        >
                            {SPEAKER_CTA.title.part1}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                {SPEAKER_CTA.title.highlight}
                            </span>
                            {SPEAKER_CTA.title.part2}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
                        >
                            {SPEAKER_CTA.description.split("TEDx").map((text, i, arr) => (
                                <span key={i}>
                                    {text}
                                    {i < arr.length - 1 && (
                                        <span className="text-white font-medium">TEDx</span>
                                    )}
                                </span>
                            ))}
                        </motion.p>

                        {/* Contact info */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                            className="flex items-center gap-2 text-sm text-neutral-500"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            {SPEAKER_CTA.contactEmail}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-2"
                        >
                            {/* Primary */}
                            <Link
                                href={SPEAKER_CTA.primaryCTA.href}
                                className="relative px-8 py-3.5 text-sm font-semibold tracking-wide uppercase text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(235,0,40,0.35)] group"
                            >
                                <span className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 transition-opacity duration-300" />
                                <span className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-white/20" />
                                <span className="relative z-10 flex items-center gap-2">
                                    {SPEAKER_CTA.primaryCTA.text}
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>

                            {/* Secondary */}
                            <Link
                                href={SPEAKER_CTA.secondaryCTA.href}
                                className="px-8 py-3.5 text-sm font-semibold tracking-wide uppercase text-neutral-300 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:text-white"
                            >
                                {SPEAKER_CTA.secondaryCTA.text}
                            </Link>

                            {/* Brochure Download */}
                            <a
                                href={SPEAKER_CTA.brochureCTA.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 text-sm font-semibold tracking-wide uppercase text-neutral-300 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:text-white flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {SPEAKER_CTA.brochureCTA.text}
                            </a>
                        </motion.div>

                        {/* TED notice */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-4 text-[10px] leading-relaxed text-neutral-600 max-w-md"
                        >
                            {SPEAKER_CTA.notice}
                        </motion.p>
                    </div>

                    <div className="h-px w-full bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
