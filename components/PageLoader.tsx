"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "@/lib/gsap";

/**
 * PageLoader — premium initial-load screen with two modes:
 *
 *   FIRST VISIT  → Full cinematic sequence (~4s):
 *     TEDx letters → subtitle typewriter → progress bar → tagline → red flash exit
 *
 *   RETURN VISIT (cached/reload) → Quick branded intro (~1.6s):
 *     TEDx instantly visible → fast counter → smooth clip-path wipe
 *
 * Uses lazy state initialization so there is ZERO flash if the loader shouldn't show.
 * Uses a guaranteed minimum duration so the exit animation ALWAYS completes smoothly.
 */
export default function PageLoader() {
    // ── Lazy initializer: runs synchronously before first paint ──────────
    const isFirstVisit = useMemo(() => {
        if (typeof window === "undefined") return true;
        return !sessionStorage.getItem("tedx-loaded");
    }, []);

    const [show, setShow] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const tedxRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loader = loaderRef.current;
        const counter = counterRef.current;
        const progress = progressRef.current;
        const tedx = tedxRef.current;
        const subtitle = subtitleRef.current;
        const tagline = taglineRef.current;
        const flash = flashRef.current;
        const particles = particlesRef.current;

        if (!loader || !counter || !progress || !tedx || !tagline || !flash) return;

        // Lock scroll during loader
        document.body.style.overflow = "hidden";

        const letters = tedx.querySelectorAll<HTMLSpanElement>(".loader-letter");

        // ────────────────────────────────────────────────────────────────
        // Shared exit timeline — always plays a smooth, guaranteed exit
        // ────────────────────────────────────────────────────────────────
        const buildExit = (tl: gsap.core.Timeline) => {
            // Red flash
            tl.to(flash, {
                opacity: 1,
                duration: 0.15,
                ease: "power2.in",
            });
            tl.to(flash, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            });

            // All center content slides up & fades
            tl.to(
                ".page-loader__content, .page-loader__counter, .page-loader__footer",
                {
                    y: -50,
                    opacity: 0,
                    duration: 0.45,
                    stagger: 0.04,
                    ease: "power3.inOut",
                },
                "-=0.3"
            );

            // Final wipe — clip-path slides upward
            tl.to(loader, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.65,
                ease: "power4.inOut",
            });
        };

        // ────────────────────────────────────────────────────────────────
        // FIRST VISIT — Full cinematic sequence
        // ────────────────────────────────────────────────────────────────
        if (isFirstVisit) {
            const subtitleChars = subtitle?.querySelectorAll<HTMLSpanElement>(".subtitle-char") ?? [];
            const taglineWords = tagline.querySelectorAll<HTMLSpanElement>(".tagline-word");
            const dots = particles?.querySelectorAll<HTMLDivElement>(".loader-particle") ?? [];

            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem("tedx-loaded", "1");
                    document.body.style.overflow = "";
                    setShow(false);
                },
            });

            // Particles float up continuously
            dots.forEach((dot) => {
                gsap.to(dot, {
                    y: -window.innerHeight - 100,
                    opacity: 0,
                    duration: gsap.utils.random(3, 6),
                    repeat: -1,
                    delay: gsap.utils.random(0, 2),
                    ease: "none",
                });
            });

            // Phase 1: TEDx letters stagger in with 3D effect
            tl.fromTo(
                letters,
                { y: 80, opacity: 0, rotationX: -90, scale: 0.5 },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                },
                0.3
            );

            // Phase 2: Subtitle types in
            if (subtitleChars.length > 0) {
                tl.fromTo(
                    subtitleChars,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.03, stagger: 0.04, ease: "none" },
                    1.0
                );
            }

            // Phase 3: Counter + progress bar
            const counterObj = { val: 0 };
            tl.to(
                counterObj,
                {
                    val: 100,
                    duration: 1.6,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        if (counter) counter.textContent = `${Math.round(counterObj.val)}`;
                    },
                },
                1.4
            );
            tl.to(progress, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 1.4);

            // Phase 4: Tagline fades in
            tl.fromTo(
                taglineWords,
                { y: 30, opacity: 0, filter: "blur(8px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power3.out",
                },
                2.6
            );

            // Phase 5: Hold for branding
            tl.to({}, { duration: 0.35 });

            // Phase 6: Smooth exit
            buildExit(tl);

            return () => {
                tl.kill();
                document.body.style.overflow = "";
            };
        }

        // ────────────────────────────────────────────────────────────────
        // RETURN VISIT — Quick but still smooth branded intro
        // ────────────────────────────────────────────────────────────────
        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "";
                setShow(false);
            },
        });

        // Start with everything visible but faded
        gsap.set(letters, { opacity: 1, y: 0, rotationX: 0, scale: 1 });
        gsap.set(progress, { scaleX: 0 });

        // Quick scale-in of the TEDx branding
        tl.fromTo(
            tedx,
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
            0.1
        );

        // Fast counter 0 → 100
        const counterObj = { val: 0 };
        tl.to(
            counterObj,
            {
                val: 100,
                duration: 0.8,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (counter) counter.textContent = `${Math.round(counterObj.val)}`;
                },
            },
            0.1
        );

        // Fast progress bar
        tl.to(progress, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.1);

        // Brief hold
        tl.to({}, { duration: 0.15 });

        // Smooth exit — always plays to completion
        buildExit(tl);

        return () => {
            tl.kill();
            document.body.style.overflow = "";
        };
    }, [isFirstVisit]);

    if (!show) return null;

    // Subtitle text to animate char by char
    const subtitleText = "ACE Engineering College";
    const taglineWordsData = ["Bedrock", "&", "Beyond"];

    return (
        <div
            ref={loaderRef}
            className="page-loader"
            aria-label="Loading TEDxACE Engineering College"
        >
            {/* Background noise texture */}
            <div className="page-loader__noise" />

            {/* Red ambient glow */}
            <div className="page-loader__glow" />

            {/* Floating particles */}
            <div ref={particlesRef} className="page-loader__particles">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="loader-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${60 + Math.random() * 50}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    />
                ))}
            </div>

            {/* Red flash overlay */}
            <div ref={flashRef} className="page-loader__flash" />

            {/* ── Center content ────────────────────────────────────────── */}
            <div className="page-loader__content">
                {/* TEDx Logo */}
                <div ref={tedxRef} className="page-loader__brand" style={{ perspective: "800px" }}>
                    <span className="loader-letter loader-letter--t">T</span>
                    <span className="loader-letter loader-letter--e">E</span>
                    <span className="loader-letter loader-letter--d">D</span>
                    <span className="loader-letter loader-letter--x">x</span>
                </div>

                {/* Subtitle — typed in (only visible on first visit) */}
                <div ref={subtitleRef} className="page-loader__subtitle">
                    {subtitleText.split("").map((char, i) => (
                        <span key={i} className="subtitle-char">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>

                {/* Decorative divider */}
                <div className="page-loader__divider" />

                {/* Tagline — "Bedrock & Beyond" */}
                <div ref={taglineRef} className="page-loader__tagline">
                    {taglineWordsData.map((word, i) => (
                        <span
                            key={i}
                            className={`tagline-word ${word === "&" ? "tagline-word--amp" : ""}`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            </div>

            {/* Counter (bottom-left) */}
            <div className="page-loader__counter">
                <span ref={counterRef} className="page-loader__counter-value">0</span>
                <span className="page-loader__counter-percent">%</span>
            </div>

            {/* Progress Bar (bottom) */}
            <div className="page-loader__progress-track">
                <div
                    ref={progressRef}
                    className="page-loader__progress-fill"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* Bottom tagline */}
            <div className="page-loader__footer">
                <span className="page-loader__footer-line" />
                <span className="page-loader__footer-text">Ideas Worth Spreading</span>
                <span className="page-loader__footer-line" />
            </div>
        </div>
    );
}
