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
        <div className="group relative h-[480px] w-[360px] shrink-0 cursor-pointer overflow-hidden rounded-2xl md:h-[520px] md:w-[400px]">
            {/* Speaker image with zoom on hover */}
            <div
                style={{
                    backgroundImage: `url(${speaker.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
                className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark overlay gradient — stronger at bottom */}
            <div className="absolute inset-0 z-1 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

            {/* Red accent line at top */}
            <div className="absolute top-0 left-0 right-0 z-2 h-[2px] bg-linear-to-r from-transparent via-red-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Speaker number */}
            <div className="absolute top-5 right-5 z-2">
                <span className="text-xs font-mono tracking-widest text-white/30 transition-colors duration-300 group-hover:text-red-400/60">
                    {String(speaker.id).padStart(2, "0")}
                </span>
            </div>

            {/* TEDx badge */}
            <div className="absolute top-5 left-5 z-2">
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span className="text-[10px] font-medium uppercase tracking-widest text-white/80">
                        Speaker
                    </span>
                </div>
            </div>

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-2 p-6 md:p-8">
                {/* Topic tag */}
                <div className="mb-3 overflow-hidden">
                    <span className="inline-block text-xs font-medium uppercase tracking-widest text-red-400 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                        {speaker.topic}
                    </span>
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
                    {speaker.name}
                </h3>

                {/* Title */}
                <p className="mt-1 text-sm text-neutral-400 transition-all duration-500 group-hover:text-neutral-300">
                    {speaker.title}
                </p>

                {/* View profile link — slides in on hover */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-red-400 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
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

            {/* Corner accent */}
            <div className="absolute bottom-0 right-0 z-2 h-16 w-16 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full border border-red-500/20" />
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
                    <div className="flex h-[480px] w-[300px] shrink-0 items-center justify-center rounded-2xl border border-white/6 bg-white/3 md:h-[520px] md:w-[340px]">
                        <Link
                            href="/speakers"
                            className="group flex flex-col items-center gap-4 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 transition-all duration-300 group-hover:bg-red-500/20 group-hover:scale-110">
                                <svg
                                    className="h-6 w-6 text-red-400 transition-transform duration-300 group-hover:translate-x-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-white">View All Speakers</span>
                            <span className="text-sm text-neutral-500">Explore the full lineup</span>
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
                            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                            Bedrock & Beyond
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            Featured{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                Speakers
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-4 max-w-xl text-base text-neutral-400 sm:text-lg"
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
                        className="hidden md:flex items-center gap-3 text-sm text-neutral-500"
                    >
                        <span className="uppercase tracking-widest text-xs">Scroll to explore</span>
                        <div className="flex items-center gap-1">
                            <motion.div
                                animate={{ x: [0, 6, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg className="h-5 w-5 text-red-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
