
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, StickyNote } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isSameDay, isToday } from 'date-fns';

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

// Comprehensive international holidays data
const getDateInfo = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  const holidays: { [key: string]: string[] } = {
    '01-01': ['New Year\'s Day 🎉', 'World Peace Day 🕊️'],
    '01-26': ['Republic Day (India) 🇮🇳', 'Australia Day 🇦🇺'],
    '02-14': ['Valentine\'s Day 💕', 'Friendship Day 👫'],
    '03-08': ['International Women\'s Day 👩', 'Mother\'s Day (UK) 🌷'],
    '03-17': ['St. Patrick\'s Day 🍀 (Ireland)', 'Holi Festival 🎨 (India)'],
    '04-01': ['April Fool\'s Day 😄', 'Easter Sunday 🐰'],
    '04-22': ['Earth Day 🌍', 'World Book Day 📚'],
    '05-01': ['Labor Day 👷', 'May Day 🌸'],
    '05-08': ['Victory Day 🏆 (Europe)', 'Mother\'s Day 👩‍👧‍👦'],
    '06-05': ['World Environment Day 🌱', 'Father\'s Day 👨‍👧‍👦'],
    '06-21': ['World Music Day 🎵', 'Summer Solstice ☀️'],
    '07-04': ['Independence Day 🇺🇸', 'Canada Day 🇨🇦'],
    '08-15': ['Independence Day 🇮🇳 (India)', 'Liberation Day 🕊️'],
    '09-11': ['Patriot Day 🇺🇸', 'Teachers Day 👨‍🏫 (India)'],
    '10-02': ['Gandhi Jayanti 🕊️ (India)', 'Non-Violence Day ☮️'],
    '10-31': ['Halloween 🎃', 'Reformation Day ✝️'],
    '11-11': ['Veterans Day 🎖️', 'Diwali 🪔 (India)'],
    '12-25': ['Christmas Day 🎄', 'Good Governance Day 🏛️'],
    '12-31': ['New Year\'s Eve 🥳', 'World Peace Day 🌍'],
  };
  
  return holidays[dateStr] || [];
};

// Check if date is weekend (Friday or Saturday)
const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 5 || day === 6; // Friday = 5, Saturday = 6
};

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add empty cells for days before month starts
  const startPadding = Array.from({ length: getDay(monthStart) }, (_, i) => null);
  const allDays = [...startPadding, ...calendarDays];

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.date, date));
  };

  const getNotesForDate = (date: Date) => {
    return notes.filter(note => isSameDay(note.date, date));
  };

  const hasNotesForDate = (date: Date) => {
    return getNotesForDate(date).length > 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started': return '#819A91';
      case 'In Progress': return '#A7C1A8';
      case 'Completed': return '#D1D8BE';
      case 'Overdue': return '#819A91';
      default: return '#819A91';
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#819A91]">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-[#D1D8BE] transition-colors"
          >
            <ChevronLeft size={20} className="text-[#819A91]" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-[#D1D8BE] transition-colors"
          >
            <ChevronRight size={20} className="text-[#819A91]" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-[#D1D8BE] overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-[#D1D8BE]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-4 text-center font-medium text-[#819A91] bg-[#EEEFE0]">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div className="grid grid-cols-7">
          {allDays.map((date, index) => (
            <div
              key={index}
              className={`min-h-32 p-2 border-r border-b border-[#D1D8BE] cursor-pointer hover:bg-[#EEEFE0] transition-colors relative ${
                date && !isSameMonth(date, currentDate) ? 'text-gray-400 bg-gray-50' : ''
              } ${
                date && isToday(date) ? 'bg-[#A7C1A8] bg-opacity-30 border-2 border-[#819A91] font-bold' : ''
              } ${
                date && isWeekend(date) ? 'bg-blue-50' : ''
              }`}
              onClick={() => date && handleDateClick(date)}
            >
              {date && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`font-medium text-sm ${
                      isToday(date) ? 'font-bold text-[#819A91] text-lg' : ''
                    } ${
                      isWeekend(date) ? 'text-blue-600' : ''
                    }`}>
                      {format(date, 'd')}
                    </div>
                    <div className="flex items-center gap-1">
                      {hasNotesForDate(date) && (
                        <div className="relative">
                          <StickyNote 
                            size={18} 
                            className="text-yellow-500 fill-yellow-400 drop-shadow-sm" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* International holidays */}
                  {getDateInfo(date).map((event, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-blue-600 mb-1 truncate font-medium"
                    >
                      {event}
                    </div>
                  ))}
                  
                  {/* Tasks */}
                  <div className="space-y-1">
                    {getTasksForDate(date).slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        className="text-xs p-1 rounded text-white truncate"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        {task.title}
                      </div>
                    ))}
                    {getTasksForDate(date).length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{getTasksForDate(date).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        tasks={tasks}
        setTasks={setTasks}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
};
