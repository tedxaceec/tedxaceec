import HeroSection from './(sections)/HeroSection'
import WhatIsTedx from './(sections)/WhatIsTedx'
import EventTimeline from './(sections)/Timeline'

const page = () => {
  return (
    <div>
      <HeroSection />
      <WhatIsTedx />
      <EventTimeline />
    </div>
  )
}

export default page