import React from 'react';

function App() {
  const colors = [
    { name: '--ink', class: 'bg-ink text-white', hex: '#0F1117', desc: 'Primary text, headings' },
    { name: '--surface', class: 'bg-surface text-ink border border-border', hex: '#F7F8FC', desc: 'Page background' },
    { name: '--card', class: 'bg-card text-ink border border-border', hex: '#FFFFFF', desc: 'Cards, panels, modals' },
    { name: '--accent', class: 'bg-accent text-white', hex: '#2D3A8C', desc: 'CTAs, active states, links' },
    { name: '--accent-light', class: 'bg-accent-light text-accent', hex: '#EEF0FA', desc: 'Accent tints, hover backgrounds' },
    { name: '--muted', class: 'bg-muted text-white', hex: '#6B7280', desc: 'Secondary text, captions' },
    { name: '--border', class: 'bg-border text-ink', hex: '#E5E7EB', desc: 'Dividers, input borders' },
    { name: '--success', class: 'bg-success text-white', hex: '#16A34A', desc: 'Confirmation states' },
    { name: '--warning', class: 'bg-warning text-white', hex: '#D97706', desc: 'Case viability caveats' },
    { name: '--error', class: 'bg-error text-white', hex: '#DC2626', desc: 'Form errors' },
  ];

  return (
    <div className="min-h-screen bg-surface p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="border-b border-border pb-8">
          <span className="text-accent text-xs font-semibold uppercase tracking-wider">Design System</span>
          <h1 className="font-serif text-5xl md:text-6xl text-ink mt-2">
            LexBridge Tokens
          </h1>
          <p className="text-muted mt-4 text-lg font-sans max-w-2xl">
            This is the live preview of Step 1: Design tokens. It demonstrates colors, typography, border radius, and spacing.
          </p>
        </header>

        {/* Font Showcase */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">Typography</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-md shadow-card border border-border">
              <h3 className="text-xs text-muted uppercase tracking-wider font-semibold mb-2">Display Font</h3>
              <p className="font-serif text-4xl text-ink">DM Serif Display</p>
              <p className="font-serif text-lg text-muted mt-4 italic">Institutional Calm</p>
            </div>
            
            <div className="bg-card p-6 rounded-md shadow-card border border-border">
              <h3 className="text-xs text-muted uppercase tracking-wider font-semibold mb-2">Sans Font</h3>
              <p className="font-sans text-4xl font-semibold text-ink">Inter</p>
              <p className="font-sans text-sm text-muted mt-4">Used for body copy, labels, inputs, and UI action items.</p>
            </div>

            <div className="bg-card p-6 rounded-md shadow-card border border-border">
              <h3 className="text-xs text-muted uppercase tracking-wider font-semibold mb-2">Mono Font</h3>
              <p className="font-mono text-3xl text-ink">JetBrains Mono</p>
              <p className="font-mono text-xs text-muted mt-4">Used for precise chat text and reference codes.</p>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">Color Palette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((c) => (
              <div 
                key={c.name} 
                className={`${c.class} p-4 rounded-md shadow-card flex flex-col justify-between h-32 transition-transform hover:scale-[1.02] duration-200`}
              >
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">{c.name}</h3>
                  <p className="text-xs opacity-80 mt-1">{c.desc}</p>
                </div>
                <code className="text-xs self-end font-mono bg-black/10 px-2 py-0.5 rounded">{c.hex}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">Border Radius</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border p-4 rounded text-center shadow-card">
              <span className="block text-xs font-mono text-muted mb-2">DEFAULT (6px)</span>
              <div className="h-16 w-full bg-accent rounded mx-auto flex items-center justify-center text-white text-xs font-semibold">Inputs, tags</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-md text-center shadow-card">
              <span className="block text-xs font-mono text-muted mb-2">--radius-md (12px)</span>
              <div className="h-16 w-full bg-accent rounded-md mx-auto flex items-center justify-center text-white text-xs font-semibold">Cards, sidebars</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg text-center shadow-card">
              <span className="block text-xs font-mono text-muted mb-2">--radius-lg (20px)</span>
              <div className="h-16 w-full bg-accent rounded-lg mx-auto flex items-center justify-center text-white text-xs font-semibold">Chat bubbles</div>
            </div>
            <div className="bg-card border border-border p-4 rounded-full text-center shadow-card">
              <span className="block text-xs font-mono text-muted mb-2">--radius-full (9999px)</span>
              <div className="h-16 w-full bg-accent rounded-full mx-auto flex items-center justify-center text-white text-xs font-semibold">Pills, avatars</div>
            </div>
          </div>
        </section>

        {/* Shadows and Focus States */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-ink border-l-4 border-accent pl-3">Shadows & Focus States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-md shadow-card border border-border flex flex-col justify-between">
              <span className="text-xs font-mono text-muted">--shadow-card</span>
              <p className="text-sm font-sans mt-4 text-muted">Subtle backdrop shadow for cards.</p>
            </div>
            <div className="bg-card p-6 rounded-md shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-border flex flex-col justify-between">
              <span className="text-xs font-mono text-muted">--shadow-modal</span>
              <p className="text-sm font-sans mt-4 text-muted">Deeper shadow for modals & overlays.</p>
            </div>
            <div className="bg-card p-6 rounded-md border border-border flex flex-col justify-between">
              <span className="text-xs font-mono text-muted">--shadow-focus (Click below)</span>
              <input 
                type="text" 
                placeholder="Click to see focus ring..."
                className="mt-4 px-3 py-2 border border-border rounded outline-none focus:ring-3 focus:ring-accent/20 focus:border-accent text-sm font-sans" 
              />
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}

export default App;
