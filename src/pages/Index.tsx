
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRightCircle, 
  BarChart3, 
  Book, 
  Calendar, 
  MessageSquareHeart, 
  PieChart, 
  Salad
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 space-y-6"
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Better Nutrition for Children
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">
                Enhance Your Child's Health Through <span className="text-secondary">Dietary Diversity</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
                Discover how a diverse diet can dramatically improve your child's growth, development, and long-term health outcomes.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg group">
                  <Link to="/dietary-diversity">
                    Try Our Diversity Calculator
                    <ArrowRightCircle className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Children enjoying healthy food" 
                  className="w-full h-auto rounded-2xl shadow-lg relative z-10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Dietary Diversity Matters</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A varied diet ensures your child gets all essential nutrients needed for optimal growth and development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-background border-primary/10 hover:shadow-lg transition-all">
                <CardContent className="pt-6 p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <Salad className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Complete Nutrition</h3>
                  <p className="text-foreground/80">
                    Different foods contain different nutrients. Eating a variety ensures your child gets all essential vitamins, minerals, and macronutrients.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <Card className="h-full bg-gradient-to-br from-secondary/5 to-background border-secondary/10 hover:shadow-lg transition-all">
                <CardContent className="pt-6 p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                    <BarChart3 className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Improved Growth</h3>
                  <p className="text-foreground/80">
                    Children with diverse diets show better physical growth, cognitive development, and immune function throughout childhood.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="feature-card"
            >
              <Card className="h-full bg-gradient-to-br from-primary/5 to-background border-primary/10 hover:shadow-lg transition-all">
                <CardContent className="pt-6 p-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <MessageSquareHeart className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Lifelong Habits</h3>
                  <p className="text-foreground/80">
                    Early exposure to varied foods helps children develop healthy eating preferences that can last into adulthood.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Platform Works</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Track, analyze, and improve your child's dietary diversity with our easy-to-use tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 z-10 relative">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div className="absolute top-8 left-16 h-0.5 w-24 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Meals</h3>
              <p className="text-foreground/70">Enter what your child ate in the last 24 hours</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 z-10 relative">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <div className="absolute top-8 left-16 h-0.5 w-24 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyze Diet</h3>
              <p className="text-foreground/70">Get a detailed breakdown of food groups consumed</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 z-10 relative">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div className="absolute top-8 left-16 h-0.5 w-24 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Recommendations</h3>
              <p className="text-foreground/70">Receive personalized suggestions for improvement</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-foreground/70">Monitor improvements in diet quality over time</p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/dietary-diversity">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Nutrition Tools</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive solutions to help you monitor and improve your child's nutrition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <Card className="overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-white/90" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Dietary Diversity Calculator</h3>
                  <p className="text-foreground/70 mb-4">
                    Assess the variety of food groups in your child's diet and get a diversity score.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/dietary-diversity">Try It Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <Card className="overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-r from-secondary/30 to-primary/30 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-white/90" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Meal Planning</h3>
                  <p className="text-foreground/70 mb-4">
                    Create balanced meal plans that ensure optimal nutrition and variety.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/meal-plans">Explore Plans</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <Card className="overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
                  <Book className="h-16 w-16 text-white/90" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Educational Resources</h3>
                  <p className="text-foreground/70 mb-4">
                    Learn about child nutrition, food groups, and best practices for healthy eating.
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/education">View Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about dietary diversity and our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">What is a good diversity score?</h3>
              <p className="text-foreground/80">
                A score of 5 or higher (out of 9 food groups) is generally considered good dietary diversity. Higher scores indicate a more nutritionally adequate diet.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">How often should I check my diversity score?</h3>
              <p className="text-foreground/80">
                We recommend checking weekly or monthly to track improvements in your dietary patterns over time.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">Is this suitable for all age groups?</h3>
              <p className="text-foreground/80">
                Yes! Our calculator works for children, adolescents, and adults. For children, we also provide age-appropriate Z-scores.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">How accurate is the food group identification?</h3>
              <p className="text-foreground/80">
                Our system recognizes common foods, including regional and traditional items. If a food isn't recognized, you can manually select its food group.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Child's Nutrition?</h2>
              <p className="text-lg mb-8">
                Join thousands of parents who are enhancing their children's health through better dietary choices.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/dietary-diversity">Try It Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
