
import React, { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Navigate, Link } from 'react-router-dom';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col justify-center p-4 relative">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/30 backdrop-blur-sm">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="max-w-md mx-auto w-full relative z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl transform -rotate-3 scale-105"></div>
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-lg transform rotate-3 scale-105"></div>
          
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8 relative">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-3xl font-bold">N</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Welcome to NutriYouth</h2>
            <p className="text-center text-muted-foreground mb-6">
              Sign in to access your child's nutrition dashboard
            </p>
            
            <AuthForm />
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>By signing in, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm">
            Don't have an account yet? <Link to="/login" className="text-primary font-medium hover:underline">Create Account</Link>
          </p>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute -bottom-10 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute top-20 -right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Login;
