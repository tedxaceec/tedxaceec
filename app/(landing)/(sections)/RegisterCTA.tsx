"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Ticket } from "lucide-react";

const REGISTER_URL =
    "https://events.studenttribe.in/event/69abeff62aa8ba7856944b10";

export default function RegisterCTA() {
    return (
        <section
            id="register-cta"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Ambient background glow ─────────────────────────────── */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                {/* Top-left red glow */}
                <div
                    className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.35) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                {/* Bottom-right red glow */}
                <div
                    className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.3) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                {/* Subtle center glow */}
                <div
                    className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.25) 0%, transparent 60%)",
                        filter: "blur(100px)",
                    }}
                />
            </div>

            {/* ── Decorative horizontal line ──────────────────────────── */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 right-0 top-0 h-px origin-left"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(235,0,40,0.3), transparent)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* ── Tagline badge ────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <Ticket className="h-3.5 w-3.5" />
                        Limited Seats Available
                    </motion.div>

                    {/* ── Headline ─────────────────────────────────────── */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        Be Part of{" "}
                        <span className="bg-linear-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                            Something
                        </span>{" "}
                        Extraordinary
                    </motion.h2>

                    {/* ── Subtext ──────────────────────────────────────── */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl"
                    >
                        Join us for an unforgettable day of inspiring talks,
                        innovative ideas, and meaningful connections. Secure your
                        spot at TEDxACEEC before it&apos;s too late.
                    </motion.p>

                    {/* ── CTA Button ───────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-10"
                    >
                        <a
                            href={REGISTER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-500 hover:shadow-xl hover:shadow-red-500/30 sm:px-10 sm:py-5 sm:text-lg"
                        >
                            {/* Shine effect */}
                            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                            <span className="relative z-10">
                                Register Now
                            </span>
                            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </motion.div>

                    {/* ── Supporting detail ────────────────────────────── */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-6 text-sm text-neutral-500"
                    >
                        Free registration · Open to all · In-person event
                    </motion.p>
                </div>
            </div>

            {/* ── Bottom decorative line ──────────────────────────────── */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-right"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(235,0,40,0.3), transparent)",
                }}
            />
        </section>
    );
}
