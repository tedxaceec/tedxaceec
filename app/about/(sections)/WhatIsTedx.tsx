"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Interactive Tilt Card ──────────────────────────────────────────────── */
function GlassCard({
    icon,
    title,
    description,
    index = 0,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springCfg = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springCfg);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springCfg);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });

        gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === card) st.kill();
            });
        };
    }, [index]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((e.clientY - rect.top) / rect.height - 0.5);

            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    x: ((e.clientX - rect.left) / rect.width - 0.5) * rect.width * 0.5,
                    y: ((e.clientY - rect.top) / rect.height - 0.5) * rect.height * 0.5,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            }
        },
        [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
        if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-default"
        >
            <div className="relative overflow-hidden rounded-2xl border border-red-500/10 bg-white/3 p-6 backdrop-blur-xl transition-all hover:border-red-500/25 hover:bg-white/5 md:p-8">
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full opacity-0"
                    style={{
                        background: "radial-gradient(circle, rgba(235,0,40,0.12) 0%, transparent 70%)",
                    }}
                />
                <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-all group-hover:bg-red-500/15 group-hover:ring-red-500/30 group-hover:shadow-[0_0_20px_-4px_rgba(235,0,40,0.25)]">
                        {icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-50 transition-colors md:text-xl">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors md:text-base">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function LicenseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a7 7 0 0 0-4 12.73V17h8v-2.27A7 7 0 0 0 12 2z" />
            <path d="M9 18h6M10 22h4" />
        </svg>
    );
}
function SpeakerIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
    );
}
function HeartIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function WhatIsTedx() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-500/3 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                        Independently Organized
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        What is{" "}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                TEDx
                            </span>
                            <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                        </span>
                        ?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl md:leading-relaxed"
                    >
                        In the spirit of{" "}
                        <strong className="text-white font-medium">ideas worth spreading</strong>,
                        TEDx is a program of local, self-organized events that bring people together
                        to share a TED-like experience. At a TEDx event, TEDTalks videos and live
                        speakers combine to spark deep conversation and connection.
                    </motion.p>
                </div>

                {/* x = independently organized */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <div className="relative inline-block">
                        <span className="text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-red-500/25 to-red-500/5 select-none">
                            x
                        </span>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-white md:text-xl whitespace-nowrap">
                            = independently organized
                        </span>
                    </div>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <GlassCard
                        icon={<LicenseIcon />}
                        title="Free License from TED"
                        description="TEDx events are planned and organized independently, under a free license granted by TED. They follow TED's format and guidelines to maintain the quality and spirit of TED."
                        index={0}
                    />
                    <GlassCard
                        icon={<SpeakerIcon />}
                        title="Live Speakers & TED Talks"
                        description="Each TEDx event features a mix of live presenters and TED Talk videos, creating a unique blend of globally-curated and locally-sourced perspectives."
                        index={1}
                    />
                    <GlassCard
                        icon={<HeartIcon />}
                        title="Community Connection"
                        description="By bringing people together in a small group setting, TEDx events spark deep discussions, new friendships, and lasting connections within local communities."
                        index={2}
                    />
                </div>
            </div>
        </section>
    );
}
