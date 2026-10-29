import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaDescribedBy?: string;
}

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80',
  secondary:
    'bg-surface text-foreground hover:bg-surface/80 active:bg-surface/70 border border-border',
  outline:
    'border border-border text-foreground hover:bg-surface active:bg-surface/80',
  accent:
    'gradient-fill hover:opacity-90 active:opacity-80',
  ghost: 'text-foreground hover:bg-surface active:bg-surface/80',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  className = '',
  id,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  download,
  onClick,
  disabled = false,
  type = 'button',
  ariaDescribedBy,
}: ButtonProps) {
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-describedby={ariaDescribedBy}
    >
      {children}
    </button>
  );
}
