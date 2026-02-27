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

export const THEME = {
    header: "Our Theme",
    title: {
        part1: "Bedrock",
        separator: "&",
        part2: "Beyond"
    },
    bedrock: {
        title: "Bedrock",
        subtitle: "The Foundation",
        description: "Bedrock represents the unwavering foundations upon which we build — the timeless principles of knowledge, resilience, culture, and values that our predecessors laid down for us. It is the solid ground of wisdom, the unyielding bedrock of science, tradition, and human experience that gives us the strength to reach higher.",
        tags: ["Knowledge", "Resilience", "Heritage", "Values"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
                <path d="M2 22L12 2l10 20H2z" />
                <path d="M12 22V10" />
            </svg>
        )
    },
    beyond: {
        title: "Beyond",
        subtitle: "The Frontier",
        description: "Beyond represents the limitless horizon of human imagination — the uncharted territories of innovation, technology, and creative disruption. It is the call to push past comfort zones, challenge conventions, and dare to envision a future that doesn't yet exist. Together, Bedrock & Beyond remind us that the strongest futures are built on the deepest foundations.",
        tags: ["Innovation", "Imagination", "Disruption", "Future"],
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        )
    },
    connector: "“The strongest futures are built on the deepest foundations.”"
};

export const COLLEGE = {
    tagline: "Our Campus",
    title: "About ACE Engineering College",
    description: "ACE Engineering College is a premier institution of higher learning located in Hyderabad, Telangana, India. Established with a vision to nurture innovation and academic excellence, the college has been at the forefront of engineering education, producing world-class engineers and innovators.\n\nWith state-of-the-art infrastructure, dedicated faculty, and a vibrant campus culture, ACE Engineering College provides a nurturing environment that encourages students to think beyond boundaries and create meaningful impact. The college is NAAC accredited and affiliated to JNTUH, offering a range of undergraduate and postgraduate programs in engineering and technology.\n\nTEDxACE Engineering College is a proud extension of this legacy — a platform where the spirit of innovation meets the power of ideas worth spreading.",
    stats: [
        { "value": 20, "suffix": "+", "label": "Years of Excellence" },
        { "value": 3000, "suffix": "+", "label": "Students" },
        { "value": 8, "suffix": "+", "label": "Departments" },
        { "value": 200, "suffix": "+", "label": "Faculty Members" },
        { "value": 95, "suffix": "%", "label": "Placement Rate" },
        { "value": 50, "suffix": "+", "label": "Clubs & Societies" }
    ]
};

export const WHAT_IS_TED = {
    tagline: "The Origin",
    title: "What is TED?",
    description: "TED is a nonprofit organization devoted to spreading ideas, usually in the form of short, powerful talks (18 minutes or less). TED began in 1984 as a conference where Technology, Entertainment, and Design converged, and today covers almost all topics — from science to business to global issues — in more than 100 languages.\n\nTED's mission is to discover and spread ideas that spark imagination, embrace possibility, and catalyze impact. Through its open and free initiatives, TED creates a global community fueled by curiosity and wonder.",
    pillars: [
        { letter: "T", label: "Technology", color: "from-red-500 to-red-600" },
        { letter: "E", label: "Entertainment", color: "from-red-400 to-red-500" },
        { letter: "D", label: "Design", color: "from-red-500 to-red-400" }
    ],
    overlayText: "Ideas Worth Spreading"
};

export const WHAT_IS_TEDX = {
    tagline: "The Movement",
    title: "What is TEDx?",
    description: "In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TEDTalks video and live speakers combine to spark deep discussion and connection in a small group. These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized. (Subject to certain rules and regulations).",
    cards: [
        {
            title: "Independently Organized",
            description: "Each TEDx event is uniquely curated and organized by local teams who are passionate about their community's ideas."
        },
        {
            title: "Local Discoveries",
            description: "We focus on uncovering voices and stories that might otherwise go unheard, providing them a global platform."
        },
        {
            title: "Community Driven",
            description: "Beyond the stage, TEDx is about building a community of curious individuals who are ready to take action."
        }
    ]
};