'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      syncTouch: false,
      duration: 1.05,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const scrollToHash = (hash: string) => {
      if (!hash) {
        return;
      }

      const id = hash.slice(1);
      if (!id) {
        return;
      }

      const target = document.getElementById(id);
      if (!target) {
        return;
      }

      lenis.scrollTo(target, {
        duration: 1,
      });
    };

    scrollToHash(window.location.hash);

    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
