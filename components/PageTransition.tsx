"use client";

import { useRef, useCallback } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "@/lib/gsap";

/**
 * PageTransition — wraps children with next-transition-router's TransitionRouter.
 *
 * The visual effect:
 *   LEAVE  → 5 horizontal curtain bars slide in from alternating directions,
 *            while the page content fades/scales down.
 *   ENTER  → The curtain bars slide out (reverse), revealing the
 *            new page which fades/scales up.
 *
 * A small red accent line sweeps across during the transition for TEDx brand flair.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef<HTMLDivElement>(null);

    /* ──────────────────────────── LEAVE ──────────────────────────── */
    const handleLeave = useCallback((next: () => void) => {
        const overlay = overlayRef.current;
        if (!overlay) { next(); return; }

        const bars = overlay.querySelectorAll<HTMLDivElement>(".transition-bar");
        const accent = overlay.querySelector<HTMLDivElement>(".transition-accent");
        const logo = overlay.querySelector<HTMLDivElement>(".transition-logo");

        // Show overlay
        gsap.set(overlay, { display: "block", pointerEvents: "auto" });

        const tl = gsap.timeline({
            onComplete: next,
        });

        // Curtain bars slide in from alternating left/right
        tl.fromTo(
            bars,
            { xPercent: (i) => (i % 2 === 0 ? -110 : 110) },
            {
                xPercent: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: "power4.inOut",
            }
        );

        // Red accent line sweeps across
        if (accent) {
            tl.fromTo(
                accent,
                { scaleX: 0, transformOrigin: "left center" },
                { scaleX: 1, duration: 0.4, ease: "power2.inOut" },
                "-=0.2"
            );
        }

        // Logo pulses in
        if (logo) {
            tl.fromTo(
                logo,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
                "-=0.3"
            );
        }

        // Fade the page content behind
        tl.to(
            "main",
            { opacity: 0, scale: 0.96, duration: 0.3, ease: "power2.in" },
            0 // start at the beginning
        );

        return () => tl.kill();
    }, []);

    /* ──────────────────────────── ENTER ──────────────────────────── */
    const handleEnter = useCallback((next: () => void) => {
        const overlay = overlayRef.current;
        if (!overlay) { next(); return; }

        const bars = overlay.querySelectorAll<HTMLDivElement>(".transition-bar");
        const accent = overlay.querySelector<HTMLDivElement>(".transition-accent");
        const logo = overlay.querySelector<HTMLDivElement>(".transition-logo");

        // Reset page content
        gsap.set("main", { opacity: 1, scale: 1, clearProps: "all" });

        // Scroll to top for the new page
        window.scrollTo(0, 0);

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(overlay, { display: "none", pointerEvents: "none" });
                next();
            },
        });

        // Logo fades out first
        if (logo) {
            tl.to(logo, { scale: 1.3, opacity: 0, duration: 0.25, ease: "power2.in" });
        }

        // Accent shrinks away
        if (accent) {
            tl.to(
                accent,
                { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "power2.inOut" },
                "-=0.1"
            );
        }

        // Bars slide out in reverse direction
        tl.to(
            bars,
            {
                xPercent: (i) => (i % 2 === 0 ? 110 : -110),
                duration: 0.5,
                stagger: 0.04,
                ease: "power4.inOut",
            },
            "-=0.15"
        );

        // Reveal new page content
        tl.fromTo(
            "main",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", clearProps: "all" },
            "-=0.35"
        );

        return () => tl.kill();
    }, []);

    return (
        <TransitionRouter auto leave={handleLeave} enter={handleEnter}>
            {children}

            {/* ── Transition Overlay (hidden by default) ─────────────────── */}
            <div
                ref={overlayRef}
                className="page-transition-overlay"
                style={{ display: "none", pointerEvents: "none" }}
                aria-hidden="true"
            >
                {/* 5 curtain bars */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="transition-bar" />
                ))}

                {/* Red accent line */}
                <div className="transition-accent" />

                {/* Centered TEDx logo/mark */}
                <div className="transition-logo">
                    <span className="transition-logo__ted">TED</span>
                    <sup className="transition-logo__x">x</sup>
                </div>
            </div>
        </TransitionRouter>
    );
}
