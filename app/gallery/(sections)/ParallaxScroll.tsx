"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imagesCol1 = [
    "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2774577/pexels-photo-2774577.jpeg?auto=compress&cs=tinysrgb&w=800"
];
const imagesCol2 = [
    "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=800"
];
const imagesCol3 = [
    "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800"
];

export default function ParallaxScroll() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#eb0028] mb-4">Perspectives</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">Different angles, different stories. Scroll to explore the multifaceted nature of TEDx events.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center gap-6 h-[800px] md:h-[1000px] overflow-hidden rounded-[2rem]">
                <motion.div style={{ y: y1 }} className="flex flex-col gap-6 w-full md:w-1/3">
                    {imagesCol1.map((img, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] shrink-0 hover:scale-[1.02] transition-transform duration-300">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </motion.div>
                <motion.div style={{ y: y2 }} className="hidden md:flex flex-col gap-6 w-full md:w-1/3">
                    {imagesCol2.map((img, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] shrink-0 hover:scale-[1.02] transition-transform duration-300">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </motion.div>
                <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-6 w-full md:w-1/3">
                    {imagesCol3.map((img, i) => (
                        <div key={i} className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] shrink-0 hover:scale-[1.02] transition-transform duration-300">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
