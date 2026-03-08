import type { Metadata } from "next";
import SpeakersHero from "./(sections)/SpeakersHero";
import dynamic from "next/dynamic";

const SpeakersGrid = dynamic(() => import("./(sections)/SpeakersGrid"), { ssr: true });
const SpeakerCTA = dynamic(() => import("./(sections)/SpeakerCTA"), { ssr: true });

export const metadata: Metadata = {
	title: "Speakers | TEDxACEEC Bedrock & Beyond | ACE Engineering College",
	description:
		"Meet the incredible speakers at TEDxACEEC (TEDx ACE Engineering College) Bedrock & Beyond. Discover our diverse lineup of thought leaders, innovators and change-makers across technology, design, science, and more at ACE Engineering College, Hyderabad.",
	openGraph: {
		title: "TEDxACEEC Speakers | Bedrock & Beyond",
		description:
			"Discover the inspiring speaker lineup for TEDxACEEC at ACE Engineering College, Ghatkesar, Hyderabad. Thought leaders sharing ideas worth spreading.",
		type: "website",
	},
	keywords: [
		"TEDxACEEC speakers",
		"TEDx ACE Engineering College speakers",
		"TEDx speakers Hyderabad",
		"Bedrock and Beyond speakers",
		"motivational speakers ACE Engineering College",
	],
};

export default function SpeakersPage() {
	return (
		<div className="relative overflow-hidden bg-[#0A0A0A] min-h-screen">
			<SpeakersHero />
			<SpeakersGrid />
			<SpeakerCTA />
		</div>
	);
}