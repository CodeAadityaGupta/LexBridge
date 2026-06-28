import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Scale, Search, Bell, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';

export default function Navbar() {
  const { user, logout, theme, toggleTheme } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 h-16 bg-card/75 backdrop-blur-lg border-b border-border/60 z-30 flex items-center justify-between px-6 md:px-8 shadow-sm">
      {/* Brand logo */}
      <Link to="/dashboard" className="flex items-center space-x-2 select-none group">
        <span className="font-sans font-bold text-sm tracking-widest text-ink uppercase">
          LexBridge
        </span>
        <Scale className="w-4 h-4 text-accent transition-transform group-hover:rotate-6 shrink-0" />
      </Link>

      {/* Centered Search Bar */}
      <div className="hidden md:flex items-center w-full max-w-[280px] lg:max-w-[340px] relative mx-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
        <input 
          type="text" 
          placeholder="Search advocates, cases (Ctrl+K)..." 
          disabled
          className="w-full h-9 pl-10 pr-12 bg-surface/50 border border-border/80 rounded-md font-sans text-xs text-ink placeholder:text-muted/60 outline-none select-none cursor-not-allowed"
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-card border border-border/80 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-muted/80 shadow-sm select-none">
          ⌘K
        </span>
      </div>

      {/* Right User Actions Panel */}
      <div className="flex items-center space-x-2 md:space-x-3.5">
        
        {/* Help Center Button */}
        <button
          className="p-2 rounded-md text-muted hover:text-ink hover:bg-accent-light/40 transition-colors shrink-0 outline-none"
          aria-label="Help Center"
        >
          <HelpCircle className="w-4.5 h-4.5" />
        </button>

        {/* Notifications Button */}
        <button
          className="p-2 rounded-md text-muted hover:text-ink hover:bg-accent-light/40 transition-colors relative shrink-0 outline-none"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-muted hover:text-ink hover:bg-accent-light/40 transition-colors shrink-0 outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20" />
          ) : (
            <Moon className="w-4.5 h-4.5 text-ink" />
          )}
        </button>

        {/* Profile Avatar */}
        {user && (
          <div className="flex items-center space-x-2.5 pl-2 border-l border-border/85 h-8">
            <Avatar name={user.name} src={user.avatar} size="sm" className="h-7 w-7 border border-border" />
            <span className="text-xs font-bold text-ink font-sans hidden lg:inline max-w-[80px] truncate select-none">
              {user.name}
            </span>
          </div>
        )}

        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="h-8 text-xs font-bold uppercase tracking-wider text-muted hover:text-error hover:bg-red-50/10 shrink-0"
        >
          Log out
        </Button>
      </div>
    </nav>
  );
}
