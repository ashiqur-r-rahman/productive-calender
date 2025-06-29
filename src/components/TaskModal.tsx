
import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, Check, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

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

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  tasks,
  setTasks,
  notes,
  setNotes,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
  });
  const [noteContent, setNoteContent] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const dayTasks = selectedDate 
    ? tasks.filter(task => 
        task.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  const dayNotes = selectedDate 
    ? notes.filter(note => 
        note.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  // Load existing note content when modal opens
  useEffect(() => {
    if (selectedDate && dayNotes.length > 0) {
      setNoteContent(dayNotes[0].content);
    } else {
      setNoteContent('');
    }
  }, [selectedDate, dayNotes]);

  const addTask = () => {
    if (!newTask.title.trim() || !selectedDate) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'Not Started',
      date: selectedDate,
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'Medium' });
    setIsAddingTask(false);
  };

  const saveNote = () => {
    if (!selectedDate) return;

    if (dayNotes.length > 0) {
      // Update existing note
      setNotes(prev => 
        prev.map(note => 
          note.id === dayNotes[0].id 
            ? { ...note, content: noteContent }
            : note
        )
      );
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        content: noteContent,
        date: selectedDate,
      };
      setNotes(prev => [...prev, newNote]);
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen || !selectedDate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D1D8BE]">
          <h2 className="text-xl font-bold text-[#819A91]">
            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#EEEFE0] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#D1D8BE]">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'text-[#819A91] border-b-2 border-[#819A91] bg-[#EEEFE0]'
                : 'text-gray-500 hover:text-[#819A91]'
            }`}
            onClick={() => setActiveTab('tasks')}
          >
            To-Do List ({dayTasks.length})
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'notes'
                ? 'text-[#819A91] border-b-2 border-[#819A91] bg-[#EEEFE0]'
                : 'text-gray-500 hover:text-[#819A91]'
            }`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'tasks' ? (
            <div className="space-y-4">
              {/* Add Task Button */}
              {!isAddingTask && (
                <button
                  onClick={() => setIsAddingTask(true)}
                  className="w-full p-3 border-2 border-dashed border-[#A7C1A8] rounded-lg text-[#819A91] hover:bg-[#EEEFE0] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add New Task
                </button>
              )}

              {/* Add Task Form */}
              {isAddingTask && (
                <div className="p-4 border border-[#D1D8BE] rounded-lg bg-[#EEEFE0]">
                  <input
                    type="text"
                    placeholder="Task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border border-[#D1D8BE] rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#A7C1A8]"
                  />
                  <textarea
                    placeholder="Task description..."
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2 border border-[#D1D8BE] rounded mb-3 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#A7C1A8]"
                  />
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'High' | 'Medium' | 'Low' }))}
                    className="w-full p-2 border border-[#D1D8BE] rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#A7C1A8]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={addTask}
                      className="px-4 py-2 bg-[#819A91] text-white rounded hover:bg-[#A7C1A8] transition-colors"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={() => setIsAddingTask(false)}
                      className="px-4 py-2 border border-[#D1D8BE] rounded hover:bg-[#EEEFE0] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-3">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-[#D1D8BE] rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => updateTaskStatus(
                              task.id, 
                              task.status === 'Completed' ? 'Not Started' : 'Completed'
                            )}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              task.status === 'Completed'
                                ? 'bg-[#D1D8BE] border-[#D1D8BE]'
                                : 'border-[#819A91] hover:border-[#A7C1A8]'
                            }`}
                          >
                            {task.status === 'Completed' && <Check size={12} className="text-white" />}
                          </button>
                          <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.description && (
                          <p className={`text-sm text-gray-600 ml-8 ${task.status === 'Completed' ? 'line-through' : ''}`}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 ml-8 mt-2">
                          <div
                            className="px-2 py-1 rounded text-xs text-white"
                            style={{ backgroundColor: getStatusColor(task.status) }}
                          >
                            {task.status}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {dayTasks.length === 0 && !isAddingTask && (
                <div className="text-center py-8 text-gray-500">
                  <Edit3 size={48} className="mx-auto mb-4 text-[#D1D8BE]" />
                  <p>No tasks for this date. Add one to get started!</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <textarea
                placeholder="Write your notes for this date..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full h-64 p-4 border border-[#D1D8BE] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#A7C1A8]"
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={saveNote}
                  className="px-4 py-2 bg-[#819A91] text-white rounded hover:bg-[#A7C1A8] transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
