
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildProfile } from '../onboarding/ChildProfileForm';
import { getExerciseRecommendations, getCheatMealRecommendations } from './RecommendationsService';
import { ExternalLink, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface RecommendationsDisplayProps {
  childProfile: ChildProfile;
}

const RecommendationsDisplay: React.FC<RecommendationsDisplayProps> = ({ childProfile }) => {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const exerciseVideos = getExerciseRecommendations(childProfile);
  const cheatMeals = getCheatMealRecommendations(childProfile);
  
  const toggleRecipe = (id: string) => {
    if (expandedRecipe === id) {
      setExpandedRecipe(null);
    } else {
      setExpandedRecipe(id);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personalized Recommendations for {childProfile.name}</CardTitle>
        <CardDescription>
          Exercise videos and occasional treats tailored to {childProfile.name}'s age, preferences, and activity level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exercise">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exercise">Exercise Videos</TabsTrigger>
            <TabsTrigger value="meals">Fun Treat Recipes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exercise" className="mt-4 space-y-4">
            {exerciseVideos.length > 0 ? (
              exerciseVideos.map(video => (
                <Card key={video.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.durationMinutes} minutes</p>
                        </div>
                        <a 
                          href={video.url} 
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
