
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildProfile } from '../onboarding/ChildProfileForm';
import { 
  getExerciseRecommendations, 
  getCheatMealRecommendations, 
  recordPreference,
  getPreferences
} from './RecommendationsService';
import { ExternalLink, ChevronDown, Check, Star, ThumbsUp, Calendar, RefreshCw, Sparkles, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface RecommendationsDisplayProps {
  childProfile: ChildProfile;
}

const RecommendationsDisplay: React.FC<RecommendationsDisplayProps> = ({ childProfile }) => {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState<any[]>([]);
  const [cheatMeals, setCheatMeals] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  // AI personalization data
  const [exerciseAIExplanation, setExerciseAIExplanation] = useState<string>('');
  const [mealsAIExplanation, setMealsAIExplanation] = useState<string>('');
  const [exercisePersonalizationScore, setExercisePersonalizationScore] = useState<number>(0);
  const [mealsPersonalizationScore, setMealsPersonalizationScore] = useState<number>(0);
  
  // Get today's date formatted
  const getTodayFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        // Get ML-enhanced recommendations with AI personalization
        const exerciseData = await getExerciseRecommendations(childProfile);
        setExerciseVideos(exerciseData.recommendations);
        setExerciseAIExplanation(exerciseData.aiExplanation);
        setExercisePersonalizationScore(exerciseData.personalizationScore);
        
        const cheatMealData = await getCheatMealRecommendations(childProfile);
        setCheatMeals(cheatMealData.recommendations);
        setMealsAIExplanation(cheatMealData.aiExplanation);
        setMealsPersonalizationScore(cheatMealData.personalizationScore);
        
        // Load user preferences
        setPreferences(getPreferences(childProfile.id));
      } catch (error) {
        console.error('Error loading recommendations:', error);
        toast.error('Failed to load personalized recommendations');
      } finally {
        setLoading(false);
      }
    };
    
    loadRecommendations();
  }, [childProfile, refreshKey]);
  
  const toggleRecipe = (id: string) => {
    if (expandedRecipe === id) {
      setExpandedRecipe(null);
    } else {
      setExpandedRecipe(id);
    }
  };
  
  const handleRateExercise = (videoId: string, score: number) => {
    recordPreference(childProfile.id, videoId, score, 'exercise');
    toast.success('Your rating has been saved');
    
    // Update preferences in state
    setPreferences(getPreferences(childProfile.id));
    
    // Refresh recommendations after a short delay
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 500);
  };
  
  const handleRateRecipe = (recipeId: string, score: number) => {
    recordPreference(childProfile.id, recipeId, score, 'meal');
    toast.success('Your rating has been saved');
    
    // Update preferences in state
    setPreferences(getPreferences(childProfile.id));
    
    // Refresh recommendations after a short delay
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 500);
  };
  
  const getRatingButtons = (id: string, type: 'exercise' | 'meal') => {
    // Get current rating if it exists
    const currentRating = preferences ? 
      (type === 'exercise' ? preferences.exercisePreferences[id] : preferences.mealPreferences[id]) : 
      0;
    
    return (
      <div className="flex items-center space-x-1 mt-2">
        <span className="text-xs text-muted-foreground mr-1">Rate:</span>
        {[7, 8, 9, 10].map((score) => (
          <Button
            key={score}
            variant={currentRating === score ? "default" : "outline"}
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => type === 'exercise' ? 
              handleRateExercise(id, score) : 
              handleRateRecipe(id, score)
            }
          >
            {score === 10 ? <ThumbsUp className="h-3 w-3" /> : score}
          </Button>
        ))}
      </div>
    );
  };
  
  const PersonalizationIndicator = ({ score, explanation }: { score: number, explanation: string }) => (
    <div className="bg-muted/50 p-3 rounded-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Brain className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">AI Personalization</span>
        </div>
        <span className="text-sm font-semibold">{score}%</span>
      </div>
      <Progress value={score} className="h-2 mb-2" />
      <p className="text-xs text-muted-foreground">{explanation}</p>
    </div>
  );
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <RefreshCw className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-center text-muted-foreground">
            AI is personalizing recommendations for {childProfile.name}...
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Daily Recommendations for {childProfile.name}</span>
              <Sparkles className="h-5 w-5 ml-2 text-yellow-500" />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => setRefreshKey(prev => prev + 1)}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {getTodayFormatted()} - AI-personalized for maximum effectiveness
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exercise">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exercise">Today's Exercise Videos</TabsTrigger>
            <TabsTrigger value="meals">Today's Fun Treat Recipes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercise" className="mt-4 space-y-4">
            <PersonalizationIndicator 
              score={exercisePersonalizationScore} 
              explanation={exerciseAIExplanation}
            />
            
            {exerciseVideos.length > 0 ? (
              exerciseVideos.map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.duration} minutes</p>
                        </div>
                        <a 
                          href={video.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md text-sm flex items-center"
                        >
                          Watch <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                      <p className="mt-2 text-sm">{video.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {video.tags.map(tag => (
                          <span key={tag} className="bg-secondary rounded-full px-2 py-0.5 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {getRatingButtons(video.id, 'exercise')}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p>No exercise videos match {childProfile.name}'s profile. Try updating their activity level.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="meals" className="mt-4 space-y-4">
            <PersonalizationIndicator 
              score={mealsPersonalizationScore} 
              explanation={mealsAIExplanation}
            />
            
            {cheatMeals.length > 0 ? (
              cheatMeals.map(recipe => (
                <Card key={recipe.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{recipe.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {recipe.prepTimeMinutes} mins | {recipe.calories} calories
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleRecipe(recipe.id)}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedRecipe === recipe.id ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>
                    <p className="mt-1 text-sm">{recipe.description}</p>
                    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                      <span>Protein: {recipe.protein}g</span>
                      <span>Carbs: {recipe.carbs}g</span>
                      <span>Fat: {recipe.fat}g</span>
                    </div>
                    {getRatingButtons(recipe.id, 'meal')}
                    
                    {expandedRecipe === recipe.id && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Ingredients:</h4>
                          <ul className="space-y-1">
                            {recipe.ingredients.map((ingredient, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <Check className="h-3 w-3 mr-2 mt-1 text-green-500" />
                                {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Instructions:</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((step, index) => (
                              <li key={index} className="text-sm ml-5 list-decimal">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p>No recipe suggestions match {childProfile.name}'s dietary preferences. Try updating their diet type.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RecommendationsDisplay;
