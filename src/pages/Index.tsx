
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, BarChart2, Book, Calculator, Check } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div>
      <header className="bg-gradient-to-r from-primary/10 to-secondary/10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Dietary Diversity Calculator</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Assess your dietary diversity and improve your nutritional health
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/education">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Calculate Your Dietary Diversity Score</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter what you ate yesterday to assess how diverse your diet is and receive personalized recommendations.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="glass-panel">
              <CardContent className="p-6">
                <div className="text-center space-y-4 py-8">
                  <h3 className="text-2xl font-bold">Track Your Nutritional Intake</h3>
                  <p className="text-muted-foreground">
                    Sign up or log in to access our dietary diversity calculator and get personalized recommendations.
                  </p>
                  <Button asChild size="lg" className="mt-4">
                    <Link to="/login">Sign Up / Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive tool to evaluate and improve your nutritional intake
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
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
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                  Visual Results
                </CardTitle>
                <CardDescription>Visualize your diet's diversity through intuitive charts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Clear, interactive graphs of your food group consumption</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Track progress over time with saved results</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Export and share your assessment data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Apple className="h-5 w-5 mr-2 text-primary" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>Get tailored advice to improve your diet</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Targeted suggestions for missing food groups</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Practical tips for increasing dietary diversity</span>
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
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Why Dietary Diversity Matters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consuming foods from a variety of groups ensures you get the full range of nutrients needed for optimal health
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p>
                    Dietary diversity refers to the variety of foods consumed across and within food groups. 
                    It's an essential aspect of nutrition that helps ensure you're getting all the 
                    necessary nutrients your body needs.
                  </p>
                  
                  <h3>Benefits of a diverse diet include:</h3>
                  <ul>
                    <li>Better overall nutrient adequacy</li>
                    <li>Reduced risk of malnutrition and deficiencies</li>
                    <li>Improved growth and development in children</li>
                    <li>Enhanced immune function</li>
                    <li>Reduced risk of chronic diseases</li>
                    <li>Greater exposure to beneficial plant compounds</li>
                  </ul>
                  
                  <p>
                    The Dietary Diversity Score (DDS) is a valuable tool that measures the nutritional quality 
                    of your diet based on consumption across 9 essential food groups. A higher score indicates 
                    a more diverse and nutritionally adequate diet.
                  </p>
                  
                  <p>
                    Use our calculator to assess your dietary diversity and get personalized recommendations 
                    for improving your nutritional intake.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-center">
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
