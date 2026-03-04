"use client";
import React from "react";
import { motion } from "framer-motion";
import cookiesData from "../../data/cookies.json";
import Link from "next/link";

const renderText = (text?: string) => {
    if (!text) return null;

    const linkParts = text.split(/(\[.*?\]\(.*?\))/g);

    return linkParts.map((part, i) => {
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
            return (
                <Link key={i} href={linkMatch[2]} className="text-[#eb0027] hover:text-white transition-colors underline">
                    {linkMatch[1]}
                </Link>
            );
        }

        const boldParts = part.split(/(\*\*.*?\*\*)/g);
        return boldParts.map((subPart, j) => {
            if (subPart.startsWith("**") && subPart.endsWith("**")) {
                return (
                    <strong key={`${i}-${j}`} className="text-white font-bold">
                        {subPart.slice(2, -2)}
                    </strong>
                );
            }
            // For nested list formatting like "- **Title:** desc", split again by newlines
            return subPart.split('\n').map((line, k) => (
                <React.Fragment key={`${i}-${j}-${k}`}>
                    {k > 0 && <br />}
                    <span>{line}</span>
                </React.Fragment>
            ));
        });
    });
};

export default function CookiesPage() {
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
                <h1 className="text-4xl md:text-6xl font-bold mb-8">{cookiesData.title}</h1>
                <p className="text-neutral-400 mb-6">Last updated: {cookiesData.lastUpdated}</p>
                <div className="space-y-8 text-neutral-300 leading-relaxed max-w-none prose prose-invert">
                    {cookiesData.sections.map((section, index) => {
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
