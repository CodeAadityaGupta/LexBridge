import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex flex-col max-w-[80%] self-start items-start">
      {/* Styles for typing staggered dot animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (prefers-reduced-motion: no-preference) {
          @keyframes typingFade {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }
          .typing-dot {
            animation: typingFade 600ms infinite ease-in-out;
          }
          .typing-dot:nth-child(2) { animation-delay: 150ms; }
          .typing-dot:nth-child(3) { animation-delay: 300ms; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes typingFadeSimple {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .typing-dot {
            animation: typingFadeSimple 1000ms infinite ease-in-out;
          }
          .typing-dot:nth-child(2) { animation-delay: 250ms; }
          .typing-dot:nth-child(3) { animation-delay: 500ms; }
        }
      `}} />

      {/* LexBot Message Bubble */}
      <div className="px-4 py-3 bg-accent-light rounded-[20px] rounded-bl-none border border-accent-light shadow-sm flex items-center space-x-1.5 min-h-[44px]">
        <span className="w-2 h-2 rounded-full bg-accent/70 typing-dot" />
        <span className="w-2 h-2 rounded-full bg-accent/70 typing-dot" />
        <span className="w-2 h-2 rounded-full bg-accent/70 typing-dot" />
      </div>

      {/* Label */}
      <div className="mt-1.5 px-1">
        <span className="font-sans font-semibold text-[10px] uppercase tracking-wider text-muted/60">
          LEXBOT IS TYPING
        </span>
      </div>
    </div>
  );
}
