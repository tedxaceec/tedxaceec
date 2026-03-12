"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function SponsorsHero() {
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

            // Parallax
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
            className="relative flex min-h-[80vh] md:min-h-[85vh] items-center justify-center overflow-hidden"
        >
            {/* Background glows */}
            {/* Removed background glow divs as requested */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                {/* Pill badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-red-400"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    Powering Ideas
                </motion.div>

                {/* Title */}
                <h1
                    ref={titleRef}
                    className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    style={{ perspective: "1000px" }}
                >
                    <span className="word inline-block">Our&nbsp;</span>
                    <span className="word inline-block text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                        Sponsors
                    </span>
                    <br className="hidden sm:block" />
                    <span className="word inline-block">&amp;&nbsp;</span>
                    <span className="word inline-block">Partners</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg md:text-xl leading-relaxed"
                >
                    The visionaries who make ideas worth spreading a reality.
                    Their belief in innovation fuels our mission to inspire the next generation of thinkers at{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-500 font-semibold">
                        Bedrock &amp; Beyond
                    </span>
                    .
                </p>

                {/* Gradient line */}
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
                        <div className="h-8 w-px bg-linear-to-b from-red-500/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
