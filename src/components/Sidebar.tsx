
import React, { useState } from 'react';
import { Calendar, BarChart3, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const navigation = [
  { name: 'Calendar', icon: Calendar, current: true, id: 'calendar' },
  { name: 'Dashboard', icon: BarChart3, current: false, id: 'dashboard' },
  { name: 'Notes Archive', icon: FileText, current: false, id: 'notes' },
  { name: 'Settings', icon: Settings, current: false, id: 'settings' },
];

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white border-r border-[#D1D8BE] transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-[#819A91]">AI Calendar</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-[#EEEFE0] transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => onViewChange(item.id)}
              className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === item.id
                  ? 'bg-[#A7C1A8] text-white'
                  : 'text-gray-700 hover:bg-[#D1D8BE] hover:text-[#819A91]'
              }`}
            >
              <item.icon
                className={`${collapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 flex-shrink-0`}
                aria-hidden="true"
              />
              {!collapsed && item.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
