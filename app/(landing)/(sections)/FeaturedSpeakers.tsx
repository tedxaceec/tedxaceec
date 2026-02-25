"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

/* ─── Speaker Data ────────────────────────────────────────────────────────── */
type Speaker = {
    name: string;
    title: string;
    topic: string;
    image: string;
    id: number;
};

const speakers: Speaker[] = [
    {
        name: "Speaker TBA",
        title: "Innovation & Entrepreneurship",
        topic: "Building Tomorrow's Foundations",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=80",
        id: 1,
    },
    {
        name: "Speaker TBA",
        title: "Technology & AI",
        topic: "The Intelligence Revolution",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80",
        id: 2,
    },
    {
        name: "Speaker TBA",
        title: "Education & Research",
        topic: "Reimagining Learning",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop&q=80",
        id: 3,
    },
    {
        name: "Speaker TBA",
        title: "Arts & Culture",
        topic: "Stories That Shape Us",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&q=80",
        id: 4,
    },
    {
        name: "Speaker TBA",
        title: "Social Impact",
        topic: "Beyond the Bedrock",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&q=80",
        id: 5,
    },
    {
        name: "Speaker TBA",
        title: "Science & Discovery",
        topic: "Frontiers of Knowledge",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964e07a?w=800&h=1000&fit=crop&q=80",
        id: 6,
    },
    {
        name: "Speaker TBA",
        title: "Sustainability & Future",
        topic: "A Greener Tomorrow",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop&q=80",
        id: 7,
    },
];

/* ─── Speaker Card ────────────────────────────────────────────────────────── */
function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (
        <div className="group relative h-[480px] w-[360px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-neutral-900 md:h-[520px] md:w-[400px]">
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
                <h3 className="mb-1 text-3xl font-bold tracking-tight text-white transition-transform duration-500 md:text-4xl">
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
        </div>
    );
}

/* ─── Horizontal Scroll Carousel ──────────────────────────────────────────── */
function SpeakersCarousel() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-6 pl-8 md:pl-16 lg:pl-24">
                    {speakers.map((speaker) => (
                        <SpeakerCard speaker={speaker} key={speaker.id} />
                    ))}

                    {/* End card — CTA to see all speakers */}
                    <div className="group relative flex h-[480px] w-[300px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-colors duration-500 hover:border-neutral-700 md:h-[520px] md:w-[340px]">
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

            {/* ── Section Header ──────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 sm:px-6 md:pt-32 lg:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-300 backdrop-blur-md"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                            Bedrock & Beyond
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
                        >
                            Featured <span className="font-light italic text-neutral-400">Speakers</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 max-w-xl text-base text-neutral-400 md:text-lg"
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

            {/* ── Horizontal Scroll Carousel ──────────────────────────────── */}
            <div className="relative z-10 mt-12 md:mt-16">
                <SpeakersCarousel />
            </div>
        </div>
    );
}
