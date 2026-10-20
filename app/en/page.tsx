'use client';

import { useEffect } from 'react';
import { useTranslation } from '../../lib/i18n-app';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Hero } from '../../components/sections/Hero';
import { Presentation } from '../../components/sections/Presentation';
import { Skills } from '../../components/sections/Skills';
import { Domains } from '../../components/sections/Domains';
import { Experience } from '../../components/sections/Experience';
import { Projects } from '../../components/sections/Projects';
import { Education } from '../../components/sections/Education';
import { Contact } from '../../components/sections/Contact';
import { Downloads } from '../../components/sections/Downloads';

export default function Home() {
  const { t } = useTranslation();

  // <html> comes from the root layout shared with the French page, which renders lang="fr".
  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-foreground text-background px-4 py-2 rounded z-50"
      >
        {t('accessibility.skipToContent')}
      </a>

      {/* Language Toggle and Theme Toggle */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl lg:max-w-6xl">
        {/* Main Content */}
        <main id="main-content" className="space-y-32 mt-24">
          <Hero />
          <Presentation />
          <Skills />
          <Domains />
          <Experience />
          <Projects />
          <Education />
          <Contact />
          <Downloads />
        </main>
      </div>
    </div>
  );
}
