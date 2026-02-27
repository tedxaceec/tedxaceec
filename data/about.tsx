import React from "react";

export interface ValueItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const VALUES: ValueItem[] = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-4 12.73V17h8v-2.27A7 7 0 0 0 12 2z" />
                <path d="M9 18h6M10 22h4" />
            </svg>
        ),
        title: "Innovation",
        description:
            "Pushing the boundaries of what's possible through creative thinking, technological advancement, and bold experimentation that challenges the status quo.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: "Community",
        description:
            "Building a vibrant ecosystem of thinkers, doers, and dreamers who collaborate, support, and inspire each other to create meaningful change.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: "Inspiration",
        description:
            "Sparking curiosity and wonder through powerful stories, breakthrough ideas, and visionary perspectives that ignite the imagination and motivate action.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        title: "Impact",
        description:
            "Every idea shared at our stage has the potential to ripple outward — transforming communities, industries, and lives far beyond the walls of our auditorium.",
    },
];

export const MOTTO = {
    words: ["Ideas", "Worth", "Spreading"],
    highlightWord: "Worth",
    description: "Every idea has the power to change the world. At TEDxACE Engineering College, we believe in amplifying those ideas and giving them the stage they deserve."
};
