import Hero from './(sections)/Hero'
import HorizontalScrollCarousel from './(sections)/HorizontalScrollCarousel'
import { SmoothScrollHero } from './(sections)/Memories'

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <HorizontalScrollCarousel />
      <SmoothScrollHero />
    </div>
  )
}

export default LandingPage