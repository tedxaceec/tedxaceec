import dynamic from 'next/dynamic'
import HeroSection from './(sections)/HeroSection'

const WhatIsTedx = dynamic(() => import('./(sections)/WhatIsTedx'), { ssr: true })
const AboutTedxAce = dynamic(() => import('./(sections)/AboutTedx'), { ssr: true })
const FeaturedSpeakers = dynamic(() => import('./(sections)/FeaturedSpeakers'), { ssr: true })
const EventTimeline = dynamic(() => import('./(sections)/Timeline'), { ssr: true })
const FaqSection = dynamic(() => import('./(sections)/FaqSection'), { ssr: true })

const page = () => {
  return (
    <div>
      <HeroSection />
      <WhatIsTedx />
      <AboutTedxAce />
      <FeaturedSpeakers />
      <EventTimeline />
      <FaqSection />
    </div>
  )
}

export default page