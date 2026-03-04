"use client";

import { motion } from "framer-motion";
import "./carousel.css";

import galleryData from "@/data/gallery.json";
import BentoGrid from "./(sections)/BentoGrid";
import ParallaxScroll from "./(sections)/ParallaxScroll";
import DragSlider from "./(sections)/DragSlider";
export default function GalleryPage() {
    const { header, images, bentoGrid, dragSlider, parallaxScroll } = galleryData;
    const n = images.length;

    return (
        <main>
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
                    <span className="gallery-header__label">{header.label}</span>
                    <h1 className="gallery-header__title">
                        {header.title.split(header.accentWord)[0]}
                        <span className="gallery-header__accent">{header.accentWord}</span>
                        {header.title.split(header.accentWord)[1]}
                    </h1>
                    <p className="gallery-header__subtitle">
                        {header.subtitle}
                    </p>
                </motion.div>

                {/* 3D Carousel Ring */}
                <motion.div
                    className="scene"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div
                        className="a3d"
                        style={{ "--n": n } as React.CSSProperties}
                    >
                        {images.map((item, i) => (
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
            </section>

            <BentoGrid images={bentoGrid} />
            <DragSlider images={dragSlider} />
            <ParallaxScroll {...parallaxScroll} />
        </main>
    );
}
