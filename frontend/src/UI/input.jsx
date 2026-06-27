import React from 'react';

export default function Input({
  label,
  error,
  helperText,
  id,
  type = 'text',
  className = '',
  required = false,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-xs font-medium text-ink font-sans flex"
        >
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        required={required}
        className={`w-full h-11 px-3 bg-white border rounded font-sans text-sm text-ink outline-none transition-all placeholder:text-muted/60
          ${error 
            ? 'border-error focus:ring-3 focus:ring-error/20 focus:border-error' 
            : 'border-border focus:ring-3 focus:ring-accent/20 focus:border-accent'
          }
          disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed
        `}
        {...props}
      />
      
      {error ? (
        <span className="text-xs font-medium text-error font-sans">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-xs text-muted font-sans">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
