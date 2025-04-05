
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRightCircle, 
  Book, 
  PieChart, 
  Salad,
  Stars,
  Sparkles,
  Apple,
  BarChart3
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 bg-gradient-to-b from-primary/5 via-secondary/5 to-background">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 space-y-7"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Better Nutrition for Everyone
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover the Power of <span className="text-primary">Dietary Diversity</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
                Unlock better health through a more diverse and balanced diet. Our tools make it simple to assess and improve your nutritional intake.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg group bg-primary hover:bg-primary/90">
                  <Link to="/dietary-diversity">
                    Try Our Diversity Calculator
                    <ArrowRightCircle className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg border-primary/20 hover:bg-primary/5">
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
                <div className="absolute -top-8 -left-8 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-background to-muted rounded-3xl p-1 shadow-xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Diverse healthy foods" 
                    className="w-full h-auto rounded-2xl shadow-md"
                  />
                  <div className="absolute -top-6 -right-6 bg-white rounded-full p-3 shadow-lg">
                    <div className="bg-green-100 rounded-full p-2">
                      <Salad className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-full p-3 shadow-lg">
                    <div className="bg-blue-100 rounded-full p-2">
                      <PieChart className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-secondary/20 rounded-full text-sm font-medium text-secondary-foreground mb-4"
            >
              Why It Matters
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Dietary Diversity</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A varied diet ensures you get all essential nutrients needed for optimal health and wellbeing.
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
              <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transform rotate-3">
                    <Salad className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Complete Nutrition</h3>
                  <p className="text-foreground/80">
                    Different foods contain different nutrients. Eating a variety ensures you get all essential vitamins, minerals, and macronutrients your body needs.
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
              <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 transform -rotate-3">
                    <BarChart3 className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Improved Health</h3>
                  <p className="text-foreground/80">
                    Studies show that people with diverse diets have better health outcomes, stronger immune systems, and reduced risk of chronic diseases.
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
              <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transform rotate-3">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Lifelong Benefits</h3>
                  <p className="text-foreground/80">
                    Early exposure to varied foods helps develop healthy eating preferences that can last into adulthood and promote longevity.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4"
            >
              Simple Process
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Platform Works</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Track, analyze, and improve your dietary diversity with our easy-to-use tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10 relative shadow-md">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <div className="absolute top-10 left-20 h-0.5 w-32 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Meals</h3>
              <p className="text-foreground/70">Enter what you ate in the last 24 hours, including meals and snacks from anywhere in the world.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10 relative shadow-md">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <div className="absolute top-10 left-20 h-0.5 w-32 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze Diet</h3>
              <p className="text-foreground/70">Our system automatically identifies food groups and calculates your dietary diversity score.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10 relative shadow-md">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <div className="absolute top-10 left-20 h-0.5 w-32 bg-primary/20 hidden lg:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Insights</h3>
              <p className="text-foreground/70">Receive personalized recommendations based on your current dietary patterns.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10 relative shadow-md">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Improve Health</h3>
              <p className="text-foreground/70">Make small, sustainable changes to enhance your dietary diversity and overall health.</p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90">
              <Link to="/dietary-diversity">Start Your Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-secondary/20 rounded-full text-sm font-medium text-secondary-foreground mb-4"
            >
              Our Tools
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nutrition Assessment Tools</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Comprehensive solutions to help you monitor and improve your nutrition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-52 bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
                  <PieChart className="h-20 w-20 text-white/90" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-3">Dietary Diversity Calculator</h3>
                  <p className="text-foreground/70 mb-6">
                    Assess the variety of food groups in your diet and get a diversity score with personalized recommendations.
                  </p>
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
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
              <Card className="overflow-hidden h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-52 bg-gradient-to-r from-secondary/30 to-primary/30 flex items-center justify-center">
                  <Book className="h-20 w-20 text-white/90" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-3">Educational Resources</h3>
                  <p className="text-foreground/70 mb-6">
                    Learn about nutrition, food groups, and best practices for healthy eating through our educational content.
                  </p>
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
                    <Link to="/education">View Resources</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4"
            >
              Questions & Answers
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Find answers to common questions about dietary diversity and our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">What is a good diversity score?</h3>
              <p className="text-foreground/80">
                A score of 5 or higher (out of 9 food groups) is generally considered good dietary diversity. Higher scores indicate a more nutritionally adequate diet that provides a wider range of essential nutrients.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">How often should I check my diversity score?</h3>
              <p className="text-foreground/80">
                We recommend checking weekly or monthly to track improvements in your dietary patterns over time. Regular assessment helps you make gradual adjustments for better long-term health outcomes.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">Is this suitable for all age groups?</h3>
              <p className="text-foreground/80">
                Yes! Our calculator works for children, adolescents, and adults. We provide age-appropriate recommendations and nutritional insights based on your specific profile.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-3">How accurate is the food group identification?</h3>
              <p className="text-foreground/80">
                Our system recognizes foods from all around the world, including regional and traditional dishes. If a food isn't automatically recognized, you can manually select its food group for accurate assessment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 mb-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Nutrition?</h2>
                <p className="text-lg mb-8">
                  Join thousands of people who are enhancing their health through better dietary choices.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="text-lg bg-primary hover:bg-primary/90">
                    <Link to="/dietary-diversity">
                      <Apple className="mr-2 h-5 w-5" />
                      Try It Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg border-primary/20 hover:bg-primary/5">
                    <Link to="/education">Learn More</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
