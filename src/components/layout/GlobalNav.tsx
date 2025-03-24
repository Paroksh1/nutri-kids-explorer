
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { isAuthenticated } from '@/components/auth/AuthForm';

interface GlobalNavProps {
  className?: string;
}

const GlobalNav: React.FC<GlobalNavProps> = ({ className }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthenticated_ = isAuthenticated();
  
  // Only don't render on home page (it already has its own nav)
  if (isHomePage) {
    return null;
  }
  
  // Don't show on login page (it already has back button in navbar)
  if (location.pathname === '/login') {
    return null;
  }
  
  // Different nav for dashboard pages (they have their own nav)
  const isDashboardPage = location.pathname.includes('/dashboard') || 
                          location.pathname.includes('/meal-plans') || 
                          location.pathname.includes('/recommendations');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("fixed bottom-4 left-4 z-50", className)}
    >
      <Link to="/">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white/90 hover:bg-white shadow-md"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </Link>
      
      {!isAuthenticated_ && (
        <Link to="/login" className="ml-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </Link>
      )}
    </motion.div>
  );
};

export default GlobalNav;
