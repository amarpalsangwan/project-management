import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';
import { mockProjects, mockTasks } from '../../data/mockData';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    const projectDeadlines = mockProjects.filter(project => 
      project.endDate === dateStr
    ).map(project => ({
      id: project.id,
      title: `${project.name} Due`,
      type: 'project',
      color: 'bg-blue-500',
      time: 'All Day'
    }));

    const taskDeadlines = mockTasks.filter(task => 
      task.dueDate === dateStr
    ).map(task => ({
      id: task.id,
      title: task.title,
      type: 'task',
      color: task.priority === 'critical' ? 'bg-red-500' :
             task.priority === 'high' ? 'bg-orange-500' :
             task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500',
      time: 'Due'
    }));

    return [...projectDeadlines, ...taskDeadlines];
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 bg-gray-50 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const events = getEventsForDate(date);

      days.push(
        <div key={day} className={`h-32 border border-gray-200 p-2 ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
          <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {events.slice(0, 3).map((event, index) => (
              <div key={index} className={`text-xs p-1 rounded text-white ${event.color} truncate`}>
                {event.title}
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-gray-500">
                +{events.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const upcomingEvents = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const events = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayEvents = getEventsForDate(date);
      events.push(...dayEvents.map(event => ({ ...event, date })));
    }
    
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-2">Project deadlines and task due dates</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-0 mb-4">
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents().slice(0, 8).map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {event.date.toLocaleDateString()} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Project Deadlines</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Critical Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">High Priority Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Medium Priority Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Low Priority Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;