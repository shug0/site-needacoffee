'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { useTranslation } from '../../lib/i18n-app';
import { decodeEmail, ENCODED_EMAIL } from '../../lib/obfuscated-email';
import { Button } from './Button';

const TOOLTIP_CLASSES =
  'pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-64 max-w-[calc(100vw-3rem)] sm:left-1/2 sm:-translate-x-1/2 rounded-md bg-foreground px-3 py-2 text-center text-xs font-normal text-background opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100';

const SCRAMBLE_DURATION_MS = 700;
const SCRAMBLE_GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789@._-#%&';

type Phase = 'hidden' | 'scrambling' | 'revealed';

interface EmailRevealProps {
  label: string;
  icon?: ReactNode;
  variant?: 'accent' | 'outline';
  size?: 'md' | 'lg';
  className?: string;
}

function randomGlyph() {
  return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
}

// Letters settle left to right: before `progress`, the real letter; after, a random glyph.
function scramble(target: string, progress: number) {
  const settled = Math.floor(target.length * progress);
  return Array.from(target, (char, index) =>
    index < settled ? char : randomGlyph()
  ).join('');
}

export function EmailReveal({
  label,
  icon,
  variant = 'accent',
  size = 'md',
  className = '',
}: EmailRevealProps) {
  const { t } = useTranslation();
  const hintId = useId();
  const linkId = useId();
  const [phase, setPhase] = useState<Phase>('hidden');
  const [text, setText] = useState(label);

  // The revealed link replaces the focused button: move focus onto it
  useEffect(() => {
    if (phase === 'revealed') document.getElementById(linkId)?.focus();
  }, [phase, linkId]);

  const reveal = () => {
    if (phase !== 'hidden') return;
    const email = decodeEmail(ENCODED_EMAIL);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(email);
      setPhase('revealed');
      return;
    }

    setPhase('scrambling');
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / SCRAMBLE_DURATION_MS, 1);
      setText(scramble(email, progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setPhase('revealed');
      }
    };
    requestAnimationFrame(step);
  };

  const content = (
    <>
      {icon}
      <span className={phase === 'hidden' ? '' : 'font-mono'}>{text}</span>
    </>
  );

  return (
    <>
      {phase === 'revealed' ? (
        <Button
          id={linkId}
          href={`mailto:${text}`}
          variant={variant}
          size={size}
          className={`gap-2 ${className}`}
        >
          {content}
        </Button>
      ) : (
        <span className="group relative inline-flex">
          <Button
            onClick={reveal}
            variant={variant}
            size={size}
            ariaDescribedBy={hintId}
            className={`gap-2 cursor-pointer ${className}`}
          >
            {content}
          </Button>
          <span id={hintId} role="tooltip" className={TOOLTIP_CLASSES}>
            {t('contact.revealHint')}
          </span>
        </span>
      )}
      <span className="sr-only" aria-live="polite">
        {phase === 'revealed' ? text : ''}
      </span>
    </>
  );
}
