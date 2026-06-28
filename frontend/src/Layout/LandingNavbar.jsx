import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Scale } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../UI/Button';

export default function LandingNavbar() {
  const { theme, toggleTheme } = useAuthStore();

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-14 bg-card/75 backdrop-blur-lg border border-border/40 rounded-full shadow-card z-50 flex items-center justify-between px-6 transition-all duration-300"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 select-none group">
        <span className="font-sans font-bold text-sm tracking-tight text-ink uppercase tracking-wider pl-1">
          LexBridge
        </span>
        <Scale className="w-4 h-4 text-accent transition-transform group-hover:rotate-6 duration-200 shrink-0" />
      </Link>

      {/* Auth Actions */}
      <div className="flex items-center space-x-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-accent-light/40 transition-colors shrink-0 outline-none"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
          ) : (
            <Moon className="w-4 h-4 text-ink" />
          )}
        </button>

        <Link to="/login">
          <Button variant="ghost" className="h-8 px-3 rounded-full text-xs font-bold uppercase tracking-wide">
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" className="h-8 px-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
            Sign up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
