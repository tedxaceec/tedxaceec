"use client";

import { motion } from "framer-motion";
import { COMMUNITY_PARTNERS } from "@/data/sponsors";

export default function CommunityPartners() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24 border-t border-b border-white/5">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-neutral-500"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Community &amp; Media Partners
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                    >
                        Our Community
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-3 text-sm text-neutral-500 max-w-md mx-auto"
                    >
                        Media outlets, communities, and organizations that believe in the power of ideas worth spreading.
                    </motion.p>
                </div>

                {/* Partners grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5 max-w-4xl mx-auto">
                    {COMMUNITY_PARTNERS.map((partner, i) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="group flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-white/2 p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/5"
                        >
                            {/* Logo circle */}
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-white/5 transition-colors duration-300 group-hover:border-white/15"
                            >
                                <span
                                    className="text-sm font-bold tracking-wider transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                                    style={{ color: partner.color || "#6B7280" }}
                                >
                                    {partner.initials}
                                </span>
                            </div>

                            {/* Name */}
                            <span className="text-sm font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 text-center">
                                {partner.name}
                            </span>

                            {/* Description */}
                            <span className="text-[10px] uppercase tracking-widest text-neutral-600 group-hover:text-neutral-500 transition-colors duration-300 text-center">
                                {partner.description}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
