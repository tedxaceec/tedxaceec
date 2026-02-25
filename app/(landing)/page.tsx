import HeroSection from './(sections)/HeroSection'
import WhatIsTedx from './(sections)/WhatIsTedx'
import AboutTedxAce from './(sections)/AboutTedx'
import FeaturedSpeakers from './(sections)/FeaturedSpeakers'
import EventTimeline from './(sections)/Timeline'

const page = () => {
  return (
    <div>
      <HeroSection />
      <WhatIsTedx />
      <AboutTedxAce />
      <FeaturedSpeakers />
      <EventTimeline />
    </div>
  )
}

export default page