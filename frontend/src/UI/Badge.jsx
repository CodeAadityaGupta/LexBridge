import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans uppercase tracking-wider select-none';

  const variants = {
    default: 'bg-surface text-muted border border-border',
    accent: 'bg-accent-light text-accent border border-accent-light',
    success: 'bg-success/10 text-success border border-success/15',
    warning: 'bg-warning/10 text-warning border border-warning/15',
    error: 'bg-error/10 text-error border border-error/15',
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
