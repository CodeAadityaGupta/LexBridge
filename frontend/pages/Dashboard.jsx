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
        <div className="hidden md:flex flex-1 flex-col h-full overflow-hidden bg-card border-r border-border/50">
          <LawyerSidebar onClose={handleCloseSidebar} />
        </div>

        {/* Chat window: Secondary panel on desktop (fixed width), full width on mobile */}
        <div className="w-full md:w-[380px] lg:w-[420px] flex flex-col h-full overflow-hidden bg-surface shrink-0">
          <ChatWindow onToggleSidebar={handleOpenSidebar} />
        </div>

        {/* Mobile Slide-Up Drawer Overlay */}
        {mobileSidebarOpen && (
          <>
            {/* Backdrop Overlay - Deep blur */}
            <div 
              className="md:hidden fixed inset-0 bg-ink/35 backdrop-blur-md z-40 transition-all duration-200"
              onClick={handleCloseSidebar}
            />

            {/* Bottom Sheet Drawer - Styled card-like overlay */}
            <div 
              className="md:hidden fixed bottom-0 left-0 right-0 max-h-[88vh] rounded-t-xl bg-card z-50 shadow-modal border-t border-border flex flex-col overflow-hidden"
              style={{
                animation: 'drawerSlideUp 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              {/* Top notch indicator for mobile drawer */}
              <div className="w-12 h-1 bg-border/80 rounded-full mx-auto my-3 shrink-0" />
              <div className="flex-1 overflow-hidden flex flex-col">
                <LawyerSidebar onClose={handleCloseSidebar} isMobileDrawer={true} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Global CSS transition animations for drawer */}
      <style>{`
        @keyframes drawerSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
