"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsTed() {
    const sectionRef = useRef<HTMLElement>(null);
    const lettersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the large T·E·D letters
            gsap.from(lettersRef.current?.querySelectorAll(".ted-letter") ?? [], {
                y: 100,
                opacity: 0,
                scale: 0.5,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: lettersRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            // Parallax letters
            gsap.to(lettersRef.current, {
                y: -30,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
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
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                    {/* Left — Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                        >
                            The Origin
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                        >
                            What is{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                TED
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
                            <strong className="text-white font-medium">TED</strong> is a
                            nonprofit organization devoted to spreading ideas, usually in the
                            form of short, powerful talks (18 minutes or less). TED began in
                            1984 as a conference where{" "}
                            <strong className="text-white font-medium">Technology</strong>,{" "}
                            <strong className="text-white font-medium">Entertainment</strong>,
                            and <strong className="text-white font-medium">Design</strong>{" "}
                            converged, and today covers almost all topics — from science to
                            business to global issues — in more than 100 languages.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg md:leading-relaxed"
                        >
                            TED&apos;s mission is to discover and spread ideas that spark
                            imagination, embrace possibility, and catalyze impact. Through its
                            open and free initiatives, TED creates a global community fueled
                            by curiosity and wonder.
                        </motion.p>

                        {/* Three pillars */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 grid grid-cols-3 gap-4"
                        >
                            {[
                                { letter: "T", label: "Technology", color: "from-red-500 to-red-600" },
                                { letter: "E", label: "Entertainment", color: "from-red-400 to-red-500" },
                                { letter: "D", label: "Design", color: "from-red-500 to-red-400" },
                            ].map((item) => (
                                <div
                                    key={item.letter}
                                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/3 p-4 text-center backdrop-blur-sm transition-all hover:border-red-500/20 hover:bg-white/5"
                                >
                                    <span
                                        className={`text-2xl font-black text-transparent bg-clip-text bg-linear-to-b ${item.color} md:text-3xl`}
                                    >
                                        {item.letter}
                                    </span>
                                    <p className="mt-1 text-xs font-medium text-neutral-400 uppercase tracking-wider group-hover:text-neutral-300 transition-colors">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Large decorative TED typography */}
                    <div
                        ref={lettersRef}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative select-none">
                            {/* Background glow */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-64 w-64 rounded-full bg-red-500/8 blur-[100px]" />
                            </div>

                            <div className="flex items-baseline gap-2 md:gap-4">
                                {["T", "E", "D"].map((letter, i) => (
                                    <span
                                        key={letter}
                                        className="ted-letter text-[120px] sm:text-[150px] md:text-[180px] lg:text-[200px] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-white/15 to-white/3"
                                        style={{
                                            WebkitTextStroke: "1px rgba(235, 0, 40, 0.15)",
                                        }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </div>

                            {/* Overlay text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-sm font-medium text-neutral-500 tracking-[0.3em] uppercase md:text-base">
                                    Ideas Worth Spreading
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
