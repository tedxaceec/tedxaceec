import type { Metadata } from "next";
import AboutHero from "./(sections)/AboutHero";
import WhatIsTed from "./(sections)/WhatIsTed";
import WhatIsTedx from "./(sections)/WhatIsTedx";
import AboutCollege from "./(sections)/AboutCollege";
import ThemeSection from "./(sections)/ThemeSection";
import MottoSection from "./(sections)/MottoSection";
import ValuesSection from "./(sections)/ValuesSection";
import AboutCTA from "./(sections)/AboutCTA";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about TEDxACE Engineering College, our theme 'Bedrock & Beyond', and the ideas worth spreading at ACE Engineering College, Hyderabad.",
};

export default function AboutPage() {
    return (
        <div className="relative overflow-hidden">
            <AboutHero />
            <WhatIsTed />
            <WhatIsTedx />
            <AboutCollege />
            <ThemeSection />
            <MottoSection />
            <ValuesSection />
            <AboutCTA />
        </div>
    );
}