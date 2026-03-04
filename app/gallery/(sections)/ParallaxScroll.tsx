"use client";
import { motion } from "framer-motion";

const Column = ({ images, reverse, className }: { images: string[], reverse?: boolean, className?: string }) => {
    // Duplicate images for infinite loop
    const loopedImages = [...images, ...images];
    return (
        <div className={`overflow-hidden ${className}`}>
            <div className={`flex flex-col gap-6 w-full ${reverse ? 'animate-[scroll-y-reverse_35s_linear_infinite]' : 'animate-[scroll-y_35s_linear_infinite]'} hover:paused`}>
                {loopedImages.map((img, i) => (
                    <div key={i} className="rounded-3xl overflow-hidden h-[400px] md:h-[600px] shrink-0 hover:scale-[1.02] transition-transform duration-300">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ParallaxScroll({ col1, col2, col3 }: { col1: string[], col2: string[], col3: string[] }) {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <style>{`
                @keyframes scroll-y {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(calc(-50% - 12px)); }
                }
                @keyframes scroll-y-reverse {
                    0% { transform: translateY(calc(-50% - 12px)); }
                    100% { transform: translateY(0); }
                }
            `}</style>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#eb0028] mb-4">Perspectives</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">Different angles, different stories. Hover to pause and explore the multifaceted nature of TEDx events.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-center gap-6 h-[800px] md:h-[1000px] overflow-hidden rounded-[2rem]">
                <Column images={col1} className="w-full md:w-1/3" />
                <Column images={col2} reverse className="hidden md:flex w-full md:w-1/3" />
                <Column images={col3} className="hidden md:flex w-full md:w-1/3" />
            </div>
        </section>
    );
}
