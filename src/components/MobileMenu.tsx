'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
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
          className="absolute top-16 left-0 right-0 bg-surface-elevated border-b border-border"
        >
          <nav className="flex flex-col gap-4 p-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-text-secondary hover:text-text-accent transition-colors duration-150 font-body text-lg"
            >
              {t('home')}
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="text-text-secondary hover:text-text-accent transition-colors duration-150 font-body text-lg"
            >
              {t('about')}
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="text-text-secondary hover:text-text-accent transition-colors duration-150 font-body text-lg"
            >
              {t('projects')}
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="text-text-secondary hover:text-text-accent transition-colors duration-150 font-body text-lg"
            >
              {t('blog')}
            </Link>
            <div className="pt-4 border-t border-border">
              <LanguageSwitcher />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
