
import React, { useState, useEffect } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, ArrowLeft, ArrowRight, Calendar, Utensils, Brain, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getMealPlan, getNutritionSummary } from './MealService';

interface MealPlanDisplayProps {
  childId: string;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ childId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealPlan, setMealPlan] = useState<any[]>([]);
  const [nutritionSummary, setNutritionSummary] = useState<any>(null);
  
  // AI personalization indicator
  const [aiPersonalizationScore, setAiPersonalizationScore] = useState<number>(
    80 + Math.floor(Math.random() * 15) // Mock AI score between 80-95
  );
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  useEffect(() => {
    // Get meal plan for the selected child
    const plan = getMealPlan(childId);
    setMealPlan(plan);
    
    // Get nutrition summary
    const summary = getNutritionSummary(childId);
    setNutritionSummary(summary);
  }, [childId]);
  
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };
  
  const currentDayPlan = mealPlan.find(day => 
    isSameDay(new Date(day.date), currentDate)
  ) || {
    date: format(currentDate, 'yyyy-MM-dd'),
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };
  
  const formatDate = (date: Date) => {
    return format(date, 'EEE, MMM d');
  };
  
  const nutritionProgress = (consumed: number, recommended: number) => {
    const percent = Math.min(Math.round((consumed / recommended) * 100), 100);
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs mb-1">
          <span>{consumed} / {recommended}</span>
          <span>{percent}%</span>
        </div>
        <Progress value={percent} className="h-2" />
      </div>
    );
  };
  
  const MealSection = ({ title, meals, icon }: { title: string, meals: any[], icon: React.ReactNode }) => (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="text-lg font-medium ml-2">{title}</h3>
      </div>
      
      {meals.length > 0 ? (
        <div className="space-y-3">
          {meals.map((meal, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{meal.name}</h4>
                  <p className="text-sm text-muted-foreground">{meal.portion}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{meal.calories} cal</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Protein:</span> 
                  <span className="ml-1 font-medium">{meal.protein}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Carbs:</span> 
                  <span className="ml-1 font-medium">{meal.carbs}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Fat:</span> 
                  <span className="ml-1 font-medium">{meal.fat}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No meals planned</p>
      )}
    </div>
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  Meal Plan
                  <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />
                </CardTitle>
                <CardDescription>AI-personalized nutrition for optimal growth</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const prevDay = addDays(currentDate, -1);
                    if (prevDay >= new Date()) {
                      setCurrentDate(prevDay);
                    }
                  }}
                  disabled={isSameDay(currentDate, new Date())}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{formatDate(currentDate)}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentDate(addDays(currentDate, 1))}
                  disabled={isSameDay(currentDate, addDays(new Date(), 6))}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto pb-2 mb-6">
              <div className="flex space-x-2">
                {weekDays.map((date) => (
                  <Button
                    key={date.toString()}
                    variant={isSameDay(date, currentDate) ? "default" : "outline"}
                    size="sm"
                    className={isSameDay(date, currentDate) ? "bg-primary" : ""}
                    onClick={() => handleDateChange(date)}
                  >
                    {format(date, 'EEE, MMM d')}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">AI Meal Personalization</span>
                </div>
                <span className="text-sm font-semibold">{aiPersonalizationScore}%</span>
              </div>
              <Progress value={aiPersonalizationScore} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                This meal plan has been personalized by our AI based on nutritional needs, growth patterns, and dietary preferences specific to your child.
              </p>
            </div>
            
            <Tabs defaultValue="full-day">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="full-day">Full Day</TabsTrigger>
                <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                <TabsTrigger value="lunch-dinner">Lunch/Dinner</TabsTrigger>
                <TabsTrigger value="snacks">Snacks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="full-day">
                <MealSection 
                  title="Breakfast" 
                  meals={currentDayPlan.breakfast}
                  icon={<Calendar className="h-5 w-5 text-orange-500" />}
                />
                <MealSection 
                  title="Lunch" 
                  meals={currentDayPlan.lunch}
                  icon={<Utensils className="h-5 w-5 text-blue-500" />}
                />
                <MealSection 
                  title="Dinner" 
                  meals={currentDayPlan.dinner}
                  icon={<Utensils className="h-5 w-5 text-purple-500" />}
                />
                <MealSection 
                  title="Snacks" 
                  meals={currentDayPlan.snacks}
                  icon={<Activity className="h-5 w-5 text-green-500" />}
                />
              </TabsContent>
              
              <TabsContent value="breakfast">
                <MealSection 
                  title="Breakfast" 
                  meals={currentDayPlan.breakfast}
                  icon={<Calendar className="h-5 w-5 text-orange-500" />}
                />
              </TabsContent>
              
              <TabsContent value="lunch-dinner">
                <MealSection 
                  title="Lunch" 
                  meals={currentDayPlan.lunch}
                  icon={<Utensils className="h-5 w-5 text-blue-500" />}
                />
                <MealSection 
                  title="Dinner" 
                  meals={currentDayPlan.dinner}
                  icon={<Utensils className="h-5 w-5 text-purple-500" />}
                />
              </TabsContent>
              
              <TabsContent value="snacks">
                <MealSection 
                  title="Snacks" 
                  meals={currentDayPlan.snacks}
                  icon={<Activity className="h-5 w-5 text-green-500" />}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Summary</CardTitle>
            <CardDescription>Today's nutritional progress</CardDescription>
          </CardHeader>
          <CardContent>
            {nutritionSummary ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Calories</h3>
                  {nutritionProgress(
                    nutritionSummary.calories.consumed, 
                    nutritionSummary.calories.recommended
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Protein</h3>
                  {nutritionProgress(
                    nutritionSummary.protein.consumed, 
                    nutritionSummary.protein.recommended
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Carbohydrates</h3>
                  {nutritionProgress(
                    nutritionSummary.carbs.consumed, 
                    nutritionSummary.carbs.recommended
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Fats</h3>
                  {nutritionProgress(
                    nutritionSummary.fat.consumed, 
                    nutritionSummary.fat.recommended
                  )}
                </div>
                
                <div className="p-3 rounded-md bg-muted/50">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    AI Nutritionist Insight
                  </h3>
                  <p className="text-xs">
                    Based on growth patterns and activity levels, your child could benefit from increasing protein intake by 5-10g per day for optimal muscle development.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No nutrition data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanDisplay;
