
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
    </motion.div>
  );
};

export default Index;
