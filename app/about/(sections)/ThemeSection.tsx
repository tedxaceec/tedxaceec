"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThemeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bedrockRef = useRef<HTMLDivElement>(null);
    const beyondRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Bedrock slides in from left
            gsap.from(bedrockRef.current!, {
                x: -80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });

            // Beyond slides in from right
            gsap.from(beyondRef.current!, {
                x: 80,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* Center glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-red-500/4 blur-[180px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        Our Theme
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-300 to-neutral-500">
                            Bedrock
                        </span>{" "}
                        <span className="text-neutral-600">&amp;</span>{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                            Beyond
                        </span>
                    </motion.h2>
                </div>

                {/* Split Cards */}
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* Bedrock */}
                    <div
                        ref={bedrockRef}
                        className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/3 p-8 md:p-10 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/5"
                    >
                        {/* Subtle stone texture overlay */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.02]"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                            }}
                        />

                        <div className="relative z-10">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-800 ring-1 ring-white/10">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
                                    <path d="M2 22L12 2l10 20H2z" />
                                    <path d="M12 22V10" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white md:text-3xl">
                                Bedrock
                            </h3>
                            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                                The Foundation
                            </p>

                            <p className="mt-6 text-base leading-relaxed text-neutral-400 md:text-lg md:leading-relaxed">
                                <strong className="text-neutral-200 font-medium">Bedrock</strong>{" "}
                                represents the unwavering foundations upon which we build — the
                                timeless principles of knowledge, resilience, culture, and values
                                that our predecessors laid down for us. It is the solid ground of
                                wisdom, the unyielding bedrock of science, tradition, and human
                                experience that gives us the strength to reach higher.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {["Knowledge", "Resilience", "Heritage", "Values"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Beyond */}
                    <div
                        ref={beyondRef}
                        className="group relative overflow-hidden rounded-3xl border border-red-500/10 bg-linear-to-br from-red-500/5 via-transparent to-transparent p-8 md:p-10 backdrop-blur-sm transition-all hover:border-red-500/20"
                    >
                        {/* Flowing gradient overlay */}
                        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/5 blur-[80px] group-hover:bg-red-500/8 transition-colors duration-700" />
                        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-600/4 blur-[60px]" />

                        <div className="relative z-10">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-500 md:text-3xl">
                                Beyond
                            </h3>
                            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-red-400/60">
                                The Frontier
                            </p>

                            <p className="mt-6 text-base leading-relaxed text-neutral-400 md:text-lg md:leading-relaxed">
                                <strong className="text-red-300 font-medium">Beyond</strong>{" "}
                                represents the limitless horizon of human imagination — the
                                uncharted territories of innovation, technology, and creative
                                disruption. It is the call to push past comfort zones, challenge
                                conventions, and dare to envision a future that doesn&apos;t yet
                                exist. Together, Bedrock &amp; Beyond remind us that the strongest
                                futures are built on the deepest foundations.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {["Innovation", "Imagination", "Disruption", "Future"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-red-500/15 bg-red-500/5 px-3 py-1 text-xs font-medium text-red-400/80"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mx-auto mt-12 max-w-2xl text-center text-base text-neutral-500 italic md:text-lg"
                >
                    &ldquo;The strongest futures are built on the deepest foundations.&rdquo;
                </motion.p>
            </div>
        </section>
    );
}
