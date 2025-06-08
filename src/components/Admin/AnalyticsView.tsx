import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, Calendar } from 'lucide-react';
import { mockUsers, mockProjects, mockTasks } from '../../data/mockData';
import ActivityChart from '../Charts/ActivityChart';
import ProgressChart from '../Charts/ProgressChart';

const AnalyticsView: React.FC = () => {
  const totalProjects = mockProjects.length;
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
  const activeProjects = mockProjects.filter(p => p.status === 'in_progress').length;
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = mockTasks.filter(t => 
    new Date(t.dueDate) < new Date() && t.status !== 'completed'
  ).length;

  const projectCompletionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const teamMembers = mockUsers.filter(u => u.role === 'team_member');
  const activeMembers = teamMembers.filter(u => {
    const daysSinceActive = Math.floor((Date.now() - new Date(u.lastActive).getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceActive <= 3;
  }).length;

  const stats = [
    {
      name: 'Project Completion Rate',
      value: `${projectCompletionRate.toFixed(1)}%`,
      icon: Target,
      color: 'blue',
      change: '+5.2% from last month'
    },
    {
      name: 'Task Completion Rate',
      value: `${taskCompletionRate.toFixed(1)}%`,
      icon: BarChart3,
      color: 'emerald',
      change: '+12.3% from last month'
    },
    {
      name: 'Active Team Members',
      value: `${activeMembers}/${teamMembers.length}`,
      icon: Users,
      color: 'orange',
      change: `${((activeMembers / teamMembers.length) * 100).toFixed(0)}% active`
    },
    {
      name: 'Overdue Tasks',
      value: overdueTasks,
      icon: Clock,
      color: 'red',
      change: overdueTasks > 0 ? 'Needs attention' : 'All on track'
    }
  ];

  const projectsByStatus = [
    { status: 'Planning', count: mockProjects.filter(p => p.status === 'planning').length, color: 'bg-gray-500' },
    { status: 'In Progress', count: mockProjects.filter(p => p.status === 'in_progress').length, color: 'bg-blue-500' },
    { status: 'Review', count: mockProjects.filter(p => p.status === 'review').length, color: 'bg-yellow-500' },
    { status: 'Completed', count: mockProjects.filter(p => p.status === 'completed').length, color: 'bg-green-500' },
    { status: 'On Hold', count: mockProjects.filter(p => p.status === 'on_hold').length, color: 'bg-red-500' }
  ];

  const tasksByPriority = [
    { priority: 'Low', count: mockTasks.filter(t => t.priority === 'low').length, color: 'bg-green-500' },
    { priority: 'Medium', count: mockTasks.filter(t => t.priority === 'medium').length, color: 'bg-yellow-500' },
    { priority: 'High', count: mockTasks.filter(t => t.priority === 'high').length, color: 'bg-orange-500' },
    { priority: 'Critical', count: mockTasks.filter(t => t.priority === 'critical').length, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive insights into team performance and project progress</p>
      </div>

      {/* Key Metrics */}
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
                    stat.name === 'Overdue Tasks' && overdueTasks > 0 
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
        {/* Project Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Projects by Status</h2>
          <div className="space-y-4">
            {projectsByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.status}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${totalProjects > 0 ? (item.count / totalProjects) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Priority Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tasks by Priority</h2>
          <div className="space-y-4">
            {tasksByPriority.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.priority}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${totalTasks > 0 ? (item.count / totalTasks) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Activity Overview</h2>
          <ActivityChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Progress Overview</h2>
          <div className="space-y-6">
            {mockProjects.slice(0, 4).map(project => (
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
                </div>
                <ProgressChart progress={project.progress} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member Performance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Member Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map(member => {
            const memberTasks = mockTasks.filter(task => task.assignedTo === member.id);
            const completedMemberTasks = memberTasks.filter(task => task.status === 'completed').length;
            const completionRate = memberTasks.length > 0 ? (completedMemberTasks / memberTasks.length) * 100 : 0;
            const daysSinceActive = Math.floor((Date.now() - new Date(member.lastActive).getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="font-medium">{completedMemberTasks}/{memberTasks.length}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">{completionRate.toFixed(0)}%</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Active</span>
                    <span className={`font-medium ${
                      daysSinceActive === 0 ? 'text-green-600' :
                      daysSinceActive <= 3 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {daysSinceActive === 0 ? 'Today' : `${daysSinceActive}d ago`}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;