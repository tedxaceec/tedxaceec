"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import faqs from "@/data/faq.json";

interface FAQItem {
    question: string;
    answer: string;
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

const FaqItem = ({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div className="border border-border/50 bg-card rounded-2xl mb-4 overflow-hidden transition-colors hover:border-r-ring/50">
            <button
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/50 focus:outline-none"
                onClick={onClick}
            >
                <span className="text-base font-semibold text-foreground sm:text-lg">
                    {question}
                </span>
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        color: isOpen ? "var(--color-primary)" : "var(--color-muted-foreground)",
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50"
                >
                    <Plus className="h-5 w-5" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    return (
        <section className="relative w-full py-20 lg:py-32 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="mx-auto max-w-4xl px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="max-w-[600px] mx-auto text-lg text-muted-foreground">
                            Everything you need to know about the TEDxACEEC event. Can't find the answer you're looking for? Feel free to reach out.
                        </p>
                    </motion.div>
                </div>

                <div className="mx-auto w-full">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <FaqItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => toggleItem(index)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
