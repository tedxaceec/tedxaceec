"use client";
import React from "react";
import { motion } from "framer-motion";

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
                <h1 className="text-4xl md:text-6xl font-bold mb-8">Cookie Policy</h1>
                <p className="text-neutral-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="space-y-8 text-neutral-300 leading-relaxed max-w-none prose prose-invert">
                    <p>We use essential cookies to maintain sessions during ticketing or login, and analytical cookies to understand how attendees navigate our site.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">What types of cookies do we use?</h2>
                    <p>Only the absolute minimum. No cross-site trackers or shady advertisement loops. Just simple local analytical pings to improve the site layout based on which devices frequently visit.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Opting Out</h2>
                    <p>You may elect to disable cookies inside your browser settings at any point without losing any core ticketing functionality.</p>
                </div>
            </motion.div>
        </div>
    );
}
