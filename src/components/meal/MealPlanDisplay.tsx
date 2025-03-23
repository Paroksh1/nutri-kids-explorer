import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChildProfile, getChildProfiles } from '@/components/onboarding/ChildProfileForm';
import { getRecipeRecommendations, getExerciseRecommendations } from '@/components/recommendations/RecommendationsService';
import { assessChildHealth } from '@/utils/healthAssessment';
import { Utensils, Clock, Award, Dumbbell, Star, Flame, ArrowRight, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface MealPlanDisplayProps {
  childId: string;
  customMealPlans?: any[];
  customExerciseRecommendations?: any[];
}

interface NutrientInfo {
  protein: string;
  carbs: string;
  fat: string;
  calcium?: string;
  iron?: string;
  vitaminD?: string;
  fiber?: string;
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

interface MealItem {
  id?: string;
  title: string;
  name?: string;
  description: string;
  imageUrl?: string;
  mealType: MealType;
  prepTime?: string;
  cookTime?: string;
  prepTimeMinutes?: number;
  nutritionInfo?: {
    calories: number | string;
    protein: string;
    carbs: string;
    fat: string;
    calcium?: string;
    iron?: string;
    vitaminD?: string;
    fiber?: string;
  };
  ingredients?: string[];
  instructions?: string[];
  benefits?: string[];
  suitableFor?: string[];
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ 
  childId,
  customMealPlans,
  customExerciseRecommendations
}) => {
  const [activeTab, setActiveTab] = useState('meals');
  const [activeMealTab, setActiveMealTab] = useState<MealType>('breakfast');
  const [mealPlans, setMealPlans] = useState<MealItem[]>([]);
  const [exerciseRecommendations, setExerciseRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [totalDailyNutrients, setTotalDailyNutrients] = useState<NutrientInfo | null>(null);
  
  useEffect(() => {
    const profiles = getChildProfiles();
    const profile = profiles.find(p => p.id === childId);
    setChildProfile(profile || null);
    
    const loadRecommendations = async () => {
      if (profile) {
        setIsLoading(true);
        try {
          if (customMealPlans && customMealPlans.length > 0) {
            setMealPlans(customMealPlans);
            calculateDailyNutrients(customMealPlans);
          } else {
            const mealResponse = await getRecipeRecommendations(profile);
            setMealPlans(mealResponse.recommendations || []);
            calculateDailyNutrients(mealResponse.recommendations || []);
          }
          
          if (customExerciseRecommendations && customExerciseRecommendations.length > 0) {
            setExerciseRecommendations(customExerciseRecommendations);
          } else {
            const exerciseResponse = await getExerciseRecommendations(profile);
            setExerciseRecommendations(exerciseResponse.recommendations || []);
          }
        } catch (error) {
          console.error('Error loading recommendations:', error);
          toast({
            title: "Error",
            description: "Failed to load personalized recommendations",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadRecommendations();
  }, [childId, customMealPlans, customExerciseRecommendations]);
  
  const calculateDailyNutrients = (meals: MealItem[]) => {
    if (!meals || meals.length === 0) {
      setTotalDailyNutrients(null);
      return;
    }
    
    const totals: { [key: string]: number } = {
      protein: 0,
      carbs: 0,
      fat: 0,
      calcium: 0,
      iron: 0,
      vitaminD: 0,
      fiber: 0
    };
    
    let countedMeals = 0;
    
    meals.forEach(meal => {
      if (meal.nutritionInfo) {
        countedMeals++;
        
        const extractNumber = (value: string | undefined): number => {
          if (!value) return 0;
          const match = value.match(/\d+(\.\d+)?/);
          return match ? parseFloat(match[0]) : 0;
        };
        
        if (meal.nutritionInfo.protein) totals.protein += extractNumber(meal.nutritionInfo.protein);
        if (meal.nutritionInfo.carbs) totals.carbs += extractNumber(meal.nutritionInfo.carbs);
        if (meal.nutritionInfo.fat) totals.fat += extractNumber(meal.nutritionInfo.fat);
        if (meal.nutritionInfo.calcium) totals.calcium += extractNumber(meal.nutritionInfo.calcium);
        if (meal.nutritionInfo.iron) totals.iron += extractNumber(meal.nutritionInfo.iron);
        if (meal.nutritionInfo.vitaminD) totals.vitaminD += extractNumber(meal.nutritionInfo.vitaminD);
        if (meal.nutritionInfo.fiber) totals.fiber += extractNumber(meal.nutritionInfo.fiber);
      }
    });
    
    if (countedMeals > 0) {
      setTotalDailyNutrients({
        protein: `${Math.round(totals.protein)}g`,
        carbs: `${Math.round(totals.carbs)}g`,
        fat: `${Math.round(totals.fat)}g`,
        calcium: totals.calcium ? `${Math.round(totals.calcium)}mg` : undefined,
        iron: totals.iron ? `${Math.round(totals.iron)}mg` : undefined,
        vitaminD: totals.vitaminD ? `${Math.round(totals.vitaminD)}IU` : undefined,
        fiber: totals.fiber ? `${Math.round(totals.fiber)}g` : undefined
      });
    } else {
      setTotalDailyNutrients(null);
    }
  };
  
  useEffect(() => {
    if (customMealPlans && customMealPlans.length > 0) {
      setMealPlans(customMealPlans);
      calculateDailyNutrients(customMealPlans);
    }
    
    if (customExerciseRecommendations && customExerciseRecommendations.length > 0) {
      setExerciseRecommendations(customExerciseRecommendations);
    }
  }, [customMealPlans, customExerciseRecommendations]);
  
  const getPersonalizedMealTitle = () => {
    if (!childProfile) return "Personalized Meal Plan";
    
    const assessment = assessChildHealth(childProfile);
    
    switch (assessment.recommendedFocus) {
      case 'weight-gain':
        return "Growth-Focused Meal Plan";
      case 'weight-loss':
        return "Balanced Weight Management Plan";
      case 'maintenance':
        return "Optimal Development Meal Plan";
      case 'balanced-weight-loss':
        return "Balanced Nutrition Plan";
      default:
        return "Personalized Meal Plan";
    }
  };

  const getMealsByType = (type: MealType): MealItem[] => {
    return mealPlans.filter(meal => 
      meal.mealType === type || 
      ((!meal.mealType || meal.mealType === '') && 
       ((type === 'breakfast' && (meal.title?.toLowerCase().includes('breakfast') || meal.name?.toLowerCase().includes('breakfast'))) ||
        (type === 'lunch' && (meal.title?.toLowerCase().includes('lunch') || meal.name?.toLowerCase().includes('lunch'))) ||
        (type === 'dinner' && (meal.title?.toLowerCase().includes('dinner') || meal.name?.toLowerCase().includes('dinner'))) ||
        (type === 'snack' && (meal.title?.toLowerCase().includes('snack') || meal.name?.toLowerCase().includes('snack')))))
    );
  };

  const getMealTypeIcon = (type: MealType) => {
    switch (type) {
      case 'breakfast':
        return <Coffee className="h-4 w-4 mr-2" />;
      case 'lunch':
        return <Sun className="h-4 w-4 mr-2" />;
      case 'dinner':
        return <Moon className="h-4 w-4 mr-2" />;
      case 'snack':
        return <Cookie className="h-4 w-4 mr-2" />;
      default:
        return <Utensils className="h-4 w-4 mr-2" />;
    }
  };
  
  const getNutritionalNeeds = () => {
    if (!childProfile) return null;
    
    const age = childProfile.age;
    const assessment = assessChildHealth(childProfile);
    
    let proteinRec = 0;
    let calciumRec = 0;
    let ironRec = 0;
    
    if (age < 4) {
      proteinRec = 13;
      calciumRec = 700;
      ironRec = 7;
    } else if (age < 9) {
      proteinRec = 19;
      calciumRec = 1000;
      ironRec = 10;
    } else if (age < 14) {
      proteinRec = childProfile.gender === 'male' ? 34 : 34;
      calciumRec = 1300;
      ironRec = childProfile.gender === 'male' ? 8 : 8;
    } else if (age < 19) {
      proteinRec = childProfile.gender === 'male' ? 52 : 46;
      calciumRec = 1300;
      ironRec = childProfile.gender === 'male' ? 11 : 15;
    }
    
    let activityMultiplier = 1.0;
    switch (childProfile.activityLevel) {
      case 'very-active':
        activityMultiplier = 1.3;
        break;
      case 'active':
        activityMultiplier = 1.2;
        break;
      case 'somewhat-active':
        activityMultiplier = 1.1;
        break;
      default:
        activityMultiplier = 1.0;
    }
    
    proteinRec = Math.round(proteinRec * activityMultiplier);
    
    if (assessment.recommendedFocus === 'weight-gain') {
      proteinRec = Math.round(proteinRec * 1.2);
    }
    
    return {
      protein: `${proteinRec}g`,
      calcium: `${calciumRec}mg`,
      iron: `${ironRec}mg`
    };
  };
  
  const nutritionalNeeds = getNutritionalNeeds();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getPersonalizedMealTitle()}</CardTitle>
        <CardDescription>
          {childProfile && `Tailored specifically for ${childProfile.name}'s nutritional needs and preferences`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meals" className="flex items-center">
              <Utensils className="h-4 w-4 mr-2" /> Meal Recommendations
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center">
              <Dumbbell className="h-4 w-4 mr-2" /> Exercise Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meals" className="pt-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-pulse h-4 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                <div className="animate-pulse h-32 bg-muted rounded w-full mx-auto"></div>
              </div>
            ) : mealPlans.length > 0 ? (
              <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Daily Nutrition Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-background p-3 rounded-md">
                        <h4 className="text-sm font-semibold">Protein</h4>
                        <div className="flex justify-between">
                          <p className="text-lg font-bold text-primary">{totalDailyNutrients?.protein || "0g"}</p>
                          {nutritionalNeeds && (
                            <p className="text-sm text-muted-foreground">Target: {nutritionalNeeds.protein}</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-background p-3 rounded-md">
                        <h4 className="text-sm font-semibold">Carbohydrates</h4>
                        <p className="text-lg font-bold text-primary">{totalDailyNutrients?.carbs || "0g"}</p>
                      </div>
                      <div className="bg-background p-3 rounded-md">
                        <h4 className="text-sm font-semibold">Calcium</h4>
                        <div className="flex justify-between">
                          <p className="text-lg font-bold text-primary">{totalDailyNutrients?.calcium || "0mg"}</p>
                          {nutritionalNeeds && (
                            <p className="text-sm text-muted-foreground">Target: {nutritionalNeeds.calcium}</p>
                          )}
                        </div>
                      </div>
                      <div className="bg-background p-3 rounded-md">
                        <h4 className="text-sm font-semibold">Iron</h4>
                        <div className="flex justify-between">
                          <p className="text-lg font-bold text-primary">{totalDailyNutrients?.iron || "0mg"}</p>
                          {nutritionalNeeds && (
                            <p className="text-sm text-muted-foreground">Target: {nutritionalNeeds.iron}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Tabs value={activeMealTab} onValueChange={setActiveMealTab as any} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="breakfast" className="flex items-center">
                      <Coffee className="h-4 w-4 mr-2" /> Breakfast
                    </TabsTrigger>
                    <TabsTrigger value="lunch" className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" /> Lunch
                    </TabsTrigger>
                    <TabsTrigger value="dinner" className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" /> Dinner
                    </TabsTrigger>
                    <TabsTrigger value="snack" className="flex items-center">
                      <Cookie className="h-4 w-4 mr-2" /> Snacks
                    </TabsTrigger>
                  </TabsList>
                  
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => (
                    <TabsContent key={mealType} value={mealType} className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getMealsByType(mealType).length > 0 ? (
                          getMealsByType(mealType).slice(0, 4).map((recipe, index) => (
                            <Card key={recipe.id || `${mealType}-${index}`} className="overflow-hidden">
                              <div className="aspect-video relative bg-muted">
                                {recipe.imageUrl ? (
                                  <img 
                                    src={recipe.imageUrl} 
                                    alt={recipe.title || recipe.name} 
                                    className="object-cover w-full h-full" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    {getMealTypeIcon(mealType)}
                                  </div>
                                )}
                                
                                <div className="absolute top-2 right-2">
                                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                    <Flame className="h-3 w-3 mr-1 text-orange-500" />
                                    {recipe.nutritionInfo?.calories || "~300"} cal
                                  </Badge>
                                </div>
                              </div>
                              
                              <CardHeader className="p-3">
                                <CardTitle className="text-lg">{recipe.title || recipe.name}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                  {recipe.description}
                                </CardDescription>
                              </CardHeader>
                              
                              <CardContent className="p-3 pt-0">
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>
                                    {recipe.prepTime && recipe.cookTime 
                                      ? `Prep: ${recipe.prepTime}m | Cook: ${recipe.cookTime}m` 
                                      : recipe.prepTimeMinutes
                                        ? `Prep time: ${recipe.prepTimeMinutes}m`
                                        : "Ready in 30 minutes"}
                                  </span>
                                </div>
                                
                                {recipe.nutritionInfo && (
                                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                                    <div>
                                      <span className="block text-muted-foreground">Protein</span>
                                      <span className="font-medium">{recipe.nutritionInfo.protein || "-"}</span>
                                    </div>
                                    <div>
                                      <span className="block text-muted-foreground">Carbs</span>
                                      <span className="font-medium">{recipe.nutritionInfo.carbs || "-"}</span>
                                    </div>
                                    <div>
                                      <span className="block text-muted-foreground">Fat</span>
                                      <span className="font-medium">{recipe.nutritionInfo.fat || "-"}</span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span className="text-sm font-medium">
                                      Perfect match for {childProfile?.name}
                                    </span>
                                  </div>
                                  <Button variant="ghost" size="sm" className="text-primary">
                                    <span className="mr-1">View</span>
                                    <ArrowRight className="h-3 w-3" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-8">
                            <p>No {mealType} recommendations found.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No meal recommendations found. Try generating new recommendations.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="exercises" className="pt-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-pulse h-4 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                <div className="animate-pulse h-32 bg-muted rounded w-full mx-auto"></div>
              </div>
            ) : exerciseRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exerciseRecommendations.slice(0, 4).map((exercise, index) => (
                  <Card key={exercise.id || index}>
                    <div className="aspect-video relative bg-muted">
                      {exercise.thumbnailUrl ? (
                        <img 
                          src={exercise.thumbnailUrl} 
                          alt={exercise.title} 
                          className="object-cover w-full h-full" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Dumbbell className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {exercise.intensity || "Moderate"} intensity
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {exercise.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{exercise.duration || 20} minutes</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-primary mr-1" />
                          <span className="text-sm font-medium">
                            Ideal for {childProfile?.name}'s activity level
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary"
                          onClick={() => {
                            if (exercise.videoUrl) {
                              window.open(exercise.videoUrl, '_blank');
                            }
                          }}
                        >
                          <span className="mr-1">Watch</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No exercise recommendations found. Try generating new recommendations.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MealPlanDisplay;
