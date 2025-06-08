import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard\" replace />;
  }

  if (!role || (role !== 'admin' && role !== 'team_member')) {
    return <Navigate to="/login/admin" replace />;
  }

  return <LoginForm role={role as 'admin' | 'team_member'} />;
};

export default LoginPage;