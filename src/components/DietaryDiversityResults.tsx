import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, RotateCcw, Award } from 'lucide-react';
import { toast } from 'sonner';

interface DietaryDiversityResultsProps {
  score: number;
  maxScore: number;
  foodGroups: number[];
  onReset: () => void;
  rawData: any;
}

const foodGroupLabels = [
  'Starchy staples',
  'Dark green leafy vegetables',
  'Vitamin A rich fruits and vegetables',
  'Other fruits and vegetables',
  'Organ meat',
  'Meat and fish',
  'Eggs',
  'Legumes, nuts and seeds',
  'Milk and milk products'
];

const generatePersonalizedRecommendations = (score: number, foodGroups: number[], userData: any) => {
  let recommendations = [];
  
  if (score <= 3) {
    recommendations.push("Your diet has low diversity. Try to include foods from more different food groups each day.");
  } else if (score <= 6) {
    recommendations.push("You have moderate dietary diversity. Adding just a few more food groups could greatly benefit your nutrition.");
  } else {
    recommendations.push("Great job! You have good dietary diversity. Maintaining this variety is excellent for your health.");
  }
  
  const missingGroups = [];
  foodGroups.forEach((value, index) => {
    if (value === 0) {
      missingGroups.push(foodGroupLabels[index]);
    }
  });
  
  if (missingGroups.length > 0) {
    recommendations.push(`Consider including these food groups in your diet: ${missingGroups.join(', ')}.`);
  }
  
  if (userData && userData.age) {
    const age = parseInt(userData.age);
    
    if (age < 18) {
      recommendations.push("For growing children and teens, dietary diversity is especially important for proper development.");
      if (score < 5) {
        recommendations.push("Growing bodies need nutrients from a wide variety of foods. Try to include different colored vegetables and fruits daily.");
      }
    } else if (age > 65) {
      recommendations.push("For older adults, maintaining dietary diversity helps support immune function and overall health.");
      if (foodGroups[2] === 0) {
        recommendations.push("Dark green leafy vegetables are particularly important for maintaining bone health as we age.");
      }
    }
  }
  
  return recommendations;
};

const DietaryDiversityResults: React.FC<DietaryDiversityResultsProps> = ({ 
  score, 
  maxScore, 
  foodGroups,
  onReset,
  rawData
}) => {
  const percentage = (score / maxScore) * 100;
  
  const chartData = foodGroupLabels.map((label, index) => ({
    name: label,
    value: foodGroups[index],
    fill: foodGroups[index] ? '#22c55e' : '#ef4444'
  }));
  
  const handleDownload = () => {
    try {
      const dataStr = JSON.stringify(rawData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(dataBlob);
      downloadLink.download = `dietary-diversity-results-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success('Data downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download data.');
    }
  };
  
  const generateScoreDescription = () => {
    if (score <= 3) {
      return 'Low dietary diversity. Consider including more food groups in your diet for better nutrition.';
    } else if (score <= 6) {
      return 'Medium dietary diversity. You are consuming a moderate range of food groups.';
    } else {
      return 'High dietary diversity. You have a varied diet with many food groups, which is excellent for nutrition!';
    }
  };

  const personalizedRecommendations = generatePersonalizedRecommendations(score, foodGroups, rawData.user);

  return (
    <Card className="w-full max-w-4xl mx-auto glass-panel">
      <CardHeader className="text-center">
        <CardTitle className="heading-md">Dietary Diversity Score Results</CardTitle>
        <CardDescription>
          {rawData.user ? 
            `Based on your food consumption in the last 24 hours, ${rawData.user.firstName}` : 
            'Based on the foods consumed in the last 24 hours'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  percentage < 33 ? "#ef4444" : percentage < 66 ? "#f97316" : "#22c55e"
                }
                strokeWidth="10"
                strokeDasharray={`${percentage * 2.83} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{score}</span>
              <span className="text-sm text-muted-foreground">out of {maxScore}</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold mb-1 flex items-center justify-center">
              <Award className="mr-2 h-5 w-5 text-yellow-500" />
              {percentage < 33 
                ? 'Low Diversity' 
                : percentage < 66 
                  ? 'Medium Diversity' 
                  : 'High Diversity'}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {generateScoreDescription()}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Food Group Consumption</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1]} tickCount={2} />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip 
                  formatter={(value) => [`${value === 1 ? 'Consumed' : 'Not consumed'}`, 'Status']}
                  labelFormatter={(label) => `Food Group: ${label}`}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-muted/40 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Interpretation of Score</h3>
          <p className="text-sm mb-2">
            The dietary diversity score ranges from 0-9, representing the number of food groups consumed.
          </p>
          <ul className="text-sm space-y-1">
            <li>• <span className="font-medium">Score 1-3:</span> Low dietary diversity</li>
            <li>• <span className="font-medium">Score 4-6:</span> Medium dietary diversity</li>
            <li>• <span className="font-medium">Score 7-9:</span> High dietary diversity</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Personalized Recommendations</h3>
          <ul className="space-y-2">
            {personalizedRecommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" /> Start New Assessment
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DietaryDiversityResults;
