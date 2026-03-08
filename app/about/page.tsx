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
    title: "About TEDxACEEC | Bedrock & Beyond Theme | ACE Engineering College",
    description:
        "Learn about TEDxACEEC (TEDx ACE Engineering College), our theme 'Bedrock & Beyond', what is TED & TEDx, and discover the ideas worth spreading at ACE Engineering College, Ankushapur, Ghatkesar, Hyderabad, Telangana.",
    openGraph: {
        title: "About TEDxACEEC | Bedrock & Beyond",
        description:
            "Discover TEDxACEEC — an independently organized TEDx event at ACE Engineering College, Ghatkesar, Hyderabad. Learn about our Bedrock & Beyond theme and the ideas worth spreading.",
        type: "website",
    },
    keywords: [
        "about TEDxACEEC",
        "TEDx ACE Engineering College about",
        "Bedrock and Beyond theme",
        "what is TEDx",
        "ACE Engineering College Hyderabad",
        "TEDx Hyderabad about",
    ],
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