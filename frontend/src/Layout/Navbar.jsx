import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Scale } from 'lucide-react';
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
    <nav className="sticky top-0 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-6 md:px-8">
      {/* Brand logo */}
      <Link to="/dashboard" className="flex items-center space-x-2 select-none">
        <span className="font-sans font-semibold text-lg tracking-tight text-ink">
          LexBridge
        </span>
        <Scale className="w-5 h-5 text-accent shrink-0" />
      </Link>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="!p-2 rounded-full !w-9 !h-9 flex items-center justify-center shrink-0"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-ink" />
          )}
        </Button>

        {user && (
          <div className="flex items-center space-x-3 border-r border-border pr-4 h-9">
            <Avatar name={user.name} src={user.avatar} size="sm" />
            <span className="text-sm font-medium text-ink font-sans hidden sm:inline">
              {user.name}
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </nav>
  );
}
