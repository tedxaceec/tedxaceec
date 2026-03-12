"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SponsorsComingSoon() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cardRef.current) {
                gsap.from(cardRef.current, {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });

                // Pulsing glow
                gsap.to(cardRef.current, {
                    boxShadow:
                        "0 0 80px 15px rgba(235, 0, 40, 0.08), 0 0 160px 40px rgba(235, 0, 40, 0.04)",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-36"
        >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-red-500/3 blur-[200px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mx-auto max-w-3xl text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-400"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Our Sponsors
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Sponsors &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-500">
                            Partners
                        </span>
                    </motion.h2>
                </div>

                {/* Coming Soon Card */}
                <div
                    ref={cardRef}
                    className="group relative mx-auto overflow-hidden rounded-3xl border border-red-500/10 bg-linear-to-br from-red-500/5 via-white/3 to-transparent backdrop-blur-xl"
                    style={{
                        boxShadow:
                            "0 0 60px 10px rgba(235, 0, 40, 0.04), 0 0 120px 30px rgba(235, 0, 40, 0.02)",
                    }}
                >
                    {/* Inner glow accents */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-500/6 blur-[80px] group-hover:bg-red-500/10 transition-colors duration-700" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-600/4 blur-[60px]" />

                    <div className="relative z-10 flex flex-col items-center py-20 px-8 md:py-28 md:px-12 text-center">
                        {/* Animated icon */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/15 bg-red-500/10"
                        >
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-400"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </motion.div>

                        {/* Coming Soon Text */}
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            Coming{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 via-red-500 to-red-600">
                                Soon
                            </span>
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-5 max-w-lg text-base text-neutral-400 sm:text-lg leading-relaxed"
                        >
                            We&apos;re finalising partnerships with incredible brands
                            and organisations who share our vision. Our sponsors
                            will be revealed here shortly — stay tuned!
                        </motion.p>

                        {/* Decorative divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="mt-8 h-px w-48 bg-linear-to-r from-transparent via-red-500/40 to-transparent"
                        />

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8"
                        >
                            <p className="text-sm text-neutral-500">
                                Interested in sponsoring?
                            </p>
                            <a
                                href="mailto:tedx@aceec.ac.in"
                                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors duration-200 hover:text-red-300"
                            >
                                Reach out to us
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
