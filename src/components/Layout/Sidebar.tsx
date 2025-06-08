import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  CheckSquare, 
  BarChart3,
  Calendar,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const teamMemberMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', name: 'My Tasks', icon: CheckSquare },
    { id: 'projects', name: 'My Projects', icon: FolderOpen },
    { id: 'activity', name: 'Activity', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : teamMemberMenuItems;

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${
                  activeTab === item.id ? 'text-blue-700' : 'text-gray-400'
                }`} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;