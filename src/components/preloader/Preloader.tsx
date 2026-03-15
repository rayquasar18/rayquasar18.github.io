'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { useLenis } from 'lenis/react';

const PRELOADER_KEY = 'rq-preloader-seen';
const HOMEPAGE_ROUTES = ['/', '/en', '/en/', '/vi', '/vi/'];

/**
 * Inline hook: determines whether the preloader should show.
 * Returns true only on homepage routes when not already seen this session.
 * Uses useState(false) + useEffect to avoid SSR mismatch (sessionStorage is browser-only).
 */
function useShowPreloader(): boolean {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isHomepage = HOMEPAGE_ROUTES.includes(pathname);
    const alreadySeen = sessionStorage.getItem(PRELOADER_KEY) === 'true';

    if (isHomepage && !alreadySeen) {
      setShow(true);
    }
  }, [pathname]);

  return show;
}

export default function Preloader() {
  const shouldShow = useShowPreloader();
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const lenis = useLenis();

  // Lock scroll as soon as Lenis is available (only when preloader is active)
  useEffect(() => {
    if (shouldShow && lenis) {
      lenis.stop();
    }
  }, [lenis, shouldShow]);

  const onSequenceComplete = useCallback(() => {
    lenis?.start();
    sessionStorage.setItem(PRELOADER_KEY, 'true');
    setIsComplete(true);
  }, [lenis]);

  useGSAP(
    () => {
      if (!shouldShow) return;
      if (
        !text1Ref.current ||
        !text2Ref.current ||
        !topHalfRef.current ||
        !bottomHalfRef.current
      )
        return;

      const split1 = SplitText.create(text1Ref.current, {
        type: 'chars',
        charsClass: 'inline-block',
      });
      const split2 = SplitText.create(text2Ref.current, {
        type: 'chars',
        charsClass: 'inline-block',
      });

      const tl = gsap.timeline({ onComplete: onSequenceComplete });

      // Initial state: all characters invisible
      tl.set(split1.chars, { opacity: 0 });
      tl.set(split2.chars, { opacity: 0 });

      // Phase 1: "Welcome to party" fade in letter-by-letter
      tl.to(split1.chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.03,
        ease: 'power2.out',
      });
      // Hold
      tl.to({}, { duration: 0.5 });
      // Reverse stagger fade out
      tl.to(split1.chars, {
        opacity: 0,
        duration: 0.05,
        stagger: 0.03,
        ease: 'power2.in',
      });

      // Phase 2: "Quasar" fade in letter-by-letter
      tl.to(split2.chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        ease: 'power2.out',
      });
      // Hold
      tl.to({}, { duration: 0.5 });
      // Reverse stagger fade out
      tl.to(split2.chars, {
        opacity: 0,
        duration: 0.05,
        stagger: 0.04,
        ease: 'power2.in',
      });

      // Phase 3: Curtain split-reveal (simultaneous via 'curtain' label)
      tl.to(
        topHalfRef.current,
        { yPercent: -100, duration: 1, ease: 'power3.inOut' },
        'curtain'
      );
      tl.to(
        bottomHalfRef.current,
        { yPercent: 100, duration: 1, ease: 'power3.inOut' },
        'curtain'
      );
    },
    { scope: containerRef, dependencies: [lenis, shouldShow, onSequenceComplete] }
  );

  // Don't render if preloader shouldn't show or has completed
  if (!shouldShow || isComplete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[60]">
      {/* Text container: centered, above curtain halves */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div
          ref={text1Ref}
          className="absolute font-display text-[clamp(1.5rem,4vw,3rem)] uppercase text-white font-light tracking-wider"
        >
          Welcome to party
        </div>
        <div
          ref={text2Ref}
          className="absolute font-display text-[clamp(4rem,15vw,12rem)] uppercase text-white font-light tracking-wider"
        >
          Quasar
        </div>
      </div>
      {/* Curtain halves */}
      <div
        ref={topHalfRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
      />
      <div
        ref={bottomHalfRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
      />
    </div>
  );
}
