"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MottoSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Each word scales up from small
            gsap.from(textRef.current?.querySelectorAll(".motto-word") ?? [], {
                scale: 0.3,
                opacity: 0,
                y: 40,
                stagger: 0.12,
                duration: 1,
                ease: "elastic.out(1,0.5)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none",
                },
            });

            // Floating parallax
            gsap.to(textRef.current, {
                y: -20,
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
            className="relative overflow-hidden py-32 md:py-44"
        >
            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-red-500/5 blur-[200px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                >
                    Our Motto
                </motion.div>

                <div ref={textRef} className="relative">
                    {/* Large motto text */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6">
                        {["Ideas", "Worth", "Spreading"].map((word) => (
                            <span
                                key={word}
                                className="motto-word text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                                style={{
                                    textShadow: "0 0 80px rgba(235, 0, 40, 0.15)",
                                }}
                            >
                                {word === "Worth" ? (
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-red-400 to-red-600">
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </span>
                        ))}
                    </div>

                    {/* Decorative period */}
                    <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 15 }}
                        className="mt-2 inline-block h-3 w-3 rounded-full bg-red-500 md:h-4 md:w-4"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mx-auto mt-8 max-w-xl text-base text-neutral-500 md:text-lg"
                >
                    Every idea has the power to change the world. At TEDxACE Engineering
                    College, we believe in amplifying those ideas and giving them the
                    stage they deserve.
                </motion.p>
            </div>
        </section>
    );
}
