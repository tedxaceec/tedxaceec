"use client";
import React from "react";
import { motion } from "framer-motion";
import termsData from "../../data/terms.json";

const renderText = (text?: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className="text-white font-bold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return <span key={i}>{part}</span>;
    });
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-24 font-sans px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <div className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-[#eb0027] mb-6">
                    Legal
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8">{termsData.title}</h1>
                <p className="text-neutral-400 mb-6">Last updated: {termsData.lastUpdated}</p>
                <div className="space-y-8 text-neutral-300 leading-relaxed max-w-none prose prose-invert">
                    {termsData.sections.map((section, index) => {
                        if (section.type === "heading") {
                            return (
                                <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4">
                                    {renderText(section.content)}
                                </h2>
                            );
                        } else if (section.type === "list") {
                            return (
                                <ul key={index} className="list-disc pl-6 space-y-2">
                                    {section.items?.map((item, itemIndex) => (
                                        <li key={itemIndex}>{renderText(item)}</li>
                                    ))}
                                </ul>
                            );
                        } else {
                            return <p key={index}>{renderText(section.content)}</p>;
                        }
                    })}
                </div>
            </motion.div>
        </div>
    );
}
