
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  // Redirect if already authenticated
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex flex-col justify-center p-4">
      <div className="max-w-md mx-auto w-full">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
