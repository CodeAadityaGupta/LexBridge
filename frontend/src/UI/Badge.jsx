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
    success: 'bg-[#EBF7EE] text-success border border-[#EBF7EE]',
    warning: 'bg-[#FFF7ED] text-warning border border-[#FFF7ED]',
    error: 'bg-[#FEF2F2] text-error border border-[#FEF2F2]',
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
