import type { Metadata } from "next";
import TeamHero from "./(sections)/TeamHero";
import TeamGrid from "./(sections)/TeamGrid";
export const metadata: Metadata = {
    title: "Our Team | TEDxACEEC",
    description:
        "Meet the passionate minds organizing TEDxACE Engineering College.",
};

export default function TeamPage() {
    return (
        <div className="relative overflow-hidden bg-[#0A0A0A] min-h-screen">
            <TeamHero />
            <TeamGrid />
        </div>
    );
}
