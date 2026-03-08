"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Bus, Train, Car, ArrowRight } from "lucide-react";

import venueData from "@/data/venue.json";

const iconMap: Record<string, React.ElementType> = {
    Bus,
    Train,
    Car,
};

export default function VenuePage() {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* Hero Section with Parallax */}
            <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: yHero }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/80 to-black z-10" />
                    <div className="w-full h-[120%] bg-neutral-900 animate-pulse relative">
                        {/* Placeholder for real campus image */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#eb0027]/20 via-black to-black" />
                    </div>
                </motion.div>

                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
                    >
                        {venueData.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-400 font-light"
                    >
                        {venueData.hero.description}
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                {/* Campus Locations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="md:col-span-8 group relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/5"
                    >
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eb0027] text-white text-xs font-bold uppercase mb-4">
                                <MapPin className="w-3 h-3" /> {venueData.locations[0].tag}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{venueData.locations[0].name}</h2>
                            <p className="text-neutral-300 max-w-xl text-lg">
                                {venueData.locations[0].description}
                            </p>
                        </div>
                    </motion.div>

                    <div className="md:col-span-4 flex flex-col gap-8">
                        {venueData.locations.slice(1).map((location, i) => (
                            <motion.div
                                key={location.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-neutral-900/50 p-8 rounded-3xl border border-white/5 flex-1 flex flex-col justify-end"
                            >
                                <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                                <p className="text-neutral-400">{location.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Transportation Cards */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Getting There</h2>
                        <div className="h-1 w-24 bg-[#eb0027] mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {venueData.transportation.map((item, i) => {
                            const Icon = iconMap[item.icon] || Bus;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-neutral-900 border border-white/5 p-8 rounded-3xl hover:border-[#eb0027]/50 transition-colors duration-300 group"
                                >
                                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-[#eb0027] mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#eb0027] transition-colors">{item.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Map Details Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-white/5 bg-neutral-900/40 p-1 lg:p-1 overflow-hidden relative group"
                >
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-neutral-950 opacity-50 z-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Hyderabad&zoom=12&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x9e9e9e&style=feature:all|element:labels.text.stroke|color:0x212121&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53&style=feature:landscape|element:geometry.fill|color:0x080808&style=feature:poi|element:geometry.fill|color:0x1a1a1a&style=feature:road|element:geometry.fill|color:0x111111&style=feature:road|element:geometry.stroke|color:0x1a1a1a&style=feature:transit|element:geometry.fill|color:0x181818&style=feature:water|element:geometry.fill|color:0x000000')] bg-cover bg-center grayscale" />

                    <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row justify-between items-center bg-black/80 backdrop-blur-sm m-2 lg:m-4 rounded-2xl">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">Find us</h3>
                            <p className="text-neutral-400 text-lg mb-6 max-w-sm">
                                {venueData.address.full}
                            </p>
                            <div className="flex gap-4">
                                <a href={`mailto:${venueData.address.email}`} className="text-sm font-semibold text-[#eb0027] hover:text-white transition-colors">
                                    {venueData.address.email}
                                </a>
                                <span className="text-neutral-600">|</span>
                                <span className="text-sm text-neutral-400">{venueData.address.phone}</span>
                            </div>
                        </div>

                        <a
                            href="https://maps.google.com/?q=ACE+Engineering+College,+Ankushapur,+Ghatkesar,+Telangana+501301"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 md:mt-0 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-[#eb0027] hover:text-white transition-colors flex items-center gap-2"
                        >
                            Open in Maps
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
