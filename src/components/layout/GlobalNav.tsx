
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, PieChart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isAuthenticated } from '../auth/AuthForm';

const GlobalNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isLoggedIn = isAuthenticated();

  // Hide nav on the following pages
  const hideNavOnPages = ['/', '/login', '/signup', '/onboarding'];
  if (hideNavOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-background border-t p-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "flex-col items-center rounded-md h-16 px-2",
            isActive('/dashboard') && "bg-primary/10 text-primary"
          )}
          asChild
        >
          <Link to={isLoggedIn ? '/dashboard' : '/login'}>
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "flex-col items-center rounded-md h-16 px-2",
            isActive('/education') && "bg-primary/10 text-primary"
          )}
          asChild
        >
          <Link to="/education">
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs">Education</span>
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "flex-col items-center rounded-md h-16 px-2",
            isActive('/dietary-diversity') && "bg-primary/10 text-primary"
          )}
          asChild
        >
          <Link to={isLoggedIn ? '/dietary-diversity' : '/login'}>
            <PieChart className="h-5 w-5 mb-1" />
            <span className="text-xs">Diversity</span>
          </Link>
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className={cn(
            "flex-col items-center rounded-md h-16 px-2",
            isActive('/profile') && "bg-primary/10 text-primary"
          )}
          asChild
        >
          <Link to={isLoggedIn ? '/profile' : '/login'}>
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GlobalNav;
