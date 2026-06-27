import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../../store/chatstore';
import { chatService } from '../../services/chatService';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import Button from '../UI/Button';

export default function ChatWindow() {
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
      text: inputText.trim(),
    };

    // Save in state store
    addMessage(userMessage);
    setInputText('');
    setLoading(true);

    try {
      // API call to fetch LexBot response
      const response = await chatService.sendMessage(userMessage.text, messages);
      addMessage({
        sender: 'lexbot',
        text: response.reply,
      });
    } catch (err) {
      addMessage({
        sender: 'lexbot',
        text: "I experienced an error connecting to my services. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#fafbfe]">
      {/* Chat Area Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center space-x-2">
          <span className="font-sans font-semibold text-sm text-ink select-none">
            LexBot
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[10px] text-muted font-sans font-medium">AI Evaluator</span>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        
        {/* Animated Typing Indicator */}
        {loading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Send Input Bar */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSend} className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Describe your legal situation here (e.g. My landlord locked me out)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 h-11 px-4 bg-surface border border-border rounded-md font-sans text-sm text-ink outline-none transition-all placeholder:text-muted/50 focus:ring-2 focus:ring-accent/15 focus:border-accent disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={inputText.trim() === '' || loading}
            className="w-11 h-11 !p-0 rounded-md flex items-center justify-center shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
