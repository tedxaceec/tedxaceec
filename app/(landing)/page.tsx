import HeroSection from './(sections)/HeroSection'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { EventTimeline } from './(sections)/Timeline'

const page = () => {
  return (
    <TracingBeam>
      <HeroSection />
      <EventTimeline />
    </TracingBeam>
  )
}

export default page