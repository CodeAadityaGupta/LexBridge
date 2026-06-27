import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

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
      }, 200); // Match transition duration (200ms)
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 transition-opacity duration-200 ease-out
        ${active ? 'opacity-100' : 'opacity-0'}
      `}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay - Deep blur-xl */}
      <div 
        className="absolute inset-0 bg-ink/40 backdrop-blur-xl transition-all duration-200"
        onClick={onClose}
      />

      {/* Modal Wrapper - Overhauled rounded-3xl and premium drop shadow */}
      <div 
        className={`bg-gradient-to-b from-card to-card/99 w-full max-w-[540px] rounded-3xl shadow-modal border border-border/80 flex flex-col relative z-10 max-h-[85vh] overflow-hidden transition-all duration-200 ease-out
          ${active ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-border/50 bg-surface/10">
          {title && (
            <h2 className="font-serif text-xl font-bold text-ink leading-tight">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-muted hover:bg-accent-light hover:text-accent transition-colors outline-none focus-visible:ring-4 focus-visible:ring-accent/15"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-7 font-sans">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
