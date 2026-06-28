import React from 'react';

export default function MessageBubble({ message }) {
  const { sender, text, timestamp } = message;
  const isBot = sender.toLowerCase() === 'lexbot';

  return (
    <div className={`flex flex-col max-w-[82%] group transition-all duration-300 ${isBot ? 'self-start items-start' : 'self-end items-end'}`}>
      {/* Message Text Bubble */}
      <div
        className={`px-5 py-3.5 shadow-sm font-sans text-xs md:text-[13px] leading-relaxed whitespace-pre-wrap rounded-2xl transition-all duration-200 hover:shadow-md
          ${isBot 
            ? 'bg-card text-ink rounded-tl-sm border border-border/60' 
            : 'bg-gradient-to-br from-accent to-[#3b499c] text-white rounded-tr-sm'
          }
        `}
      >
        {text}
      </div>

      {/* Sender & Timestamp Label */}
      <div className="flex items-center space-x-1.5 mt-1.5 px-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200 select-none">
        <span className="font-sans font-bold text-[8px] tracking-wider uppercase text-muted">
          {isBot ? 'LexBot' : 'You'}
        </span>
        {timestamp && (
          <>
            <span className="text-muted/40 text-[9px] font-sans">•</span>
            <span className="text-muted text-[8px] font-sans">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
