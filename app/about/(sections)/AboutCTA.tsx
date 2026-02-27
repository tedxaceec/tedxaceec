"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current!, {
                y: 60,
                opacity: 0,
                scale: 0.96,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-32"
        >
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div
                    ref={cardRef}
                    className="relative overflow-hidden rounded-3xl border border-red-500/15 bg-linear-to-br from-red-500/8 via-red-500/3 to-transparent p-10 text-center backdrop-blur-xl md:p-16"
                >
                    {/* Background glows */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-red-500/10 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-red-600/8 blur-[100px]" />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
                    >
                        Ready to be{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                            inspired
                        </span>
                        ?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto mt-4 max-w-xl text-base text-neutral-400 md:text-lg"
                    >
                        Join us at TEDxACE Engineering College and be part of a community
                        that thrives on ideas that matter. Discover our speakers, explore
                        past events, and stay connected.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Link
                            href="/speakers"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-[0_0_30px_-4px_rgba(235,0,40,0.5)]"
                        >
                            <span className="relative z-10">Meet Our Speakers</span>
                            <svg
                                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                        </Link>

                        <Link
                            href="/gallery"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                        >
                            View Gallery
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
