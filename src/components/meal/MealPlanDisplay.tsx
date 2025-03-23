import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChildProfile, getChildProfiles } from '@/components/onboarding/ChildProfileForm';
import { getRecipeRecommendations, getExerciseRecommendations } from '@/components/recommendations/RecommendationsService';
import { assessChildHealth } from '@/utils/healthAssessment';
import { Utensils, Clock, Award, Dumbbell, Star, Flame, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface MealPlanDisplayProps {
  childId: string;
  customMealPlans?: any[];
  customExerciseRecommendations?: any[];
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ 
  childId,
  customMealPlans,
  customExerciseRecommendations
}) => {
  const [activeTab, setActiveTab] = useState('meals');
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [exerciseRecommendations, setExerciseRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  
  useEffect(() => {
    const profiles = getChildProfiles();
    const profile = profiles.find(p => p.id === childId);
    setChildProfile(profile || null);
    
    const loadRecommendations = async () => {
      if (profile) {
        setIsLoading(true);
        try {
          // If custom recommendations are provided, use them
          if (customMealPlans && customMealPlans.length > 0) {
            setMealPlans(customMealPlans);
          } else {
            // Otherwise get new recommendations
            const mealResponse = await getRecipeRecommendations(profile);
            setMealPlans(mealResponse.recommendations || []);
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
  
  // Update when custom recommendations change
  useEffect(() => {
    if (customMealPlans && customMealPlans.length > 0) {
      setMealPlans(customMealPlans);
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mealPlans.slice(0, 4).map((recipe, index) => (
                  <Card key={recipe.id || index} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      {recipe.imageUrl ? (
                        <img 
                          src={recipe.imageUrl} 
                          alt={recipe.title || recipe.name} 
                          className="object-cover w-full h-full" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Utensils className="h-8 w-8 text-muted-foreground" />
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
                ))}
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
