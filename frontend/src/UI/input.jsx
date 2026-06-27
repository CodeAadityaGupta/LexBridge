import React, { useState } from 'react';

export default function Input({
  label,
  error,
  helperText,
  id,
  type = 'text',
  className = '',
  required = false,
  placeholder = '',
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && value.toString().trim() !== '';

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  // Label should float if focused, has value, is datetime, or has preset placeholder text
  const shouldFloat = isFocused || hasValue || type === 'datetime-local' || !!placeholder;

  return (
    <div className={`flex flex-col space-y-1 w-full relative ${className}`}>
      
      {/* Input container */}
      <div className="relative mt-2">
        <input
          id={inputId}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? placeholder : ''}
          className={`w-full h-11 px-3.5 pt-4 pb-1.5 bg-card border rounded-md font-sans text-xs text-ink outline-none transition-all placeholder:text-muted/50
            ${error 
              ? 'border-error focus:shadow-[0_0_0_4px_rgba(220,38,38,0.15)] focus:border-error' 
              : 'border-border/80 focus:shadow-focus focus:border-accent'
            }
            disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed
          `}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <label 
            htmlFor={inputId} 
            className={`absolute left-3.5 transition-all duration-150 pointer-events-none select-none font-sans font-semibold
              ${shouldFloat 
                ? 'top-0 -translate-y-1/2 bg-card px-1.5 text-[9px] font-bold text-accent' 
                : 'top-1/2 -translate-y-1/2 text-xs text-muted/80'
              }
              ${error && shouldFloat ? 'text-error' : ''}
            `}
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
      </div>
      
      {error ? (
        <span className="text-[10px] font-semibold text-error font-sans animate-scaleUp pl-1">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-[10px] text-muted font-sans pl-1">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
