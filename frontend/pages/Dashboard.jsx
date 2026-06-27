import React, { useState } from 'react';
import Navbar from '../src/Layout/Navbar';
import ChatWindow from '../src/chat/ChatWindow';
import LawyerSidebar from '../src/lawyers/LawyerSidebar';

export default function Dashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleOpenSidebar = () => setMobileSidebarOpen(true);
  const handleCloseSidebar = () => setMobileSidebarOpen(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col overflow-hidden page-fade">
      <Navbar />
      
      {/* Split screen content area (subtracts navbar height) */}
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        
        {/* Lawyer directory sidebar: Primary panel on desktop (flex-1), hidden on mobile */}
        <div className="hidden md:flex flex-1 flex-col h-full overflow-hidden bg-card">
          <LawyerSidebar onClose={handleCloseSidebar} />
        </div>

        {/* Chat window: Secondary panel on desktop (fixed width), full width on mobile */}
        <div className="w-full md:w-[360px] lg:w-[400px] flex flex-col h-full overflow-hidden bg-surface md:border-l border-border shrink-0">
          <ChatWindow onToggleSidebar={handleOpenSidebar} />
        </div>

        {/* Mobile Slide-Up Drawer Overlay */}
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="md:hidden fixed inset-0 bg-[#0F1117]/40 backdrop-blur-sm z-40 transition-opacity"
              onClick={handleCloseSidebar}
            />

            {/* Bottom Sheet Drawer */}
            <div 
              className="md:hidden fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl bg-card z-50 shadow-modal border-t border-border flex flex-col overflow-hidden animate-slideUp"
              style={{
                animation: 'drawerSlideUp 200ms ease-out forwards'
              }}
            >
              {/* Drawer Handle / Drag bar */}
              <div className="flex justify-center py-2 shrink-0 bg-card border-b border-border/10">
                <div className="w-12 h-1 rounded-full bg-muted/30" />
              </div>

              {/* Sidebar content */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <LawyerSidebar 
                  onClose={handleCloseSidebar} 
                  isMobileDrawer={true} 
                />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Slide-Up CSS Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drawerSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
