
import React, { useState, useEffect } from 'react';
import { getChildProfiles } from '@/components/onboarding/ChildProfileForm';
import RecommendationsDisplay from '@/components/recommendations/RecommendationsDisplay';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Recommendations = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [children, setChildren] = useState(getChildProfiles());
  
  useEffect(() => {
    // Update children profiles when component mounts
    setChildren(getChildProfiles());
    
    // Set the first child as default if available
    if (children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].id);
    }
  }, []);
  
  const selectedChild = children.find(child => child.id === selectedChildId);
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ML-Powered Recommendations
      </h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How Our ML System Works</CardTitle>
          <CardDescription>
            Our machine learning system analyzes preferences and provides personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Collaborative Filtering</h3>
              <p className="text-sm text-muted-foreground">
                Our system identifies patterns in your preferences and matches them with similar users
                to recommend content you're likely to enjoy.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Preference Learning</h3>
              <p className="text-sm text-muted-foreground">
                Rate exercises and recipes to improve your recommendations. The more you interact,
                the more personalized your recommendations become.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Content-Based Filtering</h3>
              <p className="text-sm text-muted-foreground">
                Our system analyzes the attributes of recipes and exercises you like to find 
                similar content that matches your preferences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {children.length > 0 ? (
        <div className="space-y-6">
          <div className="w-full max-w-xs mx-auto">
            <Select
              value={selectedChildId}
              onValueChange={setSelectedChildId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a child" />
              </SelectTrigger>
              <SelectContent>
                {children.map(child => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} ({child.age} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedChild && (
            <RecommendationsDisplay childProfile={selectedChild} />
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="mb-4">No child profiles found. Add a child profile to get personalized recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Recommendations;
