'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '../../lib/i18n-app';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

// Each id must match a section id rendered by CvPage
const NAV_SECTION_IDS = [
  'skills',
  'experience',
  'projects',
  'contact',
] as const;

const ACTIVE_LINK_CLASSES = 'text-accent';
const IDLE_LINK_CLASSES = 'text-foreground-secondary hover:text-foreground';

export function SiteNav() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          setActiveId((current) =>
            entry.isIntersecting ? id : current === id ? null : current
          );
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const id of NAV_SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  const renderLinks = (className: string) => (
    <ul className={className}>
      {NAV_SECTION_IDS.map((id) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={activeId === id ? 'true' : undefined}
            className={`block py-3 transition-colors ${activeId === id ? ACTIVE_LINK_CLASSES : IDLE_LINK_CLASSES}`}
          >
            {t(`nav.${id}`)}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav
        aria-label={t('nav.label')}
        className="container mx-auto max-w-4xl px-6 lg:max-w-6xl"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#main-content" className="font-display font-semibold">
            {t('hero.name')}
          </a>
          <div className="flex items-center gap-6">
            {renderLinks('hidden items-center gap-6 text-sm font-medium md:flex')}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        {renderLinks('-mt-2 flex justify-between text-sm font-medium md:hidden')}
      </nav>
    </header>
  );
}
