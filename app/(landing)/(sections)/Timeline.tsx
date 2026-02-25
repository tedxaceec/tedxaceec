"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

    // Smooth scroll progress for a buttery line animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001,
    });

    // Calculate the height of the animated scroll progress line
    const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="timeline"
            className="relative w-full min-h-screen py-24 overflow-hidden flex flex-col items-center"
            ref={containerRef}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="z-10 text-center mb-20 px-4"
            >
                <h2 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tight mb-4 font-sans transition-colors duration-500">
                    Event <span className="text-red-600 dark:text-red-500">Timeline</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-mono font-medium tracking-tight transition-colors duration-500">
                    A comprehensive schedule of all sessions, talks, and networking breaks
                    throughout the day.
                </p>
            </motion.div>

            <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 z-10">
                {/* Background Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-black/10 dark:bg-white/10 md:-translate-x-1/2 transition-colors duration-500" />

                {/* Animated Vertical Line */}
                <motion.div
                    className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-linear-to-b from-red-500 via-red-600 to-transparent md:-translate-x-1/2 origin-top z-0"
                    style={{ height } as any}
                />

                <div className="flex flex-col gap-12 sm:gap-16">
                    {timelineData.map((item, index) => {
                        const Icon = iconMap[item.icon] || Lightbulb;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 70,
                                    damping: 15,
                                }}
                                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full group ${isEven ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Node marker (Icon) */}
                                <motion.div
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    className="absolute left-6 md:left-[50%] -translate-x-[50%] md:-translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-black border-2 border-red-500 dark:border-red-600 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(239,68,68,0.2)] dark:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-colors duration-500 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] dark:group-hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]"
                                >
                                    <Icon className="w-5 h-5 text-red-600 dark:text-red-500 group-hover:text-red-500 transition-colors" />
                                </motion.div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Content Card */}
                                <div
                                    className={`flex flex-col w-full md:w-1/2 pl-16 md:pl-0 z-10 ${isEven
                                        ? "md:pr-16 md:text-right md:items-end"
                                        : "md:pl-16 md:text-left md:items-start"
                                        }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className="relative p-6 sm:p-8 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden w-full transition-all duration-300 hover:border-red-500/40 dark:hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/5 dark:hover:shadow-red-500/10 hover:bg-black/10 dark:hover:bg-white/10"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-br from-red-600/5 dark:from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="flex flex-col gap-2 relative z-10 pb-1">
                                            <span className={`text-red-600 dark:text-red-500 font-bold tracking-widest text-sm uppercase flex items-center gap-2 ${isEven ? "md:justify-end" : ""}`}>
                                                {isEven && <span className="hidden md:block w-2 h-2 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]" />}
                                                {!isEven && <span className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]" />}
                                                {item.time}
                                                {isEven && <span className="md:hidden w-2 h-2 rounded-full bg-red-500 animate-[pulse_2s_ease-in-out_infinite]" />}
                                            </span>
                                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 transition-colors duration-500">
                                                {item.title}
                                            </h3>
                                            <p className="text-neutral-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base transition-colors duration-500">
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