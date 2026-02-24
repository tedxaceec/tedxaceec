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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Cinematic Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center">
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.2em] text-white uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] font-sans">
            UNBREAKABLE
          </h1>
          <p className="mt-6 md:mt-8 text-xs md:text-sm lg:text-lg tracking-[0.3em] text-white/80 uppercase font-sans font-medium drop-shadow-md">
            Scroll to descend
          </p>
        </div>

        {/* The target canvas for drawing frames */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
        />
      </div>
    </div>
  );
}
