import type { Metadata } from "next";
import TeamHero from "./(sections)/TeamHero";
import TeamGrid from "./(sections)/TeamGrid";
export const metadata: Metadata = {
    title: "Our Team | TEDxACEEC Organizing Committee | ACE Engineering College",
    description:
        "Meet the passionate student organizers behind TEDxACEEC (TEDx ACE Engineering College). Our team of innovators and leaders at ACE Engineering College, Ghatkesar, Hyderabad, curates the Bedrock & Beyond experience.",
    openGraph: {
        title: "TEDxACEEC Team | The Minds Behind Bedrock & Beyond",
        description:
            "Meet the student-led organizing committee of TEDxACEEC at ACE Engineering College, Hyderabad.",
        type: "website",
    },
    keywords: [
        "TEDxACEEC team",
        "TEDx ACE Engineering College organizers",
        "TEDxACEEC organizing committee",
        "student organizers Hyderabad",
    ],
};

export default function TeamPage() {
    return (
        <div className="relative overflow-hidden bg-[#0A0A0A] min-h-screen">
            <TeamHero />
            <TeamGrid />
        </div>
    );
}
