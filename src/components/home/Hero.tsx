
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, BookOpen, Calculator as CalculatorIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
              <div className="flex">
                <span className="font-semibold bg-gradient-to-r from-primary to-green-600 text-transparent bg-clip-text">
                  Promoting better nutrition for children
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="bg-gradient-to-r from-primary to-emerald-600 text-transparent bg-clip-text">Nutri-Kids</span> Explorer
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Helping parents and caregivers track and improve their children's dietary diversity and nutritional outcomes with easy-to-use tools.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/login">
                <Button className="w-full">
                  Get Started
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
          </div>
          <div className="mx-auto lg:mr-0 grid grid-flow-col grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-2 row-span-2"
            >
              <img
                src="/images/hero-image.png"
                alt="Hero Image"
                width={550}
                height={310}
                className="aspect-video rounded-xl object-cover border border-primary/20 shadow-xl"
              />
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/dietary-diversity">
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md hover:shadow-xl transition-all" 
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalculatorIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Dietary Diversity Calculator</h3>
                  <p className="text-muted-foreground">
                    Assess your child's nutritional intake across different food groups
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-primary">
                <span className="text-sm font-medium">Try it now</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>
          
          <Link to="/education">
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">Nutrition Education</h3>
                  <p className="text-muted-foreground">
                    Learn about proper nutrition for children at different ages
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center text-primary">
                <span className="text-sm font-medium">Explore resources</span>
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
