import HeroSection from './(sections)/HeroSection'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { EventTimeline } from './(sections)/Timeline'
import WhatIsTedx from './(sections)/WhatIsTedx'

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