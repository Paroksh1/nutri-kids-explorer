
import React from 'react';
import ChildProfileForm from '@/components/onboarding/ChildProfileForm';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  // Redirect if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ChildProfileForm />
      </div>
    </div>
  );
};

export default Onboarding;
