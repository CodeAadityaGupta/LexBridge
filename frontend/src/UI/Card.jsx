import React from 'react';

export default function Card({
  children,
  className = '',
  onClick,
  ...props
}) {
  const isClickable = !!onClick;
  
  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-md shadow-card border border-border p-6 transition-all duration-200
        ${isClickable 
          ? 'cursor-pointer hover:shadow-md hover:border-accent/30 active:scale-[0.99]' 
          : ''
        } 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
