
import React from 'react';
import { CalendarView } from '@/components/CalendarView';
import { Sidebar } from '@/components/Sidebar';
import { AIAssistant } from '@/components/AIAssistant';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#EEEFE0] font-inter">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <CalendarView />
        </main>
        <AIAssistant />
      </div>
    </div>
  );
};

export default Index;
