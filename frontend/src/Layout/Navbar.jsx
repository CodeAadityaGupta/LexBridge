import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';

export default function Navbar() {
  const { user, logout } = useAuthStore();
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
        <span className="text-accent text-lg">⚖</span>
      </Link>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-3 border-r border-border pr-4">
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
