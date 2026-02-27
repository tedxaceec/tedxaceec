"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            tl.from(titleRef.current?.querySelectorAll(".word") ?? [], {
                y: 80,
                opacity: 0,
                rotateX: -90,
                stagger: 0.08,
                duration: 1,
                ease: "power4.out",
            })
                .from(
                    subtitleRef.current!,
                    { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .from(
                    lineRef.current!,
                    { scaleX: 0, duration: 1.2, ease: "power3.inOut" },
                    "-=0.5"
                );

            // Parallax on scroll
            gsap.to(titleRef.current, {
                y: -60,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-[70vh] md:min-h-[80vh] items-center justify-center overflow-hidden"
        >
            {/* Background glows */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-500/5 blur-[180px]" />
                <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-red-600/3 blur-[120px]" />
                <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-red-500/4 blur-[100px]" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-red-400"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    Discover Our Story
                </motion.div>

                <h1
                    ref={titleRef}
                    className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ perspective: "1000px" }}
                >
                    <span className="word inline-block">About&nbsp;</span>
                    <span className="word inline-block text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                        TEDx
                    </span>
                    <br className="hidden sm:block" />
                    <span className="word inline-block">ACE&nbsp;</span>
                    <span className="word inline-block">Engineering&nbsp;</span>
                    <span className="word inline-block">College</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 sm:text-xl md:text-2xl"
                >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-500 font-semibold">
                        Bedrock &amp; Beyond
                    </span>{" "}
                    — Ideas Worth Spreading
                </p>

                <div
                    ref={lineRef}
                    className="mx-auto mt-10 h-px max-w-xs bg-linear-to-r from-transparent via-red-500/50 to-transparent"
                />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500">
                            Scroll
                        </span>
                        <div className="h-8 w-[1px] bg-linear-to-b from-red-500/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
