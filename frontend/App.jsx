import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// UI components
import Button from './src/UI/Button';
import Input from './src/UI/input';
import Badge from './src/UI/Badge';
import Card from './src/UI/Card';
import Modal from './src/UI/Modal';
import Spinner from './src/UI/spinner';
import Avatar from './src/UI/Avatar';
import Divider from './src/UI/Divider';

// Layout components
import LandingNavbar from './src/Layout/LandingNavbar';
import Navbar from './src/Layout/Navbar';

function DashboardSimulator() {
  const { user } = useAuthStore();
  return (
    <div className="pt-20 px-6 md:px-8 max-w-4xl mx-auto space-y-6">
      <Card>
        <h2 className="font-serif text-2xl text-ink">Dashboard</h2>
        <p className="text-muted text-sm mt-2">
          Welcome to the protected dashboard area, {user?.name || 'Advocate'}! You are successfully authenticated.
        </p>
      </Card>
    </div>
  );
}

function Showroom() {
  const { user, isAuthenticated, login, logout, hydrate } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [inputErr, setInputErr] = useState('');

  // Hydrate auth state on mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleToggleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login({ name: 'Rohan Sharma', avatar: '' });
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    if (val.length < 5 && val.length > 0) {
      setInputErr('Must be at least 5 characters');
    } else {
      setInputErr('');
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Dynamic Navbar display depending on simulated auth state */}
      {isAuthenticated ? <Navbar /> : <LandingNavbar />}

      <div className="pt-24 px-6 md:px-12 max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="border-b border-border pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-accent text-xs font-semibold uppercase tracking-wider">Showroom</span>
              <h1 className="font-serif text-5xl text-ink mt-2">LexBridge UI Elements</h1>
              <p className="text-muted mt-2 text-sm font-sans">
                Interactive preview of steps 2 & 3: Shared UI components, layout headers, and routing wrappers.
              </p>
            </div>
            {/* Toggle Authentication Simulator */}
            <div className="bg-card border border-border p-4 rounded-md shadow-card flex items-center space-x-4 self-start">
              <div className="flex flex-col">
                <span className="text-xs text-muted font-medium">Auth State:</span>
                <span className="text-sm font-semibold flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${isAuthenticated ? 'bg-success' : 'bg-muted'}`} />
                  {isAuthenticated ? 'Authenticated' : 'Visitor (Guest)'}
                </span>
              </div>
              <Button variant="secondary" size="sm" onClick={handleToggleAuth}>
                {isAuthenticated ? 'Simulate Logout' : 'Simulate Login'}
              </Button>
            </div>
          </div>
        </header>

        {/* Buttons Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">1. Buttons (`Button.jsx`)</h2>
          <Card className="space-y-6">
            <div>
              <h3 className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary CTA</Button>
                <Button variant="secondary">Secondary CTA</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger CTA</Button>
              </div>
            </div>
            <Divider />
            <div>
              <h3 className="text-xs text-muted font-semibold uppercase tracking-wider mb-3">Sizes & States</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
                <Button disabled>Disabled Button</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Input Validation Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">2. Form Input (`input.jsx`)</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xs text-muted font-semibold uppercase tracking-wider">Interactive Test</h3>
                <Input
                  label="Enter case description"
                  placeholder="Type something here..."
                  value={inputVal}
                  onChange={handleInputChange}
                  error={inputErr}
                  helperText="Min. 5 characters for auto validation verification."
                  required
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xs text-muted font-semibold uppercase tracking-wider">Static States</h3>
                <Input
                  label="Read-only field"
                  value="MH/12345/2026"
                  disabled
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Badges Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">3. Badges (`Badge.jsx`)</h2>
          <Card>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center p-3 bg-surface rounded-md border border-border flex-1 min-w-[120px]">
                <span className="text-xs font-mono text-muted mb-2">default</span>
                <Badge variant="default">Verified</Badge>
              </div>
              <div className="flex flex-col items-center p-3 bg-surface rounded-md border border-border flex-1 min-w-[120px]">
                <span className="text-xs font-mono text-muted mb-2">accent</span>
                <Badge variant="accent">Tenancy Law</Badge>
              </div>
              <div className="flex flex-col items-center p-3 bg-surface rounded-md border border-border flex-1 min-w-[120px]">
                <span className="text-xs font-mono text-muted mb-2">success</span>
                <Badge variant="success">Case Won</Badge>
              </div>
              <div className="flex flex-col items-center p-3 bg-surface rounded-md border border-border flex-1 min-w-[120px]">
                <span className="text-xs font-mono text-muted mb-2">warning</span>
                <Badge variant="warning">Ongoing Retainer</Badge>
              </div>
              <div className="flex flex-col items-center p-3 bg-surface rounded-md border border-border flex-1 min-w-[120px]">
                <span className="text-xs font-mono text-muted mb-2">error</span>
                <Badge variant="error">Document Missing</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* Modals & Portal Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">4. Portal Modals (`Modal.jsx`)</h2>
          <Card className="flex flex-col items-start space-y-4">
            <p className="text-muted text-sm">
              Trigger the modal wrapper below. It will inject a modal block into `document.body` via React Portals and lock page scroll background context.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>Open Portal Modal</Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Schedule consultation request"
            >
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  Confirming your application detail submission. The advocate will contact you within 24 hours.
                </p>
                <div className="flex flex-col space-y-3">
                  <Input label="Your Preferred Date" type="date" required />
                  <Input label="Your Contact Number" type="tel" placeholder="+91 99999 99999" required />
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsModalOpen(false)}>Confirm Booking</Button>
                </div>
              </div>
            </Modal>
          </Card>
        </section>

        {/* Avatars, Spinners & Divider Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">5. Avatar, Spinner & Divider</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <h3 className="text-xs text-muted font-semibold uppercase tracking-wider">Avatars</h3>
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center">
                  <Avatar name="Priya Menon" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" size="lg" />
                  <span className="text-xs text-muted mt-2">Avatar image</span>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar name="Rohan Sharma" size="lg" />
                  <span className="text-xs text-muted mt-2">Initials fallback</span>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar name="Unknown User" size="sm" />
                  <span className="text-xs text-muted mt-2">Small size</span>
                </div>
              </div>
            </Card>

            <Card className="space-y-4">
              <h3 className="text-xs text-muted font-semibold uppercase tracking-wider">Spinners</h3>
              <div className="flex items-center space-x-6 h-full pb-4">
                <div className="flex flex-col items-center">
                  <Spinner size="sm" />
                  <span className="text-xs text-muted mt-2">sm spinner</span>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="md" />
                  <span className="text-xs text-muted mt-2">md spinner</span>
                </div>
                <div className="flex flex-col items-center">
                  <Spinner size="lg" />
                  <span className="text-xs text-muted mt-2">lg spinner</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showroom />} />
        <Route path="/dashboard" element={<DashboardSimulator />} />
        <Route path="*" element={<Showroom />} />
      </Routes>
    </Router>
  );
}

export default App;
