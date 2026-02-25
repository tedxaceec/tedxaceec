import HeroSection from './(sections)/HeroSection'
import WhatIsTedx from './(sections)/WhatIsTedx'
import FeaturedSpeakers from './(sections)/FeaturedSpeakers'
import EventTimeline from './(sections)/Timeline'

const page = () => {
  return (
    <div>
      <HeroSection />
      <WhatIsTedx />
      <FeaturedSpeakers />
      <EventTimeline />
    </div>
  )
}

export default page