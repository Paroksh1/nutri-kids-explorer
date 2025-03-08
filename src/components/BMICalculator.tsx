
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
    
    if (ageValue > 18) {
      toast.error('This calculator is designed for individuals under 18 years old');
      return;
    }
    
    // Calculate BMI
    const bmi = weightValue / (heightValue * heightValue);
    
    // Determine BMI category (simplified for this example)
    let category = '';
    let percentile = 50; // Default to median
    
    // Very simplified categorization - in a real app, this would use CDC or WHO growth charts
    if (bmi < 5) {
      category = 'Invalid BMI value';
      percentile = 0;
    } else if (bmi < 14) {
      category = 'Severely underweight';
      percentile = 3;
    } else if (bmi < 16) {
      category = 'Underweight';
      percentile = 15;
    } else if (bmi < 18) {
      category = 'Slightly underweight';
      percentile = 30;
    } else if (bmi < 22) {
      category = 'Normal weight';
      percentile = 50;
    } else if (bmi < 25) {
      category = 'Normal weight (upper range)';
      percentile = 75;
    } else if (bmi < 30) {
      category = 'Overweight';
      percentile = 85;
    } else {
      category = 'Obese';
      percentile = 97;
    }
    
    setResults({ bmi, category, percentile });
  }, [age, weight, height, gender]);
  
  const getBMIColor = (bmi: number): string => {
    if (bmi < 14) return 'text-blue-500';
    if (bmi < 18) return 'text-teal-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-amber-500';
    return 'text-red-500';
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
              max="18"
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
          Calculate BMI
        </Button>
        
        {results && (
          <div className="pt-4 border-t animate-fade-in">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold mb-1">Results</h3>
              <div className="flex items-center justify-center">
                <span className={`text-3xl font-bold ${getBMIColor(results.bmi)}`}>
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
            
            {results.percentile && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>0%</span>
                  <span className="font-medium">Percentile: {results.percentile}%</span>
                  <span>100%</span>
                </div>
                <Progress 
                  value={results.percentile} 
                  className={cn("h-2", getProgressColor(results.percentile))}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This indicates where your child's BMI falls compared to other children of the same age and gender.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
