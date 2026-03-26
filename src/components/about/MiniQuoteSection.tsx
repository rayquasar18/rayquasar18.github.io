'use client';

import {useTranslations} from 'next-intl';
import {TextReveal} from '@/components/animations/TextReveal';

export function MiniQuoteSection() {
  const t = useTranslations('About');

  return (
    <section
      className="flex items-center justify-center px-6 md:px-8 lg:px-20"
      style={{
        paddingTop: 'var(--spacing-section-sm)',
        paddingBottom: 'var(--spacing-section-sm)',
      }}
    >
      <div className="mx-auto max-w-[900px] text-center">
        <TextReveal
          as="p"
          type="words"
          stagger={0.04}
          className="font-body text-text-secondary"
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: '1.7',
          }}
        >
          {t('quote')}
        </TextReveal>
      </div>
    </section>
  );
}
