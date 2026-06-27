import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-sans font-medium rounded transition-all duration-100 outline-none select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]';

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 focus-visible:ring-3 focus-visible:ring-accent/20 focus-visible:border-accent',
    secondary: 'bg-accent-light text-accent hover:bg-[#e4e7f8] focus-visible:ring-3 focus-visible:ring-accent/20 focus-visible:border-accent',
    ghost: 'text-accent hover:bg-accent-light focus-visible:ring-3 focus-visible:ring-accent/20 focus-visible:border-accent',
    danger: 'bg-error text-white hover:bg-error/90 focus-visible:ring-3 focus-visible:ring-error/20 focus-visible:border-error',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
