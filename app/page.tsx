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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRef = useRef({ frame: 0 });

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
    <div ref={containerRef} className="h-[400vh] bg-black">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
        }}
      >
        {/* Cinematic Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center bg-radial from-transparent via-black/20 to-black/60">
          <div className="flex flex-col items-center gap-4 px-4 mix-blend-plus-lighter">
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm md:text-base drop-shadow-lg">TEDxACEEC</span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)] font-sans leading-none">
              Bedrock &
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-gray-300 to-gray-500">Beyond</span>
            </h1>
            <p className="max-w-xl mt-6 md:mt-8 text-sm md:text-lg lg:text-xl text-white/90 font-sans font-light drop-shadow-md leading-relaxed">
              Exploring the resilient foundations of our past and the limitless possibilities shaping our future.
            </p>
          </div>

          <div className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-[10px] md:text-xs tracking-[0.4em] text-white/50 uppercase font-sans font-medium">Scroll to Descend</span>
            <div className="w-px h-8 bg-linear-to-b from-white/50 to-transparent"></div>
          </div>
        </div>

        {/* The target canvas for drawing frames */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
