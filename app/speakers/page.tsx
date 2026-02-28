import type { Metadata } from "next";
import SpeakersHero from "./(sections)/SpeakersHero";
import dynamic from "next/dynamic";

const SpeakersGrid = dynamic(() => import("./(sections)/SpeakersGrid"), { ssr: true });

export const metadata: Metadata = {
	title: "Our Speakers | TEDxACEEC",
	description:
		"Meet the incredible minds joining us at TEDxACE Engineering College. Discover our diverse lineup of speakers across technology, design, science, and more.",
};

export default function SpeakersPage() {
	return (
		<div className="relative overflow-hidden bg-[#0A0A0A] min-h-screen">
			<SpeakersHero />
			<SpeakersGrid />
		</div>
	);
}