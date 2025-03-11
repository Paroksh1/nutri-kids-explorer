import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogIn, UserPlus, Lock } from 'lucide-react';

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// In a real app, this would be in a database
let users: User[] = [];
let currentUser: User | null = null;

export const getCurrentUser = () => currentUser;
export const isAuthenticated = () => !!currentUser;
export const logout = () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  return true;
};

const AuthForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Load existing users from localStorage
  React.useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
      
      if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success('Logged in successfully!');
        navigate('/onboarding');
      } else {
        toast.error('Invalid email or password');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (users.some(u => u.email === signupEmail)) {
      toast.error('Email already in use');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email: signupEmail,
        password: signupPassword,
        firstName,
        lastName
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      currentUser = newUser;
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      navigate('/onboarding');
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Link 
        to="/" 
        className="absolute -top-12 left-0 flex items-center text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>
      
      <Card className="w-full backdrop-blur-sm bg-white/95 shadow-xl border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            NutriYouth
          </CardTitle>
          <CardDescription className="text-center">
            Your child's personalized nutrition platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LogIn className="h-4 w-4 mr-2" /> Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <UserPlus className="h-4 w-4 mr-2" /> Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    className="bg-white/50"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button type="button" variant="link" size="sm" className="px-0 text-primary">
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    className="bg-white/50"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Lock className="animate-spin h-4 w-4 mr-2" />
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      className="bg-white/50"
                      required 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      className="bg-white/50"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    className="bg-white/50"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    className="bg-white/50"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    className="bg-white/50"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Lock className="animate-spin h-4 w-4 mr-2" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
