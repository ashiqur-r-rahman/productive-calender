
import React, { useState } from 'react';
import { CalendarView } from '@/components/CalendarView';
import { Sidebar } from '@/components/Sidebar';
import { AIAssistant } from '@/components/AIAssistant';
import { Dashboard } from '@/components/Dashboard';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  date: Date;
}

interface Note {
  id: string;
  content: string;
  date: Date;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('calendar');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard tasks={tasks} notes={notes} />;
      case 'notes':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#819A91] mb-6">Notes Archive</h2>
            <div className="bg-white rounded-lg border border-[#D1D8BE] p-6">
              <p className="text-gray-600">Notes archive functionality coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#819A91] mb-6">Settings</h2>
            <div className="bg-white rounded-lg border border-[#D1D8BE] p-6">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEFE0] font-inter">
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1">
          {renderCurrentView()}
        </main>
        <AIAssistant />
      </div>
    </div>
  );
};

export default Index;
