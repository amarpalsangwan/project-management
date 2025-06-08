import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Calendar, Users, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import ProgressChart from '../Charts/ProgressChart';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import ProjectDetailsModal from './ProjectDetailsModal';

const ProjectsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [viewingProject, setViewingProject] = useState<any>(null);
  const [projects, setProjects] = useState(mockProjects);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: (projects.length + 1).toString(),
      tasks: []
    };
    setProjects([...projects, newProject]);
    setShowCreateProject(false);
  };

  const handleEditProject = (projectData: any) => {
    setProjects(projects.map(p => p.id === projectData.id ? projectData : p));
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage and track all your projects</p>
        </div>
        <button 
          onClick={() => setShowCreateProject(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                    <button
                      onClick={() => setViewingProject(project)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{project.teamMembers.length} team members</span>
                </div>
                {project.budget && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>${project.budget.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((memberId, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                      >
                        {memberId}
                      </div>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setViewingProject(project)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showCreateProject && (
        <CreateProjectModal 
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {editingProject && (
        <EditProjectModal 
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={handleEditProject}
        />
      )}

      {viewingProject && (
        <ProjectDetailsModal 
          project={viewingProject}
          onClose={() => setViewingProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsView;