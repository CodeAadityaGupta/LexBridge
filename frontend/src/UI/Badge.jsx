import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-bold font-sans uppercase tracking-widest select-none border shadow-sm';

  const variants = {
    default: 'bg-surface text-muted border-border/80',
    accent: 'bg-accent-light text-accent border-accent/20',
    success: 'bg-success/5 text-success border-success/35',
    warning: 'bg-warning/5 text-warning border-warning/35',
    error: 'bg-error/5 text-error border-error/35',
  };

  const dotColors = {
    default: 'bg-muted/70',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      {children}
    </span>
  );
}
