'use client';

import {useRef, useEffect, useCallback} from 'react';
import {gsap, useGSAP} from '@/lib/gsap';
import {useLenis} from 'lenis/react';
import {useTranslations} from 'next-intl';
import {NavLink} from './NavLink';
import {useActiveSection, NAV_SECTIONS} from './useActiveSection';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DropdownMenu({isOpen, onClose}: DropdownMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeSection = useActiveSection();
  const t = useTranslations('Header');
  const lenis = useLenis();
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Build GSAP timeline
  useGSAP(
    () => {
      const el = dropdownRef.current;
      if (!el) return;

      if (reducedMotion.current) {
        const tl = gsap.timeline({paused: true});
        tl.fromTo(el, {opacity: 0}, {opacity: 1, duration: 0.01});
        tlRef.current = tl;
        return;
      }

      const tl = gsap.timeline({paused: true});

      // Step 1: Container fade + slide + scale
      tl.fromTo(
        el,
        {opacity: 0, y: -8, scale: 0.97},
        {opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out'},
      );

      // Step 2: Nav links stagger
      tl.fromTo(
        '.nav-link',
        {opacity: 0, y: 8},
        {opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out'},
        0.1,
      );

      // Step 3: External section fade
      tl.fromTo('.dropdown-externals', {opacity: 0}, {opacity: 1, duration: 0.2, ease: 'power2.out'}, 0.25);

      tlRef.current = tl;
    },
    {scope: dropdownRef},
  );

  // Play/reverse on isOpen change
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.4).reverse();
    }
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const firstLink = dropdownRef.current?.querySelector<HTMLButtonElement>('.nav-link');
        firstLink?.focus();
      }, 250);
      return () => clearTimeout(timer);
    } else {
      const menuBtn = document.querySelector<HTMLElement>('[aria-controls="header-dropdown"]');
      menuBtn?.focus();
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const el = dropdownRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Nav link click handler - uses Lenis scrollTo (NOT GSAP ScrollToPlugin)
  const handleNavClick = useCallback(
    (scrollTarget: string | number) => {
      onClose();
      setTimeout(() => {
        const easing = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        if (typeof scrollTarget === 'number') {
          lenis?.scrollTo(0, {
            duration: reducedMotion.current ? 0 : 1.2,
            easing,
          });
        } else {
          lenis?.scrollTo(scrollTarget, {
            offset: -80,
            duration: reducedMotion.current ? 0 : 1.2,
            easing,
          });
        }
      }, 100);
    },
    [onClose, lenis],
  );

  return (
    <>
      {/* Click-outside overlay */}
      {isOpen && <div className="fixed inset-0 z-[48]" onClick={onClose} aria-hidden="true" />}

      {/* Dropdown container */}
      <div
        ref={dropdownRef}
        id="header-dropdown"
        role="menu"
        aria-hidden={!isOpen}
        className="absolute right-4 sm:right-6 lg:right-8 z-[49] w-[280px] max-w-[calc(100vw-32px)] rounded-2xl p-2"
        style={{
          top: '100%',
          marginTop: '8px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
          opacity: 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Nav links section */}
        <nav className="p-1">
          {NAV_SECTIONS.map(({label, scrollTarget}) => (
            <NavLink
              key={label}
              label={t(label)}
              isActive={activeSection === label}
              onClick={() => handleNavClick(scrollTarget)}
            />
          ))}
        </nav>

        {/* External buttons section */}
        <div
          className="dropdown-externals mt-2 pt-2 flex flex-col gap-1"
          style={{borderTop: '1px solid rgba(136,133,128,0.15)'}}
        >
          {/* Blog - light external button */}
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            aria-label="Open Blog in new tab"
            className="flex items-center justify-between h-11 px-4 rounded-xl font-body text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 cursor-pointer"
            style={{backgroundColor: 'var(--warm-white-elevated)', color: 'var(--greige-900)'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--warm-white-overlay)';
              const arrow = e.currentTarget.querySelector('.ext-arrow') as HTMLElement;
              if (arrow) arrow.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--warm-white-elevated)';
              const arrow = e.currentTarget.querySelector('.ext-arrow') as HTMLElement;
              if (arrow) arrow.style.opacity = '0';
            }}
          >
            <span>{t('blog')}</span>
            <span className="ext-arrow transition-opacity duration-200" style={{opacity: 0}}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9L9 3M9 3H4M9 3V8" />
              </svg>
            </span>
          </a>

          {/* GitHub - dark external button */}
          <a
            href="https://github.com/rayquasar18"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            aria-label="Open GitHub in new tab"
            className="flex items-center justify-between h-11 px-4 rounded-xl font-body text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 cursor-pointer"
            style={{backgroundColor: 'var(--greige-900)', color: 'var(--warm-white)'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--greige-800)';
              const arrow = e.currentTarget.querySelector('.ext-arrow') as HTMLElement;
              if (arrow) arrow.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--greige-900)';
              const arrow = e.currentTarget.querySelector('.ext-arrow') as HTMLElement;
              if (arrow) arrow.style.opacity = '0';
            }}
          >
            <span>{t('github')}</span>
            <span
              className="ext-arrow transition-opacity duration-200"
              style={{opacity: 0, color: 'var(--warm-white)'}}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9L9 3M9 3H4M9 3V8" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
