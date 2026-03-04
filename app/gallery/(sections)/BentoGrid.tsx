"use client";
import { motion } from "framer-motion";

export default function BentoGrid({ images }: { images: string[] }) {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#eb0028] mb-4">Event Highlights</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">Relive the powerful moments, incredible speakers, and amazing audience from our past events.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className={`relative rounded-3xl overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2" :
                            i === 3 ? "md:col-span-2" : ""
                            }`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                    >
                        <img
                            src={img}
                            alt={`Event highlight ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                            <span className="text-white font-medium text-lg drop-shadow-md">Highlight #{i + 1}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
