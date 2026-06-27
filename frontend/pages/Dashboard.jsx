import React from 'react';
import Navbar from '../src/Layout/Navbar';
import Card from '../src/UI/Card';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <Card className="space-y-4">
          <h1 className="font-serif-display text-3xl text-ink">
            Welcome to LexBridge
          </h1>
          <p className="text-muted text-sm max-w-xl leading-relaxed">
            Hello, <strong className="text-ink font-semibold">{user?.name || 'Advocate'}</strong>. Your dashboard shell is active. This confirms successful authentication registration and redirection routing.
          </p>
          <div className="pt-4 text-xs font-mono text-muted border-t border-border mt-6">
            Authenticated as: {user?.email || 'N/A'}
          </div>
        </Card>
      </div>
    </div>
  );
}
