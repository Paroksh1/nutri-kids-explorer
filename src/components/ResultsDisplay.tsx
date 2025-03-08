
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import AnimatedCounter from './ui/AnimatedCounter';

interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  calcium: number;
  iron: number;
  vitaminD: number;
}

const ResultsDisplay: React.FC<{
  results: NutritionResult | null;
}> = ({ results }) => {
  if (!results) return null;
  
  // Prepare data for macronutrient chart
  const macroData = [
    { name: 'Protein', value: results.protein, recommended: results.protein, color: '#3B82F6' },
    { name: 'Carbs', value: results.carbs, recommended: results.carbs, color: '#10B981' },
    { name: 'Fat', value: results.fat, recommended: results.fat, color: '#F59E0B' },
  ];
  
  // Prepare data for micronutrient chart
  const microData = [
    { name: 'Calcium', value: 100, unit: 'mg', total: results.calcium, color: '#8B5CF6' },
    { name: 'Iron', value: 100, unit: 'mg', total: results.iron, color: '#EC4899' },
    { name: 'Vitamin D', value: 100, unit: 'IU', total: results.vitaminD, color: '#6366F1' },
  ];
  
  // Prepare data for calorie breakdown
  const calorieData = [
    { name: 'Protein', value: Math.round(results.protein * 4), color: '#3B82F6' },
    { name: 'Carbs', value: Math.round(results.carbs * 4), color: '#10B981' },
    { name: 'Fat', value: Math.round(results.fat * 9), color: '#F59E0B' },
  ];
  
  return (
    <div className="space-y-8 animate-fade-in-up w-full max-w-4xl mx-auto">
      {/* Calorie Summary */}
      <Card className="w-full glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-xl">Daily Caloric Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-primary mb-2">
              <AnimatedCounter value={results.calories} duration={1500} />
            </div>
            <p className="text-foreground/70">calories per day</p>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Calorie Sources</h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={calorieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {calorieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} calories`, null]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Macronutrients */}
      <Card className="w-full glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-xl">Daily Macronutrients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {macroData.map((item) => (
              <div key={item.name} className="bg-background/50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold" style={{ color: item.color }}>
                  <AnimatedCounter value={item.value} duration={1500} suffix="g" />
                </div>
                <p className="text-foreground/70 text-sm">{item.name}</p>
              </div>
            ))}
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={macroData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="g" width={40} />
              <Tooltip formatter={(value) => [`${value}g`, null]} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Micronutrients */}
      <Card className="w-full glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-xl">Daily Micronutrients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-background/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-500">
                <AnimatedCounter value={results.calcium} duration={1500} suffix="mg" />
              </div>
              <p className="text-foreground/70 text-sm">Calcium</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-pink-500">
                <AnimatedCounter value={results.iron} duration={1500} suffix="mg" />
              </div>
              <p className="text-foreground/70 text-sm">Iron</p>
            </div>
            <div className="bg-background/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-500">
                <AnimatedCounter value={results.vitaminD} duration={1500} suffix="IU" />
              </div>
              <p className="text-foreground/70 text-sm">Vitamin D</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              These values represent the recommended daily intake for optimal growth and development.
            </p>
            <p className="text-sm text-muted-foreground">
              Individual needs may vary based on specific health conditions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
