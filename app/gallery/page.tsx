"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./carousel.css";

// Same Unsplash image IDs from the CodePen
const GALLERY_DATA = [
    {
        id: "1540968221243-29f5d70540bf",
        alt: "Event moment 1",
    },
    {
        id: "1596135187959-562c650d98bc",
        alt: "Event moment 2",
    },
    {
        id: "1628944682084-831f35256163",
        alt: "Event moment 3",
    },
    {
        id: "1590013330451-3946e83e0392",
        alt: "Event moment 4",
    },
    {
        id: "1590421959604-741d0eec0a2e",
        alt: "Event moment 5",
    },
    {
        id: "1572613000712-eadc57acbecd",
        alt: "Event moment 6",
    },
    {
        id: "1570097192570-4b49a6736f9f",
        alt: "Event moment 7",
    },
    {
        id: "1620789550663-2b10e0080354",
        alt: "Event moment 8",
    },
    {
        id: "1617775623669-20bff4ffaa5c",
        alt: "Event moment 9",
    },
    {
        id: "1548600916-dc8492f8e845",
        alt: "Event moment 10",
    },
    {
        id: "1573824969595-a76d4365a2e6",
        alt: "Event moment 11",
    },
    {
        id: "1633936929709-59991b5fdd72",
        alt: "Event moment 12",
    },
];

const N = GALLERY_DATA.length;

export default function GalleryPage() {
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Pause/resume on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <section className="gallery-page">
            {/* Background decorative elements */}
            <div className="gallery-bg-glow gallery-bg-glow--top" />
            <div className="gallery-bg-glow gallery-bg-glow--bottom" />

            {/* Header */}
            <motion.div
                className="gallery-header"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <span className="gallery-header__label">Moments Captured</span>
                <h1 className="gallery-header__title">
                    Our <span className="gallery-header__accent">Gallery</span>
                </h1>
                <p className="gallery-header__subtitle">
                    Relive the energy, inspiration, and connections from our events
                </p>
            </motion.div>

            {/* 3D Carousel Ring */}
            <motion.div
                className="scene"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={carouselRef}
                    className={`a3d ${isPaused ? "paused" : ""}`}
                    style={{ "--n": N } as React.CSSProperties}
                >
                    {GALLERY_DATA.map((item, i) => (
                        <img
                            key={item.id}
                            className="card"
                            src={`https://images.unsplash.com/photo-${item.id}?w=400&q=80`}
                            style={{ "--i": i } as React.CSSProperties}
                            alt={item.alt}
                            loading={i < 4 ? "eager" : "lazy"}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Pause indicator */}
            <motion.div
                className="gallery-pause-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
            >
                <span className="gallery-pause-hint__icon">
                    {isPaused ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4l3 3" strokeLinecap="round" />
                        </svg>
                    )}
                </span>
                {isPaused ? "Paused — move away to resume" : "Hover to pause rotation"}
            </motion.div>
        </section>
    );
}
