
import React from 'react';
import DashboardContent from '@/components/dashboard/Dashboard';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import DashboardNav from '@/components/layout/DashboardNav';

const Dashboard: React.FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <DashboardNav />
      <div className="container mx-auto px-4 pt-24 pb-6">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
