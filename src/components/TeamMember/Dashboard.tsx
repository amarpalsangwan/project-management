import React from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { mockTasks, mockProjects } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import ProgressChart from '../Charts/ProgressChart';
import ActivityChart from '../Charts/ActivityChart';

const TeamMemberDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const userTasks = mockTasks.filter(task => task.assignedTo === user?.id);
  const userProjects = mockProjects.filter(project => project.teamMembers.includes(user?.id || ''));
  
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in_progress').length;
  const overdueTasks = userTasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'completed'
  ).length;

  const stats = [
    {
      name: 'Completed Tasks',
      value: completedTasks,
      icon: CheckSquare,
      color: 'emerald',
      change: '+3 this week'
    },
    {
      name: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      color: 'blue',
      change: '2 active'
    },
    {
      name: 'Overdue',
      value: overdueTasks,
      icon: AlertCircle,
      color: 'red',
      change: overdueTasks > 0 ? 'Needs attention' : 'All caught up'
    },
    {
      name: 'Projects',
      value: userProjects.length,
      icon: TrendingUp,
      color: 'purple',
      change: `${userProjects.filter(p => p.status === 'in_progress').length} active`
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'todo': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'border-green-200',
      'medium': 'border-yellow-200',
      'high': 'border-orange-200',
      'critical': 'border-red-200'
    };
    return colors[priority as keyof typeof colors] || 'border-gray-200';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your tasks and projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.name === 'Overdue' && overdueTasks > 0 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Tasks</h2>
          <div className="space-y-4">
            {userTasks.slice(0, 5).map(task => {
              const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
              return (
                <div key={task.id} className={`border-l-4 pl-4 py-3 ${getPriorityColor(task.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-4">
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Tracking */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity Tracking</h2>
          <ActivityChart userId={user?.id} />
        </div>
      </div>

      {/* My Projects */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProjects.map(project => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                </div>
                <ProgressChart progress={project.progress} size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-500">
                  Due: {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;