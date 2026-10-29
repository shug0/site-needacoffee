'use client';

import { useTranslation } from '../../lib/i18n-app';
import { memo } from 'react';

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { t, locale, changeLocale } = useTranslation();

  const toggleLanguage = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    changeLocale(newLocale);
  };

  const displayLanguage = locale === 'fr' ? 'EN' : 'FR';

  return (
    <button
      onClick={toggleLanguage}
      className="h-11 min-w-11 px-3 text-sm font-medium text-foreground bg-surface border border-border rounded-md hover:bg-foreground hover:text-background transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={t('language.switch')}
      type="button"
    >
      {displayLanguage}
    </button>
  );
});

export default LanguageSwitcher;
