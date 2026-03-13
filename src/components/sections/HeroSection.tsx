"use client";
import { useEffect, useRef, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";
import BaseVideo from "@/components/BaseVideo";
import AnimatedDiv from "@/components/AnimatedDiv";

// --- Scroll Animation Constants ---

// Pixel offset for initial video scale calculation (accounts for header + text height)
const HERO_HEADER_OFFSET_PX = 95;

// TranslateY percentage factor used in initial video positioning
const HERO_TRANSLATE_Y_FACTOR = 40;

// Scroll progress keyframes (0 = top of section, 1 = end of section)
const SCROLL_KEYFRAMES = {
  // Video expansion: small rounded -> full width
  VIDEO_EXPAND_START: 0,
  VIDEO_EXPAND_END: 0.07,
  // Video translateY correction
  VIDEO_TRANSLATE_CORRECTION_END: 0.02,
  // Quote text fades in
  QUOTE_FADE_START: 0.07,
  QUOTE_FADE_END: 0.1,
  // Quote text zooms through
  QUOTE_ZOOM_START: 0.15,
  QUOTE_ZOOM_MID: 0.6,
  QUOTE_ZOOM_END: 1.0,
} as const;

// Quote transform values at each keyframe
const QUOTE_TRANSFORM = {
  SCALE: { INITIAL: 1, MID: 70, FINAL: 220 },
  TRANSLATE_Y: { INITIAL: "0%", MID: "1700%", FINAL: "5200%" },
} as const;

// Video border radius transition
const VIDEO_BORDER_RADIUS = {
  INITIAL: "2rem",
  FINAL: "0rem",
} as const;

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [initialScale, setInitialScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const updateSize = () => {
      if (textRef.current) {
        const textHeight = textRef.current.offsetHeight;
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        const targetWidth = textRef.current.offsetWidth;
        const targetHeight = screenHeight - textHeight - HERO_HEADER_OFFSET_PX;

        const scaleX = targetWidth / screenWidth;
        const scaleY = targetHeight / screenHeight;
        setInitialScale({ x: scaleX, y: scaleY });
      }
    };

    if (typeof window !== "undefined") {
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], 
  });


  const scaleX = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.VIDEO_EXPAND_START, SCROLL_KEYFRAMES.VIDEO_EXPAND_END], [initialScale.x, 1]);
  const scaleY = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.VIDEO_EXPAND_START, SCROLL_KEYFRAMES.VIDEO_EXPAND_END], [initialScale.y, 1]);
  const initialTranslateY = `-${(1 - initialScale.y) * HERO_TRANSLATE_Y_FACTOR}%`;
  const translateY = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.VIDEO_EXPAND_START, SCROLL_KEYFRAMES.VIDEO_TRANSLATE_CORRECTION_END], [initialTranslateY, "0%"]);
  const borderRadius = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.VIDEO_EXPAND_START, SCROLL_KEYFRAMES.VIDEO_EXPAND_END], [VIDEO_BORDER_RADIUS.INITIAL, VIDEO_BORDER_RADIUS.FINAL]);


  const quoteOpacity = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.QUOTE_FADE_START, SCROLL_KEYFRAMES.QUOTE_FADE_END], [0, 1]);
  const quoteScale = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.QUOTE_ZOOM_START, SCROLL_KEYFRAMES.QUOTE_ZOOM_MID, SCROLL_KEYFRAMES.QUOTE_ZOOM_END], [QUOTE_TRANSFORM.SCALE.INITIAL, QUOTE_TRANSFORM.SCALE.MID, QUOTE_TRANSFORM.SCALE.FINAL]);
  const quoteTranslateY = useTransform(scrollYProgress, [SCROLL_KEYFRAMES.QUOTE_ZOOM_START, SCROLL_KEYFRAMES.QUOTE_ZOOM_MID, SCROLL_KEYFRAMES.QUOTE_ZOOM_END], [QUOTE_TRANSFORM.TRANSLATE_Y.INITIAL, QUOTE_TRANSFORM.TRANSLATE_Y.MID, QUOTE_TRANSFORM.TRANSLATE_Y.FINAL]);
  return (
    <section
      ref={sectionRef}
      // Total scroll height: 1100vh -- controls animation pacing (must be static for Tailwind JIT)
      className="flex flex-col mx-auto pt-19 lg:pt-0 h-[1100vh] max-w-screen z-10 bg-white"
      id="hero"
    >
      {/* TEXT */}
      <div className="mx-auto container px-4 mt-0 lg:mt-7 bg-white">
        <div className="flex items-center justify-center w-full" ref={textRef}>
          <AnimatedText
            text={
              "I'm Hà Minh Quân, an AI engineer crafting machines that read, think, answer and surprises you like a human would."
            }
            className="lg:text-2xl/9 text-[3.3vh] xl:text-3xl/11 lg:w-3/5 w-full"
            as="h1"
            delay={2.4}
            once={true}
          />
        </div>
      </div>

      {/* VIDEO */}
      <AnimatedDiv withRotate={false} delay={2.4} className="w-full h-screen sticky top-0 m-0 overflow-hidden mx-auto">
        <motion.div
          className="relative h-full w-full"
          style={{
            scaleX,
            scaleY,
            translateY,
            borderRadius,
            overflow: "hidden",
          }}
        >
          <BaseVideo
            src="/hero/video1.webm"
            className="w-full h-full object-cover"
            style={{
              scale: `${scaleX} ${scaleY}`,
            }}
          />

          {/* QUOTE TEXT OVERLAY */}
          <motion.div
            style={{
              opacity: quoteOpacity,
              scale: quoteScale,
              translateY: quoteTranslateY,
              
            }}
            className="absolute top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 text-white   pointer-events-none uppercase font-mono tracking-widest text-[6.5vw] md:text-[5.5vw] lg:text-[4.5vw] font-bold  whitespace-nowrap transition-all duration-300 ease-in-out "
             
          >
            
            QUIET EFFORT CREATES <br/> LOUD IMPACT.
          </motion.div>
        </motion.div>
      </AnimatedDiv>
    </section>
  );
};

export default HeroSection;