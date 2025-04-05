
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogIn, BookOpen, Calculator } from 'lucide-react';
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("fixed bottom-4 left-0 right-0 z-50 flex justify-center", className)}
    >
      <div className="flex gap-2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-primary/10">
        <Link to="/">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full hover:bg-primary/10"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
        
        {!isAuthenticated_ && (
          <Link to="/login">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full hover:bg-primary/10"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        )}
        
        <Link to="/dietary-diversity">
          <Button 
            variant={location.pathname === '/dietary-diversity' ? 'default' : 'ghost'}
            size="sm" 
            className={cn(
              "rounded-full",
              location.pathname !== '/dietary-diversity' && "hover:bg-primary/10"
            )}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Diversity Calculator
          </Button>
        </Link>
        
        <Link to="/education">
          <Button 
            variant={location.pathname === '/education' ? 'default' : 'ghost'}
            size="sm" 
            className={cn(
              "rounded-full",
              location.pathname !== '/education' && "hover:bg-primary/10"
            )}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Education
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default GlobalNav;
