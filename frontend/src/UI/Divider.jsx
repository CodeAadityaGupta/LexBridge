import React from 'react';

export default function Divider({
  className = '',
  vertical = false,
  ...props
}) {
  return (
    <div
      className={`border-border
        ${vertical 
          ? 'h-full border-l' 
          : 'w-full border-t'
        } 
        ${className}
      `}
      {...props}
    />
  );
}
