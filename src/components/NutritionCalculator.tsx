
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface NutritionForm {
  age: string;
  weight: string;
  height: string;
  gender: string;
  activityLevel: string;
  hasAllergies: boolean;
  allergies: string;
}

interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calcium: number;
  iron: number;
  vitaminD: number;
}

const NutritionCalculator: React.FC<{
  onCalculate: (results: NutritionResult) => void;
}> = ({ onCalculate }) => {
  const [form, setForm] = useState<NutritionForm>({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    hasAllergies: false,
    allergies: '',
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  
  const updateForm = (field: keyof NutritionForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  
  const calculateNutrition = () => {
    // Validate inputs
    if (!form.age || !form.weight || !form.height || !form.gender || !form.activityLevel) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const age = parseInt(form.age);
    const weight = parseInt(form.weight);
    const height = parseInt(form.height);
    
    if (age > 18) {
      toast.error('This calculator is designed for individuals under 18 years old');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate API call or calculation time
    setTimeout(() => {
      // Calculate base metrics (this is a simplified example)
      let baseCalories = 0;
      
      // Basic child/teen BMR calculation (simplified)
      if (age < 3) {
        baseCalories = (weight * 59.5) - 30;
      } else if (age < 10) {
        baseCalories = (weight * 22.7) + 495;
      } else if (age < 18) {
        if (form.gender === 'male') {
          baseCalories = (weight * 17.5) + 651;
        } else {
          baseCalories = (weight * 12.2) + 746;
        }
      }
      
      // Activity level adjustment
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
      };
      
      const activityMultiplier = activityMultipliers[form.activityLevel as keyof typeof activityMultipliers] || 1.2;
      const calories = baseCalories * activityMultiplier;
      
      // Macronutrient calculations (simplified example)
      const protein = (calories * 0.15) / 4; // 15% of calories from protein
      const fat = (calories * 0.3) / 9; // 30% of calories from fat
      const carbs = (calories * 0.55) / 4; // 55% of calories from carbs
      
      // Micronutrients based on age (simplified example)
      let calcium = 0;
      let iron = 0;
      let vitaminD = 0;
      
      if (age < 3) {
        calcium = 700;
        iron = 7;
        vitaminD = 600;
      } else if (age < 9) {
        calcium = 1000;
        iron = 10;
        vitaminD = 600;
      } else {
        calcium = 1300;
        iron = form.gender === 'female' ? 15 : 11;
        vitaminD = 600;
      }
      
      const results: NutritionResult = {
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
        calcium,
        iron,
        vitaminD,
      };
      
      onCalculate(results);
      setIsCalculating(false);
      
      toast.success('Nutrition profile calculated successfully!');
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto glass-panel">
      <CardHeader>
        <CardTitle className="heading-md text-center">Child Nutrition Profile</CardTitle>
        <CardDescription className="text-center">
          Calculate recommended daily nutritional values for children and teens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              min="0"
              max="18"
              placeholder="Enter age"
              value={form.age}
              onChange={(e) => updateForm('age', e.target.value)}
              className="focus-within-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(value) => updateForm('gender', value)}
            >
              <SelectTrigger id="gender" className="focus-within-ring">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              min="1"
              placeholder="Enter weight"
              value={form.weight}
              onChange={(e) => updateForm('weight', e.target.value)}
              className="focus-within-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              min="1"
              placeholder="Enter height"
              value={form.height}
              onChange={(e) => updateForm('height', e.target.value)}
              className="focus-within-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select
              value={form.activityLevel}
              onValueChange={(value) => updateForm('activityLevel', value)}
            >
              <SelectTrigger id="activity" className="focus-within-ring">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="veryActive">Very Active (very hard exercise & physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="allergies"
                checked={form.hasAllergies}
                onCheckedChange={(checked) => updateForm('hasAllergies', checked)}
              />
              <Label htmlFor="allergies">Food Allergies or Restrictions</Label>
            </div>
            
            {form.hasAllergies && (
              <Input
                id="allergiesList"
                placeholder="List allergies or restrictions"
                value={form.allergies}
                onChange={(e) => updateForm('allergies', e.target.value)}
                className="mt-2 focus-within-ring"
              />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={calculateNutrition} 
          className="w-full bg-primary button-hover"
          disabled={isCalculating}
        >
          {isCalculating ? 'Calculating...' : 'Calculate Nutrition Profile'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NutritionCalculator;
