"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import scheduleData from "@/data/schedule.json";

export default function SchedulePage() {
    const { header, schedule, footer } = scheduleData;
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Hero text animation
        gsap.from(".hero-text-char", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });

        // Timeline items scroll animation
        const items = gsap.utils.toArray(".timeline-item") as HTMLElement[];
        items.forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                x: i % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Continuous red line drawing down
        gsap.from(".timeline-line", {
            scrollTrigger: {
                trigger: timelineRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none"
        });
    }, { scope: containerRef });

    const getTypeColor = (type: string) => {
        if (type === "Talk") return "bg-[#eb0027] text-white";
        if (type === "Performance") return "bg-purple-600 text-white";
        return "bg-neutral-800 text-neutral-300";
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white py-24 sm:py-32 font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-[#eb0027]/30 bg-[#eb0027]/10 text-[#eb0027] text-sm font-semibold tracking-widest uppercase mb-6"
                    >
                        {header.label}
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase overflow-hidden flex flex-wrap justify-center">
                        {header.title.split("").map((char, i) => (
                            <span key={i} className="hero-text-char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                    <div className="h-1 w-24 bg-[#eb0027] mx-auto mt-8 rounded-full" />
                </div>

                {/* Timeline Section */}
                <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                    {/* The Center Vertical Line */}
                    <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#eb0027] to-neutral-900 rounded-full md:-translate-x-1/2" />

                    <div className="space-y-16">
                        {schedule.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`timeline-item relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:items-center`}>

                                    {/* Timeline dot */}
                                    <div className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full bg-black border-4 border-[#eb0027] md:-translate-x-1/2 mt-6 md:mt-0 z-10" />

                                    {/* Empty space for alternating layout on desktop */}
                                    <div className="hidden md:block md:w-[45%]" />

                                    {/* Content Card */}
                                    <div className="w-full pl-20 md:pl-0 md:w-[45%]">
                                        <div className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/5 hover:border-[#eb0027]/50 transition-colors duration-500 group">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-3xl font-light text-neutral-400 font-mono tracking-tighter group-hover:text-white transition-colors">{item.time}</span>
                                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-neutral-400 mb-4 leading-relaxed tracking-wide">
                                                {item.description}
                                            </p>
                                            {item.speaker && (
                                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-[#eb0027]">
                                                        {item.speaker.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-neutral-300">{item.speaker}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">{footer.title}</h2>
                    <p className="text-neutral-400 mb-8 max-w-xl mx-auto">{footer.description}</p>
                    <button className="px-8 py-4 bg-[#eb0027] hover:bg-[#ff1a3f] text-white font-bold rounded-xl transition-colors text-lg shadow-[0_0_30px_rgba(235,0,39,0.3)]">
                        {footer.buttonText}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
