import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal } from 'lucide-react';
import { useChatStore } from '../../store/chatstore';
import { chatService } from '../../services/chatService';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Button from '../UI/Button';

export default function ChatWindow({ onToggleSidebar }) {
  const { messages, loading, addMessage, setLoading } = useChatStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when a new message is appended or typing indicators toggle
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '' || loading) return;

    const userMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    const sentText = inputText;
    setInputText('');
    setLoading(true);

    try {
      const response = await chatService.sendMessage(sentText, messages);
      const botMessage = {
        sender: 'lexbot',
        text: response.reply || response.text || '',
        timestamp: new Date().toISOString(),
      };
      addMessage(botMessage);
    } catch (err) {
      const errorMessage = {
        sender: 'lexbot',
        text: "I'm having trouble connecting to the network. Please check your internet connection.",
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Chat Area Header */}
      <div className="h-14 px-5 bg-surface/60 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-accent" />
          <h2 className="font-sans font-bold text-[10px] text-ink uppercase tracking-widest">
            AI Assistant Console
          </h2>
        </div>

        {/* Directory Toggle for Mobile screens */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-[10px] font-bold text-accent hover:underline outline-none uppercase tracking-widest"
        >
          Browse Directory
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-5 chat-scroll-area">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 select-none">
            <div className="p-3 bg-accent-light rounded-full">
              <Terminal className="w-6 h-6 text-accent" />
            </div>
            <div className="space-y-1">
              <p className="font-serif text-lg text-ink font-bold leading-tight">
                Case Assessment Console
              </p>
              <p className="text-muted text-[11px] max-w-[220px] mx-auto leading-relaxed font-sans font-medium">
                Summarize your legal situation in plain language to check viable counsel categories.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))
        )}

        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Send Input Bar */}
      <div className="p-4 bg-card">
        <form onSubmit={handleSend} className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Describe your situation here (e.g. My landlord locked me out)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 h-10 px-4 bg-surface rounded-md font-sans text-xs text-ink outline-none transition-all placeholder:text-muted/50 focus:shadow-focus focus:border-accent/40 disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={inputText.trim() === '' || loading}
            className="w-10 h-10 !p-0 rounded-md flex items-center justify-center shrink-0"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
