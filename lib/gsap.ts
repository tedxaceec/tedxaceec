/**
 * Centralized GSAP Configuration
 *
 * All GSAP imports and plugin registrations happen here.
 * Import `gsap` from this module instead of directly from "gsap"
 * to ensure plugins are registered exactly once.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register all plugins once
gsap.registerPlugin(ScrollTrigger);

// Default easing
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

export { gsap, ScrollTrigger };
export default gsap;
