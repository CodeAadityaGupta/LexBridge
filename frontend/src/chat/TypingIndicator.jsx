import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex flex-col max-w-[80%] self-start items-start select-none">
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
      <div className="px-5 py-3.5 bg-card border border-border/60 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-1.5 min-h-[40px]">
        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 typing-dot" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 typing-dot" />
      </div>

      {/* Label */}
      <div className="mt-1.5 px-1.5 select-none opacity-60">
        <span className="font-sans font-bold text-[8px] tracking-wider uppercase text-muted">
          LexBot is typing
        </span>
      </div>
    </div>
  );
}
