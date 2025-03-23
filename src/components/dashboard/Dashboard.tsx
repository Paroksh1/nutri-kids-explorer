import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../auth/AuthForm';
import { getChildProfiles, ChildProfile } from '../onboarding/ChildProfileForm';
import { Plus, LogOut, User, Apple, Utensils, Calendar, Activity, GraduationCap } from 'lucide-react';
import MealTracker from '../meal/MealTracker';
import { getNutritionSummary } from '../meal/MealService';
import RecommendationsDisplay from '../recommendations/RecommendationsDisplay';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [nutritionSummary, setNutritionSummary] = useState<any>(null);
  
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    const profiles = getChildProfiles();
    setChildProfiles(profiles);
    
    if (profiles.length > 0) {
      setActiveChild(profiles[0]);
      
      const summary = getNutritionSummary(profiles[0].id);
      setNutritionSummary(summary);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleAddChild = () => {
    navigate('/onboarding');
  };
  
  const handleSelectChild = (child: ChildProfile) => {
    setActiveChild(child);
    const summary = getNutritionSummary(child.id);
    setNutritionSummary(summary);
  };
  
  const navigateToMealPlans = () => {
    navigate('/meal-plans');
  };
  
  const navigateToRecommendations = () => {
    navigate('/recommendations');
  };
  
  const navigateToEducation = () => {
    navigate('/education');
  };
  
  if (!activeChild && childProfiles.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to NutriYouth</CardTitle>
            <CardDescription>You haven't added any child profiles yet.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6">
            <Button onClick={handleAddChild} className="mb-4">
              <Plus className="mr-2 h-4 w-4" /> Add Child Profile
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <Card className="w-full md:w-64 lg:w-72">
          <CardHeader>
            <CardTitle className="text-xl">NutriYouth</CardTitle>
            <CardDescription>
              {getCurrentUser()?.firstName}'s Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Child Profiles</h3>
                <div className="space-y-1">
                  {childProfiles.map(child => (
                    <Button
                      key={child.id}
                      variant={activeChild?.id === child.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleSelectChild(child)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      {child.name}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={handleAddChild}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Profile
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex-1">
          {activeChild && (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold">{activeChild.name}'s Nutrition</h1>
                <p className="text-muted-foreground">
                  {activeChild.age} years • {activeChild.weight}kg • {activeChild.dietType}
                </p>
              </div>
              
              <Tabs 
                defaultValue="overview" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">
                    <Apple className="mr-2 h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="tracking">
                    <Utensils className="mr-2 h-4 w-4" /> Food Tracking
                  </TabsTrigger>
                  <TabsTrigger value="ai-insights">
                    <Activity className="mr-2 h-4 w-4" /> AI Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nutritional Summary</CardTitle>
                      <CardDescription>
                        Today's nutrition progress based on recommended values
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {nutritionSummary ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-background/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-primary">
                              {nutritionSummary.calories.consumed} / {nutritionSummary.calories.recommended}
                            </div>
                            <p className="text-foreground/70 text-sm">Calories</p>
                          </div>
                          <div className="bg-background/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-500">
                              {nutritionSummary.protein.consumed}g / {nutritionSummary.protein.recommended}g
                            </div>
                            <p className="text-foreground/70 text-sm">Protein</p>
                          </div>
                          <div className="bg-background/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-500">
                              {nutritionSummary.carbs.consumed}g / {nutritionSummary.carbs.recommended}g
                            </div>
                            <p className="text-foreground/70 text-sm">Carbs</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center py-4">No nutrition data available yet. Start logging meals!</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-all duration-300 bg-gradient-to-br from-background to-primary/5">
                      <CardHeader>
                        <CardTitle>Meal Planning</CardTitle>
                        <CardDescription>View and manage weekly meal plans</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm mb-4">
                          Personalized meal plans based on {activeChild.name}'s nutritional needs and preferences.
                        </p>
                        <Button 
                          className="w-full justify-start bg-primary hover:bg-primary/90" 
                          onClick={navigateToMealPlans}
                        >
                          <Calendar className="mr-2 h-4 w-4" /> View Meal Plans
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-all duration-300 bg-gradient-to-br from-background to-secondary/5">
                      <CardHeader>
                        <CardTitle>AI Recommendations</CardTitle>
                        <CardDescription>Personalized nutrition insights</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Get AI-powered recommendations to optimize {activeChild.name}'s nutritional intake.
                        </p>
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
                          onClick={navigateToRecommendations}
                        >
                          <Activity className="mr-2 h-4 w-4" /> View Recommendations
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-all duration-300 bg-gradient-to-br from-background to-amber-500/5">
                      <CardHeader>
                        <CardTitle>Nutrition Education</CardTitle>
                        <CardDescription>Fun facts and quizzes for kids</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">
                          Explore fun nutrition facts and interactive quizzes to help {activeChild.name} learn about healthy eating.
                        </p>
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-amber-500 text-amber-600 hover:bg-amber-500/10 hover:text-amber-600"
                          onClick={navigateToEducation}
                        >
                          <GraduationCap className="mr-2 h-4 w-4" /> Learn About Nutrition
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="tracking" className="mt-4">
                  {activeChild && <MealTracker childId={activeChild.id} />}
                </TabsContent>
                
                <TabsContent value="ai-insights" className="mt-4">
                  {activeChild && <RecommendationsDisplay childProfile={activeChild} />}
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
