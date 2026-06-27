import React from 'react';

export default function Avatar({
  src,
  name = 'User',
  size = 'md',
  className = '',
  ...props
}) {
  const getInitials = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-[72px] h-[72px] text-xl',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-accent-light text-accent font-sans font-semibold select-none border border-[#d6dbf4] shrink-0
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, fallback to text avatar
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : null}
      <span className="absolute">{getInitials(name)}</span>
    </div>
  );
}
