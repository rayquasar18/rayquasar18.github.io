'use client';

import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {FlaskConical, Menu, X} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {MobileMenu} from './MobileMenu';

const SCROLL_THRESHOLD = 20;

export function Header() {
  const t = useTranslations('Header');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-surface-base/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Brand mark */}
        <Link href="/" className="flex items-center gap-2">
          <FlaskConical className="size-6 text-accent" />
          <span className="font-display text-lg text-text-primary">
            {t('brand')}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-text-secondary transition-colors duration-150 hover:text-text-accent"
          >
            {t('home')}
          </Link>
          <Link
            href="/"
            className="text-text-secondary transition-colors duration-150 hover:text-text-accent"
          >
            {t('about')}
          </Link>
          <Link
            href="/"
            className="text-text-secondary transition-colors duration-150 hover:text-text-accent"
          >
            {t('projects')}
          </Link>
          <Link
            href="/"
            className="text-text-secondary transition-colors duration-150 hover:text-text-accent"
          >
            {t('blog')}
          </Link>
        </nav>

        {/* Desktop language switcher */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-text-secondary transition-colors duration-150 hover:text-text-accent md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
