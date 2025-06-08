import React from 'react';
import { Calendar, Users, Target, Clock } from 'lucide-react';
import { mockProjects, mockTasks } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import ProgressChart from '../Charts/ProgressChart';

const TeamMemberProjectsView: React.FC = () => {
  const { user } = useAuth();
  const userProjects = mockProjects.filter(project => project.teamMembers.includes(user?.id || ''));

  const getStatusColor = (status: string) => {
    const colors = {
      'planning': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'on_hold': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getProjectTasks = (projectId: string) => {
    return mockTasks.filter(task => task.projectId === projectId && task.assignedTo === user?.id);
  };

  const getDaysUntilDeadline = (endDate: string) => {
    const deadline = new Date(endDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-2">Projects you're currently working on</p>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userProjects.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userProjects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userProjects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Tasks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockTasks.filter(t => t.assignedTo === user?.id).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userProjects.map(project => {
          const projectTasks = getProjectTasks(project.id);
          const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
          const daysUntilDeadline = getDaysUntilDeadline(project.endDate);
          
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                  </div>
                  <ProgressChart progress={project.progress} size="sm" />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{project.progress}%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">My Tasks</span>
                    <span className="font-medium text-gray-900">{completedTasks}/{projectTasks.length}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      Due {new Date(project.endDate).toLocaleDateString()}
                      {daysUntilDeadline >= 0 && (
                        <span className={`ml-2 ${
                          daysUntilDeadline <= 7 ? 'text-red-600 font-medium' :
                          daysUntilDeadline <= 14 ? 'text-orange-600' :
                          'text-gray-500'
                        }`}>
                          ({daysUntilDeadline} days left)
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{project.teamMembers.length} team members</span>
                  </div>

                  {project.client && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Client:</span>
                      <span className="ml-2">{project.client}</span>
                    </div>
                  )}
                </div>

                {/* Project Tasks Preview */}
                {projectTasks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">My Tasks in this Project</h4>
                    <div className="space-y-2">
                      {projectTasks.slice(0, 3).map(task => (
                        <div key={task.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 truncate">{task.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            task.status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                      {projectTasks.length > 3 && (
                        <p className="text-xs text-gray-500">+{projectTasks.length - 3} more tasks</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {userProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Projects Assigned</h3>
          <p className="text-gray-600">You haven't been assigned to any projects yet. Contact your admin to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TeamMemberProjectsView;