"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPONSOR_BENEFITS } from "@/data/sponsors";

/* ─── SVG Icons ──────────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
    eye: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    users: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    handshake: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
        </svg>
    ),
    heart: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    ),
};

/* ─── Card animation variants ────────────────────────────────── */
const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

export default function WhySponsor() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-500/3 blur-[200px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        Partnership Benefits
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Why Partner With{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                            TEDx
                        </span>
                        ?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
                    >
                        Align your brand with innovation, inspiration, and the global TEDx movement.
                        Make a lasting impression on tomorrow&apos;s leaders.
                    </motion.p>
                </div>

                {/* Benefits Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                    {SPONSOR_BENEFITS.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-7 md:p-8 backdrop-blur-sm transition-all duration-500 hover:border-red-500/15 hover:bg-red-500/3"
                        >
                            {/* Hover glow */}
                            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative z-10">
                                <div className="flex items-start gap-5">
                                    {/* Icon */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-colors duration-300 group-hover:bg-red-500/15 group-hover:text-red-300">
                                        {ICONS[benefit.icon]}
                                    </div>

                                    <div className="flex-1">
                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-white">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-neutral-500">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Highlights list */}
                                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {benefit.highlights.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2 text-sm text-neutral-400"
                                        >
                                            <span className="h-1 w-1 shrink-0 rounded-full bg-red-500/60" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Corner number */}
                            <span className="absolute top-4 right-4 text-xs font-mono text-red-500/20 group-hover:text-red-500/40 transition-colors duration-300">
                                0{i + 1}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
