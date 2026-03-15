'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {TransitionLink} from '@/components/transitions/TransitionLink';
import {LanguageSwitcher} from './LanguageSwitcher';
import {motion, AnimatePresence} from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({isOpen, onClose}: MobileMenuProps) {
  const t = useTranslations('Header');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -10}}
          transition={{duration: 0.2, ease: [0, 0, 0.2, 1]}}
          className="absolute top-16 left-0 right-0 bg-surface-base/95 backdrop-blur-md border-b border-border"
        >
          <nav className="flex flex-col gap-5 px-6 py-8">
            <TransitionLink
              href="/"
              onClick={onClose}
              className="slide-underline text-sm uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {t('home')}
            </TransitionLink>
            <Link
              href="/#about"
              onClick={onClose}
              className="slide-underline text-sm uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {t('about')}
            </Link>
            <TransitionLink
              href="/projects"
              onClick={onClose}
              className="slide-underline text-sm uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {t('projects')}
            </TransitionLink>
            <TransitionLink
              href="/blog"
              onClick={onClose}
              className="slide-underline text-sm uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {t('blog')}
            </TransitionLink>
            <div className="pt-4 border-t border-border">
              <LanguageSwitcher />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
