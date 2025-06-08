import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import AdminDashboard from '../components/Admin/Dashboard';
import ProjectsView from '../components/Admin/ProjectsView';
import EmployeesView from '../components/Admin/EmployeesView';
import AnalyticsView from '../components/Admin/AnalyticsView';
import CalendarView from '../components/Admin/CalendarView';
import SettingsView from '../components/Admin/SettingsView';
import TeamMemberDashboard from '../components/TeamMember/Dashboard';
import TasksView from '../components/TeamMember/TasksView';
import TeamMemberProjectsView from '../components/TeamMember/ProjectsView';
import ActivityChart from '../components/Charts/ActivityChart';
import TeamMemberSettingsView from '../components/TeamMember/SettingsView';

const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login/admin" replace />;
  }

  const renderContent = () => {
    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'projects':
          return <ProjectsView />;
        case 'employees':
          return <EmployeesView />;
        case 'analytics':
          return <AnalyticsView />;
        case 'calendar':
          return <CalendarView />;
        case 'settings':
          return <SettingsView />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <TeamMemberDashboard />;
        case 'tasks':
          return <TasksView />;
        case 'projects':
          return <TeamMemberProjectsView />;
        case 'activity':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Activity</h1>
                <p className="text-gray-600 mt-2">Track your task update frequency</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <ActivityChart userId={user.id} />
              </div>
            </div>
          );
        case 'settings':
          return <TeamMemberSettingsView />;
        default:
          return <TeamMemberDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;