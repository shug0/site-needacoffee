'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { useTranslation } from '../../lib/i18n-app';

const TOGGLE_CLASSES =
  'flex h-11 w-11 items-center justify-center rounded-lg bg-surface border border-border hover:bg-foreground/5 transition-colors';

const subscribeNoop = () => () => {};

function readInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  // Récupérer le thème depuis localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (savedTheme) return savedTheme;
  // Utiliser la préférence système par défaut
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(readInitialTheme);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Éviter le rendu côté serveur pour éviter l'hydratation
  if (!mounted) {
    return (
      <button
        type="button"
        className={TOGGLE_CLASSES}
        aria-label={t('theme.toggle')}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={TOGGLE_CLASSES}
      aria-label={t(theme === 'light' ? 'theme.toDark' : 'theme.toLight')}
    >
      {theme === 'light' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}
