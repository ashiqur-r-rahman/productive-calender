
import React from 'react';
import { BarChart3, CheckCircle, Clock, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

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

interface DashboardProps {
  tasks: Task[];
  notes: Note[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, notes }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const overdueTasks = tasks.filter(task => task.status === 'Overdue').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const priorityStats = {
    High: tasks.filter(task => task.priority === 'High').length,
    Medium: tasks.filter(task => task.priority === 'Medium').length,
    Low: tasks.filter(task => task.priority === 'Low').length,
  };

  const totalNotes = notes.length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#819A91] flex items-center gap-2">
          <BarChart3 size={28} />
          Productivity Dashboard
        </h2>
        <p className="text-gray-600 mt-1">Track your productivity and task completion</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-[#819A91]">{totalTasks}</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-[#A7C1A8]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">{inProgressTasks}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#819A91] mb-4">Completion Rate</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-[#EEEFE0] rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-[#819A91] to-[#A7C1A8] h-4 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-[#819A91]">{completionRate}%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#819A91] mb-4">Notes Archive</h3>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-[#A7C1A8]">{totalNotes}</div>
            <div className="text-gray-600">
              {totalNotes === 1 ? 'note saved' : 'notes saved'}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white rounded-lg border border-[#D1D8BE] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#819A91] mb-4">Tasks by Priority</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-600">High Priority</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-[#EEEFE0] rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityStats.High / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold w-8">{priorityStats.High}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-600">Medium Priority</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-[#EEEFE0] rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityStats.Medium / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold w-8">{priorityStats.Medium}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600">Low Priority</span>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-[#EEEFE0] rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (priorityStats.Low / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold w-8">{priorityStats.Low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
