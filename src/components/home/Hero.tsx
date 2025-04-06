
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Calculator as CalculatorIcon, 
  Apple, 
  Salad, 
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4 md:px-6">
        {/* Hero Section */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
              <div className="flex">
                <span className="font-semibold bg-gradient-to-r from-primary to-nutrition-orange text-transparent bg-clip-text">
                  Track Your Diet Diversity in Seconds!
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl font-heading">
                Eat Better, 
                <span className="bg-gradient-to-r from-primary to-nutrition-orange text-transparent bg-clip-text"> Live Healthier</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed font-body">
                A diverse diet is essential for optimal nutrition. Our tool helps you track and improve your dietary diversity for better health outcomes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dietary-diversity">
                <Button className="w-full btn-primary">
                  Calculate Your Score
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/education">
                <Button variant="outline" className="w-full">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="mx-auto lg:mr-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="/images/hero-image.png"
                alt="Diverse healthy foods"
                width={550}
                height={370}
                className="rounded-2xl shadow-xl object-cover z-10 relative"
              />
              
              {/* Floating illustrations */}
              <motion.div 
                className="absolute -top-5 -left-5 bg-nutrition-orange text-white p-3 rounded-xl shadow-lg"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <Apple size={30} />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-5 -right-5 bg-primary text-white p-3 rounded-xl shadow-lg"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              >
                <Salad size={30} />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -right-10 bg-nutrition-blue text-white p-2 rounded-lg shadow-md"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              >
                <Heart size={25} />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* About Diet Diversity Section */}
        <motion.div 
          className="mt-24 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 font-heading">About Diet Diversity</h2>
          <p className="text-lg text-muted-foreground mb-10 font-body">
            Diet diversity refers to the variety of foods consumed across and within food groups. According to the WHO and FAO, 
            consuming a diverse diet is particularly important for children and adolescents to ensure optimal development and growth.
          </p>
        </motion.div>
        
        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <CalculatorIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Calculate Your Score</h3>
            <p className="text-muted-foreground font-body">
              Assess your dietary diversity across different food groups and get an instant score.
            </p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Educational Resources</h3>
            <p className="text-muted-foreground font-body">
              Learn about proper nutrition and the importance of dietary diversity.
            </p>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ y: -10 }}
          >
            <div className="feature-icon">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 font-heading">Health Benefits</h3>
            <p className="text-muted-foreground font-body">
              Understand how a diverse diet contributes to overall health and wellbeing.
            </p>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-primary/10 to-nutrition-orange/10 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Ready to Improve Your Diet?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
            Use our calculator to assess your current dietary diversity and get personalized recommendations to enhance your nutrition.
          </p>
          <Link to="/dietary-diversity">
            <Button size="lg" className="btn-primary">
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
