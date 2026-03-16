"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import speakersData from "@/data/speakers.json";
import { Twitter, Linkedin, ExternalLink, Instagram } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

gsap.registerPlugin(ScrollTrigger);

export default function SpeakersGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".speaker-card");

            cards.forEach((card, index) => {
                const yOffset = index % 2 === 0 ? 100 : 150;

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
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 z-20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-px w-1/2 bg-linear-to-l from-[#eb0028]/50 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#eb0028]/5 blur-[200px] rounded-full"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    ref={gridRef}
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    {speakersData.map((speaker, index) => (
                        <div key={speaker.id} id={speaker.id} className="speaker-card break-inside-avoid scroll-mt-24">
                            <Modal>
                                <ModalTrigger className="block w-full text-left p-0 bg-transparent border-none">
                                    <CardContainer containerClassName="py-0 w-full" className="w-full">
                                        <CardBody className="group relative w-full overflow-hidden rounded-2xl bg-neutral-900/50 backdrop-blur-md border border-white/5 hover:border-[#eb0028]/30 transition-colors duration-500 shadow-xl shadow-black/50">
                                            {/* Image Container */}
                                            <CardItem translateZ="50" className="relative aspect-square sm:aspect-auto sm:h-72 w-full overflow-hidden">
                                                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent z-10" />

                                                {/* Abstract background gradient to replace generic image colors */}
                                                <div className="absolute inset-0 bg-linear-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-700 ease-in-out" />

                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    className="absolute inset-0 w-full h-full object-cover object-top mix-blend-luminosity hover:mix-blend-normal opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                                    loading="lazy"
                                                />

                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 p-4 z-20">
                                                    <div className="w-8 h-px bg-[#eb0028]/80 mb-1" />
                                                    <div className="w-px h-8 bg-[#eb0028]/80" />
                                                </div>

                                                {/* Bottom Info overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <h3 className="text-2xl font-bold font-sans tracking-tight text-white mb-1 group-hover:text-[#eb0028] transition-colors">
                                                        {speaker.name}
                                                    </h3>
                                                    <p className="text-sm font-medium text-red-500 uppercase tracking-wider mb-2">
                                                        {speaker.role} • {speaker.organization}
                                                    </p>
                                                </div>
                                            </CardItem>

                                            {/* Content Details */}
                                            <CardItem translateZ="20" className="w-full p-6 relative bg-linear-to-b from-neutral-950 to-neutral-900/80">
                                                {/* Hover Glow */}
                                                <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#eb0028]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />

                                                <h4 className="text-lg font-semibold text-white/90 mb-3 group-hover:text-white transition-colors truncate">
                                                    "{speaker.topic}"
                                                </h4>
                                                <p className="text-neutral-400 text-sm leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors line-clamp-2">
                                                    {speaker.bio}
                                                </p>

                                                <div className="flex items-center gap-4 pt-4 border-t border-white/5 justify-between">
                                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-[#eb0028] flex items-center gap-2 transition-colors">
                                                        Click for Details
                                                        <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </CardItem>
                                        </CardBody>
                                    </CardContainer>
                                </ModalTrigger>

                                <ModalBody className="dark:bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-100">
                                    <ModalContent>
                                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-4">
                                            {speaker.name}
                                        </h4>
                                        <div className="flex justify-center items-center">
                                            <motion.div
                                                style={{ rotate: Math.random() * 8 - 4 }}
                                                whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                                                whileTap={{ scale: 1.05, rotate: 0, zIndex: 100 }}
                                                className="rounded-xl p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden shadow-xl"
                                            >
                                                <img
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    width="500"
                                                    height="500"
                                                    className="rounded-lg h-32 w-32 md:h-48 md:w-48 object-cover object-top shrink-0 block"
                                                />
                                            </motion.div>
                                        </div>
                                        <div className="py-6 flex flex-col gap-x-4 gap-y-4 items-center justify-start max-w-sm mx-auto">
                                            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200 text-xs font-medium text-center text-neutral-800 dark:text-neutral-200">
                                                {speaker.role} @ {speaker.organization}
                                            </span>
                                            <p className="text-neutral-600 dark:text-neutral-300 text-sm text-center leading-relaxed">
                                                {speaker.bio}
                                            </p>
                                        </div>
                                    </ModalContent>
                                    <ModalFooter className="flex justify-center items-center py-4 bg-transparent border-t border-neutral-200 dark:border-neutral-800">
                                        <div className="flex items-center gap-6">
                                            {speaker.social.twitter && (
                                                <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                    <Twitter className="w-5 h-5" />
                                                </a>
                                            )}
                                            {speaker.social.linkedin && (
                                                <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                            {speaker.social.instagram && (
                                                <a href={speaker.social.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#eb0028] transition-colors">
                                                    <Instagram className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </ModalFooter>
                                </ModalBody>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
