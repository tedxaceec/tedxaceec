"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Ticket,
    Users,
    Crown,
    Copy,
    Check,
    UtensilsCrossed,
    Coffee,
    Droplets,
    Gift,
    Award,
    Camera,
    Bus,
    AlertTriangle,
} from "lucide-react";

const REGISTER_URL =
    "https://events.studenttribe.in/event/69abeff62aa8ba7856944b10";

/* ─── Coupon Code Copy Button ─────────────────────────────────────────── */
function CouponCode({ code }: { code: string }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="group/copy flex items-center gap-2 rounded-lg border border-dashed border-red-500/40 bg-red-500/5 px-4 py-2.5 font-mono text-sm font-bold tracking-wider text-red-400 transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/10"
        >
            <Ticket className="h-4 w-4" />
            <span>Use Code:</span>
            <span className="text-white">{code}</span>
            {copied ? (
                <Check className="h-4 w-4 text-green-400" />
            ) : (
                <Copy className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover/copy:opacity-100" />
            )}
        </button>
    );
}

/* ─── Pricing Card ────────────────────────────────────────────────────── */
function PricingCard({
    title,
    people,
    standardPrice,
    yourPrice,
    savings,
    perPerson,
    couponCode,
    isBestValue = false,
    subtitle,
    delay = 0,
}: {
    title: string;
    people: number;
    standardPrice: number;
    yourPrice: number;
    savings: number;
    perPerson: number;
    couponCode: string;
    isBestValue?: boolean;
    subtitle?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 ${isBestValue
                ? "border-red-500/30 bg-red-500/5 shadow-[0_0_60px_-12px_rgba(235,0,40,0.15)] hover:shadow-[0_0_80px_-12px_rgba(235,0,40,0.25)]"
                : "border-white/8 bg-white/3 hover:border-white/12"
                }`}
        >
            {/* Best Value Badge */}
            {isBestValue && (
                <div className="absolute -right-12 top-6 z-20 rotate-45 bg-red-600 px-12 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                    Best Value
                </div>
            )}

            {/* Animated glow border for best value */}
            {isBestValue && (
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-60">
                    <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(235,0,40,0.2) 0%, transparent 50%, rgba(235,0,40,0.1) 100%)",
                        }}
                    />
                </div>
            )}

            {/* Card Header */}
            <div className={`relative px-6 pt-8 pb-6 sm:px-8 ${isBestValue ? "bg-red-500/5" : ""}`}>
                <div className="mb-4 flex items-center gap-3">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${isBestValue
                            ? "bg-red-500/15 text-red-400 ring-1 ring-red-500/30"
                            : "bg-white/5 text-neutral-400 ring-1 ring-white/10"
                            }`}
                    >
                        {isBestValue ? <Crown className="h-6 w-6" /> : <Users className="h-6 w-6" />}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
                        <p className="text-sm text-neutral-400">
                            {people} People
                            {subtitle && (
                                <span className="ml-2 text-red-400 font-semibold">{subtitle}</span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Pricing */}
                <div className="mt-2">
                    <div className="flex items-baseline gap-3">
                        <span
                            className="relative text-lg font-bold text-red-400/70 sm:text-xl"
                            style={{
                                textDecoration: "line-through",
                                textDecorationColor: "rgba(239, 68, 68, 0.7)",
                                textDecorationThickness: "2.5px",
                            }}
                        >
                            ₹{standardPrice.toLocaleString()}
                        </span>
                        <span className="text-4xl font-black text-white sm:text-5xl">
                            ₹{yourPrice.toLocaleString()}
                        </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400 ring-1 ring-green-500/20">
                            You Save ₹{savings}!
                        </span>
                        <span className="text-sm text-neutral-400">
                            Just <span className="font-semibold text-white">₹{perPerson}</span> per person
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-linear-to-r from-transparent via-white/10 to-transparent sm:mx-8" />

            {/* Card Footer with Coupon */}
            <div className="flex flex-1 flex-col items-center justify-between gap-4 px-6 py-6 sm:px-8">
                <CouponCode code={couponCode} />
                <a
                    href={REGISTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${isBestValue
                        ? "bg-red-600 text-white shadow-lg shadow-red-500/25 hover:bg-red-500 hover:shadow-xl hover:shadow-red-500/35"
                        : "bg-white/8 text-white ring-1 ring-white/10 hover:bg-white/12 hover:ring-white/20"
                        }`}
                >
                    {/* Shine effect */}
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                    <span className="relative z-10">
                        {isBestValue ? "Grab Tribe Pass" : "Select Squad Pass"}
                    </span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
            </div>
        </motion.div>
    );
}

/* ─── Perk Item ───────────────────────────────────────────────────────── */
function PerkItem({
    icon,
    label,
    highlight,
    delay = 0,
}: {
    icon: React.ReactNode;
    label: string;
    highlight?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/4"
        >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors duration-300 group-hover:bg-red-500/15">
                {icon}
            </div>
            <span className="text-sm text-neutral-300">
                {highlight ? (
                    <>
                        <span className="font-semibold text-white">{highlight}</span>{" "}
                        {label}
                    </>
                ) : (
                    label
                )}
            </span>
        </motion.div>
    );
}

/* ─── Main Section ────────────────────────────────────────────────────── */
export default function TicketsCTA() {
    const perks = [
        { icon: <UtensilsCrossed className="h-4 w-4" />, label: "Full Lunch Box", highlight: "🍱" },
        { icon: <Coffee className="h-4 w-4" />, label: "Cold Coffee & Milkshake", highlight: "Premium" },
        { icon: <Droplets className="h-4 w-4" />, label: "Water Bottles", highlight: " " },
        { icon: <Gift className="h-4 w-4" />, label: "Swag Bag & Keychain", highlight: "TEDx" },
        { icon: <Award className="h-4 w-4" />, label: "Participant Certificate (Resume Builder!)", highlight: "Official TEDx" },
        { icon: <Camera className="h-4 w-4" />, label: "Speaker meet-and-greet & photo ops!", highlight: "📸" },
        { icon: <Bus className="h-4 w-4" />, label: "Transport for outside students", highlight: "Free" },
    ];

    return (
        <section
            id="tickets-cta"
            className="relative overflow-hidden py-24 md:py-32 lg:py-40"
        >
            {/* ── Background layers ──────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {/* Top fade */}
                <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background to-transparent" />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
                {/* Central ambient glow */}
                <div
                    className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.25) 0%, transparent 60%)",
                        filter: "blur(120px)",
                    }}
                />
                {/* Side glows */}
                <div
                    className="absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.3) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(235,0,40,0.3) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            {/* ── Top decorative line ────────────────────────────────────── */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 right-0 top-0 h-px origin-left"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(235,0,40,0.3), transparent)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* ── Section Header ─────────────────────────────────────── */}
                <div className="mx-auto max-w-3xl text-center">
                    {/* Tagline badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-linear-to-r from-red-500/10 to-red-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-red-400"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                        🔥 Exclusive Group Deals
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                    >
                        Don&apos;t Pay{" "}
                        <span className="bg-linear-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                            Full Price
                        </span>{" "}
                        for TEDxACEEC!
                    </motion.h2>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl"
                    >
                        Why pay{" "}
                        <span className="font-semibold text-white">₹600</span> for a solo ticket
                        when you can{" "}
                        <span className="font-bold text-red-400">
                            SAVE UP TO ₹900
                        </span>{" "}
                        by bringing your friends?
                    </motion.p>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-3 text-sm text-neutral-500 italic"
                    >
                        Choose your pass before they lock at ₹600 flat...
                    </motion.p>
                </div>

                {/* ── Pricing Cards ──────────────────────────────────────── */}
                <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
                    <PricingCard
                        title="THE SQUAD PASS"
                        people={4}
                        standardPrice={2400}
                        yourPrice={1950}
                        savings={450}
                        perPerson={487}
                        couponCode="SQUAD"
                        delay={0.15}
                    />
                    <PricingCard
                        title="THE TRIBE PASS"
                        people={6}
                        standardPrice={3600}
                        yourPrice={2700}
                        savings={900}
                        perPerson={450}
                        couponCode="TRIBE"
                        isBestValue
                        subtitle="ULTIMATE STEAL!"
                        delay={0.3}
                    />
                </div>

                {/* ── Every Ticket Includes ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mx-auto mt-20 max-w-4xl"
                >
                    <h3 className="mb-8 text-center text-lg font-bold uppercase tracking-widest text-white md:text-xl">
                        Every Single Ticket{" "}
                        <span className="text-red-400">Includes</span>
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {perks.map((perk, i) => (
                            <PerkItem
                                key={i}
                                icon={perk.icon}
                                label={perk.label}
                                highlight={perk.highlight}
                                delay={i * 0.05}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* ── Urgency Warning ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-16 max-w-3xl"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-5 backdrop-blur-sm sm:px-8">
                        {/* Pulsing glow behind */}
                        <div
                            className="pointer-events-none absolute inset-0 animate-pulse opacity-30"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(235,0,40,0.15) 0%, transparent 70%)",
                            }}
                        />
                        <div className="relative flex items-start gap-3 sm:items-center">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400 sm:mt-0" />
                            <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                                <span className="font-bold text-red-400">WARNING:</span>{" "}
                                We only have a strict handful of these group passes. Once claimed, the price
                                locks at{" "}
                                <span className="font-bold text-white">₹600</span> for everyone.{" "}
                                <span className="font-semibold text-red-400">No exceptions.</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Final CTA ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="mb-6 text-base text-neutral-400 sm:text-lg">
                        Ping your{" "}
                        <span className="font-semibold text-white">squad</span>, do the{" "}
                        <span className="font-semibold text-white">math</span>, and grab your
                        passes{" "}
                        <span className="font-bold text-red-400">NOW</span>! 👇
                    </p>
                    <a
                        href={REGISTER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-red-600 px-10 py-5 text-base font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-500 hover:shadow-xl hover:shadow-red-500/35 sm:text-lg"
                    >
                        {/* Shine effect */}
                        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Ticket className="relative z-10 h-5 w-5" />
                        <span className="relative z-10">Grab Your Passes Now!</span>
                        <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <p className="mt-4 text-sm text-neutral-500">
                        🔗 tedx.aceec.ac.in
                    </p>
                </motion.div>
            </div>

            {/* ── Bottom decorative line ──────────────────────────────────── */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-right"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(235,0,40,0.3), transparent)",
                }}
            />
        </section>
    );
}
