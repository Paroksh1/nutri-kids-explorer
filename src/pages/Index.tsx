
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, Apple, Activity, Baby, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '@/components/auth/AuthForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:pt-40 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="flex flex-col"
            >
              <div className="inline-flex mb-4">
                <span className="badge bg-primary/10 text-primary px-3 py-1 rounded-full">
                  Youth Nutrition Assessment
                </span>
              </div>
              
              <h1 className="heading-xl text-foreground">
                Optimize Your Child's
                <span className="text-primary block mt-1">Nutritional Health</span>
              </h1>
              
              <p className="paragraph mt-6 max-w-lg">
                Our precise calculator provides personalized nutrition insights for children and teens under 18, helping parents and healthcare providers ensure optimal growth and development.
              </p>
              
              <div className="flex flex-col sm:flex-row mt-8 gap-4">
                {isAuthenticated() ? (
                  <Link to="/dashboard">
                    <Button 
                      className="bg-primary button-hover"
                      size="lg"
                    >
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button 
                        className="bg-primary button-hover"
                        size="lg"
                      >
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-primary text-primary hover:bg-primary/5"
                      onClick={() => {
                        const educationSection = document.getElementById('education-section');
                        if (educationSection) {
                          educationSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto lg:ml-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse-scale blur-2xl" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-6 p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <Apple className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Balanced Nutrition</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                          <Activity className="h-6 w-6 text-secondary" />
                        </div>
                        <span className="text-sm font-medium">Growth Tracking</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                          <Baby className="h-6 w-6 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium">Pediatric Focus</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Health Insights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <ArrowDown className="h-8 w-8 text-primary/50 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-background/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg">Why Choose NutriYouth?</h2>
            <p className="paragraph mt-3 max-w-2xl mx-auto">
              Our platform offers comprehensive nutrition tools specifically designed for children and teens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-6 rounded-lg shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Meal Plans</h3>
              <p className="text-muted-foreground">
                Custom meal recommendations based on your child's age, weight, height, and dietary preferences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nutritional Analysis</h3>
              <p className="text-muted-foreground">
                Track macronutrients, vitamins, and minerals to ensure balanced nutrition for optimal growth.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-lg shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Monitoring</h3>
              <p className="text-muted-foreground">
                Track your child's growth and development over time with easy-to-understand charts and metrics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="heading-lg mb-6">Ready to Optimize Your Child's Nutrition?</h2>
            <p className="paragraph max-w-2xl mx-auto mb-8">
              Create a free account today to access personalized meal plans, nutritional tracking, and expert recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated() ? (
                <Link to="/dashboard">
                  <Button 
                    className="bg-primary button-hover"
                    size="lg"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button 
                      className="bg-primary button-hover"
                      size="lg"
                    >
                      <LogIn className="mr-2 h-4 w-4" /> Create Account
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-primary text-primary hover:bg-primary/5"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
