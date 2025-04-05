
import React, { useState, useEffect } from 'react';
import DietaryDiversityCalculator from '@/components/DietaryDiversityCalculator';
import BMICalculator from '@/components/BMICalculator';
import { getCurrentUser } from '@/components/auth/AuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import DashboardNav from '@/components/layout/DashboardNav';

const DietaryDiversity: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 pt-16">
      <DashboardNav />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Nutrition Assessment Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Welcome {currentUser?.firstName || 'User'}! Use the tools below to assess your nutritional status and dietary patterns.
          </p>
        </div>
        
        <Tabs defaultValue="diversity" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="diversity">Dietary Diversity Assessment</TabsTrigger>
            <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diversity" className="mt-0">
            <DietaryDiversityCalculator />
          </TabsContent>
          
          <TabsContent value="bmi" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
              <BMICalculator />
              
              <Card className="w-full max-w-lg p-6 glass-panel">
                <h3 className="text-xl font-semibold mb-4">Understanding BMI & Z-Score</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Adults (18+ years)</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      For adults, we calculate BMI (Body Mass Index) as a measure of body fat based on height and weight. 
                      BMI categories: Underweight (&lt;18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (&ge;30).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Children and Teens</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      For those under 18, we calculate BMI and then convert it to a z-score (or percentile) 
                      using age and gender-specific WHO growth standards. This accounts for normal differences in 
                      body fat between boys and girls and at different ages.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm italic">
                      Note: BMI is a screening tool, not a diagnostic test. A healthcare provider should be 
                      consulted for a complete evaluation of your health status.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-muted/30 p-6 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">Why Nutrition Assessment Matters</h2>
          <p className="mb-4">
            Regular nutrition assessment helps identify potential dietary issues before they become serious health problems. 
            By understanding your dietary patterns and body composition, you can make informed decisions about your nutrition.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Benefits of Regular Assessment:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Early detection of nutritional imbalances</li>
            <li>Personalized dietary recommendations</li>
            <li>Tracking progress towards health goals</li>
            <li>Better understanding of the relationship between diet and health</li>
            <li>Identification of potential food sensitivities or allergies</li>
            <li>Support for optimal growth and development in children</li>
          </ul>
          
          <p className="text-sm text-muted-foreground">
            Our assessment tools are based on validated nutritional evaluation methodologies including WHO standards for growth assessment and FAO guidelines for dietary diversity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietaryDiversity;
