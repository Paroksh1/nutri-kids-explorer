
import React, { useState, useEffect } from 'react';
import { getChildProfiles } from '@/components/onboarding/ChildProfileForm';
import RecommendationsDisplay from '@/components/recommendations/RecommendationsDisplay';
import HealthAssessmentCard from '@/components/recommendations/HealthAssessmentCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Zap, LineChart, BarChart3, Fingerprint, PieChart } from 'lucide-react';

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
        Personalized Health & Activity Recommendations
      </h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            Our Advanced ML Systems
          </CardTitle>
          <CardDescription>
            Multiple machine learning algorithms work together to provide highly personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-2 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Neural Network Prediction</h3>
                  <p className="text-sm text-muted-foreground">
                    Our deep learning models analyze thousands of data points to predict which activities and foods will be most beneficial and enjoyable for your child.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <LineChart className="h-5 w-5 mr-2 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Temporal Pattern Recognition</h3>
                  <p className="text-sm text-muted-foreground">
                    Our algorithms identify patterns in your child's activity over time, adapting recommendations based on seasonal preferences and development stages.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Fingerprint className="h-5 w-5 mr-2 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Personalized Feature Extraction</h3>
                  <p className="text-sm text-muted-foreground">
                    Unlike one-size-fits-all approaches, our system creates a unique feature vector for each child, continuously refining its understanding of preferences.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <BarChart3 className="h-5 w-5 mr-2 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Multi-Dimensional Clustering</h3>
                  <p className="text-sm text-muted-foreground">
                    We group similar activities and foods across multiple dimensions, discovering non-obvious connections that traditional systems miss.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <PieChart className="h-5 w-5 mr-2 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Reinforcement Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system learns from feedback, with each rating you provide helping to refine future recommendations through a sophisticated reward mechanism.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Brain className="h-5 w-5 mr-2 text-red-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">Ensemble Decision Making</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple ML models vote on recommendations, combining their strengths to achieve better results than any single algorithm could provide.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg border border-muted-foreground/20">
            <h3 className="font-medium mb-2 text-center">How Our ML System Learns</h3>
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <div className="text-primary font-semibold mb-1">Input Data</div>
                <div className="text-sm text-muted-foreground">Child profiles, preferences, ratings</div>
              </div>
              <div className="hidden md:block text-muted-foreground">→</div>
              <div className="mb-4 md:mb-0">
                <div className="text-primary font-semibold mb-1">Processing</div>
                <div className="text-sm text-muted-foreground">Feature extraction, pattern analysis</div>
              </div>
              <div className="hidden md:block text-muted-foreground">→</div>
              <div className="mb-4 md:mb-0">
                <div className="text-primary font-semibold mb-1">Model Training</div>
                <div className="text-sm text-muted-foreground">Continuous learning, parameter tuning</div>
              </div>
              <div className="hidden md:block text-muted-foreground">→</div>
              <div>
                <div className="text-primary font-semibold mb-1">Recommendations</div>
                <div className="text-sm text-muted-foreground">Personalized, adaptive suggestions</div>
              </div>
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
            <>
              <HealthAssessmentCard childProfile={selectedChild} />
              <RecommendationsDisplay childProfile={selectedChild} />
            </>
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
