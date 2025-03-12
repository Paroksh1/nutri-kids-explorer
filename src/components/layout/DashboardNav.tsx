
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User, Apple, Activity, Calendar, BarChart3 } from 'lucide-react';
import { getCurrentUser, logout } from '../auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const DashboardNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { title: 'Dashboard', href: '/dashboard', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { title: 'Meal Plans', href: '/meal-plans', icon: <Apple className="h-4 w-4 mr-2" /> },
    { title: 'Recommendations', href: '/recommendations', icon: <Activity className="h-4 w-4 mr-2" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-10',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm'
          : 'bg-white/50 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary font-bold text-xl md:text-2xl"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary">N</span>
          </div>
          <span className="font-heading">NutriYouth</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'text-foreground/80 hover:text-primary font-medium transition-colors flex items-center',
                location.pathname === item.href && 'text-primary font-semibold'
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          
          <div className="flex items-center ml-4">
            <div className="flex items-center border-l border-border pl-4">
              <Button 
                variant="ghost" 
                className="flex items-center text-sm gap-2 hover:bg-primary/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-foreground/80 hover:text-primary py-2 font-medium transition-colors flex items-center',
                  location.pathname === item.href && 'text-primary font-semibold'
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              className="flex items-center justify-start text-sm gap-2 hover:bg-primary/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default DashboardNav;
