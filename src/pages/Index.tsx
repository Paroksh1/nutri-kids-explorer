
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NavMenu from '@/components/layout/NavigationMenu';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavMenu />
      
      <div className="container mx-auto pt-32 pb-16 px-4">
        <section className="mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary">
                Improve Your Child's Nutrition with Diversity
              </h1>
              <p className="text-lg md:text-xl text-foreground/80">
                Discover how diverse eating habits can enhance your child's health, development, and wellbeing.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/dietary-diversity">Try Dietary Diversity Calculator</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/placeholder.svg" 
                alt="Healthy food variety" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
        
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What is Dietary Diversity?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/5 to-background shadow-md hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Varied Nutrition</h3>
                <p className="text-foreground/80">
                  Eating a variety of foods from different food groups ensures your child gets all the essential nutrients for proper growth and development.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-primary/5 to-background shadow-md hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Improved Health</h3>
                <p className="text-foreground/80">
                  A diverse diet strengthens the immune system, improves gut health, and reduces the risk of nutritional deficiencies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-primary/5 to-background shadow-md hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Healthy Habits</h3>
                <p className="text-foreground/80">
                  Introducing diverse foods early helps develop healthy eating patterns and food preferences that can last a lifetime.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Log Your Meals</h3>
                <p className="text-foreground/70">Enter what you or your child ate in the last 24 hours</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Calculate Score</h3>
                <p className="text-foreground/70">Our system analyzes the diversity across food groups</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Get Insights</h3>
                <p className="text-foreground/70">Receive a detailed breakdown of nutritional intake</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Improve Diet</h3>
                <p className="text-foreground/70">Follow personalized recommendations to enhance diet quality</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild size="lg">
                <Link to="/dietary-diversity">Try It Now</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">What is a good diversity score?</h3>
              <p className="text-foreground/80">
                A score of 5 or higher (out of 9 food groups) is generally considered good dietary diversity. Higher scores indicate a more nutritionally adequate diet.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How often should I check my diversity score?</h3>
              <p className="text-foreground/80">
                We recommend checking weekly or monthly to track improvements in your dietary patterns over time.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Is this suitable for all age groups?</h3>
              <p className="text-foreground/80">
                Yes! Our calculator works for children, adolescents, and adults. For children, we also provide age-appropriate Z-scores.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate is the food group identification?</h3>
              <p className="text-foreground/80">
                Our system recognizes common foods, including regional and traditional items. If a food isn't recognized, you can manually select its food group.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
