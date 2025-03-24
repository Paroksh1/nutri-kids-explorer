
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AnimatedCounter from './ui/AnimatedCounter';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface BMIResult {
  bmi: number;
  category: string;
  percentile?: number;
  zScore?: number;
  isAdult: boolean;
}

const BMICalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [results, setResults] = useState<BMIResult | null>(null);
  
  const calculateBMI = useCallback(() => {
    if (!age || !weight || !height) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const ageValue = parseInt(age);
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100; // Convert cm to m
    
    // Calculate BMI
    const bmi = weightValue / (heightValue * heightValue);
    const roundedBmi = parseFloat(bmi.toFixed(1));
    
    let category = '';
    let percentile = 50; // Default to median
    let zScore = 0;
    const isAdult = ageValue >= 18;
    
    if (isAdult) {
      // Adult BMI categorization
      if (bmi < 16) {
        category = 'Severely underweight';
      } else if (bmi < 18.5) {
        category = 'Underweight';
      } else if (bmi < 25) {
        category = 'Normal weight';
      } else if (bmi < 30) {
        category = 'Overweight';
      } else if (bmi < 35) {
        category = 'Obese Class I';
      } else if (bmi < 40) {
        category = 'Obese Class II';
      } else {
        category = 'Obese Class III';
      }
    } else {
      // Children BMI categorization with z-score estimation
      // This is a simplified version - in real applications, this would use WHO growth charts
      
      // Calculate estimated z-score based on age and gender
      // These are approximate calculations and should be replaced with proper WHO standards
      const medianBMI = gender === 'male' 
        ? 15 + (ageValue * 0.4) // Simplified median BMI for boys by age
        : 14.5 + (ageValue * 0.4); // Simplified median BMI for girls by age
        
      const sdBMI = 2; // Simplified standard deviation
      zScore = (bmi - medianBMI) / sdBMI;
      
      // Convert z-score to percentile (approximate)
      percentile = Math.min(Math.max(Math.round(normalcdfToPercentile(zScore)), 1), 99);
      
      // Categorize based on z-score
      if (zScore < -3) {
        category = 'Severely wasted';
      } else if (zScore < -2) {
        category = 'Wasted';
      } else if (zScore < -1) {
        category = 'Risk of underweight';
      } else if (zScore <= 1) {
        category = 'Normal weight';
      } else if (zScore <= 2) {
        category = 'Risk of overweight';
      } else if (zScore <= 3) {
        category = 'Overweight';
      } else {
        category = 'Obesity';
      }
    }
    
    setResults({ 
      bmi: roundedBmi, 
      category, 
      percentile, 
      zScore: parseFloat(zScore.toFixed(2)),
      isAdult 
    });
  }, [age, weight, height, gender]);
  
  // Function to convert z-score to percentile
  const normalcdfToPercentile = (z: number): number => {
    // Approximation of the cumulative distribution function for normal distribution
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c = 0.39894228;
    
    if (z >= 0) {
      const t = 1.0 / (1.0 + p * z);
      return (1.0 - c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)) * 100;
    } else {
      const t = 1.0 / (1.0 - p * z);
      return (c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1)) * 100;
    }
  };
  
  const getBMIColor = (bmi: number, isAdult: boolean): string => {
    if (isAdult) {
      if (bmi < 18.5) return 'text-blue-500';
      if (bmi < 25) return 'text-green-500';
      if (bmi < 30) return 'text-amber-500';
      return 'text-red-500';
    } else {
      // For children, color based on z-score ranges
      const zScore = results?.zScore || 0;
      if (zScore < -2) return 'text-blue-500';
      if (zScore <= 1) return 'text-green-500';
      if (zScore <= 2) return 'text-amber-500';
      return 'text-red-500';
    }
  };
  
  const getProgressColor = (percentile: number): string => {
    if (percentile < 5) return 'bg-blue-500';
    if (percentile < 25) return 'bg-teal-500';
    if (percentile < 75) return 'bg-green-500';
    if (percentile < 95) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <Card className="w-full max-w-lg glass-panel">
      <CardHeader>
        <CardTitle className="heading-md text-center">BMI & Growth Percentile</CardTitle>
        <CardDescription className="text-center">
          Calculate Body Mass Index and estimate growth percentile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age-bmi">Age (years)</Label>
            <Input
              id="age-bmi"
              type="number"
              min="0"
              max="120"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="focus-within-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender-bmi">Gender</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={gender === 'male' ? 'default' : 'outline'}
                className={gender === 'male' ? 'bg-primary w-full' : 'w-full'}
                onClick={() => setGender('male')}
              >
                Male
              </Button>
              <Button
                type="button"
                variant={gender === 'female' ? 'default' : 'outline'}
                className={gender === 'female' ? 'bg-primary w-full' : 'w-full'}
                onClick={() => setGender('female')}
              >
                Female
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight-bmi">Weight (kg)</Label>
            <Input
              id="weight-bmi"
              type="number"
              min="1"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="focus-within-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height-bmi">Height (cm)</Label>
            <Input
              id="height-bmi"
              type="number"
              min="1"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="focus-within-ring"
            />
          </div>
        </div>
        
        <Button
          onClick={calculateBMI}
          className="w-full bg-primary button-hover"
        >
          Calculate
        </Button>
        
        {results && (
          <div className="pt-4 border-t animate-fade-in">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold mb-1">Results</h3>
              <div className="flex items-center justify-center">
                <span className={`text-3xl font-bold ${getBMIColor(results.bmi, results.isAdult)}`}>
                  <AnimatedCounter 
                    value={results.bmi} 
                    duration={1200}
                    decimals={1}
                  />
                </span>
                <span className="ml-1 text-muted-foreground text-lg">BMI</span>
              </div>
              <p className="text-foreground/80 font-medium mt-2">{results.category}</p>
            </div>
            
            {!results.isAdult && results.percentile && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Z-Score: {results.zScore}</span>
                  <span className="font-medium">Percentile: {results.percentile}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
                <Progress 
                  value={results.percentile} 
                  className={cn("h-2", getProgressColor(results.percentile))}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {results.isAdult ? 
                    "BMI is a measure of body fat based on height and weight for adults." :
                    "This indicates where your child's BMI falls compared to other children of the same age and gender."}
                </p>
              </div>
            )}
            
            <div className="mt-4 bg-muted/40 p-3 rounded-md text-sm">
              <p className="font-medium mb-1">{results.isAdult ? "Interpretation:" : "Growth Assessment:"}</p>
              {results.isAdult ? (
                <p>Your BMI of {results.bmi} indicates {results.category.toLowerCase()}. {getBMIRecommendation(results.bmi, true)}</p>
              ) : (
                <p>Your child's BMI is at the {results.percentile}th percentile, indicating {results.category.toLowerCase()}. {getBMIRecommendation(results.bmi, false, results.zScore)}</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get recommendations based on BMI
const getBMIRecommendation = (bmi: number, isAdult: boolean, zScore?: number): string => {
  if (isAdult) {
    if (bmi < 18.5) {
      return "Consider consulting with a healthcare provider about healthy ways to gain weight.";
    } else if (bmi < 25) {
      return "Continue maintaining a balanced diet and regular physical activity.";
    } else if (bmi < 30) {
      return "Consider modest weight loss through healthy eating and increased physical activity.";
    } else {
      return "It's advisable to speak with a healthcare provider about a weight management plan.";
    }
  } else {
    // For children (using z-score)
    if (zScore && zScore < -2) {
      return "Consult with a pediatrician about nutrition support for healthy weight gain.";
    } else if (zScore && zScore <= 1) {
      return "Continue supporting your child's healthy growth with balanced nutrition and physical activity.";
    } else if (zScore && zScore <= 2) {
      return "Monitor your child's growth and ensure they have a balanced diet and regular physical activity.";
    } else {
      return "It's recommended to discuss your child's growth with their healthcare provider.";
    }
  }
};

export default BMICalculator;
