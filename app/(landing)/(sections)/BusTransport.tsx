"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, Clock, ArrowRight, Route } from "lucide-react";

const BUS_ROUTES_PDF_URL =
    "https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view?usp=sharing";

/* ─── Route Highlight Card ────────────────────────────────────────────── */
function FeatureCard({
    icon,
    title,
    description,
    delay = 0,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:bg-white/5"
        >
            {/* Hover glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(235,0,40,0.06) 0%, transparent 70%)",
                }}
            />
            <div className="relative z-10 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-all duration-300 group-hover:bg-red-500/15 group-hover:ring-red-500/30">
                    {icon}
                </div>
                <div>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                        {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Section ────────────────────────────────────────────────────── */
export default function BusTransport() {
    const features = [
        {
            icon: <Route className="h-5 w-5" />,
            title: "Multiple Routes Covered",
            description:
                "We cover all major areas and pickup points across the city so getting to TEDxACEEC is hassle-free.",
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Convenient Timings",
            description:
                "Buses are scheduled to ensure you arrive on time and return comfortably after the event.",
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            title: "Designated Pickup Points",
            description:
                "Clear and accessible pickup locations along each route. Check the PDF for your nearest stop.",
        },
    ];

    return (
        <section
            id="bus-transport"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Background layers ──────────────────────────────────────── */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                {/* Top fade */}
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
                {/* Bus-themed ambient glow (shifted slightly left) */}
                <div
                    className="absolute left-1/3 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.2) 0%, transparent 60%)",
                        filter: "blur(120px)",
                    }}
                />
                {/* Right glow */}
                <div
                    className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full opacity-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.25) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* ── Top decorative line ──────────────────────────────────────── */}
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

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ─────────────────────────────────────── */}
                <div className="mx-auto max-w-3xl text-center">
                    {/* Tagline badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <Bus className="h-3.5 w-3.5" />
                        College Bus Service
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                    >
                        We Provide{" "}
                        <span className="bg-linear-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                            College Bus
                        </span>{" "}
                        Transportation
                    </motion.h2>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl"
                    >
                        Don&apos;t worry about how to get here — our college
                        buses cover major routes across the region. Find your
                        perfect bus route and timings below!
                    </motion.p>
                </div>

                {/* ── Feature Cards ──────────────────────────────────────── */}
                <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <FeatureCard
                            key={i}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={0.1 + i * 0.1}
                        />
                    ))}
                </div>

                {/* ── CTA Button ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-14 text-center"
                >
                    <a
                        href={BUS_ROUTES_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-red-600 px-10 py-5 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-500 hover:shadow-xl hover:shadow-red-500/35 sm:text-lg"
                    >
                        {/* Shine effect */}
                        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Bus className="relative z-10 h-5 w-5" />
                        <span className="relative z-10">
                            View Bus Routes & Timings
                        </span>
                        <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <p className="mt-4 text-sm text-neutral-500">
                        📄 Opens as PDF · Bus routes, stops & departure timings
                    </p>
                </motion.div>
            </div>

            {/* ── Bottom decorative line ──────────────────────────────────── */}
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
