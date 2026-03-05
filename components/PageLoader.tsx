"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";

/**
 * PageLoader — a premium initial-load screen that plays once on first visit.
 *
 * Sequence:
 *   1. Counter counts from 0 → 100%
 *   2. Red progress bar fills the bottom
 *   3. "TEDx" logo letters animate in staggered
 *   4. Everything slides/scales away to reveal the site
 */
export default function PageLoader() {
    const [show, setShow] = useState(true);
    const loaderRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const tedxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Skip if already shown this session
        if (typeof window !== "undefined" && sessionStorage.getItem("tedx-loaded")) {
            setShow(false);
            return;
        }

        const loader = loaderRef.current;
        const counter = counterRef.current;
        const progress = progressRef.current;
        const tedx = tedxRef.current;
        if (!loader || !counter || !progress || !tedx) return;

        // Lock scroll during loader
        document.body.style.overflow = "hidden";

        const letters = tedx.querySelectorAll<HTMLSpanElement>(".loader-letter");

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem("tedx-loaded", "1");
                document.body.style.overflow = "";
                setShow(false);
            },
        });

        // Counter animation 0 → 100
        const counterObj = { val: 0 };
        tl.to(counterObj, {
            val: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counter) counter.textContent = `${Math.round(counterObj.val)}`;
            },
        });

        // Progress bar fills
        tl.to(
            progress,
            { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
            0
        );

        // TEDx letters stagger in
        tl.fromTo(
            letters,
            { y: 60, opacity: 0, rotationX: -45 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(2)",
            },
            0.6
        );

        // Pause to let the viewer absorb the branding
        tl.to({}, { duration: 0.3 });

        // Everything exits: scale up + fade out
        tl.to(loader, {
            scale: 1.1,
            opacity: 0,
            duration: 0.6,
            ease: "power3.inOut",
        });

        return () => {
            tl.kill();
            document.body.style.overflow = "";
        };
    }, []);

    if (!show) return null;

    return (
        <div
            ref={loaderRef}
            className="page-loader"
            aria-label="Loading"
        >
            {/* Background noise texture */}
            <div className="page-loader__noise" />

            {/* Red ambient glow */}
            <div className="page-loader__glow" />

            {/* TEDx Logo */}
            <div ref={tedxRef} className="page-loader__brand" style={{ perspective: "600px" }}>
                <span className="loader-letter loader-letter--t">T</span>
                <span className="loader-letter loader-letter--e">E</span>
                <span className="loader-letter loader-letter--d">D</span>
                <span className="loader-letter loader-letter--x">x</span>
            </div>

            {/* Counter */}
            <div className="page-loader__counter">
                <span ref={counterRef} className="page-loader__counter-value">0</span>
                <span className="page-loader__counter-percent">%</span>
            </div>

            {/* Progress Bar */}
            <div className="page-loader__progress-track">
                <div ref={progressRef} className="page-loader__progress-fill" style={{ transform: "scaleX(0)" }} />
            </div>
        </div>
    );
}
