'use client';

import { useEffect } from 'react';

// <html> comes from the root layout shared with the French page, which renders lang="fr".
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
