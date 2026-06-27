import React from 'react';

export default function MessageBubble({ message }) {
  const { sender, text, timestamp } = message;
  const isBot = sender.toLowerCase() === 'lexbot';

  return (
    <div className={`flex flex-col max-w-[85%] ${isBot ? 'self-start items-start' : 'self-end items-end animate-scaleUp'}`}>
      {/* Message Text Bubble */}
      <div
        className={`px-4.5 py-3 shadow-card font-mono text-xs leading-relaxed whitespace-pre-wrap rounded-xl
          ${isBot 
            ? 'bg-card text-ink rounded-tl-none border border-border/80' 
            : 'bg-accent text-white rounded-tr-none border border-accent'
          }
        `}
      >
        {text}
      </div>

      {/* Sender & Timestamp Label */}
      <div className="flex items-center space-x-1.5 mt-1.5 px-1 select-none">
        <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-muted/70">
          {isBot ? 'LEXBOT' : 'YOU'}
        </span>
        {timestamp && (
          <>
            <span className="text-muted/30 text-[9px] font-sans">•</span>
            <span className="text-muted/65 text-[9px] font-sans">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
