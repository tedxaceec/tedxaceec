"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-4 12.73V17h8v-2.27A7 7 0 0 0 12 2z" />
                <path d="M9 18h6M10 22h4" />
            </svg>
        ),
        title: "Innovation",
        description:
            "Pushing the boundaries of what's possible through creative thinking, technological advancement, and bold experimentation that challenges the status quo.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: "Community",
        description:
            "Building a vibrant ecosystem of thinkers, doers, and dreamers who collaborate, support, and inspire each other to create meaningful change.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: "Inspiration",
        description:
            "Sparking curiosity and wonder through powerful stories, breakthrough ideas, and visionary perspectives that ignite the imagination and motivate action.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: "Impact",
        description:
            "Every idea shared at our stage has the potential to ripple outward — transforming communities, industries, and lives far beyond the walls of our auditorium.",
    },
];

/* ─── Value Card ─────────────────────────────────────────────────────────── */
function ValueCard({
    icon,
    title,
    description,
    index,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springCfg = { damping: 30, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springCfg);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springCfg);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.set(card, { opacity: 0, y: 60, scale: 0.95 });
        gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
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
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);

            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    x: x * rect.width * 0.4,
                    y: y * rect.height * 0.4,
                    opacity: 1,
                    duration: 0.3,
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
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative cursor-default"
        >
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-6 backdrop-blur-xl transition-all hover:border-red-500/20 hover:bg-white/5 md:p-8">
                {/* Cursor glow */}
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full opacity-0"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.12) 0%, transparent 70%)",
                    }}
                />

                {/* Bottom accent line */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-all duration-500 group-hover:bg-red-500/15 group-hover:ring-red-500/30 group-hover:shadow-[0_0_25px_-4px_rgba(235,0,40,0.3)]">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-red-50 transition-colors md:text-2xl">
                        {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors md:text-base md:leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function ValuesSection() {
    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] rounded-full bg-red-500/3 blur-[150px]" />
                <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-red-600/3 blur-[120px]" />
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
                        What We Stand For
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Our Core{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                            Values
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl md:leading-relaxed"
                    >
                        These four pillars form the foundation of everything we do at
                        TEDxACE Engineering College.
                    </motion.p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {VALUES.map((value, i) => (
                        <ValueCard key={value.title} {...value} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
