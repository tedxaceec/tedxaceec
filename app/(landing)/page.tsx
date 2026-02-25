import HeroSection from './(sections)/HeroSection'
import { TracingBeam } from '@/components/ui/tracing-beam'

const page = () => {
  return (
    <TracingBeam>
      <HeroSection />
    </TracingBeam>
  )
}

export default page