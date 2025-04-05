
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, Apple, Calculator, BookOpen, User } from 'lucide-react';
import { isAuthenticated } from '@/components/auth/AuthForm';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  authRequired?: boolean;
}

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { 
    title: 'Diversity Calculator', 
    href: '/dietary-diversity',
    icon: <Calculator className="h-4 w-4 mr-2" />
  },
  { 
    title: 'Education', 
    href: '/education',
    icon: <BookOpen className="h-4 w-4 mr-2" /> 
  },
  { 
    title: 'Dashboard', 
    href: '/dashboard',
    icon: <User className="h-4 w-4 mr-2" />,
    authRequired: true
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated_ = isAuthenticated();

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

  const filteredNavItems = navItems.filter(item => 
    !item.authRequired || (item.authRequired && isAuthenticated_)
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-10',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary font-bold text-xl md:text-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-bold">N</span>
          </div>
          <span className="font-heading">NutriDiversity</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredNavItems.map((item) => (
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
          {!isAuthenticated_ ? (
            <Button asChild className="bg-primary hover:bg-primary/90 transition-colors">
              <Link to="/login">Sign In</Link>
            </Button>
          ) : (
            <Button asChild className="bg-primary hover:bg-primary/90 transition-colors">
              <Link to="/dashboard">My Account</Link>
            </Button>
          )}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            {filteredNavItems.map((item) => (
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
            {!isAuthenticated_ ? (
              <Button asChild className="bg-primary hover:bg-primary/90 transition-colors w-full mt-4">
                <Link to="/login">Sign In</Link>
              </Button>
            ) : (
              <Button asChild className="bg-primary hover:bg-primary/90 transition-colors w-full mt-4">
                <Link to="/dashboard">My Account</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
