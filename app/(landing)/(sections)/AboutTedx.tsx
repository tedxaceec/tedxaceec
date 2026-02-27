"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Users, Lightbulb, Rocket } from "lucide-react";

/* ─── Lazy-load UnicornScene so it only runs on the client ──────────────── */
const UnicornScene = dynamic(() => import("unicornstudio-react/next"), {
    ssr: false,
});

/* ─── Constants ─────────────────────────────────────────────────────────── */
const UNICORN_PROJECT_ID = "0EnUnnlviUGXw9gzG8lh";
const UNICORN_SDK_URL =
    "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

import homeData from "@/data/home.json";

const iconMap = {
    Users,
    Lightbulb,
    Rocket
};

export default function AboutTedxAce() {
    const { aboutTedxAce } = homeData;
    const embedRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    /* Remove Unicorn Studio watermark using MutationObserver */
    useEffect(() => {
        if (!isMounted) return;

        const container = embedRef.current;
        if (!container) return;

        const removeWatermark = () => {
            // Target by href attribute
            container
                .querySelectorAll<HTMLAnchorElement>('a[href*="unicorn.studio"]')
                .forEach((el) => {
                    el.style.display = "none";
                    el.style.visibility = "hidden";
                    el.style.opacity = "0";
                    el.style.pointerEvents = "none";
                    el.style.height = "0";
                    el.style.overflow = "hidden";
                    el.remove();
                });

            // Also target by image alt text
            container
                .querySelectorAll<HTMLImageElement>('img[alt*="unicorn"]')
                .forEach((el) => {
                    const parent = el.closest("a");
                    if (parent) parent.remove();
                    else el.remove();
                });
        };

        // Fire immediately
        removeWatermark();

        // Watch for dynamically injected watermark
        const observer = new MutationObserver(() => removeWatermark());
        observer.observe(container, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [isMounted]);

    return (
        <section
            id="about-tedx-ace"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* ── Left Content ──────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400">
                            {aboutTedxAce.tagline}
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            {/* We split by TEDx to keep the red styling */}
                            {aboutTedxAce.title.split("TEDx")[0]}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                TEDx
                            </span>
                            {aboutTedxAce.title.split("TEDx")[1]}
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl md:leading-relaxed whitespace-pre-line">
                            {aboutTedxAce.description}
                        </p>
                    </motion.div>

                    {/* ── Right Content (Cards) ─────────────────────────────── */}
                    <div className="relative">
                        <div className="flex flex-col gap-5 relative z-10">
                            {aboutTedxAce.cards.map((card, index) => {
                                const Icon = iconMap[card.icon as keyof typeof iconMap] || Rocket;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`group relative overflow-hidden rounded-2xl border border-red-500/20 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 ${index === 1 ? 'lg:translate-x-6' : ''}`}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                        <div className="flex items-start gap-5">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/20 group-hover:ring-red-500/40 transition-all">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white group-hover:text-red-50 transition-colors">{card.title}</h3>
                                                <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
