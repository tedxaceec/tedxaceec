import type { Metadata } from "next";
import dynamic from "next/dynamic";
import AboutHero from "./(sections)/AboutHero";

const WhatIsTed = dynamic(() => import("./(sections)/WhatIsTed"), { ssr: true });
const WhatIsTedx = dynamic(() => import("./(sections)/WhatIsTedx"), { ssr: true });
const AboutCollege = dynamic(() => import("./(sections)/AboutCollege"), { ssr: true });
const ThemeSection = dynamic(() => import("./(sections)/ThemeSection"), { ssr: true });
const MottoSection = dynamic(() => import("./(sections)/MottoSection"), { ssr: true });
const ValuesSection = dynamic(() => import("./(sections)/ValuesSection"), { ssr: true });
const AboutCTA = dynamic(() => import("./(sections)/AboutCTA"), { ssr: true });

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