
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isSameDay } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  date: Date;
}

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
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
              className={`min-h-24 p-2 border-r border-b border-[#D1D8BE] cursor-pointer hover:bg-[#EEEFE0] transition-colors ${
                date && !isSameMonth(date, currentDate) ? 'text-gray-400' : ''
              }`}
              onClick={() => date && handleDateClick(date)}
            >
              {date && (
                <>
                  <div className="font-medium text-sm mb-1">
                    {format(date, 'd')}
                  </div>
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
      />
    </div>
  );
};
