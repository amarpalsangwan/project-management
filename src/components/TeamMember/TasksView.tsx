import React, { useState } from 'react';
import { Search, Filter, Clock, AlertCircle, CheckCircle2, Plus, X } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const TasksView: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  
  const userTasks = tasks.filter(task => task.assignedTo === user?.id);
  
  const filteredTasks = userTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'todo': 'bg-gray-100 text-gray-800 border-gray-300',
      'in_progress': 'bg-blue-100 text-blue-800 border-blue-300',
      'review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'completed': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'border-l-green-400',
      'medium': 'border-l-yellow-400',
      'high': 'border-l-orange-400',
      'critical': 'border-l-red-400'
    };
    return colors[priority as keyof typeof colors] || 'border-l-gray-400';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'todo': Clock,
      'in_progress': Clock,
      'review': AlertCircle,
      'completed': CheckCircle2
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: (tasks.length + 1).toString(),
      ...newTask,
      status: 'todo' as const,
      assignedTo: user?.id || '',
      projectId: '1', // Default project
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setShowAddTask(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600 mt-2">Manage and update your assigned tasks</p>
        </div>
        <button 
          onClick={() => setShowAddTask(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
              <button
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe the task"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tasks..."
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
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{userTasks.length}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userTasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userTasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {userTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map(task => {
          const StatusIcon = getStatusIcon(task.status);
          const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
          
          return (
            <div key={task.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${getPriorityColor(task.priority)} border-l-4`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="mt-1">
                      <StatusIcon className={`h-5 w-5 ${
                        task.status === 'completed' ? 'text-green-600' :
                        task.status === 'in_progress' ? 'text-blue-600' :
                        task.status === 'review' ? 'text-yellow-600' :
                        'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>

                      {task.estimatedHours && (
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Estimated: {task.estimatedHours}h</span>
                          {task.actualHours && <span>Actual: {task.actualHours}h</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <select 
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksView;