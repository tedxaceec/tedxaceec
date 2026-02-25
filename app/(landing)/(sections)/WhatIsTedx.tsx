"use client";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion, useInView } from "framer-motion";

/* ─── Animated Counter ────────────────────────────────────────────────────── */
function AnimatedStat({
    value,
    suffix,
    label,
    delay = 0,
}: {
    value: number;
    suffix: string;
    label: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!isInView || !counterRef.current) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const startTime = performance.now();

        const timer = requestAnimationFrame(function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            start = Math.floor(eased * end);
            if (counterRef.current) counterRef.current.textContent = `${start}${suffix}`;
            if (progress < 1) requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(timer);
    }, [isInView, value, suffix]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group flex flex-col items-center text-center"
        >
            <span
                ref={counterRef}
                className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 md:text-5xl lg:text-6xl"
            >
                0{suffix}
            </span>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 md:text-sm">
                {label}
            </span>
        </motion.div>
    );
}

/* ─── Fade-In Card ────────────────────────────────────────────────────────── */
function InfoCard({
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/3 p-6 backdrop-blur-lg transition-all duration-500 hover:border-red-500/20 hover:bg-white/5 hover:shadow-[0_0_40px_-12px_rgba(235,0,40,0.15)] md:p-8"
        >
            {/* Subtle gradient glow on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-br from-red-500/5 via-transparent to-transparent" />

            <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
                    {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400 md:text-base">{description}</p>
            </div>
        </motion.div>
    );
}

/* ─── Globe Component ─────────────────────────────────────────────────────── */
export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0.25,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.92, 0.0, 0.16],
            glowColor: [0.15, 0.15, 0.15],
            markers: [
                // TEDx events around the world
                { location: [17.4065, 78.4772], size: 0.08 }, // Hyderabad (Home!)
                { location: [40.7128, -74.006], size: 0.05 },  // New York
                { location: [51.5074, -0.1278], size: 0.05 },  // London
                { location: [35.6762, 139.6503], size: 0.04 }, // Tokyo
                { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
                { location: [48.8566, 2.3522], size: 0.04 },   // Paris
                { location: [1.3521, 103.8198], size: 0.04 },  // Singapore
                { location: [19.076, 72.8777], size: 0.05 },   // Mumbai
                { location: [28.6139, 77.209], size: 0.05 },   // Delhi
                { location: [12.9716, 77.5946], size: 0.05 },  // Bangalore
            ],
            onRender: (state: Record<string, number>) => {
                state.phi = phi;
                phi += 0.005;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className}
        />
    );
}

/* ─── Icons ───────────────────────────────────────────────────────────────── */
function IdeaIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.73V17h8v-2.27A7 7 0 0 0 12 2z" />
        </svg>
    );
}

function CommunityIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function GlobalIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

/* ─── Main Section ────────────────────────────────────────────────────────── */
export default function WhatIsTedx() {
    return (
        <section
            id="what-is-tedx"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Background layers ───────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Top gradient fade */}
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
                {/* Radial glow behind globe */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-red-500/3 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ──────────────────────────────────────── */}
                <div className="mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400 bg-linear-to-r from-red-500/10 to-red-500/5"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                        Ideas Worth Spreading
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
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
                        In the spirit of <strong className="text-white font-medium">ideas worth spreading</strong>, TEDx is a program
                        of local, self-organized events that bring people together to share a TED-like experience.
                        At a TEDx event, <strong className="text-white font-medium">TEDTalks videos</strong> and{" "}
                        <strong className="text-white font-medium">live speakers</strong> combine to spark deep
                        conversation and connection in a small group.
                    </motion.p>
                </div>

                {/* ── Globe + Explainer Grid ──────────────────────────────── */}
                <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Globe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Glow ring around globe */}
                        <div className="absolute h-[420px] w-[420px] rounded-full border border-white/4 md:h-[520px] md:w-[520px]" />
                        <div className="absolute h-[340px] w-[340px] rounded-full border border-white/3 md:h-[440px] md:w-[440px]" />
                        <Globe className="relative z-10" />
                    </motion.div>

                    {/* Info Cards */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        <InfoCard
                            icon={<IdeaIcon />}
                            title="Independently Organized"
                            description="TEDx events are independently organized under a free license from TED. Our event, TEDxACE Engineering College, follows TED's format and guidelines while showcasing local voices."
                            delay={0.1}
                        />
                        <InfoCard
                            icon={<CommunityIcon />}
                            title="Community Driven"
                            description="TEDx creates a unique gathering bringing together bright minds — curating thought-provoking talks, performances, and conversations that spark ideas and inspire action."
                            delay={0.2}
                        />
                        <InfoCard
                            icon={<GlobalIcon />}
                            title="Global Movement"
                            description="With thousands of events held across 170+ countries, TEDx has become the world's largest platform for sharing transformative ideas — from local campuses to global stages."
                            delay={0.3}
                        />
                    </div>
                </div>

                {/* ── What does the x stand for? ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mx-auto mt-24 max-w-4xl text-center"
                >
                    <div className="relative inline-block">
                        <span className="text-[120px] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-red-500/30 to-red-500/5 sm:text-[160px] md:text-[200px] select-none">
                            x
                        </span>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white md:text-2xl whitespace-nowrap">
                            = independently organized
                        </span>
                    </div>
                    <p className="mt-4 text-sm text-neutral-500 md:text-base max-w-xl mx-auto">
                        The <strong className="text-red-400 font-semibold">x</strong> in TEDx stands for independently organized TED events.
                        While they follow the TED format, these events are planned and coordinated by passionate local organizers.
                    </p>
                </motion.div>

                {/* ── Statistics ───────────────────────────────────────────── */}
                <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                    <AnimatedStat value={3000} suffix="+" label="Events per year" delay={0} />
                    <AnimatedStat value={170} suffix="+" label="Countries" delay={0.1} />
                    <AnimatedStat value={100} suffix="K+" label="Talks online" delay={0.2} />
                    <AnimatedStat value={8} suffix="B+" label="Views & counting" delay={0.3} />
                </div>

                {/* ── Divider Line ─────────────────────────────────────────── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mx-auto mt-24 h-px max-w-lg bg-linear-to-r from-transparent via-red-500/30 to-transparent"
                />
            </div>
        </section>
    );
}