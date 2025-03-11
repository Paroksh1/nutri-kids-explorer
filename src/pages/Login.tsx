
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col justify-center p-4">
      <div className="max-w-md mx-auto w-full">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
