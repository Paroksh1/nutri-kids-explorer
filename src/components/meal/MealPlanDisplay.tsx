
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getMealPlan } from './MealService';
import { getChildProfiles } from '../onboarding/ChildProfileForm';

interface MealPlanDay {
  date: string;
  breakfast: Array<{ name: string; portion: string; calories: number; protein: number; carbs: number; fat: number }>;
  lunch: Array<{ name: string; portion: string; calories: number; protein: number; carbs: number; fat: number }>;
  dinner: Array<{ name: string; portion: string; calories: number; protein: number; carbs: number; fat: number }>;
  snacks: Array<{ name: string; portion: string; calories: number; protein: number; carbs: number; fat: number }>;
}

const MealPlanDisplay: React.FC<{ childId: string }> = ({ childId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>([]);
  
  useEffect(() => {
    // Generate week dates
    const dates = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));
    setWeekDates(dates);
    
    // Get meal plan
    const plan = getMealPlan(childId);
    setMealPlan(plan);
  }, [childId, currentDate]);
  
  const selectedDate = weekDates[selectedDateIndex];
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dayPlan = mealPlan.find(day => day.date === selectedDateStr) || {
    date: selectedDateStr,
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  };
  
  const generatePreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7));
  };
  
  const generateNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7));
  };
  
  const getNutritionTotals = (meals: Array<{ name: string; portion: string; calories: number; protein: number; carbs: number; fat: number }>[]) => {
    const allMeals = meals.flat();
    return {
      calories: allMeals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: allMeals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: allMeals.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: allMeals.reduce((sum, meal) => sum + meal.fat, 0),
      count: allMeals.length
    };
  };
  
  const dayTotals = getNutritionTotals([
    dayPlan.breakfast, 
    dayPlan.lunch, 
    dayPlan.dinner, 
    dayPlan.snacks
  ]);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Meal Plan</CardTitle>
            <CardDescription>
              Customized meal suggestions based on nutritional needs
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={generatePreviousWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6"></path></svg>
            </Button>
            <Button variant="outline" size="icon" onClick={generateNextWeek}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-2 min-w-max">
            {weekDates.map((date, index) => {
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              
              return (
                <Button
                  key={index}
                  variant={selectedDateIndex === index ? "default" : "outline"}
                  className={cn(
                    "flex flex-col items-center px-3 py-2 h-auto",
                    isToday && selectedDateIndex !== index && "border-primary text-primary"
                  )}
                  onClick={() => setSelectedDateIndex(index)}
                >
                  <span className="text-xs">{format(date, 'E')}</span>
                  <span className={cn("text-xl", isToday && "font-bold")}>{format(date, 'd')}</span>
                </Button>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-medium">
              {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Breakfast</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayPlan.breakfast.length > 0 ? (
                    <ul className="space-y-4">
                      {dayPlan.breakfast.map((item, i) => (
                        <li key={i}>
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">{item.calories} kcal</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{item.portion}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs bg-muted p-2 rounded-md">
                            <div>
                              <span className="font-semibold text-primary">Protein:</span> {item.protein}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Carbs:</span> {item.carbs}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Fat:</span> {item.fat}g
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No breakfast suggestions available</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Lunch</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayPlan.lunch.length > 0 ? (
                    <ul className="space-y-4">
                      {dayPlan.lunch.map((item, i) => (
                        <li key={i}>
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">{item.calories} kcal</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{item.portion}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs bg-muted p-2 rounded-md">
                            <div>
                              <span className="font-semibold text-primary">Protein:</span> {item.protein}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Carbs:</span> {item.carbs}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Fat:</span> {item.fat}g
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No lunch suggestions available</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Dinner</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayPlan.dinner.length > 0 ? (
                    <ul className="space-y-4">
                      {dayPlan.dinner.map((item, i) => (
                        <li key={i}>
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">{item.calories} kcal</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{item.portion}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs bg-muted p-2 rounded-md">
                            <div>
                              <span className="font-semibold text-primary">Protein:</span> {item.protein}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Carbs:</span> {item.carbs}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Fat:</span> {item.fat}g
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No dinner suggestions available</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">Snacks</CardTitle>
                </CardHeader>
                <CardContent>
                  {dayPlan.snacks.length > 0 ? (
                    <ul className="space-y-4">
                      {dayPlan.snacks.map((item, i) => (
                        <li key={i}>
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">{item.calories} kcal</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{item.portion}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs bg-muted p-2 rounded-md">
                            <div>
                              <span className="font-semibold text-primary">Protein:</span> {item.protein}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Carbs:</span> {item.carbs}g
                            </div>
                            <div>
                              <span className="font-semibold text-primary">Fat:</span> {item.fat}g
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No snack suggestions available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 bg-accent/20 rounded-lg p-4">
            <h3 className="font-medium mb-2">Day Summary</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Calories</p>
                <p className="text-xl font-bold">{dayTotals.calories} kcal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protein</p>
                <p className="text-xl font-bold">{dayTotals.protein}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold">{dayTotals.carbs}g</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fat</p>
                <p className="text-xl font-bold">{dayTotals.fat}g</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealPlanDisplay;
