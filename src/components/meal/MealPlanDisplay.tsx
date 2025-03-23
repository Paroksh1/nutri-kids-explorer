
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChildProfile } from '../onboarding/ChildProfileForm';
import { getMealPlan } from './MealService';
import { getAIRecommendations, getCuisinePreferences } from '@/services/AIRecommendationService';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronDown, ChevronUp, Info, Clock, Brain, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MealPlanDisplayProps {
  childId: string;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ childId }) => {
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [mealPlan, setMealPlan] = useState<any[]>([]);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [aiMealRecommendations, setAiMealRecommendations] = useState<any[]>([]);
  const [breakfastOptions, setBreakfastOptions] = useState<any[]>([]);
  const [lunchOptions, setLunchOptions] = useState<any[]>([]);
  const [dinnerOptions, setDinnerOptions] = useState<any[]>([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [personalizationScore, setPersonalizationScore] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get the child profile
        const childProfiles = JSON.parse(localStorage.getItem('childProfiles') || '{}');
        const userProfiles = Object.values(childProfiles).flat() as ChildProfile[];
        const childProfile = userProfiles.find(p => p.id === childId);
        
        if (childProfile) {
          // First, get basic meal plan from MealService
          const basicPlan = getMealPlan(childId);
          setMealPlan(basicPlan);
          
          // Then enhance with AI recommendations
          const cuisinePreferences = getCuisinePreferences(childId);
          const recommendationsResponse = await getAIRecommendations({
            childProfile,
            requestType: 'meal',
            cuisinePreferences
          });
          
          setAiMealRecommendations(recommendationsResponse.recommendations);
          setAiExplanation(recommendationsResponse.explanation);
          setPersonalizationScore(recommendationsResponse.personalizationScore);
          
          // Separate meal recommendations by meal type
          const breakfast = recommendationsResponse.recommendations.filter(item => 
            item.mealType === 'breakfast'
          );
          const lunch = recommendationsResponse.recommendations.filter(item => 
            item.mealType === 'lunch'
          );
          const dinner = recommendationsResponse.recommendations.filter(item => 
            item.mealType === 'dinner'
          );
          
          setBreakfastOptions(breakfast);
          setLunchOptions(lunch);
          setDinnerOptions(dinner);
        }
      } catch (error) {
        console.error('Error loading meal plan:', error);
        toast.error('Failed to load meal plan');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [childId]);
  
  const toggleRecipe = (id: string) => {
    if (expandedRecipe === id) {
      setExpandedRecipe(null);
    } else {
      setExpandedRecipe(id);
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'EEEE, MMMM d');
  };
  
  const isToday = (dateStr: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return dateStr === today;
  };
  
  // Get meal recommendations for specific meal type
  const getMealRecommendationsForType = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    switch (mealType) {
      case 'breakfast':
        return breakfastOptions;
      case 'lunch':
        return lunchOptions;
      case 'dinner':
        return dinnerOptions;
      default:
        return [];
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center">
          <div className="flex flex-col items-center space-y-4">
            <Brain className="h-10 w-10 animate-pulse text-primary" />
            <p className="text-muted-foreground">AI is personalizing meal plans...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <CardTitle>Daily Meal Plan</CardTitle>
              <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />
            </div>
            <CardDescription>AI-personalized nutrition for optimal growth</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-1" />
                  AI Details
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-80">
                <div className="space-y-2">
                  <p className="font-medium">AI Personalization Score: {personalizationScore}%</p>
                  <p className="text-xs">{aiExplanation}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent>
        {aiMealRecommendations.length > 0 ? (
          <div className="space-y-6">
            <Tabs defaultValue="today">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="thisWeek">This Week</TabsTrigger>
                <TabsTrigger value="mealTypes">Meal Types</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today">
                <div className="space-y-8">
                  {/* Breakfast Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Breakfast</h3>
                    {breakfastOptions.length > 0 ? (
                      <div className="space-y-3">
                        {breakfastOptions.slice(0, 2).map((meal, index) => (
                          <Card key={`breakfast-${index}`} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{meal.name}</h4>
                                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => toggleRecipe(`breakfast-${index}`)}
                                  >
                                    {expandedRecipe === `breakfast-${index}` ? 
                                      <ChevronUp className="h-4 w-4" /> : 
                                      <ChevronDown className="h-4 w-4" />
                                    }
                                  </Button>
                                </div>
                                
                                <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{meal.prepTime} prep + {meal.cookTime} cook</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {meal.nutritionalInfo.calories} cal
                                  </Badge>
                                </div>
                                
                                {expandedRecipe === `breakfast-${index}` && (
                                  <div className="mt-4 space-y-4">
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                      <ul className="space-y-1">
                                        {meal.ingredients.map((ingredient, i) => (
                                          <li key={i} className="text-sm flex items-start">
                                            <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                            {ingredient}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                      <ol className="space-y-2">
                                        {meal.instructions.map((step, i) => (
                                          <li key={i} className="text-sm ml-5 list-decimal">
                                            {step}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="grid grid-cols-4 gap-2 text-xs">
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Calories</div>
                                        <div>{meal.nutritionalInfo.calories}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Protein</div>
                                        <div>{meal.nutritionalInfo.protein}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Carbs</div>
                                        <div>{meal.nutritionalInfo.carbs}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Fat</div>
                                        <div>{meal.nutritionalInfo.fat}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No breakfast recommendations available</p>
                    )}
                  </div>
                  
                  {/* Lunch Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Lunch</h3>
                    {lunchOptions.length > 0 ? (
                      <div className="space-y-3">
                        {lunchOptions.slice(0, 2).map((meal, index) => (
                          <Card key={`lunch-${index}`} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{meal.name}</h4>
                                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => toggleRecipe(`lunch-${index}`)}
                                  >
                                    {expandedRecipe === `lunch-${index}` ? 
                                      <ChevronUp className="h-4 w-4" /> : 
                                      <ChevronDown className="h-4 w-4" />
                                    }
                                  </Button>
                                </div>
                                
                                <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{meal.prepTime || '10 minutes'} prep + {meal.cookTime || '20 minutes'} cook</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {meal.nutritionalInfo.calories} cal
                                  </Badge>
                                </div>
                                
                                {expandedRecipe === `lunch-${index}` && (
                                  <div className="mt-4 space-y-4">
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                      <ul className="space-y-1">
                                        {meal.ingredients.map((ingredient, i) => (
                                          <li key={i} className="text-sm flex items-start">
                                            <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                            {ingredient}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                      <ol className="space-y-2">
                                        {meal.instructions.map((step, i) => (
                                          <li key={i} className="text-sm ml-5 list-decimal">
                                            {step}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="grid grid-cols-4 gap-2 text-xs">
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Calories</div>
                                        <div>{meal.nutritionalInfo.calories}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Protein</div>
                                        <div>{meal.nutritionalInfo.protein}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Carbs</div>
                                        <div>{meal.nutritionalInfo.carbs}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Fat</div>
                                        <div>{meal.nutritionalInfo.fat}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No lunch recommendations available</p>
                    )}
                  </div>
                  
                  {/* Dinner Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-primary">Dinner</h3>
                    {dinnerOptions.length > 0 ? (
                      <div className="space-y-3">
                        {dinnerOptions.slice(0, 2).map((meal, index) => (
                          <Card key={`dinner-${index}`} className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{meal.name}</h4>
                                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => toggleRecipe(`dinner-${index}`)}
                                  >
                                    {expandedRecipe === `dinner-${index}` ? 
                                      <ChevronUp className="h-4 w-4" /> : 
                                      <ChevronDown className="h-4 w-4" />
                                    }
                                  </Button>
                                </div>
                                
                                <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{meal.prepTime || '10 minutes'} prep + {meal.cookTime || '20 minutes'} cook</span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {meal.nutritionalInfo.calories} cal
                                  </Badge>
                                </div>
                                
                                {expandedRecipe === `dinner-${index}` && (
                                  <div className="mt-4 space-y-4">
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                      <ul className="space-y-1">
                                        {meal.ingredients.map((ingredient, i) => (
                                          <li key={i} className="text-sm flex items-start">
                                            <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                            {ingredient}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div>
                                      <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                      <ol className="space-y-2">
                                        {meal.instructions.map((step, i) => (
                                          <li key={i} className="text-sm ml-5 list-decimal">
                                            {step}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                    
                                    <Separator />
                                    
                                    <div className="grid grid-cols-4 gap-2 text-xs">
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Calories</div>
                                        <div>{meal.nutritionalInfo.calories}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Protein</div>
                                        <div>{meal.nutritionalInfo.protein}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Carbs</div>
                                        <div>{meal.nutritionalInfo.carbs}</div>
                                      </div>
                                      <div className="text-center p-2 bg-muted/50 rounded-md">
                                        <div className="font-medium">Fat</div>
                                        <div>{meal.nutritionalInfo.fat}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No dinner recommendations available</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="thisWeek">
                <div className="space-y-4">
                  {mealPlan.length > 0 ? (
                    mealPlan.map(day => (
                      <Card key={day.date} className={`${isToday(day.date) ? 'border-primary' : ''}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex justify-between items-center">
                            <span>{formatDate(day.date)}</span>
                            {isToday(day.date) && <Badge variant="default">Today</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="font-medium">Breakfast:</span>
                              <div className="pl-4 text-muted-foreground">
                                {breakfastOptions.length > 0 ? 
                                  breakfastOptions.slice(0, 1).map((meal, index) => (
                                    <div key={index}>{meal.name}</div>
                                  )) : 
                                  day.breakfast.map((item, index) => (
                                    <div key={index}>{item.name}</div>
                                  ))
                                }
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Lunch:</span>
                              <div className="pl-4 text-muted-foreground">
                                {lunchOptions.length > 0 ? 
                                  lunchOptions.slice(0, 1).map((meal, index) => (
                                    <div key={index}>{meal.name}</div>
                                  )) : 
                                  day.lunch.map((item, index) => (
                                    <div key={index}>{item.name}</div>
                                  ))
                                }
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Dinner:</span>
                              <div className="pl-4 text-muted-foreground">
                                {dinnerOptions.length > 0 ? 
                                  dinnerOptions.slice(0, 1).map((meal, index) => (
                                    <div key={index}>{meal.name}</div>
                                  )) : 
                                  day.dinner.map((item, index) => (
                                    <div key={index}>{item.name}</div>
                                  ))
                                }
                              </div>
                            </div>
                            <div>
                              <span className="font-medium">Snacks:</span>
                              <div className="pl-4 text-muted-foreground">
                                {day.snacks.map((item, index) => (
                                  <div key={index}>{item.name}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No meal plan available for this week</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="mealTypes">
                <Tabs defaultValue="breakfast">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                    <TabsTrigger value="lunch">Lunch</TabsTrigger>
                    <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="breakfast">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-3">
                        {breakfastOptions.length > 0 ? (
                          breakfastOptions.map((meal, index) => (
                            <Card key={`all-breakfast-${index}`} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{meal.name}</h4>
                                      <p className="text-sm text-muted-foreground">{meal.description}</p>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => toggleRecipe(`all-breakfast-${index}`)}
                                    >
                                      {expandedRecipe === `all-breakfast-${index}` ? 
                                        <ChevronUp className="h-4 w-4" /> : 
                                        <ChevronDown className="h-4 w-4" />
                                      }
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{meal.prepTime || '10 minutes'} prep + {meal.cookTime || '20 minutes'} cook</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {meal.nutritionalInfo.calories} cal
                                    </Badge>
                                  </div>
                                  
                                  {expandedRecipe === `all-breakfast-${index}` && (
                                    <div className="mt-4 space-y-4">
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                        <ul className="space-y-1">
                                          {meal.ingredients.map((ingredient, i) => (
                                            <li key={i} className="text-sm flex items-start">
                                              <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                              {ingredient}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <Separator />
                                      
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                        <ol className="space-y-2">
                                          {meal.instructions.map((step, i) => (
                                            <li key={i} className="text-sm ml-5 list-decimal">
                                              {step}
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No breakfast recommendations available</p>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="lunch">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-3">
                        {lunchOptions.length > 0 ? (
                          lunchOptions.map((meal, index) => (
                            <Card key={`all-lunch-${index}`} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{meal.name}</h4>
                                      <p className="text-sm text-muted-foreground">{meal.description}</p>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => toggleRecipe(`all-lunch-${index}`)}
                                    >
                                      {expandedRecipe === `all-lunch-${index}` ? 
                                        <ChevronUp className="h-4 w-4" /> : 
                                        <ChevronDown className="h-4 w-4" />
                                      }
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{meal.prepTime || '10 minutes'} prep + {meal.cookTime || '30 minutes'} cook</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {meal.nutritionalInfo.calories} cal
                                    </Badge>
                                  </div>
                                  
                                  {expandedRecipe === `all-lunch-${index}` && (
                                    <div className="mt-4 space-y-4">
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                        <ul className="space-y-1">
                                          {meal.ingredients.map((ingredient, i) => (
                                            <li key={i} className="text-sm flex items-start">
                                              <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                              {ingredient}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <Separator />
                                      
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                        <ol className="space-y-2">
                                          {meal.instructions.map((step, i) => (
                                            <li key={i} className="text-sm ml-5 list-decimal">
                                              {step}
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No lunch recommendations available</p>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="dinner">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-3">
                        {dinnerOptions.length > 0 ? (
                          dinnerOptions.map((meal, index) => (
                            <Card key={`all-dinner-${index}`} className="overflow-hidden">
                              <CardContent className="p-0">
                                <div className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{meal.name}</h4>
                                      <p className="text-sm text-muted-foreground">{meal.description}</p>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => toggleRecipe(`all-dinner-${index}`)}
                                    >
                                      {expandedRecipe === `all-dinner-${index}` ? 
                                        <ChevronUp className="h-4 w-4" /> : 
                                        <ChevronDown className="h-4 w-4" />
                                      }
                                    </Button>
                                  </div>
                                  
                                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{meal.prepTime || '15 minutes'} prep + {meal.cookTime || '25 minutes'} cook</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {meal.nutritionalInfo.calories} cal
                                    </Badge>
                                  </div>
                                  
                                  {expandedRecipe === `all-dinner-${index}` && (
                                    <div className="mt-4 space-y-4">
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Ingredients:</h5>
                                        <ul className="space-y-1">
                                          {meal.ingredients.map((ingredient, i) => (
                                            <li key={i} className="text-sm flex items-start">
                                              <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                              {ingredient}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      
                                      <Separator />
                                      
                                      <div>
                                        <h5 className="text-sm font-medium mb-2">Instructions:</h5>
                                        <ol className="space-y-2">
                                          {meal.instructions.map((step, i) => (
                                            <li key={i} className="text-sm ml-5 list-decimal">
                                              {step}
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">No dinner recommendations available</p>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No AI-powered meal plan available. Try setting cuisine preferences and generating a new plan.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MealPlanDisplay;
