"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

/* ─── Interactive 3D Tilt Card with GSAP ──────────────────────────────────── */
function InfoCard({
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
    const borderRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Framer Motion values for smooth tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

    // GSAP scroll-triggered entrance
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Set initial state
        gsap.set(card, {
            opacity: 0,
            y: 80,
            scale: 0.92,
        });

        // Animated border shimmer
        if (borderRef.current) {
            gsap.to(borderRef.current, {
                backgroundPosition: "200% 0",
                duration: 3,
                ease: "none",
                repeat: -1,
            });
        }

        // Scroll-triggered entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none",
            },
        });

        tl.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
        });

        // Parallax content float on scroll
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                y: -10,
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === card) st.kill();
            });
        };
    }, [index]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const card = cardRef.current;
            const glow = glowRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            mouseX.set(x);
            mouseY.set(y);

            // Move the glow to follow cursor
            if (glow) {
                gsap.to(glow, {
                    x: x * rect.width * 0.6,
                    y: y * rect.height * 0.6,
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

        if (glowRef.current) {
            gsap.to(glowRef.current, {
                x: 0,
                y: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }, [mouseX, mouseY]);

    const handleMouseEnter = useCallback(() => {
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                opacity: 1,
                duration: 0.3,
            });
        }
        // Scale bump on hover
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    }, []);

    const handleMouseLeaveScale = useCallback(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
            });
        }
        handleMouseLeave();
    }, [handleMouseLeave]);

    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 1200,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveScale}
            className="group relative cursor-default"
        >
            {/* Animated gradient border */}
            <div
                ref={borderRef}
                className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(235,0,40,0.3), rgba(235,0,40,0.6), rgba(235,0,40,0.3), transparent)",
                    backgroundSize: "200% 100%",
                }}
            />

            {/* Card body */}
            <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/3 p-6 backdrop-blur-xl md:p-8">
                {/* Cursor-following glow */}
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full opacity-0"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.15) 0%, rgba(235,0,40,0.05) 40%, transparent 70%)",
                    }}
                />

                {/* Content */}
                <div ref={contentRef} className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                    {/* Icon with animated ring */}
                    <div className="relative mb-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 transition-all duration-500 group-hover:bg-red-500/15 group-hover:ring-red-500/40 group-hover:shadow-[0_0_20px_-4px_rgba(235,0,40,0.3)]">
                            {icon}
                        </div>
                        {/* Pulse ring on hover */}
                        <div className="absolute inset-0 flex h-14 w-14 items-center justify-center">
                            <div className="h-14 w-14 rounded-xl border border-red-500/0 transition-all duration-700 group-hover:h-18 group-hover:w-18 group-hover:border-red-500/10 group-hover:opacity-0" />
                        </div>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-red-50 md:text-xl">
                        {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300 md:text-base">
                        {description}
                    </p>

                    {/* Animated arrow on hover */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-red-400/0 transition-all duration-500 group-hover:text-red-400">
                        <span>Learn more</span>
                        <svg
                            className="h-4 w-4 -translate-x-2 transition-transform duration-500 group-hover:translate-x-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Globe Component (Optimized) ─────────────────────────────────────────── */
/*
 * Performance optimizations applied:
 *   1. Dynamic import    — `cobe` is code-split, only loaded when the globe is near viewport
 *   2. Lazy init         — IntersectionObserver triggers creation ~200px before visible
 *   3. Pause / resume    — animation loop freezes when off-screen (saves GPU cycles)
 *   4. Reduced samples   — mapSamples: 4000 (was 16000, ~75 % less CPU for texture build)
 *   5. Adaptive DPR      — capped at 1.5 to avoid rendering 4x pixels on HiDPI displays
 *   6. Smaller canvas    — 600px (was 800px), still looks crisp at the half-visible size
 */
function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<ReturnType<typeof import("cobe")["default"]> | null>(null);
    const phiRef = useRef(0);
    const isPausedRef = useRef(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;

        let destroyed = false;

        // ── IntersectionObserver: lazy init + pause/resume ──
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                if (entry.isIntersecting) {
                    // First time visible → create globe
                    if (!globeInstanceRef.current && !destroyed) {
                        initGlobe(canvas);
                    }
                    // Resume animation
                    isPausedRef.current = false;
                } else {
                    // Pause when off-screen
                    isPausedRef.current = true;
                }
            },
            {
                // Start loading 200px before the section enters viewport
                rootMargin: "200px 0px",
                threshold: 0,
            }
        );

        observer.observe(wrapper);

        async function initGlobe(canvasEl: HTMLCanvasElement) {
            try {
                // Dynamic import — cobe is only fetched when actually needed
                const { default: createGlobe } = await import("cobe");

                if (destroyed) return;

                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

                globeInstanceRef.current = createGlobe(canvasEl, {
                    devicePixelRatio: dpr,
                    width: 600 * dpr,
                    height: 600 * dpr,
                    phi: 0,
                    theta: 0.25,
                    dark: 1,
                    diffuse: 1.2,
                    mapSamples: 4000,
                    mapBrightness: 6,
                    baseColor: [0.3, 0.3, 0.3],
                    markerColor: [0.92, 0.0, 0.16],
                    glowColor: [0.15, 0.15, 0.15],
                    markers: [
                        { location: [17.4065, 78.4772], size: 0.08 },
                        { location: [40.7128, -74.006], size: 0.05 },
                        { location: [51.5074, -0.1278], size: 0.05 },
                        { location: [35.6762, 139.6503], size: 0.04 },
                        { location: [-33.8688, 151.2093], size: 0.04 },
                        { location: [48.8566, 2.3522], size: 0.04 },
                        { location: [1.3521, 103.8198], size: 0.04 },
                        { location: [19.076, 72.8777], size: 0.05 },
                        { location: [28.6139, 77.209], size: 0.05 },
                        { location: [12.9716, 77.5946], size: 0.05 },
                    ],
                    onRender: (state: Record<string, number>) => {
                        if (!isPausedRef.current) {
                            phiRef.current += 0.004;
                        }
                        state.phi = phiRef.current;
                    },
                });

                setIsLoaded(true);
            } catch {
                // cobe failed to load — fail silently, user sees the skeleton
                console.warn("Globe: failed to load cobe library");
            }
        }

        return () => {
            destroyed = true;
            observer.disconnect();
            if (globeInstanceRef.current) {
                globeInstanceRef.current.destroy();
                globeInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div ref={wrapperRef} className={`relative ${className ?? ""}`}>
            {/* Loading skeleton — shown until globe WebGL is ready */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[400px] w-[400px] animate-pulse rounded-full bg-white/3 md:h-[500px] md:w-[500px]" />
                </div>
            )}
            <canvas
                ref={canvasRef}
                style={{
                    width: 600,
                    height: 600,
                    maxWidth: "100%",
                    aspectRatio: 1,
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.8s ease-in-out",
                }}
            />
        </div>
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
    const sectionRef = useRef<HTMLElement>(null);

    // GSAP parallax for the globe on scroll
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const globeWrapper = section.querySelector<HTMLElement>("#globe-wrapper");
        if (globeWrapper) {
            gsap.fromTo(
                globeWrapper,
                { y: 60 },
                {
                    y: -60,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === section) st.kill();
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="what-is-tedx"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Background layers ───────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 h-[900px] w-[900px] rounded-full bg-red-500/3 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ──────────────────────────────────────── */}
                <div className="mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
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

                {/* ── Globe (half-visible) + Cards Grid ───────────────────── */}
                <div className="relative mt-20 lg:mt-28">
                    {/* Globe — pinned to the left, only right half visible */}
                    <div
                        id="globe-wrapper"
                        className="pointer-events-none absolute -left-[300px] top-1/2 -translate-y-1/2 z-0 hidden lg:block"
                    >
                        {/* Concentric rings */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-white/4" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[580px] w-[580px] rounded-full border border-white/3" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[460px] rounded-full border border-white/2" />
                        <Globe />
                    </div>

                    {/* Mobile globe — centered, top-cropped */}
                    <div className="relative mx-auto mb-12 flex h-[280px] items-end justify-center overflow-hidden lg:hidden">
                        <div className="absolute -bottom-[320px]">
                            <Globe />
                        </div>
                        {/* Fade-out edges */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-background" />
                    </div>

                    {/* Info Cards — offset to the right on desktop */}
                    <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:ml-[280px]">
                        <InfoCard
                            icon={<IdeaIcon />}
                            title="Independently Organized"
                            description="TEDx events are independently organized under a free license from TED. Our event, TEDxACE Engineering College, follows TED's format and guidelines while showcasing local voices."
                            index={0}
                        />
                        <InfoCard
                            icon={<CommunityIcon />}
                            title="Community Driven"
                            description="TEDx creates a unique gathering bringing together bright minds — curating thought-provoking talks, performances, and conversations that spark ideas and inspire action."
                            index={1}
                        />
                        <InfoCard
                            icon={<GlobalIcon />}
                            title="Global Movement"
                            description="With thousands of events held across 170+ countries, TEDx has become the world's largest platform for sharing transformative ideas — from local campuses to global stages."
                            index={2}
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