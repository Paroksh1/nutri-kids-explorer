
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Apple, Calculator, BarChart2, Book, User } from 'lucide-react';
import { isAuthenticated } from '@/components/auth/AuthForm';

const NavMenu: React.FC = () => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl md:text-2xl">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary">N</span>
          </div>
          <span className="font-heading">NutriYouth</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                        to="/dietary-diversity"
                      >
                        <Apple className="h-6 w-6 text-primary" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Dietary Diversity
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Assess your nutritional intake across different food groups and get personalized recommendations.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/dietary-diversity"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <Calculator className="h-4 w-4 mr-2 text-primary" />
                          Nutrition Calculator
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Calculate your dietary diversity score
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/dietary-diversity"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2 text-primary" />
                          BMI Calculator
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Calculate BMI for adults and Z-scores for children
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/education"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none flex items-center">
                          <Book className="h-4 w-4 mr-2 text-primary" />
                          Nutrition Education
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about healthy eating and nutritional needs
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/education">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Learn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          {!isAuth ? (
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/login">Get Started</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/dashboard">
                <User className="h-4 w-4" /> My Dashboard
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
