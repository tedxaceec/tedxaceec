"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

import allSpeakers from "@/data/speakers.json";

/* ─── Speaker Data ────────────────────────────────────────────────────────── */
type Speaker = {
    name: string;
    title: string;
    topic: string;
    image: string;
    id: string | number;
};

const speakers = allSpeakers
    .filter((s) => s.isFeatured)
    .map((s) => ({
        ...s,
        title: s.role,
    })) as Speaker[];



/* ─── Speaker Card ────────────────────────────────────────────────────────── */
function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (
        <Link href={`/speakers#${speaker.id}`} className="block group relative h-[400px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 sm:h-[480px] sm:w-[360px] md:h-[520px] md:w-[400px]">
            {/* Speaker image: Grayscale to color on hover */}
            <div
                style={{
                    backgroundImage: `url(${speaker.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
                className="absolute inset-0 z-0 scale-100 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 z-1 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Number indicator */}
            <div className="absolute top-6 right-6 z-2 overflow-hidden">
                <span className="block translate-y-0 font-mono text-sm font-medium tracking-wider text-white/50 transition-transform duration-500 group-hover:-translate-y-full">
                    {String(speaker.id).padStart(2, "0")}
                </span>
                <span className="absolute left-0 top-0 block translate-y-full font-mono text-sm font-medium tracking-wider text-red-500 transition-transform duration-500 group-hover:translate-y-0">
                    {String(speaker.id).padStart(2, "0")}
                </span>
            </div>

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-2 flex flex-col justify-end p-6 md:p-8">
                {/* Topic line */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-8 bg-red-500 transition-all duration-500 group-hover:w-12" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                        {speaker.topic}
                    </span>
                </div>

                {/* Name */}
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-white transition-transform duration-500 sm:text-3xl md:text-4xl">
                    {speaker.name}
                </h3>

                {/* Title */}
                <p className="text-sm font-medium text-neutral-400 transition-colors duration-500 group-hover:text-neutral-300 md:text-base">
                    {speaker.title}
                </p>

                {/* Optional view profile text on hover */}
                <div className="mt-6 flex h-0 items-center gap-2 overflow-hidden text-sm font-semibold text-white/90 opacity-0 transition-all duration-500 group-hover:h-5 group-hover:opacity-100">
                    <span>View Profile</span>
                    <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

/* ─── Horizontal Scroll Carousel ──────────────────────────────────────────── */
function SpeakersCarousel() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [endX, setEndX] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Dynamically measure how far we need to scroll
    useEffect(() => {
        const measure = () => {
            if (contentRef.current) {
                const contentWidth = contentRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                // Scroll distance = total content width - one viewport width + right padding
                const distance = contentWidth - viewportWidth + 64;
                setEndX(Math.max(0, distance));
            }
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], [0, -endX]);

    return (
        // Taller on mobile to allow enough scroll distance for the cards to traverse
        <section ref={targetRef} className="relative h-[250vh] md:h-[300vh]">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                {/* ── Section Header (sticky with carousel) ─────────────── */}
                <div className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 md:pb-8 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-300 backdrop-blur-md md:mb-6"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                                Bedrock & Beyond
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                            >
                                Featured <span className="font-light italic text-neutral-400">Speakers</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-3 max-w-xl text-sm text-neutral-400 sm:text-base md:mt-4 md:text-lg"
                            >
                                Visionaries, innovators, and change-makers sharing ideas that challenge perspectives and inspire action.
                            </motion.p>
                        </div>

                        {/* Scroll hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="hidden md:flex flex-col items-end gap-2"
                        >
                            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                                Slide to explore
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="h-px w-12 bg-neutral-800" />
                                <motion.div
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ── Speaker Cards ─────────────────────────────────────── */}
                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    className="flex gap-4 pl-4 pr-4 sm:gap-6 sm:pl-8 sm:pr-8 md:pl-16 md:pr-16 lg:pl-24 lg:pr-24"
                >
                    {speakers.map((speaker) => (
                        <SpeakerCard speaker={speaker} key={speaker.id} />
                    ))}

                    {/* End card — CTA to see all speakers */}
                    <div className="group relative flex h-[400px] w-[260px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-colors duration-500 hover:border-neutral-700 sm:h-[480px] sm:w-[300px] md:h-[520px] md:w-[340px]">
                        <Link href="/speakers" className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-colors duration-500 hover:bg-neutral-800/50">
                            <div className="mb-6 rounded-full border border-red-500/30 bg-red-500/10 p-4 transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/50 group-hover:bg-red-500/20">
                                <svg
                                    className="h-6 w-6 text-red-500 transition-transform duration-500 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-white">Full Lineup</h3>
                            <p className="text-sm font-medium text-neutral-400">Discover all voices shaping the future</p>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─── Main Featured Speakers Section ──────────────────────────────────────── */
export default function FeaturedSpeakers() {
    return (
        <div className="relative">
            {/* ── Background accents ──────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-[20%] h-[600px] w-[600px] rounded-full bg-red-500/3 blur-[150px]" />
                <div className="absolute left-0 bottom-[20%] h-[400px] w-[400px] rounded-full bg-red-500/2 blur-[120px]" />
            </div>

            {/* ── Horizontal Scroll Carousel ──────────────────────────────── */}
            <div className="relative z-10">
                <SpeakersCarousel />
            </div>
        </div>
    );
}
