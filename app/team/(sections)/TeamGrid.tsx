"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamData from "@/data/team.json";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function TeamGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>(".team-section");

            sections.forEach((section) => {
                const cards = section.querySelectorAll(".team-member-card");

                cards.forEach((card, index) => {
                    const yOffset = index % 2 === 0 ? 50 : 80;

                    gsap.fromTo(
                        card,
                        { opacity: 0, y: yOffset, scale: 0.95 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 z-20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-px w-1/2 bg-linear-to-l from-[#eb0028]/50 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#eb0028]/5 blur-[200px] rounded-full pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="space-y-32">
                    {teamData.map((category) => (
                        <div key={category.id} className="team-section">
                            <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-white mb-12 text-center uppercase">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-200 via-white to-neutral-400">
                                    {category.team}
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {category.members.map((member) => (
                                    <div key={member.id} className="team-member-card break-inside-avoid shadow-xl shadow-black/50">
                                        <motion.div
                                            whileHover={{ y: -10 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-white/5 hover:border-[#eb0028]/30 transition-colors duration-500"
                                        >
                                            {/* Image Container */}
                                            <div className="relative aspect-square sm:aspect-4/5 w-full overflow-hidden">
                                                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent z-10" />

                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover transition-all duration-700 ease-in-out mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-110"
                                                />

                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 p-4 z-20 text-[#eb0028]/80 group-hover:text-red-500 transition-colors">
                                                    <div className="w-8 h-px bg-current mb-1" />
                                                    <div className="w-px h-8 bg-current" />
                                                </div>

                                                {/* Details Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <h3 className="text-xl font-bold font-sans tracking-tight text-white mb-1 group-hover:text-[#eb0028] transition-colors">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-3 group-hover:text-neutral-300">
                                                        {member.role}
                                                    </p>

                                                    <div className="flex items-center gap-3">
                                                        {(member.social as Record<string, string>)?.twitter && (member.social as Record<string, string>).twitter !== "#" && (
                                                            <a href={(member.social as Record<string, string>).twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                                <Twitter className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {(member.social as Record<string, string>)?.linkedin && (member.social as Record<string, string>).linkedin !== "#" && (
                                                            <a href={(member.social as Record<string, string>).linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                                <Linkedin className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        {(member.social as Record<string, string>)?.instagram && (member.social as Record<string, string>).instagram !== "#" && (
                                                            <a href={(member.social as Record<string, string>).instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                                <Instagram className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
