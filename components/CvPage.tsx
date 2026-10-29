'use client';

import { ArrowUp } from 'lucide-react';
import { useTranslation } from '../lib/i18n-app';
import type { CvProject } from '../lib/projects';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SiteNav } from './ui/SiteNav';
import { Hero } from './sections/Hero';
import { Presentation } from './sections/Presentation';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';

const CONTAINER_CLASSES = 'container mx-auto px-6 max-w-4xl lg:max-w-6xl';

interface CvPageProps {
  projects: CvProject[];
  otherProjectCount: number;
}

export function CvPage({ projects, otherProjectCount }: CvPageProps) {
  const { t } = useTranslation();

  const sections = [
    { id: 'presentation', content: <Presentation /> },
    { id: 'skills', content: <Skills /> },
    { id: 'experience', content: <Experience /> },
    {
      id: 'projects',
      content: (
        <Projects projects={projects} otherProjectCount={otherProjectCount} />
      ),
    },
    { id: 'education', content: <Education /> },
    { id: 'contact', content: <Contact /> },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Button
        href="#main-content"
        variant="primary"
        size="sm"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50"
      >
        {t('accessibility.skipToContent')}
      </Button>

      <SiteNav />

      <main id="main-content">
        <div className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="hero-mesh pointer-events-none absolute inset-0"
          />
          <div className={`${CONTAINER_CLASSES} relative py-16 md:py-24`}>
            <Hero />
          </div>
        </div>
        {sections.map(({ id, content }, index) => (
          <div
            key={id}
            id={id}
            // Every other section is tinted, starting right after the plain hero
            className={`scroll-mt-28 md:scroll-mt-16 py-16 md:py-20 ${index % 2 === 0 ? 'band' : ''}`}
          >
            <Reveal className={CONTAINER_CLASSES}>{content}</Reveal>
          </div>
        ))}
      </main>

      <footer className="border-t border-border">
        <div
          className={`${CONTAINER_CLASSES} flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-foreground-secondary`}
        >
          <p>
            © {new Date().getFullYear()} {t('hero.name')} ·{' '}
            <a
              href="https://needacoffee.fr/"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              needacoffee.fr
            </a>
          </p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-1 py-3 hover:text-foreground"
          >
            {t('footer.backToTop')}
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
