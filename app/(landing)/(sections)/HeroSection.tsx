"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

/* ─── Lazy-load UnicornScene so it only runs on the client ──────────────── */
const UnicornScene = dynamic(() => import("unicornstudio-react/next"), {
    ssr: false,
});

/* ─── Constants ─────────────────────────────────────────────────────────── */
const UNICORN_PROJECT_ID = "UwxiOc9Rb5VYIwTLK2rv";
const UNICORN_SDK_URL =
    "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

/* ─── Main Hero Section ─────────────────────────────────────────────────── */
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    /* Remove Unicorn Studio watermark using MutationObserver */
    useEffect(() => {
        if (!isMounted) return;

        const section = sectionRef.current;
        if (!section) return;

        const removeWatermark = () => {
            // Target by href attribute
            section
                .querySelectorAll<HTMLAnchorElement>('a[href*="unicorn.studio"]')
                .forEach((el) => {
                    el.style.display = "none";
                    el.style.visibility = "hidden";
                    el.style.opacity = "0";
                    el.style.pointerEvents = "none";
                    el.style.height = "0";
                    el.style.overflow = "hidden";
                    el.remove();
                });

            // Also target by image alt text
            section
                .querySelectorAll<HTMLImageElement>('img[alt*="unicorn"]')
                .forEach((el) => {
                    const parent = el.closest("a");
                    if (parent) parent.remove();
                    else el.remove();
                });
        };

        // Fire immediately
        removeWatermark();

        // Watch for dynamically injected watermark
        const observer = new MutationObserver(() => removeWatermark());
        observer.observe(section, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [isMounted]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* ── WebGL Scene (Unicorn Studio) — full screen, no overlay ──── */}
            {/* Container extends below viewport so the watermark (at bottom:30px)
                gets pushed out of view and clipped by overflow-hidden */}
            <div className="absolute inset-0 z-0" style={{ bottom: "-100px" }}>
                {isMounted && (
                    <UnicornScene
                        projectId={UNICORN_PROJECT_ID}
                        sdkUrl={UNICORN_SDK_URL}
                        width="100%"
                        height="100%"
                        production
                    />
                )}
            </div>

            {/* ── Bottom vignette — covers watermark area + fades into next section */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/80 to-transparent"
                style={{ zIndex: 100000000, height: "20%" }}
            />
        </section>
    );
}
