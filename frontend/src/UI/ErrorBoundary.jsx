import React, { Component } from 'react';
import Card from './Card';
import Button from './Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an uncaught exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6 font-sans">
          {/* Visual Warning Shield Icon */}
          <div className="p-4 bg-red-50 border border-red-200 text-error rounded-full shadow-sm animate-scaleUp">
            <svg 
              className="w-8 h-8 rotate-180" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-ink">
              Something went wrong
            </h2>
            <p className="text-muted text-xs leading-relaxed max-w-sm">
              An unexpected error occurred in the rendering lifecycle. Please reload the application or try again later.
            </p>
          </div>

          <Button 
            onClick={() => window.location.reload()} 
            variant="primary" 
            className="w-full h-11"
          >
            Reload application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
