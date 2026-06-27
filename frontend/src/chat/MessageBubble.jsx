import React from 'react';

export default function MessageBubble({ message }) {
  const { sender, text, timestamp } = message;
  const isBot = sender.toLowerCase() === 'lexbot';

  return (
    <div className={`flex flex-col max-w-[80%] ${isBot ? 'self-start items-start' : 'self-end items-end'}`}>
      {/* Message Text Bubble */}
      <div
        className={`px-4 py-3 shadow-sm font-mono text-[14px] leading-relaxed whitespace-pre-wrap
          ${isBot 
            ? 'bg-accent-light text-ink rounded-[20px] rounded-bl-none border border-accent-light' 
            : 'bg-accent text-white rounded-[20px] rounded-br-none'
          }
        `}
      >
        {text}
      </div>

      {/* Sender & Timestamp Label */}
      <div className="flex items-center space-x-2 mt-1.5 px-1">
        <span className="font-sans font-semibold text-[10px] uppercase tracking-wider text-muted/80">
          {isBot ? 'LEXBOT' : 'YOU'}
        </span>
        {timestamp && (
          <>
            <span className="text-muted/40 text-[10px] font-sans">•</span>
            <span className="text-muted/60 text-[10px] font-sans">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
