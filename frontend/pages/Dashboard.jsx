import React from 'react';
import Navbar from '../src/Layout/Navbar';
import ChatWindow from '../src/chat/ChatWindow';
import LawyerSidebar from '../src/lawyers/LawyerSidebar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Split screen content area (subtracts navbar height) */}
      <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Chat window occupies remaining flex space */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafbfe]">
          <ChatWindow />
        </div>

        {/* Lawyer directory sidebar */}
        <LawyerSidebar />
        
      </main>
    </div>
  );
}
