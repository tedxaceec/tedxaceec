"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Coffee,
    Mic,
    Lightbulb,
    Utensils,
    Globe,
    MessageSquare,
    Rocket,
    CheckCircle,
} from "lucide-react";
import timelineData from "@/data/event_timeline.json";

const iconMap: Record<string, React.ElementType> = {
    Coffee,
    Mic,
    Lightbulb,
    Utensils,
    Globe,
    MessageSquare,
    Rocket,
    CheckCircle,
};

const Timeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    // Calculate the height of the animated scroll progress line
    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="timeline"
            className="relative w-full min-h-screen py-24 bg-black overflow-hidden flex flex-col items-center"
            ref={containerRef}
        >
            {/* Background glowing gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/20 blur-[120px] rounded-[100%] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-red-900/10 blur-[150px] rounded-[100%] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="z-10 text-center mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 font-sans">
                    Event <span className="text-red-600">Timeline</span>
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto px-4 font-mono font-medium tracking-tight">
                    A comprehensive schedule of all sessions, talks, and networking breaks
                    throughout the day.
                </p>
            </motion.div>

            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 z-10">
                {/* Background Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />

                {/* Animated Vertical Line */}
                <motion.div
                    className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-linear-to-b from-red-500 via-red-600 to-transparent md:-translate-x-1/2 origin-top"
                    style={{ height } as any}
                />

                <div className="flex flex-col gap-12 sm:gap-16">
                    {timelineData.map((item, index) => {
                        const Icon = iconMap[item.icon] || Lightbulb;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full ${isEven ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Node marker (Icon) */}
                                <div className="absolute left-6 md:left-[50%] -translate-x-[50%] md:-translate-x-1/2 w-12 h-12 rounded-full bg-black border-2 border-red-600 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-transform duration-300 hover:scale-110">
                                    <Icon className="w-5 h-5 text-red-500" />
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Content Card */}
                                <div
                                    className={`flex flex-col w-full md:w-1/2 pl-16 md:pl-0 ${isEven
                                        ? "md:pr-16 md:text-right md:items-end"
                                        : "md:pl-16 md:text-left md:items-start"
                                        }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden w-full transition-colors hover:border-red-500/50"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="flex flex-col gap-2 relative z-10">
                                            <span className="text-red-500 font-bold tracking-widest text-sm uppercase">
                                                {item.time}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Timeline;