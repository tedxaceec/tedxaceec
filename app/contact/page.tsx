"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter, ArrowRight, Youtube } from "lucide-react";

import siteConfig from "@/data/site_config.json";

const socialIconMap: Record<string, React.ElementType> = {
    Instagram,
    LinkedIn: Linkedin,
    Twitter,
    YouTube: Youtube,
};

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);

    // GSAP animation for the hero section background/particles (abstract concept)
    useGSAP(() => {
        if (!headingRef.current) return;

        // Abstract text reveal with GSAP
        const chars = headingRef.current.innerText.split("");
        headingRef.current.innerText = "";

        chars.forEach((char, i) => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char;
            span.style.opacity = "0";
            span.style.display = "inline-block";
            headingRef.current?.appendChild(span);

            gsap.to(span, {
                opacity: 1,
                y: 0,
                x: 0,
                rotationX: 0,
                duration: 0.8,
                delay: i * 0.05 + 0.2,
                ease: "power3.out",
                startAt: { y: 50, x: -20, rotationX: -90 },
            });
        });

        // Background floating elements
        gsap.to(".bg-shape", {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-10, 10)",
            scale: "random(0.9, 1.1)",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });
    }, { scope: containerRef });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(
            `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
        )}`;
        window.open(mailtoUrl, '_blank');
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.1 + 0.5, duration: 0.8, ease: "easeOut" as const }
        })
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
            }
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
            {/* Background Shapes */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#eb0027] rounded-full blur-[150px] opacity-20 bg-shape pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#eb0027]/80 rounded-full blur-[180px] opacity-10 bg-shape pointer-events-none" />

            <main className="max-w-7xl mx-auto px-6 py-24 sm:py-32 relative z-10">
                <div className="text-center md:text-left mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#eb0027] animate-pulse" />
                        <span className="text-xs font-medium tracking-wide uppercase text-neutral-300">We respond fast</span>
                    </motion.div>

                    <h1
                        ref={headingRef}
                        className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6"
                        style={{ perspective: "1000px" }}
                    >
                        Get In Touch
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
                    >
                        Have a question about the upcoming {siteConfig.name} event? Want to collaborate,
                        sponsor, or become a speaker? Drop us a line and let&apos;s spark a conversation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    {/* Form Section */}
                    <motion.div
                        variants={fadeInUp}
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 bg-neutral-900/40 p-8 md:p-12 rounded-3xl border border-white/5 backdrop-blur-md relative group"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-[#eb0027] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl pointer-events-none" />

                        <h3 className="text-3xl font-bold mb-8 tracking-tight">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0027] focus:ring-1 focus:ring-[#eb0027] transition-all duration-300"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0027] focus:ring-1 focus:ring-[#eb0027] transition-all duration-300"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-neutral-400">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formState.subject}
                                    onChange={handleInputChange}
                                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0027] focus:ring-1 focus:ring-[#eb0027] transition-all duration-300"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-400">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-[#eb0027] focus:ring-1 focus:ring-[#eb0027] transition-all duration-300 resize-none"
                                    placeholder="Tell us everything..."
                                    required
                                />
                            </div>

                            <motion.button
                                onHoverStart={() => setIsHoveringSubmit(true)}
                                onHoverEnd={() => setIsHoveringSubmit(false)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-[#eb0027] hover:bg-[#ff1a3f] text-white font-bold py-5 rounded-xl transition-colors duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Send Message
                                    <motion.div animate={{ x: isHoveringSubmit ? 5 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </span>
                                {/* Button shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5 flex flex-col justify-between"
                    >
                        <div className="space-y-10">
                            <motion.div variants={fadeInUp} custom={2}>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-px bg-neutral-700" />
                                    Contact Details
                                </h4>
                                <div className="space-y-6">
                                    <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="p-3 bg-neutral-900 rounded-xl text-[#eb0027] group-hover:scale-110 transition-transform">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-white group-hover:text-[#eb0027] transition-colors">Chat to our team</p>
                                            <p className="text-neutral-400 mt-1">{siteConfig.contact.email}</p>
                                        </div>
                                    </a>

                                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+\-()]/g, '')}`} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="p-3 bg-neutral-900 rounded-xl text-[#eb0027] group-hover:scale-110 transition-transform">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-white group-hover:text-[#eb0027] transition-colors">Call us directly</p>
                                            <p className="text-neutral-400 mt-1">{siteConfig.contact.phone}</p>
                                        </div>
                                    </a>

                                    <a href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                        <div className="p-3 bg-neutral-900 rounded-xl text-[#eb0027] group-hover:scale-110 transition-transform">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-white group-hover:text-[#eb0027] transition-colors">Visit us</p>
                                            <p className="text-neutral-400 mt-1 leading-relaxed">
                                                {siteConfig.contact.address.split(',').slice(0, 1)}<br />
                                                {siteConfig.contact.address.split(',').slice(1, 2)},<br />
                                                {siteConfig.contact.address.split(',').slice(2).join(',')}
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} custom={3}>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-px bg-neutral-700" />
                                    Follow our journey
                                </h4>
                                <div className="flex gap-4 px-4">
                                    {siteConfig.socials.map((social) => {
                                        const Icon = socialIconMap[social.name] || Instagram;
                                        return (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                target="_blank"
                                                whileHover={{ y: -5, scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="p-4 bg-neutral-900 border border-white/5 rounded-full text-neutral-400 hover:text-white hover:border-[#eb0027] hover:bg-[#eb0027]/10 transition-colors"
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={fadeInUp} custom={4} className="mt-12 lg:mt-0 p-4">
                            <p className="text-sm text-neutral-600 font-medium">
                                {siteConfig.copyright.replace("{year}", new Date().getFullYear().toString())} {siteConfig.tedLicenseNotice}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Map View Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-16 md:mt-24 w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-neutral-800 relative z-10 group"
                >
                    <div className="absolute inset-0 bg-neutral-900/40 animate-pulse -z-10 flex items-center justify-center">
                        <span className="text-neutral-500 font-medium text-sm tracking-widest uppercase">Loading Map...</span>
                    </div>
                    <iframe
                        src="https://maps.google.com/maps?q=ACE%20Engineering%20College,%20Ankushapur,%20Ghatkesar,%20Telangana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(85%)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ACE Engineering College Location"
                        className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 relative z-10"
                    />
                </motion.div>
            </main>

            {/* Decorative Custom Tailwind Animation for Button */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
        </div>
    );
}