"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { COLLEGE } from "@/data/about";

/* ─── Animated Counter ───────────────────────────────────────────────────── */
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
        const end = value;
        const duration = 2000;
        const startTime = performance.now();

        const timer = requestAnimationFrame(function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(eased * end);
            if (counterRef.current) counterRef.current.textContent = `${current}${suffix}`;
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
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-6 text-center backdrop-blur-sm transition-all hover:border-red-500/15 hover:bg-white/5"
        >
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-red-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            <span
                ref={counterRef}
                className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 md:text-4xl"
            >
                0{suffix}
            </span>
            <span className="mt-2 block text-xs font-medium uppercase tracking-[0.15em] text-neutral-400 md:text-sm">
                {label}
            </span>
        </motion.div>
    );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function AboutCollege() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-red-500/3 blur-[150px]" />
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
                    {/* Left Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                        >
                            {COLLEGE.tagline}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                        >
                            {COLLEGE.title.split("ACE")[0]}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                ACE
                            </span>
                            {COLLEGE.title.split("ACE")[1]}
                        </motion.h2>

                        <div className="mt-6 space-y-4">
                            {COLLEGE.description.split('\n\n').map((para, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                                    className="text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl md:leading-relaxed"
                                >
                                    {para}
                                </motion.p>
                            ))}
                        </div>
                    </div>

                    {/* Right – Stats Grid */}
                    <div className="college-cards-grid grid grid-cols-2 gap-4">
                        {COLLEGE.stats.map((stat, i) => (
                            <AnimatedStat
                                key={i}
                                value={stat.value}
                                suffix={stat.suffix}
                                label={stat.label}
                                delay={i * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
