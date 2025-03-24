
import React from 'react';
import DietaryDiversityCalculator from '@/components/DietaryDiversityCalculator';

const DietaryDiversity: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Dietary Diversity Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Assess your diet's diversity by recording what you ate yesterday. 
            A diverse diet is essential for obtaining all the nutrients your body needs.
          </p>
        </div>
        
        <DietaryDiversityCalculator />
        
        <div className="mt-12 bg-muted/30 p-6 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">Why Dietary Diversity Matters</h2>
          <p className="mb-4">
            Dietary diversity is a key indicator of nutritional adequacy. Consuming foods from a variety 
            of food groups ensures you get the full range of nutrients, vitamins, and minerals needed 
            for good health.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Benefits of a Diverse Diet:</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Ensures adequate intake of essential nutrients</li>
            <li>Reduces risk of micronutrient deficiencies</li>
            <li>Promotes overall health and well-being</li>
            <li>Supports proper growth and development in children</li>
            <li>Enhances immune function</li>
            <li>Reduces risk of diet-related chronic diseases</li>
          </ul>
          
          <p className="text-sm text-muted-foreground">
            This questionnaire is adapted from FAO and USAID's validated dietary diversity assessment tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DietaryDiversity;
