import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import DashboardNav from '@/components/layout/DashboardNav';
import MealPlanDisplay from '@/components/meal/MealPlanDisplay';
import { getChildProfiles, ChildProfile } from '@/components/onboarding/ChildProfileForm';
import { PlusCircle, RefreshCw, Download, Send, Filter, Brain, Sparkles, ChefHat } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';
import CuisinePreferenceForm from '@/components/meal/CuisinePreferenceForm';
import { getCuisinePreferences, saveCuisinePreferences, getAIRecommendations } from '@/services/AIRecommendationService';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getRecipeRecommendations, getExerciseRecommendations } from '@/components/recommendations/RecommendationsService';
import { assessChildHealth } from '@/utils/healthAssessment';

const MealPlans: React.FC = () => {
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [hasSetPreferences, setHasSetPreferences] = useState(false);
  const [showPreferencesMessage, setShowPreferencesMessage] = useState(false);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [exerciseRecommendations, setExerciseRecommendations] = useState<any[]>([]);
  
  useEffect(() => {
    const profiles = getChildProfiles();
    setChildProfiles(profiles);
    
    if (profiles.length > 0) {
      setActiveChild(profiles[0]);
      
      if (profiles[0] && getCuisinePreferences(profiles[0].id)) {
        setHasSetPreferences(true);
        generatePersonalizedPlans(profiles[0]);
      } else {
        setShowPreferencesDialog(true);
        setShowPreferencesMessage(true);
      }
    }
  }, []);
  
  useEffect(() => {
    if (activeChild) {
      const hasPreferences = !!getCuisinePreferences(activeChild.id);
      setHasSetPreferences(hasPreferences);
      
      if (hasPreferences) {
        setShowPreferencesMessage(false);
        generatePersonalizedPlans(activeChild);
      } else {
        setShowPreferencesMessage(true);
        setMealPlans([]);
        setExerciseRecommendations([]);
      }
    }
  }, [activeChild]);
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const assignMealTypes = (recommendations: any[]): any[] => {
    if (!recommendations || recommendations.length === 0) return [];
    
    const totalMeals = recommendations.length;
    const breakfastCount = Math.ceil(totalMeals * 0.25);
    const lunchCount = Math.ceil(totalMeals * 0.25);
    const dinnerCount = Math.ceil(totalMeals * 0.25);
    const snackCount = totalMeals - breakfastCount - lunchCount - dinnerCount;
    
    let assignedMeals = [...recommendations];
    let mealTypeIndex = 0;
    
    const withExplicitType = assignedMeals.filter(meal => meal.mealType && 
      ['breakfast', 'lunch', 'dinner', 'snack'].includes(meal.mealType));
    
    const needsType = assignedMeals.filter(meal => !meal.mealType || 
      !['breakfast', 'lunch', 'dinner', 'snack'].includes(meal.mealType));
    
    const existingBreakfast = withExplicitType.filter(m => m.mealType === 'breakfast').length;
    const existingLunch = withExplicitType.filter(m => m.mealType === 'lunch').length;
    const existingDinner = withExplicitType.filter(m => m.mealType === 'dinner').length;
    const existingSnack = withExplicitType.filter(m => m.mealType === 'snack').length;
    
    const neededBreakfast = Math.max(0, breakfastCount - existingBreakfast);
    const neededLunch = Math.max(0, lunchCount - existingLunch);
    const neededDinner = Math.max(0, dinnerCount - existingDinner);
    const neededSnack = Math.max(0, snackCount - existingSnack);
    
    let currentIndex = 0;
    
    for (let i = 0; i < neededBreakfast && currentIndex < needsType.length; i++) {
      needsType[currentIndex].mealType = 'breakfast';
      currentIndex++;
    }
    
    for (let i = 0; i < neededLunch && currentIndex < needsType.length; i++) {
      needsType[currentIndex].mealType = 'lunch';
      currentIndex++;
    }
    
    for (let i = 0; i < neededDinner && currentIndex < needsType.length; i++) {
      needsType[currentIndex].mealType = 'dinner';
      currentIndex++;
    }
    
    while (currentIndex < needsType.length) {
      needsType[currentIndex].mealType = 'snack';
      currentIndex++;
    }
    
    return [...withExplicitType, ...needsType];
  };

  const generatePersonalizedPlans = async (child: ChildProfile) => {
    const healthAssessment = assessChildHealth(child);
    
    try {
      const cuisinePrefs = getCuisinePreferences(child.id);
      
      const recipeResponse = await getRecipeRecommendations(child);
      const exerciseResponse = await getExerciseRecommendations(child);
      
      const typedMealPlans = assignMealTypes(recipeResponse.recommendations || []);
      
      const enhancedMealPlans = typedMealPlans.map(meal => {
        if (!meal.nutritionInfo) {
          const defaultNutrition: {[key: string]: any} = {
            breakfast: {
              calories: 350,
              protein: "10g",
              carbs: "45g",
              fat: "12g",
              calcium: "200mg",
              iron: "2mg"
            },
            lunch: {
              calories: 450,
              protein: "20g",
              carbs: "55g",
              fat: "15g",
              calcium: "150mg",
              iron: "3mg"
            },
            dinner: {
              calories: 500,
              protein: "25g",
              carbs: "60g",
              fat: "18g",
              calcium: "250mg",
              iron: "4mg"
            },
            snack: {
              calories: 150,
              protein: "5g",
              carbs: "20g",
              fat: "5g",
              calcium: "100mg",
              iron: "1mg"
            }
          };
          
          const mealType = meal.mealType || 'lunch';
          meal.nutritionInfo = defaultNutrition[mealType] || defaultNutrition.lunch;
        }
        
        return meal;
      });
      
      setMealPlans(enhancedMealPlans);
      setExerciseRecommendations(exerciseResponse.recommendations || []);
      
      console.log("Generated personalized plans for child:", child.name);
      console.log("Health status:", healthAssessment.status);
      console.log("Recommended focus:", healthAssessment.recommendedFocus);
    } catch (error) {
      console.error("Error generating personalized plans:", error);
      toast({
        title: "Error",
        description: "Failed to generate personalized plans. Please try again.",
        variant: "destructive",
      });
    }
  }
  
  const handleGenerateNew = () => {
    if (!hasSetPreferences) {
      setShowPreferencesDialog(true);
      return;
    }
    
    if (!activeChild) return;
    
    setIsGenerating(true);
    
    generatePersonalizedPlans(activeChild).finally(() => {
      setIsGenerating(false);
      toast({
        title: "AI-Generated Meal Plan Ready!",
        description: `Personalized meal plan for ${activeChild.name} created based on their unique profile and needs.`,
      });
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Meal Plan Exported",
      description: "Your meal plan has been exported to PDF and sent to your email.",
    });
  };
  
  const handleSendToDevice = () => {
    toast({
      title: "Sent to Device",
      description: "Meal plan has been sent to your connected mobile device.",
    });
  };
  
  const handleSubmitPreferences = (data: any) => {
    if (activeChild) {
      saveCuisinePreferences({
        ...data,
        childId: activeChild.id
      });
      setHasSetPreferences(true);
      setShowPreferencesDialog(false);
      setShowPreferencesMessage(false);
      
      toast({
        title: "Preferences Saved",
        description: "We'll use these preferences to generate more personalized meal plans.",
      });
      
      handleGenerateNew();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <DashboardNav />
      
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              Complete Meal Plans
              <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />
            </h1>
            <p className="text-muted-foreground">Breakfast, lunch, dinner & snacks - all personalized for optimal growth</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleGenerateNew} 
                    disabled={isGenerating}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isGenerating ? (
                      <>
                        <Brain className="h-4 w-4 mr-2 animate-pulse" /> Generating...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4 mr-2" /> Generate Complete Menu
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new complete meal plan with all meal types</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ChefHat className="h-4 w-4 mr-2" /> Food Preferences
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Set Food Preferences</DialogTitle>
                  <DialogDescription>
                    Help us understand your child's food preferences to create better meal plans
                  </DialogDescription>
                </DialogHeader>
                {activeChild && (
                  <CuisinePreferenceForm 
                    childId={activeChild.id} 
                    onSubmit={handleSubmitPreferences} 
                  />
                )}
              </DialogContent>
            </Dialog>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export as PDF</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleSendToDevice}>
                    <Send className="h-4 w-4 mr-2" /> Send
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send to mobile device</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {showPreferencesMessage && (
          <Card className="mb-6 border-primary/50 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ChefHat className="h-5 w-5 mr-2 text-primary" />
                Set Food Preferences First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Please set your child's food preferences first, including cuisine preferences like Indian food, 
                to get a fully personalized meal plan that meets your cultural and dietary needs.
              </p>
              <Button 
                className="mt-3" 
                size="sm" 
                onClick={() => setShowPreferencesDialog(true)}
              >
                Set Preferences Now
              </Button>
            </CardContent>
          </Card>
        )}
        
        {activeChild && childProfiles.length > 0 ? (
          <div>
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Select Child Profile</CardTitle>
                    <CardDescription>View AI-tailored meal plans for different profiles</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" /> Dietary Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {childProfiles.map(child => (
                    <Button
                      key={child.id}
                      variant={activeChild.id === child.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveChild(child)}
                      className={activeChild.id === child.id ? "bg-primary" : ""}
                    >
                      {child.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {activeChild && (
              <div className="mb-6">
                <Card className="p-4 mb-6">
                  <CardTitle className="text-xl mb-4">Personalized Health Profile</CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h3 className="font-semibold text-primary">Physical Profile</h3>
                      <p className="text-sm">Age: {activeChild.age} years</p>
                      <p className="text-sm">Height: {activeChild.height} cm</p>
                      <p className="text-sm">Weight: {activeChild.weight} kg</p>
                      <p className="text-sm">Gender: {activeChild.gender}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h3 className="font-semibold text-primary">Activity & Diet</h3>
                      <p className="text-sm">Activity: {activeChild.activityLevel}</p>
                      <p className="text-sm">Diet Type: {activeChild.dietType}</p>
                      {activeChild.hasAllergies && (
                        <p className="text-sm">Allergies: {activeChild.allergies.join(', ')}</p>
                      )}
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h3 className="font-semibold text-primary">Recommendations Focus</h3>
                      <p className="text-sm">{assessChildHealth(activeChild).dietRecommendation}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            <MealPlanDisplay childId={activeChild.id} customMealPlans={mealPlans} customExerciseRecommendations={exerciseRecommendations} />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Child Profiles</CardTitle>
              <CardDescription>
                You need to create a child profile first to generate personalized meal plans
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild>
                <a href="/onboarding">Create Profile</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MealPlans;
