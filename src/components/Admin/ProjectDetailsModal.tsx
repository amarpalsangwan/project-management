import React from 'react';
import { X, Calendar, Users, DollarSign, Clock, Target } from 'lucide-react';
import { mockUsers, mockTasks } from '../../data/mockData';
import ProgressChart from '../Charts/ProgressChart';

interface ProjectDetailsModalProps {
  project: any;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const projectTasks = mockTasks.filter(task => task.projectId === project.id);
  const teamMembers = mockUsers.filter(user => project.teamMembers.includes(user.id));

  const getStatusColor = (status: string) => {
    const colors = {
      'planning': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'on_hold': 'bg-red-100 text-red-800',
      'todo': 'bg-gray-100 text-gray-800'
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

  const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
  const totalTasks = projectTasks.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Progress</p>
                  <p className="text-2xl font-bold text-blue-900">{project.progress}%</p>
                </div>
                <ProgressChart progress={project.progress} size="sm" color="blue" />
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Tasks</p>
                  <p className="text-2xl font-bold text-emerald-900">{completedTasks}/{totalTasks}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Team Size</p>
                  <p className="text-2xl font-bold text-orange-900">{teamMembers.length}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Budget</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {project.budget ? `$${(project.budget / 1000).toFixed(0)}K` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="text-gray-900">{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="text-gray-900">{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                  {project.client && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Client:</span>
                      <span className="text-gray-900">{project.client}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                <div className="space-y-3">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Tasks</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {projectTasks.length > 0 ? (
                  projectTasks.map(task => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No tasks assigned to this project yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;