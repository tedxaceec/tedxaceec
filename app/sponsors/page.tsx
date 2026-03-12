import type { Metadata } from "next";
import SponsorsHero from "./(sections)/SponsorsHero";
import WhySponsor from "./(sections)/WhySponsor";
import SponsorsComingSoon from "./(sections)/SponsorsComingSoon";
import SponsorCTA from "./(sections)/SponsorCTA";

export const metadata: Metadata = {
    title: "Sponsors & Partners | TEDxACEEC | ACE Engineering College Hyderabad",
    description:
        "Meet the visionary sponsors and partners powering TEDxACEEC's Bedrock & Beyond event at ACE Engineering College, Ghatkesar, Hyderabad. Explore sponsorship tiers, partnership benefits, and collaboration opportunities.",
    openGraph: {
        title: "TEDxACEEC Sponsors & Partners | Bedrock & Beyond",
        description:
            "Explore sponsorship opportunities and meet the partners powering TEDxACEEC at ACE Engineering College, Hyderabad.",
        type: "website",
    },
    keywords: [
        "TEDxACEEC sponsors",
        "TEDx ACE Engineering College sponsors",
        "TEDx sponsor opportunities Hyderabad",
        "sponsor TEDx event",
    ],
};

export default function SponsorsPage() {
    return (
        <div className="relative overflow-hidden">
            <SponsorsHero />
            <WhySponsor />
            <SponsorsComingSoon />
            <SponsorCTA />
        </div>
    );
}
