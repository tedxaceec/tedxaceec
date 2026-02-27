"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Interactive element selectors ──────────────────────────────────────────
const INTERACTIVE_SELECTORS = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[role='link']",
    "[data-cursor-label]",
    "label",
    ".cursor-hover",
];

const SELECTORS_STRING = INTERACTIVE_SELECTORS.join(", ");

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    // Mutable refs for positions (avoids re-renders)
    const mouse = useRef({ x: -100, y: -100 });
    const outerPos = useRef({ x: -100, y: -100 });
    const isHovered = useRef(false);
    const rafId = useRef<number>(0);
    const isVisible = useRef(false);

    // ─── Animation loop (requestAnimationFrame + easing) ───────────────────────
    const animate = useCallback(() => {
        const ease = 0.15; // lower = more trailing lag
        outerPos.current.x += (mouse.current.x - outerPos.current.x) * ease;
        outerPos.current.y += (mouse.current.y - outerPos.current.y) * ease;

        if (innerRef.current) {
            innerRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
        }
        if (outerRef.current) {
            outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)${isHovered.current ? " scale(1.8)" : " scale(1)"
                }`;
        }

        rafId.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Don't render cursor on touch-only devices
        const isTouchDevice =
            typeof window !== "undefined" &&
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);
        if (isTouchDevice) {
            // Hide cursor container entirely on touch devices
            if (cursorRef.current) cursorRef.current.style.display = "none";
            return;
        }

        // ─── Hide default cursor globally ──────────────────────────────────────
        document.documentElement.style.cursor = "none";
        document.body.style.cursor = "none";

        // Apply cursor:none to all interactive elements
        const styleEl = document.createElement("style");
        styleEl.id = "custom-cursor-hide";
        styleEl.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
        document.head.appendChild(styleEl);

        // ─── Mouse move handler ────────────────────────────────────────────────
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            if (!isVisible.current && cursorRef.current) {
                cursorRef.current.style.opacity = "1";
                isVisible.current = true;
            }
        };

        // ─── Mouse enter / leave document ──────────────────────────────────────
        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = "0";
                isVisible.current = false;
            }
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = "1";
                isVisible.current = true;
            }
        };

        // ─── Hover detection via event delegation ──────────────────────────────
        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(SELECTORS_STRING);
            if (target) {
                isHovered.current = true;
                outerRef.current?.classList.add("cursor-hovered");
                innerRef.current?.classList.add("cursor-hovered");

                // Dynamic label
                const label =
                    (target as HTMLElement).getAttribute("data-cursor-label") || "";
                if (labelRef.current) {
                    labelRef.current.textContent = label;
                    if (label) {
                        labelRef.current.classList.add("cursor-label-visible");
                    } else {
                        labelRef.current.classList.remove("cursor-label-visible");
                    }
                }
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(SELECTORS_STRING);
            if (target) {
                // Check if the relatedTarget is still within an interactive element
                const relatedTarget = (e.relatedTarget as HTMLElement)?.closest(
                    SELECTORS_STRING
                );
                if (!relatedTarget) {
                    isHovered.current = false;
                    outerRef.current?.classList.remove("cursor-hovered");
                    innerRef.current?.classList.remove("cursor-hovered");
                    if (labelRef.current) {
                        labelRef.current.textContent = "";
                        labelRef.current.classList.remove("cursor-label-visible");
                    }
                }
            }
        };

        // ─── Mouse down / up for click feedback ────────────────────────────────
        const handleMouseDown = () => {
            outerRef.current?.classList.add("cursor-clicking");
            innerRef.current?.classList.add("cursor-clicking");
        };

        const handleMouseUp = () => {
            outerRef.current?.classList.remove("cursor-clicking");
            innerRef.current?.classList.remove("cursor-clicking");
        };

        // ─── Bind events ───────────────────────────────────────────────────────
        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.addEventListener("mouseout", handleMouseOut, { passive: true });
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        // Start animation loop
        rafId.current = requestAnimationFrame(animate);

        return () => {
            // Cleanup
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            cancelAnimationFrame(rafId.current);

            // Restore default cursor
            document.documentElement.style.cursor = "";
            document.body.style.cursor = "";
            const injectedStyle = document.getElementById("custom-cursor-hide");
            if (injectedStyle) injectedStyle.remove();
        };
    }, [animate]);

    return (
        <div
            ref={cursorRef}
            className="custom-cursor-container"
            aria-hidden="true"
            style={{ opacity: 0 }}
        >
            {/* Inner dot */}
            <div ref={innerRef} className="custom-cursor-inner" />

            {/* Outer ring + label */}
            <div ref={outerRef} className="custom-cursor-outer">
                <span ref={labelRef} className="custom-cursor-label" />
            </div>
        </div>
    );
}
