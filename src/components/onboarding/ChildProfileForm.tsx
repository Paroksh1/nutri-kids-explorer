
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../auth/AuthForm';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  dietType: 'vegetarian' | 'non-vegetarian' | 'vegan';
  allergies: string[];
  hasAllergies: boolean;
}

// In a real app, this would be in a database
let childProfiles: Record<string, ChildProfile[]> = {};

export const getChildProfiles = () => {
  const user = getCurrentUser();
  if (!user) return [];
  return childProfiles[user.id] || [];
};

export const addChildProfile = (profile: ChildProfile) => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (!childProfiles[user.id]) {
    childProfiles[user.id] = [];
  }
  
  childProfiles[user.id].push(profile);
  localStorage.setItem('childProfiles', JSON.stringify(childProfiles));
  return true;
};

const ChildProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [profile, setProfile] = useState<Omit<ChildProfile, 'id'>>({
    name: '',
    age: 0,
    weight: 0,
    height: 0,
    gender: 'male',
    activityLevel: 'moderate',
    dietType: 'non-vegetarian',
    allergies: [],
    hasAllergies: false
  });
  
  const [allergiesInput, setAllergiesInput] = useState('');
  
  // Load existing profiles from localStorage
  React.useEffect(() => {
    const storedProfiles = localStorage.getItem('childProfiles');
    if (storedProfiles) {
      childProfiles = JSON.parse(storedProfiles);
    }
  }, []);
  
  const updateProfile = (field: keyof typeof profile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.name || profile.age <= 0 || profile.weight <= 0 || profile.height <= 0) {
      toast.error('Please fill in all required fields with valid values');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newProfile: ChildProfile = {
        ...profile,
        id: Date.now().toString(),
        allergies: profile.hasAllergies && allergiesInput 
          ? allergiesInput.split(',').map(a => a.trim()) 
          : []
      };
      
      const success = addChildProfile(newProfile);
      
      if (success) {
        toast.success('Child profile created successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Failed to create profile. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Child Profile</CardTitle>
        <CardDescription>
          Add information about your child to get personalized nutrition recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name</Label>
              <Input 
                id="childName" 
                placeholder="Enter name" 
                value={profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="18"
                  placeholder="Enter age"
                  value={profile.age || ''}
                  onChange={(e) => updateProfile('age', Number(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  placeholder="Enter weight"
                  value={profile.weight || ''}
                  onChange={(e) => updateProfile('weight', Number(e.target.value))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  placeholder="Enter height"
                  value={profile.height || ''}
                  onChange={(e) => updateProfile('height', Number(e.target.value))}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={profile.gender}
                  onValueChange={(value) => updateProfile('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select
                  value={profile.activityLevel}
                  onValueChange={(value) => updateProfile('activityLevel', value)}
                >
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Very Active (very hard exercise & physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dietType">Diet Type</Label>
              <Select
                value={profile.dietType}
                onValueChange={(value: 'vegetarian' | 'non-vegetarian' | 'vegan') => updateProfile('dietType', value)}
              >
                <SelectTrigger id="dietType">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allergies"
                  checked={profile.hasAllergies}
                  onCheckedChange={(checked) => updateProfile('hasAllergies', checked)}
                />
                <Label htmlFor="allergies">Food Allergies or Restrictions</Label>
              </div>
              
              {profile.hasAllergies && (
                <Input
                  id="allergiesList"
                  placeholder="List allergies or restrictions, separated by commas"
                  value={allergiesInput}
                  onChange={(e) => setAllergiesInput(e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Profile...' : 'Create Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChildProfileForm;
