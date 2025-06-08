import React, { useState } from 'react';
import { Users, FolderOpen, CheckSquare, TrendingUp, Calendar, DollarSign, Plus, X } from 'lucide-react';
import { mockUsers, mockProjects, mockTasks } from '../../data/mockData';
import ProgressChart from '../Charts/ProgressChart';
import CreateProjectModal from './CreateProjectModal';
import AddEmployeeModal from './AddEmployeeModal';

const AdminDashboard: React.FC = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const totalUsers = mockUsers.filter(u => u.role === 'team_member').length;
  const activeProjects = mockProjects.filter(p => p.status === 'in_progress').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const totalBudget = mockProjects.reduce((sum, p) => sum + (p.budget || 0), 0);

  const stats = [
    {
      name: 'Team Members',
      value: totalUsers,
      icon: Users,
      color: 'blue',
      change: '+2 this month'
    },
    {
      name: 'Active Projects',
      value: activeProjects,
      icon: FolderOpen,
      color: 'emerald',
      change: '+1 this week'
    },
    {
      name: 'Completed Tasks',
      value: completedTasks,
      icon: CheckSquare,
      color: 'orange',
      change: '+12 this week'
    },
    {
      name: 'Total Budget',
      value: `$${(totalBudget / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'purple',
      change: '+15% this quarter'
    }
  ];

  const recentProjects = mockProjects.slice(0, 3);

  const handleViewAnalytics = () => {
    // Navigate to analytics view
    console.log('Navigating to analytics...');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your projects.</p>
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
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
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
        {/* Project Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Progress</h2>
          <div className="space-y-6">
            {recentProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <ProgressChart progress={project.progress} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockUsers.slice(0, 4).map(user => {
              const daysSinceActive = Math.floor((Date.now() - new Date(user.lastActive).getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={user.id} className="flex items-center space-x-4">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      Last active {daysSinceActive === 0 ? 'today' : `${daysSinceActive} days ago`}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    daysSinceActive === 0 ? 'bg-green-500' :
                    daysSinceActive <= 3 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowCreateProject(true)}
            className="flex items-center justify-center px-6 py-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            <FolderOpen className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">Create New Project</span>
          </button>
          <button 
            onClick={() => setShowAddEmployee(true)}
            className="flex items-center justify-center px-6 py-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Users className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="font-medium text-emerald-900">Add Team Member</span>
          </button>
          <button 
            onClick={handleViewAnalytics}
            className="flex items-center justify-center px-6 py-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors"
          >
            <TrendingUp className="h-5 w-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-900">View Analytics</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showCreateProject && (
        <CreateProjectModal 
          onClose={() => setShowCreateProject(false)}
          onSubmit={(projectData) => {
            console.log('Creating project:', projectData);
            setShowCreateProject(false);
          }}
        />
      )}

      {showAddEmployee && (
        <AddEmployeeModal 
          onClose={() => setShowAddEmployee(false)}
          onSubmit={(employeeData) => {
            console.log('Adding employee:', employeeData);
            setShowAddEmployee(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;