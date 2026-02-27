"use client";

import Link from "next/link";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// ─── Particle System (GSAP-driven) ──────────────────────────────────────────
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let particles: {
            x: number;
            y: number;
            size: number;
            opacity: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;
            color: string;
        }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const colors = [
            "rgba(235, 0, 40, OPACITY)",   // TEDx red
            "rgba(255, 255, 255, OPACITY)", // white
            "rgba(120, 120, 120, OPACITY)", // neutral grey
        ];

        const createParticle = () => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const maxLife = 120 + Math.random() * 180;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: 0,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4 - 0.15,
                life: 0,
                maxLife,
                color,
            };
        };

        // Initialize particles
        for (let i = 0; i < 60; i++) {
            const p = createParticle();
            p.life = Math.random() * p.maxLife;
            particles.push(p);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, idx) => {
                p.life++;
                p.x += p.vx;
                p.y += p.vy;

                // Fade in, hold, fade out
                const progress = p.life / p.maxLife;
                if (progress < 0.2) {
                    p.opacity = (progress / 0.2) * 0.6;
                } else if (progress > 0.8) {
                    p.opacity = ((1 - progress) / 0.2) * 0.6;
                } else {
                    p.opacity = 0.6;
                }

                // Reset if dead or offscreen
                if (p.life >= p.maxLife || p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) {
                    particles[idx] = createParticle();
                    return;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace("OPACITY", String(p.opacity));
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [canvasRef]);
}

// ─── Magnetic Button ────────────────────────────────────────────────────────
function MagneticButton({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setOffset({ x: x * 0.2, y: y * 0.3 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    return (
        <Link
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-widest uppercase text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_32px_rgba(235,0,40,0.4)] group"
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition:
                    offset.x === 0
                        ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
                        : "transform 0.12s ease-out",
            }}
        >
            {/* Background gradient layers */}
            <span className="absolute inset-0 bg-linear-to-r from-red-600 to-red-500 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-linear-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-white/20" />
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Link>
    );
}

// ─── Glitch Text (GSAP) ────────────────────────────────────────────────────
function GlitchText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current || !glowRef.current) return;

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });

        // Subtle glitch effect every few seconds
        tl.to(textRef.current, {
            skewX: 2,
            x: 3,
            duration: 0.1,
            ease: "power2.inOut",
        })
            .to(textRef.current, {
                skewX: -1,
                x: -2,
                duration: 0.08,
                ease: "power2.inOut",
            })
            .to(textRef.current, {
                skewX: 0.5,
                x: 1,
                duration: 0.06,
                ease: "power2.inOut",
            })
            .to(textRef.current, {
                skewX: 0,
                x: 0,
                duration: 0.15,
                ease: "power2.out",
            });

        // Pulsing red glow behind the number
        gsap.to(glowRef.current, {
            opacity: 0.5,
            scale: 1.15,
            duration: 2.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative select-none">
            {/* Ambient glow */}
            <div
                ref={glowRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(235, 0, 40, 0.25) 0%, transparent 70%)",
                }}
            />

            {/* The 404 number */}
            <h1
                ref={textRef}
                className="relative text-[clamp(8rem,25vw,18rem)] font-extrabold leading-none tracking-tighter"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                404
            </h1>

            {/* Glitch overlay copies (CSS-driven for performance) */}
            <h1
                aria-hidden="true"
                className="absolute inset-0 text-[clamp(8rem,25vw,18rem)] font-extrabold leading-none tracking-tighter opacity-0 animate-[glitch1_8s_ease-in-out_infinite]"
                style={{
                    color: "rgba(235, 0, 40, 0.6)",
                    clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                }}
            >
                404
            </h1>
            <h1
                aria-hidden="true"
                className="absolute inset-0 text-[clamp(8rem,25vw,18rem)] font-extrabold leading-none tracking-tighter opacity-0 animate-[glitch2_8s_ease-in-out_infinite]"
                style={{
                    color: "rgba(0, 180, 255, 0.3)",
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                }}
            >
                404
            </h1>
        </div>
    );
}

// ─── Framer Motion Variants ─────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

// ─── Main 404 Page ──────────────────────────────────────────────────────────
export default function NotFound() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useParticles(canvasRef);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* Noise texture */}
            <div
                className="pointer-events-none absolute inset-0 z-1 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Decorative gradient orbs */}
            <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/5 blur-[120px]" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-500/3 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/1 blur-[100px]" />
            </div>

            {/* Subtle grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 z-1 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 404 Number */}
                <motion.div variants={itemVariants}>
                    <GlitchText />
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="mt-2 mb-6 h-px w-24 mx-auto"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, rgba(235, 0, 40, 0.5), transparent)",
                    }}
                />

                {/* Heading */}
                <motion.h2
                    variants={itemVariants}
                    className="text-lg sm:text-xl font-medium tracking-wider uppercase text-neutral-200"
                >
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500"
                >
                    The idea you&apos;re looking for seems to have wandered beyond the
                    bedrock. Let&apos;s get you back to where ideas are worth spreading.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants} className="mt-10">
                    <MagneticButton href="/">
                        Back to Home
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </MagneticButton>
                </motion.div>

                {/* Bottom branding */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col items-center gap-3"
                >
                    <div className="h-px w-12 bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
                    <span className="text-[10px] tracking-[0.4em] text-neutral-600 uppercase font-medium">
                        TEDxACEEC · Bedrock &amp; Beyond
                    </span>
                </motion.div>
            </motion.div>

            {/* Glitch keyframe styles */}
            <style jsx>{`
        @keyframes glitch1 {
          0%, 90%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          92% {
            opacity: 0.8;
            transform: translate(3px, -2px);
          }
          94% {
            opacity: 0;
            transform: translate(-2px, 1px);
          }
          96% {
            opacity: 0.6;
            transform: translate(1px, 1px);
          }
          98% {
            opacity: 0;
            transform: translate(0, 0);
          }
        }
        @keyframes glitch2 {
          0%, 88%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          91% {
            opacity: 0.6;
            transform: translate(-3px, 2px);
          }
          93% {
            opacity: 0;
            transform: translate(2px, -1px);
          }
          95% {
            opacity: 0.5;
            transform: translate(-1px, -1px);
          }
          97% {
            opacity: 0;
            transform: translate(0, 0);
          }
        }
      `}</style>
        </section>
    );
}
