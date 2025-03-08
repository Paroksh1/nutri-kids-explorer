
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../auth/AuthForm';
import { getChildProfiles, ChildProfile } from '../onboarding/ChildProfileForm';
import { Plus, LogOut, User, Apple, Utensils, Calendar } from 'lucide-react';
import MealPlanDisplay from '../meal/MealPlanDisplay';
import MealTracker from '../meal/MealTracker';
import { getNutritionSummary } from '../meal/MealService';

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
      
      // Get nutrition summary for the active child
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
        {/* Sidebar */}
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
        
        {/* Main Content */}
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
                  <TabsTrigger value="meal-plan">
                    <Calendar className="mr-2 h-4 w-4" /> Meal Plan
                  </TabsTrigger>
                  <TabsTrigger value="tracking">
                    <Utensils className="mr-2 h-4 w-4" /> Food Tracking
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button 
                          className="w-full justify-start" 
                          onClick={() => setActiveTab('tracking')}
                        >
                          <Utensils className="mr-2 h-4 w-4" /> Log Food
                        </Button>
                        <Button 
                          className="w-full justify-start" 
                          onClick={() => setActiveTab('meal-plan')}
                        >
                          <Calendar className="mr-2 h-4 w-4" /> View Meal Plan
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          Based on {activeChild.name}'s profile:
                        </p>
                        <ul className="space-y-2 text-sm list-disc pl-5">
                          <li>Increase calcium intake for optimal bone development</li>
                          <li>Maintain hydration with at least 6-8 glasses of water daily</li>
                          <li>Include more colorful vegetables in meals</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="meal-plan" className="mt-4">
                  {activeChild && <MealPlanDisplay childId={activeChild.id} />}
                </TabsContent>
                
                <TabsContent value="tracking" className="mt-4">
                  {activeChild && <MealTracker childId={activeChild.id} />}
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
