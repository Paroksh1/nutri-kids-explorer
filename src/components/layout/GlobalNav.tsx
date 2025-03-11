
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GlobalNavProps {
  className?: string;
}

const GlobalNav: React.FC<GlobalNavProps> = ({ className }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  if (isHomePage) return null;
  
  return (
    <div className={cn("fixed top-4 left-4 z-50", className)}>
      <Link to="/">
        <Button 
          variant="secondary" 
          size="sm" 
          className="bg-white/90 hover:bg-white shadow-md"
        >
          {location.pathname === '/login' ? (
            <>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </>
          ) : (
            <>
              <Home className="h-4 w-4 mr-2" />
              Home
            </>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default GlobalNav;
