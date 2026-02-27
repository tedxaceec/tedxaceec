"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
                <h1 className="text-4xl md:text-6xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-neutral-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                <div className="space-y-8 text-neutral-300 leading-relaxed max-w-none prose prose-invert">
                    <p>At TEDxACEEC, your privacy is of the utmost importance to us. This policy outlines exactly what data we collect from attendees and how we securely manage it.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Information We Collect</h2>
                    <p>When you register for our event, we collect your name, email address, physical address (if applicable), and optionally phone numbers to facilitate your attendance. We never sell your personal information.</p>
                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Data Security</h2>
                    <p>Your payment information is processed by our secure verified vendors. TEDxACEEC does not store full credit card details on our servers at any time.</p>
                </div>
            </motion.div>
        </div>
    );
}
