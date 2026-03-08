"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamData from "@/data/team.json";
import {
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    Github,
    Link as LinkIcon,
} from "lucide-react";
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
                    const yOffset = index % 2 === 0 ? 60 : 90;

                    gsap.fromTo(
                        card,
                        { opacity: 0, y: yOffset, scale: 0.92 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 92%",
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
                            {/* Section Title */}
                            <div className="relative mb-16 text-center">
                                <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-white uppercase">
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-neutral-200 via-white to-neutral-400">
                                        {category.team}
                                    </span>
                                </h2>
                                <div className="mt-4 mx-auto h-[2px] w-16 bg-linear-to-r from-transparent via-[#eb0028] to-transparent rounded-full" />
                            </div>

                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {category.members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="team-member-card"
                                    >
                                        <motion.div
                                            whileHover={{
                                                y: -16,
                                                scale: 1.04,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 18,
                                            }}
                                            className="group relative rounded-2xl overflow-hidden
                                                       transition-all duration-500 ease-out"
                                        >

                                            {/* Image Container */}
                                            <div className="relative aspect-3/4 w-full overflow-hidden">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover
                                                               grayscale brightness-90 contrast-[1.1]
                                                               group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100
                                                               group-hover:scale-110
                                                               transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-20 px-5 pb-5 -mt-12">
                                                {/* Name & Role */}
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-bold font-sans tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                                        {member.name}
                                                    </h3>
                                                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500 group-hover:text-[#eb0028]/80 transition-colors duration-500">
                                                        {member.role}
                                                    </p>
                                                </div>

                                                {/* Divider */}
                                                <div className="h-px w-full bg-white/[0.06] group-hover:bg-[#eb0028]/20 transition-colors duration-500 mb-4" />

                                                {/* Social Links */}
                                                <div className="flex items-center gap-3">
                                                    {Object.entries(
                                                        (member.social ||
                                                            {}) as Record<
                                                                string,
                                                                string
                                                            >
                                                    ).map(
                                                        ([platform, url]) => {
                                                            if (
                                                                !url ||
                                                                url === "#"
                                                            )
                                                                return null;
                                                            const lowerPlatform =
                                                                platform.toLowerCase();

                                                            let Icon =
                                                                LinkIcon;
                                                            if (
                                                                lowerPlatform ===
                                                                "twitter" ||
                                                                lowerPlatform ===
                                                                "x"
                                                            )
                                                                Icon = Twitter;
                                                            else if (
                                                                lowerPlatform ===
                                                                "linkedin"
                                                            )
                                                                Icon = Linkedin;
                                                            else if (
                                                                lowerPlatform ===
                                                                "instagram"
                                                            )
                                                                Icon =
                                                                    Instagram;
                                                            else if (
                                                                lowerPlatform ===
                                                                "youtube"
                                                            )
                                                                Icon = Youtube;
                                                            else if (
                                                                lowerPlatform ===
                                                                "github"
                                                            )
                                                                Icon = Github;

                                                            return (
                                                                <a
                                                                    key={
                                                                        platform
                                                                    }
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-neutral-600 hover:text-[#eb0028] hover:scale-125
                                                                               transition-all duration-300 ease-out"
                                                                >
                                                                    <Icon className="w-[15px] h-[15px]" />
                                                                </a>
                                                            );
                                                        }
                                                    )}
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
