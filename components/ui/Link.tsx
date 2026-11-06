import type { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export function Link({
  href,
  children,
  className = '',
  external = false,
  ariaLabel,
}: LinkProps) {
  const baseClasses =
    'text-foreground hover:text-foreground-secondary transition-colors';
  const externalClasses = external ? 'underline' : '';

  return (
    <a
      href={href}
      className={`${baseClasses} ${externalClasses} ${className}`}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
