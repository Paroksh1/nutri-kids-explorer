
import React, { useState, useEffect } from 'react';
import DietaryDiversityCalculator from '@/components/DietaryDiversityCalculator';
import BMICalculator from '@/components/BMICalculator';
import { getCurrentUser } from '@/components/auth/AuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import DashboardNav from '@/components/layout/DashboardNav';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Apple, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DietaryDiversity: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-background/95 pt-16 pb-20">
      <DashboardNav />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-3 transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-primary">Nutrition Assessment Dashboard</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Welcome {currentUser?.firstName || 'User'}! Use our tools to assess your nutritional status and dietary patterns.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link to="/education">
              <Button variant="outline" className="flex items-center gap-2 border-primary/20 hover:bg-primary/5">
                <BookOpen className="h-4 w-4" />
                Nutrition Education
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="diversity" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-10 bg-background/50 p-1 border">
            <TabsTrigger value="diversity" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Calculator className="h-4 w-4 mr-2" />
              Dietary Diversity Assessment
            </TabsTrigger>
            <TabsTrigger value="bmi" className="py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Apple className="h-4 w-4 mr-2" />
              BMI Calculator
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsContent value="diversity" className="mt-0">
              <DietaryDiversityCalculator />
            </TabsContent>
            
            <TabsContent value="bmi" className="mt-0">
              <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                <BMICalculator />
                
                <Card className="w-full max-w-lg p-8 glass-panel bg-white shadow-lg border-0 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Understanding BMI & Z-Score</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-medium text-lg mb-2">Adults (18+ years)</h4>
                      <p className="text-muted-foreground">
                        For adults, we calculate BMI (Body Mass Index) as a measure of body fat based on height and weight.
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-green-50 p-2 rounded">
                          <span className="font-medium text-green-800">Underweight:</span> &lt;18.5
                        </div>
                        <div className="bg-blue-50 p-2 rounded">
                          <span className="font-medium text-blue-800">Normal:</span> 18.5-24.9
                        </div>
                        <div className="bg-amber-50 p-2 rounded">
                          <span className="font-medium text-amber-800">Overweight:</span> 25-29.9
                        </div>
                        <div className="bg-red-50 p-2 rounded">
                          <span className="font-medium text-red-800">Obese:</span> &ge;30
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <h4 className="font-medium text-lg mb-2">Children and Teens</h4>
                      <p className="text-muted-foreground">
                        For those under 18, we calculate BMI and then convert it to a z-score (or percentile) 
                        using age and gender-specific WHO growth standards. This accounts for normal differences in 
                        body fat between boys and girls and at different ages.
                      </p>
                    </div>
                    
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                      <p className="text-sm italic">
                        Note: BMI is a screening tool, not a diagnostic test. A healthcare provider should be 
                        consulted for a complete evaluation of your health status.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
        
        <div className="mt-16 bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Why Nutrition Assessment Matters</h2>
          <p className="mb-6 text-foreground/80">
            Regular nutrition assessment helps identify potential dietary issues before they become serious health problems. 
            By understanding your dietary patterns and body composition, you can make informed decisions about your nutrition.
          </p>
          
          <h3 className="text-lg font-medium mb-3">Benefits of Regular Assessment:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Early detection of nutritional imbalances</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Personalized dietary recommendations</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Tracking progress towards health goals</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Understanding diet and health relationships</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Identification of food sensitivities</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary/5 p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>Support for optimal growth and development</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground bg-muted/20 p-4 rounded-lg">
            Our assessment tools are based on validated nutritional evaluation methodologies including WHO standards for growth assessment and FAO guidelines for dietary diversity.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DietaryDiversity;
