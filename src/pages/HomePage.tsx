import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, BarChart3, CheckSquare, Users, FolderOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ProjectFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Login
              </Link>
              <Link
                to="/login/team_member"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Team Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Project Management
            <span className="text-blue-600"> Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Streamline your project workflows, track progress, and manage team activities with our comprehensive project management solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login/admin"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <Shield className="h-5 w-5 mr-2" />
              Admin Dashboard
            </Link>
            <Link
              to="/login/team_member"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <User className="h-5 w-5 mr-2" />
              Team Member Access
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Powerful features for both administrators and team members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Admin Features */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Features</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dashboard & Analytics</h4>
                    <p className="text-gray-600">Comprehensive overview of projects, team performance, and progress tracking</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Employee Management</h4>
                    <p className="text-gray-600">Add, manage, and track team members with activity monitoring</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Project Control</h4>
                    <p className="text-gray-600">Full CRUD operations, project assignment, and progress monitoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member Features */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Member Features</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Task Management</h4>
                    <p className="text-gray-600">Update task status, track progress, and manage personal workload</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Activity Tracking</h4>
                    <p className="text-gray-600">Visual charts showing task update frequency with color-coded status indicators</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Personal Dashboard</h4>
                    <p className="text-gray-600">Isolated profile view with personalized task and project information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try the Demo</h2>
            <p className="text-xl text-gray-600">Use these credentials to explore the application</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Admin Access</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> admin@projectflow.com</p>
                <p><span className="font-medium">Password:</span> password</p>
              </div>
              <Link
                to="/login/admin"
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login as Admin
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Member Access</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> michael@projectflow.com</p>
                <p><span className="font-medium">Password:</span> password</p>
              </div>
              <Link
                to="/login/team_member"
                className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login as Team Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">ProjectFlow</h3>
          <p className="text-gray-600">Streamline your project management with powerful tools and intuitive design.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;