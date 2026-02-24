"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const frameCount = 150;

const currentFrame = (index: number) =>
  `/images/hero_sequence/Comp 1_${index.toString().padStart(5, "0")}.webp`;

export default function CinematicHero() {
  // ── SEO: Hidden semantic content for crawlers (rendered in noscript too) ──
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRef = useRef({ frame: 0 });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Preload images into the array
  useEffect(() => {
    // Only preload if we haven't already
    if (imagesRef.current.length === 0) {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current.push(img);
      }
    }
  }, []);

  const render = React.useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || imagesRef.current.length === 0) return;

    const frameIndex = Math.round(renderRef.current.frame);
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const drawImageCover = () => {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    if (img.complete) {
      drawImageCover();
    } else {
      img.onload = drawImageCover;
    }
  }, []);

  // Handle Resize Events
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render(); // redraw the current frame adjusting to new canvas size
      }
    };

    handleResize(); // Initial sizing on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [render]);

  // GSAP Animation Logic
  useGSAP(
    () => {
      // Attempt to ensure first frame draws immediately
      const firstImg = imagesRef.current[0];
      if (firstImg && !firstImg.complete) {
        firstImg.addEventListener("load", render, { once: true });
      } else {
        render();
      }

      // Initial Load Animation Timeline
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        brandingRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { autoAlpha: 0, y: 40, rotationX: -15, transformPerspective: 500 },
          { autoAlpha: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          descRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          scrollPromptRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.4"
        );

      // Scroll Animation for the Text Container
      gsap.to(textContainerRef.current, {
        autoAlpha: 0,
        y: -150,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top", // Fades out in the first 20% of scroll
          scrub: true,
        },
      });

      gsap.to(renderRef.current, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // 0.5 seconds to catch up, smooth scrubbing effect
        },
        onUpdate: () => {
          requestAnimationFrame(render);
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="h-[400vh] bg-black"
      aria-label="TEDxACEEC Bedrock and Beyond — Hero"
      itemScope
      itemType="https://schema.org/Event"
    >
      {/* Hidden semantic content for SEO crawlers */}
      <div className="sr-only">
        <h2 itemProp="name">TEDxACEEC — Bedrock &amp; Beyond</h2>
        <p itemProp="description">
          An independently organized TEDx event at Acharya College of Engineering,
          Electronics and Communications (ACEEC), Bangalore, India. Exploring the
          resilient foundations of our past and the limitless possibilities shaping
          our future. Featuring inspiring talks on innovation, technology,
          creativity, leadership, and ideas worth spreading.
        </p>
        <span itemProp="organizer" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="TEDxACEEC" />
          <meta itemProp="url" content="https://tedxaceec.com" />
        </span>
        <span itemProp="location" itemScope itemType="https://schema.org/Place">
          <meta itemProp="name" content="Acharya College of Engineering, Electronics and Communications" />
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Bangalore" />
            <meta itemProp="addressRegion" content="Karnataka" />
            <meta itemProp="addressCountry" content="IN" />
          </span>
        </span>
      </div>

      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
        }}
      >
        {/* Cinematic Text Overlay */}
        <div ref={textContainerRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center bg-radial from-transparent via-black/20 to-black/60">
          <div className="flex flex-col items-center gap-4 px-4 mix-blend-plus-lighter">
            <span ref={brandingRef} className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm md:text-base drop-shadow-lg invisible">TEDxACEEC</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)] font-sans leading-none">
              <span ref={titleLine1Ref} className="block invisible">Bedrock &</span>
              <span ref={titleLine2Ref} className="block text-transparent bg-clip-text bg-linear-to-r from-white via-gray-300 to-gray-500 invisible mt-2">Beyond</span>
            </h1>
            <p ref={descRef} className="max-w-xl mt-6 md:mt-8 text-sm md:text-lg lg:text-xl text-white/90 font-sans font-light drop-shadow-md leading-relaxed invisible">
              Exploring the resilient foundations of our past and the limitless possibilities shaping our future.
            </p>
          </div>

          <div ref={scrollPromptRef} className="absolute bottom-12 flex flex-col items-center gap-3 invisible">
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase font-sans font-medium animate-bounce">Scroll to Descend</span>
            <div className="w-px h-8 bg-linear-to-b from-white/50 to-transparent"></div>
          </div>
        </div>

        {/* The target canvas for drawing frames */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
          role="img"
          aria-label="Cinematic animation sequence for TEDxACEEC Bedrock and Beyond event"
        />
      </div>
    </section>
  );
}
