"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DragSlider({ images }: { images: string[] }) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
        const handleResize = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="py-24 overflow-hidden relative w-full border-t border-white/5 bg-black/50">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Behind the Scenes</h2>
                    <p className="text-zinc-400 max-w-lg">Drag to slide through the gallery and see the effort, preparation, and passion behind the magic.</p>
                </div>
                <div className="flex flex-row items-center gap-2 text-[#eb0028] font-semibold uppercase tracking-widest text-sm bg-[#eb0028]/10 py-2 px-4 rounded-full">
                    <span>Drag to explore</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
            </div>

            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] pb-12">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-6 w-max"
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            className="w-[280px] md:w-[420px] aspect-4/5 rounded-3xl overflow-hidden shrink-0 pointer-events-none drop-shadow-2xl border border-white/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={img} alt={`Slide ${i}`} className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
