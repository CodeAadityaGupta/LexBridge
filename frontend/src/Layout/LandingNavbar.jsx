import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-200
        ${scrolled 
          ? 'bg-card border-b border-border shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 select-none group">
        <span className="font-sans font-semibold text-xl tracking-tight text-ink">
          LexBridge
        </span>
        <span className="text-accent text-lg transition-transform group-hover:rotate-12 duration-200">
          ⚖
        </span>
      </Link>

      {/* Auth Actions */}
      <div className="flex items-center space-x-3">
        <Link to="/login">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" size="sm">
            Sign up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
