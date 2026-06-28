import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) {
  // Base style with premium transitions, subtle scale shifts on hover/active, and robust outline rings
  const baseStyle = 'inline-flex items-center justify-center font-sans font-semibold rounded-md transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] hover:-translate-y-[1px] active:translate-y-0 tracking-wide border';

  const variants = {
    primary: 'bg-gradient-to-b from-accent to-accent/95 hover:from-accent/95 hover:to-accent text-white border-accent shadow-card hover:shadow-md focus-visible:ring-4 focus-visible:ring-accent/15',
    secondary: 'bg-gradient-to-b from-card to-surface hover:from-surface hover:to-surface/90 text-ink border-border/80 shadow-sm hover:shadow-md focus-visible:ring-4 focus-visible:ring-accent/10',
    ghost: 'bg-transparent text-ink border-transparent hover:bg-accent-light/40 hover:text-accent hover:border-accent-light/10 focus-visible:ring-4 focus-visible:ring-accent/10',
    danger: 'bg-gradient-to-b from-error to-error/95 hover:from-error/95 hover:to-error text-white border-error shadow-card hover:shadow-md focus-visible:ring-4 focus-visible:ring-error/15',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs h-9',
    md: 'px-5 py-2.5 text-xs uppercase tracking-wider h-11',
    lg: 'px-7 py-3.5 text-sm uppercase tracking-widest h-13',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
