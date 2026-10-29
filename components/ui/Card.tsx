import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`p-6 rounded-lg bg-surface border border-border shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
