
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isAuthenticated } from '@/components/auth/AuthForm';
import { Navigate } from 'react-router-dom';
import DashboardNav from '@/components/layout/DashboardNav';
import MealPlanDisplay from '@/components/meal/MealPlanDisplay';
import { getChildProfiles, ChildProfile } from '@/components/onboarding/ChildProfileForm';
import { PlusCircle, RefreshCw, Download, Send, Filter, Brain, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

const MealPlans: React.FC = () => {
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    const profiles = getChildProfiles();
    setChildProfiles(profiles);
    
    if (profiles.length > 0) {
      setActiveChild(profiles[0]);
    }
  }, []);
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  const handleGenerateNew = () => {
    setIsGenerating(true);
    
    // Simulating AI-powered meal plan generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "AI-Generated Meal Plan Ready!",
        description: "Your personalized meal plan has been created using advanced AI nutritional models.",
      });
    }, 2000);
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <DashboardNav />
      
      <div className="container mx-auto px-4 pt-24 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              AI-Powered Meal Plans
              <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />
            </h1>
            <p className="text-muted-foreground">Personalized nutrition driven by advanced AI for optimal growth</p>
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
                        <Brain className="h-4 w-4 mr-2 animate-pulse" /> AI Generating...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4 mr-2" /> Generate New Plan
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new AI-generated meal plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
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
            
            <MealPlanDisplay childId={activeChild.id} />
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
