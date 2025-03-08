
import React from 'react';
import DashboardContent from '@/components/dashboard/Dashboard';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // Redirect if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-6">
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
