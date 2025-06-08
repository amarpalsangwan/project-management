import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Calendar, MoreHorizontal } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

const EmployeesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const teamMembers = mockUsers.filter(user => user.role === 'team_member');

  const filteredEmployees = teamMembers.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getActivityStatus = (lastActive: string) => {
    const daysSinceActive = Math.floor((Date.now() - new Date(lastActive).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceActive === 0) return { color: 'bg-green-500', text: 'Active' };
    if (daysSinceActive <= 3) return { color: 'bg-yellow-500', text: 'Recent' };
    return { color: 'bg-red-500', text: 'Inactive' };
  };

  const departments = [...new Set(teamMembers.map(user => user.department).filter(Boolean))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-2">Manage your team and track their activity</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {teamMembers.filter(u => getActivityStatus(u.lastActive).text === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{departments.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Filter className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {teamMembers.filter(u => getActivityStatus(u.lastActive).text === 'Inactive').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => {
          const activity = getActivityStatus(employee.lastActive);
          const daysSinceJoined = Math.floor((Date.now() - new Date(employee.joinDate).getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={employee.avatar}
                        alt={employee.name}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${activity.color} rounded-full border-2 border-white`}></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.department}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {daysSinceJoined} days ago</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                      <span className="text-sm text-gray-600">{activity.text}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Profile
                    </button>
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

export default EmployeesView;