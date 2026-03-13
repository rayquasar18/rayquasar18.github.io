'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    localStorage.setItem('preferred-locale', newLocale);
    router.replace(pathname, {locale: newLocale});
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale('en')}
        className={`px-1 transition-colors duration-150 ${
          locale === 'en'
            ? 'text-text-accent'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        EN
      </button>
      <span className="text-text-muted">|</span>
      <button
        onClick={() => switchLocale('vi')}
        className={`px-1 transition-colors duration-150 ${
          locale === 'vi'
            ? 'text-text-accent'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        VI
      </button>
    </div>
  );
}
