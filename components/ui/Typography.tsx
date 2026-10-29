import type { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface LinkProps extends TypographyProps {
  href: string;
}

// Titre principal (rôle)
export function Title({ children, className = '', id }: TypographyProps) {
  return (
    <h1
      id={id}
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground font-display ${className}`}
    >
      {children}
    </h1>
  );
}

// Titre de section
export function SectionTitle({
  children,
  className = '',
  id,
}: TypographyProps) {
  return (
    <h2
      id={id}
      className={`text-4xl md:text-5xl font-semibold text-foreground font-display ${className}`}
    >
      {children}
    </h2>
  );
}

// Titre de sous-section
export function SubsectionTitle({
  children,
  className = '',
  id,
}: TypographyProps) {
  return (
    <h3
      id={id}
      className={`text-xl md:text-2xl font-semibold text-foreground font-display ${className}`}
    >
      {children}
    </h3>
  );
}

// Titre de carte
export function CardTitle({ children, className = '', id }: TypographyProps) {
  return (
    <h3
      id={id}
      className={`text-lg md:text-xl font-semibold text-foreground font-display ${className}`}
    >
      {children}
    </h3>
  );
}

// Texte de description principal
export function Text({ children, className = '', id }: TypographyProps) {
  return (
    <p
      id={id}
      className={`text-xl md:text-2xl text-foreground-secondary leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

// Texte de description secondaire
export function TextSecondary({
  children,
  className = '',
  id,
}: TypographyProps) {
  return (
    <p
      id={id}
      className={`text-sm md:text-base text-foreground-secondary leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

// Lien
export function Link({ children, className = '', id, href }: LinkProps) {
  return (
    <a
      id={id}
      href={href}
      className={`text-xl md:text-2xl underline ${className}`}
    >
      {children}
    </a>
  );
}

// Texte de corps
export function BodyText({ children, className = '', id }: TypographyProps) {
  return (
    <p id={id} className={`text-sm md:text-base leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// Texte de corps large
export function BodyTextLarge({
  children,
  className = '',
  id,
}: TypographyProps) {
  return (
    <p id={id} className={`text-lg md:text-xl leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
