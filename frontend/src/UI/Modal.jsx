import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.classList.add('overflow-hidden');
      const frame = requestAnimationFrame(() => {
        setActive(true);
      });
      return () => cancelAnimationFrame(frame);
    } else {
      setActive(false);
      const timer = setTimeout(() => {
        setMounted(false);
        document.body.classList.remove('overflow-hidden');
      }, 180); // Match transition duration (180ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-[180ms] ease-out
        ${active ? 'opacity-100' : 'opacity-0'}
      `}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#0F1117]/40 backdrop-blur-sm transition-all"
        onClick={onClose}
      />

      {/* Modal Wrapper */}
      <div 
        className={`bg-card w-full max-w-[560px] rounded-lg shadow-modal border border-border flex flex-col relative z-10 max-h-[90vh] overflow-hidden transition-all duration-[180ms] ease-out
          ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8px]'}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {title && (
            <h2 className="font-serif text-lg font-semibold text-ink">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted hover:bg-accent-light hover:text-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/20"
            aria-label="Close modal"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 font-sans">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
