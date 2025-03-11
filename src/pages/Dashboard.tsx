
import React from 'react';
import DashboardContent from '@/components/dashboard/Dashboard';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-primary/10">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
