
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NutritionFacts from '@/components/education/NutritionFacts';

const Education: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold ml-4">Nutrition Education</h1>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-muted-foreground mb-8">
          Learning about nutrition can be fun! Explore these nutrition facts and quizzes to help your child 
          understand the importance of healthy eating in a fun and engaging way.
        </p>
        
        <NutritionFacts />
        
        <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
          <h2 className="text-xl font-semibold mb-4">Why Nutrition Education Matters</h2>
          <p className="mb-4">
            Teaching children about nutrition from an early age helps them develop healthy eating habits that last a lifetime. 
            When children understand why certain foods help them grow, learn, and play better, they're more likely to make 
            healthier food choices.
          </p>
          <p>
            Use these fun facts and quizzes as conversation starters during meal times. Ask your child what they learned 
            and encourage them to identify the healthy foods on their plate!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
