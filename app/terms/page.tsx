"use client";
import React from "react";
import { motion } from "framer-motion";

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
                <h1 className="text-4xl md:text-6xl font-bold mb-8">Terms of Service</h1>
                <p className="text-neutral-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="space-y-8 text-neutral-300 leading-relaxed max-w-none prose prose-invert">
                    <p>By purchasing a ticket or attending TEDxACEEC, you agree to these fundamental terms. We expect all attendees and speakers to maintain a respectful and welcoming environment for everyone.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Ticketing and Etiquette</h2>
                    <p>Tickets are non-refundable unless the event is indefinitely canceled or rescheduled in a way that prohibits your attendance. We reserve the right to deny entry to anyone who acts in a disruptive or unsafe manner.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Media Release</h2>
                    <p>TEDx events are globally recorded and broadcasted. By attending, you consent to being photographed or documented by our media crew for promotional or archival purposes.</p>
                </div>
            </motion.div>
        </div>
    );
}
