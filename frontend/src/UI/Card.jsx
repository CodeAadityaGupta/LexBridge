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
      className={`bg-gradient-to-b from-card to-card/98 rounded-2xl shadow-card border border-border/55 p-7 transition-all duration-300
        ${isClickable 
          ? 'cursor-pointer hover:border-accent/30 hover:shadow-md hover:-translate-y-1 active:scale-[0.99] active:translate-y-0' 
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
