
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
  
  // Don't render on home page or dashboard pages (they have their own nav)
  if (isHomePage || location.pathname.includes('/dashboard') || 
      location.pathname.includes('/meal-plans') || 
      location.pathname.includes('/recommendations')) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("fixed top-4 left-4 z-50", className)}
    >
      <Link to="/">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white/90 hover:bg-white shadow-md"
        >
          {location.pathname === '/login' ? (
            <>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </>
          ) : (
            <>
              <Home className="h-4 w-4 mr-2" />
              Home
            </>
          )}
        </Button>
      </Link>
      
      {!isAuthenticated_ && location.pathname !== '/login' && (
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
