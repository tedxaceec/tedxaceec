import type { Metadata } from "next";
import SponsorsHero from "./(sections)/SponsorsHero";
import WhySponsor from "./(sections)/WhySponsor";
import TitleSponsor from "./(sections)/TitleSponsor";
import GoldSponsors from "./(sections)/GoldSponsors";
import SilverBronzeSponsors from "./(sections)/SilverSponsors";
import CommunityPartners from "./(sections)/CommunityPartners";
import SponsorCTA from "./(sections)/SponsorCTA";

export const metadata: Metadata = {
    title: "Sponsors & Partners",
    description:
        "Meet the visionary sponsors and partners powering TEDxACE Engineering College's 'Bedrock & Beyond' event. Explore sponsorship tiers, partnership benefits, and collaboration opportunities.",
};

export default function SponsorsPage() {
    return (
        <div className="relative overflow-hidden">
            <SponsorsHero />
            <WhySponsor />
            <TitleSponsor />
            <GoldSponsors />
            <SilverBronzeSponsors />
            <CommunityPartners />
            <SponsorCTA />
        </div>
    );
}
