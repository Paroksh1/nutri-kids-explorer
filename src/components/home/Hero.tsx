
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Apple, ArrowRight, BarChart3, BookOpen } from 'lucide-react';
import { isAuthenticated } from '@/components/auth/AuthForm';

const Hero = () => {
  const isAuthenticated_ = isAuthenticated();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 w-96 h-96 blur-3xl bg-primary/10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 -mb-20 w-72 h-72 blur-3xl bg-secondary/10 rounded-full"></div>
      
      <div className="container px-4 mx-auto relative">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
              Discover Your Optimal Nutrition Balance
            </h1>
          </motion.div>
          
          <motion.div variants={item}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your dietary diversity, learn about nutritional needs, and receive personalized insights for a healthier lifestyle.
            </p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated_ ? (
              <Button asChild size="lg" className="px-8 py-6 rounded-full gap-2 text-lg">
                <Link to="/dietary-diversity">
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate My Diversity Score
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="px-8 py-6 rounded-full gap-2 text-lg">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Button asChild variant="outline" size="lg" className="px-8 py-6 rounded-full gap-2 text-lg">
              <Link to="/education">
                <BookOpen className="h-5 w-5 mr-2" />
                Learn More
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Features section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary/10">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dietary Diversity Score</h3>
            <p className="text-muted-foreground">Calculate your dietary diversity score and track your nutritional intake across different food groups.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary/10">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Nutrition Education</h3>
            <p className="text-muted-foreground">Learn about the importance of diverse eating habits and how they impact your overall health.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-primary/10">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Apple className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Food Group Analysis</h3>
            <p className="text-muted-foreground">Get insights into which food groups you're consuming and where you might need to add more variety.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
