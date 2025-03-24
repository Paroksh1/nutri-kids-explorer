
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Apple, 
  BarChart2, 
  Book, 
  Calculator, 
  Check, 
  Salad, 
  Brain, 
  Activity,
  Zap,
  ArrowRight,
  Users,
  Star
} from 'lucide-react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationMenu />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary/5 to-secondary/5 pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                Eat <span className="text-primary">Smarter</span>, <br />
                Live <span className="text-primary">Better</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover your dietary diversity score and unlock personalized nutrition recommendations for a healthier lifestyle.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/login">Get Started Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/education">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Trusted by <span className="font-medium">5,000+</span> nutritionists and families</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-50"></div>
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl flex items-center">
                      <Apple className="h-5 w-5 mr-2 text-primary" />
                      Dietary Diversity Quiz
                    </CardTitle>
                    <CardDescription>
                      Assess your nutritional intake in minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="rounded-full p-1 bg-green-100 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Track your food intake across 9 essential groups</span>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full p-1 bg-green-100 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Get personalized recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full p-1 bg-green-100 mr-2 mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span>Monitor your nutritional progress over time</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90">
                      <Link to="/login">
                        Take the Assessment <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              {/* Floating elements for visual effect */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/15 animate-pulse delay-150"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      </header>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Nutrition Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers powerful tools to assess and improve your nutritional intake, backed by scientific research.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-primary" />
                  Dietary Diversity Score
                </CardTitle>
                <CardDescription>Calculate your dietary diversity based on 9 essential food groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Analyze consumption across 9 major food groups</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Receive instant scoring and categorization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Compare your score to recommended standards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                  Comprehensive Assessment
                </CardTitle>
                <CardDescription>Analyze key health metrics for all ages</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>BMI calculation for adults</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Age-appropriate Z-scores for children</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Visual progress tracking over time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Smart Recommendations
                </CardTitle>
                <CardDescription>Get tailored advice to improve your diet</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>AI-powered nutritional suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Personalized food group recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Educational resources on optimal nutrition</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with our nutrition assessment tools in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">Sign up in seconds to access all our nutrition assessment tools</p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Salad className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Diet</h3>
              <p className="text-muted-foreground">Log what you ate yesterday to calculate your dietary diversity</p>
            </div>
            
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-muted-foreground">Receive personalized recommendations to improve your nutrition</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/login">Start Your Assessment</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Dietary Diversity Matters */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Dietary Diversity Matters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Consuming foods from a variety of groups ensures you get the full range of nutrients needed for optimal health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <Card className="md:col-span-2 glass-panel">
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-lg">
                    Dietary diversity refers to the variety of foods consumed across and within food groups. 
                    It's an essential aspect of nutrition that helps ensure you're getting all the 
                    necessary nutrients your body needs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-xl font-semibold flex items-center mb-4">
                        <Activity className="h-5 w-5 mr-2 text-primary" />
                        Benefits of a diverse diet
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Better overall nutrient adequacy</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Reduced risk of malnutrition and deficiencies</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Improved growth and development in children</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Enhanced immune function</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold flex items-center mb-4">
                        <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                        Understanding the Score
                      </h3>
                      <p>
                        The Dietary Diversity Score (DDS) is a valuable tool that measures the nutritional quality 
                        of your diet based on consumption across 9 essential food groups. A higher score indicates 
                        a more diverse and nutritionally adequate diet.
                      </p>
                      <p className="mt-4">
                        Use our calculator to assess your dietary diversity and get personalized recommendations 
                        for improving your nutritional intake.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button asChild size="lg">
                    <Link to="/login">
                      <Book className="mr-2 h-5 w-5" /> Sign Up to Get Started
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
