"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Users, Lightbulb, Rocket } from "lucide-react";

export default function AboutTedxAce() {
    return (
        <section
            id="about-tedx-ace"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Background layers ───────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                <div className="absolute right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-red-500/5 blur-[120px]" />
                <div className="absolute left-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-red-600/5 blur-[100px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    {/* ── Left Content ──────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400">
                            Our Mission
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            About{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                TEDx
                            </span>{" "}
                            ACE Engineering College
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl md:leading-relaxed">
                            <strong className="text-white font-medium">TEDx ACE Engineering College</strong> is an independently organized event that brings together student innovators, thinkers, and creators to share ideas worth spreading. Located in the heart of our campus, we create a platform to spark deep discussion and connection through powerful ideas.
                        </p>

                        <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg md:leading-relaxed">
                            Our mission is to bring together the most innovative minds, fostering a community of thinkers and doers who are ready to take action and change the world.
                        </p>
                    </motion.div>

                    {/* ── Right Content (Cards) ─────────────────────────────── */}
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 bg-red-500/10 blur-[100px] rounded-full" />
                        <div className="flex flex-col gap-5 relative z-10">
                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/20 group-hover:ring-red-500/40 transition-all">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-red-50 transition-colors">Student Led</h3>
                                        <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                            Organized entirely by a passionate team of student innovators and leaders devoted to uncovering local brilliance.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 lg:translate-x-6"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/20 group-hover:ring-red-500/40 transition-all">
                                        <Lightbulb className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-red-50 transition-colors">Innovative Ideas</h3>
                                        <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                            A melting pot of breakthroughs in technology, design, and humanity shared on a premium stage.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/20 group-hover:ring-red-500/40 transition-all">
                                        <Rocket className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-red-50 transition-colors">Future Leaders</h3>
                                        <p className="mt-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                            Empowering the next generation to take action, disrupt the status quo, and change the world.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>

                {/* ── Image Below (Optional, following V1 format) ─────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 sm:mt-24 lg:mt-32 relative mx-auto max-w-5xl"
                >
                    <div className="absolute inset-0 -z-10 scale-95 rounded-3xl bg-red-500/10 blur-3xl" />
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-md">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                            {/* Assuming an image exists, we use a placeholder styling matching modern tech look */}
                            <Image
                                src="/tedx_world.png" // Since this exists and is used in WhatIsTedx
                                alt="TEDx ACE Engineering College Auditorium"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                priority={false}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                                <h3 className="text-2xl font-bold text-white md:text-4xl">ACE Engineering College</h3>
                                <p className="mt-2 text-sm text-neutral-300 md:text-base">Organized independently. Driven passionately.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
